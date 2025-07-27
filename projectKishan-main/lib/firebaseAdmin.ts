import * as admin from "firebase-admin"

const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_SDK_KEY as string)

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    })
}

export const adminAuth = admin.auth()
export const adminDb = admin.firestore()
