import {initializeApp} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js';
import {getFirestore, collection, getDocs, doc} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js';

const firebaseConfig = {
  apiKey: "AIzaSyApNoKK9h-7I7qDtij_pEp6z8tBml9I0R4",
  authDomain: "web-word-7636a.firebaseapp.com",
  projectId: "web-word-7636a",
  storageBucket: "web-word-7636a.appspot.com",
  messagingSenderId: "335174585981",
  appId: "1:335174585981:web:92bd3998d5acb39b3d2b14"
};

//initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export async function getData(db, get){
	if (get == "sets"){
		const admin = collection(db, "admin");
		const sets = await getDocs(admin);

		return sets;
	}
	else if (get == "cards"){
		const setDoc = doc(db, "admin", sessionStorage.getItem("name"));
		const cardsCol =  collection(setDoc, "cards");
		const cards = await getDocs(cardsCol);

		return cards;
	}
}
