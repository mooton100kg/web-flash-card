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
const db = getFirestore(app);

//get data from database
const sets  = await getData(db);

//page path
const _page2 = "html/cardInfo.html";
const _pageEdit = "html/cardEdit.html";

document.body.onload = addElement(); 
document.addEventListener("click", handleClick);

async function getData(db){
	const admin = collection(db, "admin");
	const sets = await getDocs(admin);

	return sets;
}

async function handleClick(event){
	if (event.target.parentNode.className == "set"){
		const set = event.target.parentNode;
		//save set name & caption to sessionStorage
		for (let i = 0; i < 2; i++){
			let k = set.children[i].className;
			let v = set.children[i].innerText;

			sessionStorage.setItem(k, v);
		}
		//save set data to sessionStorage
		const setDoc = doc(db, "admin", sessionStorage.getItem("name"));
		const cardsCol =  collection(setDoc, "cards");
		const cards = await getDocs(cardsCol);
		let cardInfo = new Array()
		
		cards.forEach((card)=>{
			cardInfo.push([card.data().word, card.data().meaning]);
		});
		sessionStorage.setItem("cards", cardInfo);
		window.open(_page2, "_self");
	}
	else if (event.target.className == "tab"){
		window.open(_pageEdit, "_self");
	}
}

function addElement(){
	sessionStorage.clear();
	sets.forEach((set)=>{
		const newSet = document.createElement("div");
		newSet.className = "set";
		newSet.id = set.id;

		const newName = document.createElement("h1");
		newName.className = "name";
		newName.innerText = set.id;

		const newCaption = document.createElement("p");
		newCaption.className = "caption";
		newCaption.innerText = set.data().caption;

		newSet.appendChild(newName);
		newSet.appendChild(newCaption);

		const container = document.getElementById("container");
		container.appendChild(newSet);
	});
}

