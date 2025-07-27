// app/api/workers/route.js

import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

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

export async function GET(request) {
    try {
        // Initialize Firebase
        const app = initializeFirebase();
        const db = getFirestore(app);

        // Get farmerId from query parameters
        const { searchParams } = new URL(request.url);
        const farmerId = searchParams.get('farmerId');

        // Validate required parameters
        if (!farmerId) {
            return Response.json({
                success: false,
                error: 'Farmer ID is required'
            }, { status: 400 });
        }

        // Query workers assigned to this farmer
        const workersQuery = query(
            collection(db, 'users'),
            where('role', '==', 'Worker'),
            where('farmerId', '==', farmerId)
        );

        const workersSnapshot = await getDocs(workersQuery);
        
        // Transform the data
        const workers = [];
        workersSnapshot.forEach((doc) => {
            const workerData = doc.data();
            workers.push({
                id: doc.id,
                name: workerData.name,
                email: workerData.email,
                phone: workerData.phone || '',
                state: workerData.state,
                assignedAt: workerData.assignedAt?.toDate?.()?.toISOString() || null,
                isActive: workerData.isActive !== false, // Default to true if not specified
                farmerId: workerData.farmerId,
                farmerName: workerData.farmerName || ''
            });
        });

        return Response.json({
            success: true,
            workers: workers,
            count: workers.length
        }, { status: 200 });

    } catch (error) {
        console.error('Get workers error:', error);

        let errorMessage = 'Failed to fetch workers. Please try again.';
        let statusCode = 500;

        if (error.message.includes('Missing Firebase configuration')) {
            errorMessage = 'Server configuration error. Please contact support.';
        } else if (error.code === 'permission-denied') {
            errorMessage = 'Permission denied. Please check your access rights.';
            statusCode = 403;
        } else if (error.code === 'unavailable') {
            errorMessage = 'Service temporarily unavailable. Please try again later.';
            statusCode = 503;
        }

        return Response.json({
            success: false,
            error: errorMessage
        }, { status: statusCode });
    }
}