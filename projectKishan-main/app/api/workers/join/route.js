import { getFirestore, doc, updateDoc, getDoc, query, collection, where, getDocs, serverTimestamp } from 'firebase/firestore';
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
    // Initialize Firebase
    const app = initializeFirebase();
    const db = getFirestore(app);

    const body = await request.json();
    const { workerId, joinCode } = body;

    // Validate required fields
    if (!workerId || !joinCode) {
      return Response.json({
        success: false,
        error: 'Missing required fields: workerId, joinCode'
      }, { status: 400 });
    }

    // Validate join code format
    if (!/^FARM[A-Z0-9]{3,6}$/i.test(joinCode)) {
      return Response.json({
        success: false,
        error: 'Invalid join code format'
      }, { status: 400 });
    }

    // Check if worker exists and is valid
    const workerRef = doc(db, 'users', workerId);
    const workerDoc = await getDoc(workerRef);

    if (!workerDoc.exists()) {
      return Response.json({
        success: false,
        error: 'Worker not found'
      }, { status: 404 });
    }

    const workerData = workerDoc.data();
    if (workerData.role !== 'Worker') {
      return Response.json({
        success: false,
        error: 'Only workers can join farms'
      }, { status: 403 });
    }

    // Check if worker is already part of a farm
    if (workerData.farmerId) {
      return Response.json({
        success: false,
        error: 'You are already part of a farm. Please leave your current farm first.'
      }, { status: 400 });
    }

    // Find farmer with this join code
    const farmersQuery = query(
      collection(db, 'users'),
      where('joinCode', '==', joinCode.toUpperCase()),
      where('role', '==', 'Farmer')
    );

    const farmerSnapshot = await getDocs(farmersQuery);

    if (farmerSnapshot.empty) {
      return Response.json({
        success: false,
        error: 'Invalid join code. Please check the code and try again.'
      }, { status: 404 });
    }

    const farmerDoc = farmerSnapshot.docs[0];
    const farmerId = farmerDoc.id;
    const farmerData = farmerDoc.data();

    // Check if farmer account is active
    if (farmerData.isActive === false) {
      return Response.json({
        success: false,
        error: 'This farm is currently inactive'
      }, { status: 403 });
    }

    // Update worker's farmerId
    await updateDoc(workerRef, {
      farmerId: farmerId,
      joinedAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });

    return Response.json({
      success: true,
      message: `Successfully joined ${farmerData.name}'s farm!`,
      farmerId,
      farmerName: farmerData.name
    }, { status: 200 });

  } catch (error) {
    console.error('Error joining farm:', error);
    
    let errorMessage = 'Failed to join farm';
    let statusCode = 500;

    if (error.message.includes('Missing Firebase configuration')) {
      errorMessage = 'Server configuration error. Please contact support.';
    }

    return Response.json({
      success: false,
      error: errorMessage
    }, { status: statusCode });
  }
}