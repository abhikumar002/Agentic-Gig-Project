import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
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
    const { title, description, assignedTo, assignedBy } = body;

    // Validate required fields
    if (!title || !assignedTo || !assignedBy) {
      return Response.json({
        success: false,
        error: 'Missing required fields: title, assignedTo, assignedBy'
      }, { status: 400 });
    }

    // Validate title length
    if (title.trim().length < 3) {
      return Response.json({
        success: false,
        error: 'Task title must be at least 3 characters long'
      }, { status: 400 });
    }

    // Create new task document
    const taskData = {
      title: title.trim(),
      description: description?.trim() || '',
      assignedTo,
      assignedBy,
      status: 'assigned',
      createdAt: serverTimestamp(),
      completedAt: null,
      updatedAt: null
    };

    const docRef = await addDoc(collection(db, 'tasks'), taskData);

    return Response.json({
      success: true,
      taskId: docRef.id,
      message: 'Task created successfully'
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating task:', error);
    
    let errorMessage = 'Failed to create task';
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