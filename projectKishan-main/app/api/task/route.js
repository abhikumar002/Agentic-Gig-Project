import { getFirestore, collection, query, where, getDocs, orderBy } from 'firebase/firestore';
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

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const userRole = searchParams.get('userRole');

    if (!userId || !userRole) {
      return Response.json({
        success: false,
        error: 'Missing required parameters: userId and userRole'
      }, { status: 400 });
    }

    let tasksQuery;

    if (userRole === 'worker') {
      // Get tasks assigned to this worker
      tasksQuery = query(
        collection(db, 'tasks'),
        where('assignedTo', '==', userId),
        orderBy('createdAt', 'desc')
      );
    } else if (userRole === 'farmer') {
      // Get tasks assigned by this farmer
      tasksQuery = query(
        collection(db, 'tasks'),
        where('assignedBy', '==', userId),
        orderBy('createdAt', 'desc')
      );
    } else {
      return Response.json({
        success: false,
        error: 'Invalid user role'
      }, { status: 400 });
    }

    const querySnapshot = await getDocs(tasksQuery);
    const tasks = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      tasks.push({
        id: doc.id,
        ...data,
        // Convert Firestore timestamps to ISO strings
        createdAt: data.createdAt?.toDate()?.toISOString() || new Date().toISOString(),
        completedAt: data.completedAt?.toDate()?.toISOString() || null,
        updatedAt: data.updatedAt?.toDate()?.toISOString() || null
      });
    });

    return Response.json({
      success: true,
      tasks
    }, { status: 200 });

  } catch (error) {
    console.error('Error fetching tasks:', error);
    
    let errorMessage = 'Failed to fetch tasks';
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