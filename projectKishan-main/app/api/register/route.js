// app/api/register/route.js (App Router)

import { initializeApp, getApps } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getFirestore, doc, setDoc, serverTimestamp } from 'firebase/firestore';

// Firebase configuration with validation
function getFirebaseConfig() {
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
        console.error('Current config:', {
            apiKey: config.apiKey ? `${config.apiKey.substring(0, 10)}...` : 'MISSING',
            authDomain: config.authDomain || 'MISSING',
            projectId: config.projectId || 'MISSING',
            storageBucket: config.storageBucket || 'MISSING',
            messagingSenderId: config.messagingSenderId || 'MISSING',
            appId: config.appId ? `${config.appId.substring(0, 20)}...` : 'MISSING'
        });
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
        // Initialize Firebase on each request to avoid server-side issues
        const app = initializeFirebase();
        const auth = getAuth(app);
        const db = getFirestore(app);

        const body = await request.json();
        const { name, email, password, phone, state, farmSize, role } = body;

        // Validate required fields
        if (!name || !email || !password || !state) {
            return Response.json({
                success: false,
                error: 'Missing required fields: name, email, password, and state are required'
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

        // Validate password strength
        if (password.length < 6) {
            return Response.json({
                success: false,
                error: 'Password must be at least 6 characters long'
            }, { status: 400 });
        }

        // Create user with Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Update the user's display name
        await updateProfile(user, {
            displayName: name
        });

        // Prepare user data for Firestore
        const userData = {
            uid: user.uid,
            name: name.trim(),
            email: email.toLowerCase().trim(),
            phone: phone || '',
            state,
            role: role || 'Farmer',
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
            emailVerified: user.emailVerified,
            isActive: true
        };

        // Add farm size only if role is Farmer
        if (role === 'Farmer' && farmSize) {
            userData.farmSize = farmSize;
        }

        // Save user data to Firestore
        await setDoc(doc(db, 'users', user.uid), userData);

        // Return success response (don't send sensitive data)
        return Response.json({
            success: true,
            message: 'User registered successfully',
            user: {
                uid: user.uid,
                name: userData.name,
                email: userData.email,
                role: userData.role,
                state: userData.state
            }
        }, { status: 201 });

    } catch (error) {
        console.error('Registration error:', error);

        // Handle specific Firebase errors
        let errorMessage = 'Registration failed. Please try again.';
        let statusCode = 400;

        if (error.message.includes('Missing Firebase configuration')) {
            errorMessage = 'Server configuration error. Please contact support.';
            statusCode = 500;
        } else {
            switch (error.code) {
                case 'auth/email-already-in-use':
                    errorMessage = 'An account with this email already exists';
                    break;
                case 'auth/invalid-email':
                    errorMessage = 'Invalid email address';
                    break;
                case 'auth/weak-password':
                    errorMessage = 'Password is too weak. Please use at least 6 characters.';
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