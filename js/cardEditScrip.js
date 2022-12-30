import {db, getData} from "./firebase.js";

//get data from database
const sets  = await getData(db);

//HTML element
const table = document.getElementsByClassName("table-users")[0];
const name = document.getElementById("name");

//get data from sessionStorage
if (sessionStorage.length != 0){
	var setName = sessionStorage.getItem("name");
	var setCap = sessionStorage.getItem("caption");
	var cards = sessionStorage.getItem("cards").split(",");
}
else{
	var setName = null;
}

document.body.onload = addElement();
document.addEventListener("click", handleClick);
window.addEventListener("resize", editeIconSize);

function handleClick(event){
	if (event.target.className == "fa-solid fa-circle-plus"){
		//editTable("addn");
		console.log(table.rows[1].cells[0].getElementById("input").value);
		for (var i = 0; i < table.rows.length; i++){

		}
	}
	else if (event.target.className == "fa-solid fa-circle-minus"){
		editTable("delete", -1);
	}
	else if (event.target.className == "fa-solid fa-trash"){
		console.log("delete set");
	}
}

function editTable(eType, i){
	if (eType == "addn" || eType == "addw"){
		const row = table.insertRow(-1);
		const wordCol = row.insertCell(0);
		const meaningCol = row.insertCell(1);

		const wordInput = document.createElement("input");
		const meaningInput = document.createElement("input");

		wordInput.placeholder = "input word";
		meaningInput.placeholder = "input meaning";

		wordInput.id = "input";
		meaningInput.id = "input";

		if (eType == "addw"){
			wordInput.value = cards[i];
			meaningInput.value = cards[i+1];
		}

		wordCol.appendChild(wordInput);
		meaningCol.appendChild(meaningInput);
	}
	else if (eType == "delete"){
		if (table.rows.length > 3){
			table.deleteRow(i);
		}
	}

}

function addElement(){
	editeIconSize();

	if (setName != null){
		document.getElementById("name").value = setName;
		document.getElementById("caption").value = setCap;

		for (var i = 0; i < cards.length; i+=2){
			editTable("addw", i);
		}
	}
	else{
		console.log("nothing");
	}
}

function editeIconSize(){
	const H = name.offsetHeight-10;
	const icon = document.getElementsByClassName("fa-trash")[0];

	icon.style.fontSize = H+"px";
}
