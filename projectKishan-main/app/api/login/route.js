// app/api/signin/route.js

import { initializeApp, getApps } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';

// Firebase configuration with validation
function getFirebaseConfig() {
  // Debug: Log all environment variables
  console.log('All env vars:', Object.keys(process.env).filter(key => key.includes('FIREBASE')));
  
  const config = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
  };

  // Validate required fields
  const requiredFields = ['apiKey', 'authDomain', 'projectId', 'storageBucket', 'messagingSenderId', 'appId'];
  const missingFields = requiredFields.filter(field => !config[field]);
  
  if (missingFields.length > 0) {
    console.error('Missing Firebase config fields:', missingFields);
    throw new Error(`Missing Firebase configuration: ${missingFields.join(', ')}`);
  }

  return config;
}

// Initialize Firebase
function initializeFirebase() {
  try {
    if (getApps().length === 0) {
      const config = getFirebaseConfig();
      return initializeApp(config);
    }
    return getApps()[0];
  } catch (error) {
    console.error('Firebase initialization failed:', error.message);
    throw error;
  }
}

export async function POST(request) {
  try {
    // Initialize Firebase on each request
    const app = initializeFirebase();
    const auth = getAuth(app);
    const db = getFirestore(app);

    const body = await request.json();
    const { email, password, rememberMe } = body;

    // Validate required fields
    if (!email || !password) {
      return Response.json({
        success: false,
        error: 'Email and password are required'
      }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json({
        success: false,
        error: 'Invalid email format'
      }, { status: 400 });
    }

    // Sign in with Firebase Auth
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Get user data from Firestore
    const userDocRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      return Response.json({
        success: false,
        error: 'User profile not found. Please contact support.'
      }, { status: 404 });
    }

    const userData = userDoc.data();

    // Check if user account is active
    if (userData.isActive === false) {
      return Response.json({
        success: false,
        error: 'Your account has been deactivated. Please contact support.'
      }, { status: 403 });
    }

    // Update last login timestamp
    await updateDoc(userDocRef, {
      lastLoginAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });

    // Return success response with user data (no sensitive info)
    return Response.json({
      success: true,
      message: 'Sign in successful',
      user: {
        uid: user.uid,
        name: userData.name,
        email: userData.email,
        role: userData.role,
        state: userData.state,
        farmSize: userData.farmSize || null,
        emailVerified: user.emailVerified,
        lastLoginAt: new Date().toISOString()
      },
      // Include session info if remember me is selected
      sessionInfo: {
        rememberMe: rememberMe || false,
        expiresIn: rememberMe ? '30d' : '1d'
      }
    }, { status: 200 });

  } catch (error) {
    console.error('Sign in error:', error);

    // Handle specific Firebase errors
    let errorMessage = 'Sign in failed. Please try again.';
    let statusCode = 400;
    
    if (error.message.includes('Missing Firebase configuration')) {
      errorMessage = 'Server configuration error. Please contact support.';
      statusCode = 500;
    } else {
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'No account found with this email address';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Incorrect password';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address';
          break;
        case 'auth/user-disabled':
          errorMessage = 'This account has been disabled';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Too many failed attempts. Please try again later.';
          break;
        case 'auth/network-request-failed':
          errorMessage = 'Network error. Please check your connection.';
          break;
        case 'auth/invalid-api-key':
          errorMessage = 'Firebase configuration error. Please contact support.';
          statusCode = 500;
          break;
        default:
          errorMessage = error.message || errorMessage;
      }
    }

    return Response.json({
      success: false,
      error: errorMessage
    }, { status: statusCode });
  }
}