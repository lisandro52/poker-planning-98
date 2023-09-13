// Import the functions you need from the SDKs you need

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';


// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: 'AIzaSyB8wiaNAuUHk3EWSS3eGkxgXRtqmyTjGDc',
  authDomain: 'react-poker-plan.firebaseapp.com',
  projectId: 'react-poker-plan',
  storageBucket: 'react-poker-plan.appspot.com',
  messagingSenderId: '863563122058',
  appId: '1:863563122058:web:207bbe5460ba0c496b7473',
  measurementId: 'G-DV8Q8RDVN5',
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
