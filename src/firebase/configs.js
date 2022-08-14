import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyDQxuz8gZEc-SWl_t0u0Nmt6j3GE6GBUPM",
	authDomain: "vue-firebase-d82b6.firebaseapp.com",
	projectId: "vue-firebase-d82b6",
	storageBucket: "vue-firebase-d82b6.appspot.com",
	messagingSenderId: "299748727593",
	appId: "1:299748727593:web:a612bfc89df99d23d57538",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
