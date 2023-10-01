// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyAafwOc1jTE_XSpi0OxduoqNrFBhGNgg2c',
	authDomain: 'rockvalleyclimbing.firebaseapp.com',
	projectId: 'rockvalleyclimbing',
	storageBucket: 'rockvalleyclimbing.appspot.com',
	messagingSenderId: '577466174582',
	appId: '1:577466174582:web:7778b63b8af61e83292357',
	measurementId: 'G-L4DDGJ0ZPG'
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth();
export const db = getFirestore();
