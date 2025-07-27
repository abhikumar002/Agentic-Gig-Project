import { getFirestore, doc, updateDoc, getDoc, serverTimestamp } from 'firebase/firestore';
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
    const { workerId } = body;

    if (!workerId) {
      return Response.json({
        success: false,
        error: 'Missing required field: workerId'
      }, { status: 400 });
    }

    // Verify worker exists and is part of a farm
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
        error: 'Only workers can leave farms'
      }, { status: 403 });
    }

    if (!workerData.farmerId) {
      return Response.json({
        success: false,
        error: 'You are not part of any farm'
      }, { status: 400 });
    }

    // Remove worker from farm
    await updateDoc(workerRef, {
      farmerId: null,
      leftFarmAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });

    return Response.json({
      success: true,
      message: 'Successfully left the farm'
    }, { status: 200 });

  } catch (error) {
    console.error('Error leaving farm:', error);
    
    let errorMessage = 'Failed to leave farm';
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
