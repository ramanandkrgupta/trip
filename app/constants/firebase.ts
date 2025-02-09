// app/constants/firebase.ts
import { initializeApp } from 'firebase/app'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'
import { getAuth, connectAuthEmulator } from 'firebase/auth'
// Add these imports at top
import { doc, setDoc } from 'firebase/firestore';

// Now testRef will work

const firebaseConfig = {
  apiKey: 'AIzaSyDwdYIOvbVrCBq2BmDXT19zuOTKmCRCSJ8',
  authDomain: 'ecommerceapp-2a60d.firebaseapp.com',
  projectId: 'ecommerceapp-2a60d',
  storageBucket: 'ecommerceapp-2a60d.firebasestorage.app',
  messagingSenderId: '138318439214',
  appId: '1:138318439214:web:02998e58a3ef92a9bf50bf',
  measurementId: 'G-2GKBZ9WJFS',
}
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Services
export const db = getFirestore(app);
export const auth = getAuth(app);

// Emulator connection (development only)
if (__DEV__) {
  connectFirestoreEmulator(db, 'localhost', 8080);
  connectAuthEmulator(auth, 'http://localhost:9099');
  console.log('Firebase emulators connected!');
}

// Test function
export const testFirebaseConnection = async () => {
  try {
    const testRef = doc(db, 'testConnection/testDoc');
    await setDoc(testRef, { timestamp: new Date() });
    console.log('✅ Firebase connection successful!');
  } catch (error) {
    console.error('❌ Firebase connection failed:', error);
  }
};