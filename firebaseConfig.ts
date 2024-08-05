// firebaseConfig.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyBx9UcFpOfBF7B6X-CLJ0n2RnSSw2DmeeA",
  authDomain: "cabbooking-a768b.firebaseapp.com",
  projectId: "cabbooking-a768b",
  storageBucket: "cabbooking-a768b.appspot.com",
  messagingSenderId: "240150173730",
  appId: "1:240150173730:web:25cfad12dd2544a8a0527b"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Auth with persistence using AsyncStorage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Initialize Firestore
const firestore = getFirestore(app);

export { auth, firestore };



// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { initializeApp } from 'firebase/app';
// import { getReactNativePersistence, initializeAuth } from 'firebase/auth';
// import { getFirestore } from 'firebase/firestore';

// // Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBx9UcFpOfBF7B6X-CLJ0n2RnSSw2DmeeA",
//   authDomain: "cabbooking-a768b.firebaseapp.com",
//   projectId: "cabbooking-a768b",
//   storageBucket: "cabbooking-a768b.appspot.com",
//   messagingSenderId: "240150173730",
//   appId: "1:240150173730:web:25cfad12dd2544a8a0527b"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // Initialize Auth with persistence
// const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(AsyncStorage)
// });

// // Initialize Firestore
// const firestore = getFirestore(app);

// export { auth, firestore };


