// app/api/users/generate-join-code/route.js

import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, doc, getDoc, updateDoc, collection, query, where, getDocs, serverTimestamp } from 'firebase/firestore';

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

// Generate a unique join code
function generateJoinCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

// Check if join code is unique
async function isJoinCodeUnique(db, joinCode) {
    const existingQuery = query(
        collection(db, 'users'),
        where('joinCode', '==', joinCode)
    );
    const snapshot = await getDocs(existingQuery);
    return snapshot.empty;
}

// Generate unique join code
async function generateUniqueJoinCode(db) {
    let joinCode;
    let isUnique = false;
    let attempts = 0;
    const maxAttempts = 10;

    while (!isUnique && attempts < maxAttempts) {
        joinCode = generateJoinCode();
        isUnique = await isJoinCodeUnique(db, joinCode);
        attempts++;
    }

    if (!isUnique) {
        throw new Error('Unable to generate unique join code. Please try again.');
    }

    return joinCode;
}

export async function POST(request) {
    try {
        // Initialize Firebase
        const app = initializeFirebase();
        const db = getFirestore(app);

        const body = await request.json();
        const { userId } = body;

        // Validate required fields
        if (!userId) {
            return Response.json({
                success: false,
                error: 'User ID is required'
            }, { status: 400 });
        }

        // Get user details
        const userDoc = await getDoc(doc(db, 'users', userId));
        if (!userDoc.exists()) {
            return Response.json({
                success: false,
                error: 'User not found'
            }, { status: 404 });
        }

        const userData = userDoc.data();

        // Check if user is a farmer
        if (userData.role !== 'Farmer') {
            return Response.json({
                success: false,
                error: 'Only farmers can generate join codes'
            }, { status: 403 });
        }

        // Generate a unique join code
        const newJoinCode = await generateUniqueJoinCode(db);

        // Update user with new join code
        await updateDoc(doc(db, 'users', userId), {
            joinCode: newJoinCode,
            joinCodeGeneratedAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        });

        return Response.json({
            success: true,
            message: 'Join code generated successfully',
            joinCode: newJoinCode
        }, { status: 200 });

    } catch (error) {
        console.error('Generate join code error:', error);

        let errorMessage = 'Failed to generate join code. Please try again.';
        let statusCode = 500;

        if (error.message.includes('Missing Firebase configuration')) {
            errorMessage = 'Server configuration error. Please contact support.';
        } else if (error.message.includes('Unable to generate unique join code')) {
            errorMessage = 'Unable to generate unique join code. Please try again.';
            statusCode = 409;
        } else if (error.code === 'permission-denied') {
            errorMessage = 'Permission denied. Please check your access rights.';
            statusCode = 403;
        }

        return Response.json({
            success: false,
            error: errorMessage
        }, { status: statusCode });
    }
}