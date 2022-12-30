import {db, getData} from "./firebase.js";

//get data from database
const sets  = await getData(db, "sets");

//page path
const _page2 = "html/cardInfo.html";
const _pageEdit = "html/cardEdit.html";

document.body.onload = addElement(); 
document.addEventListener("click", handleClick);

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
		const cards = await getData(db, "cards");
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

