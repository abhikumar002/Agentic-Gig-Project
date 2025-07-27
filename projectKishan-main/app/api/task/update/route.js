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
export async function PUT(request) {
  try {
    // Initialize Firebase
    const app = initializeFirebase();
    const db = getFirestore(app);

    const body = await request.json();
    const { taskId, status, userId } = body;

    // Validate required fields
    if (!taskId || !status || !userId) {
      return Response.json({
        success: false,
        error: 'Missing required fields: taskId, status, userId'
      }, { status: 400 });
    }

    // Validate status
    const validStatuses = ['assigned', 'in-progress', 'completed'];
    if (!validStatuses.includes(status)) {
      return Response.json({
        success: false,
        error: 'Invalid status value. Must be: assigned, in-progress, or completed'
      }, { status: 400 });
    }

    const taskRef = doc(db, 'tasks', taskId);
    const taskDoc = await getDoc(taskRef);

    if (!taskDoc.exists()) {
      return Response.json({
        success: false,
        error: 'Task not found'
      }, { status: 404 });
    }

    const taskData = taskDoc.data();

    // Verify user has permission to update this task
    if (taskData.assignedTo !== userId && taskData.assignedBy !== userId) {
      return Response.json({
        success: false,
        error: 'Permission denied. You can only update tasks assigned to you or created by you.'
      }, { status: 403 });
    }

    // Validate status transition
    const currentStatus = taskData.status;
    const validTransitions = {
      'assigned': ['in-progress', 'completed'],
      'in-progress': ['completed', 'assigned'],
      'completed': ['assigned', 'in-progress']
    };

    if (!validTransitions[currentStatus]?.includes(status)) {
      return Response.json({
        success: false,
        error: `Cannot change status from ${currentStatus} to ${status}`
      }, { status: 400 });
    }

    // Prepare update data
    const updateData = {
      status,
      updatedAt: serverTimestamp()
    };

    // Add completion timestamp if marking as completed
    if (status === 'completed' && currentStatus !== 'completed') {
      updateData.completedAt = serverTimestamp();
    } else if (status !== 'completed') {
      updateData.completedAt = null;
    }

    await updateDoc(taskRef, updateData);

    return Response.json({
      success: true,
      message: 'Task updated successfully'
    }, { status: 200 });

  } catch (error) {
    console.error('Error updating task:', error);
    
    let errorMessage = 'Failed to update task';
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