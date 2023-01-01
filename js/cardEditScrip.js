import {db, getData, setCard, deleteSet} from "./firebase.js";

//page path
const _hPage = "../index.html";

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

async function handleClick(event){
	if (event.target.className == "fa-solid fa-circle-plus"){
		editTable("addn");
		const checkboxs = document.getElementsByClassName("selectbox");
	
		for (var i = 0; i < checkboxs.length; i++){
			checkboxs[i].checked = false;
		}
	}
	else if (event.target.className == "fa-solid fa-circle-minus"){
		const checkboxs = document.getElementsByClassName("selectbox");
		const chackedList = new Array();
		for (var i = 0; i <checkboxs.length; i++){
			chackedList.push(checkboxs[i].checked);
				//editTable("delete", checkboxs[i].parentNode.parentNode.rowIndex)
			}
		if (chackedList.indexOf(true) != -1){
			if (confirm("delete " +  chackedList.filter(x => x === true).length + " row?")){
				
			}
		} else{
			editTable("delete", -1)
		}
	}
	else if (event.target.className == "fa-solid fa-trash"){
		if (confirm("Delete set: " + setName)){
			await deleteSet(setName);
			window.open(_hPage, "_self");
		}
	}
	else if (event.target.className == "tab"){
		if (confirm("save?")){
			const textarea = document.querySelectorAll("textarea");
			const cardList = new Array();

			for (var i = 0; i < textarea.length; i+=2){
				if (textarea[i].value && textarea[i+1].value){
					const w = textarea[i].value.replace("\n", "~");
					const m = textarea[i+1].value.replace("\n", "~");
					cardList.push([w, m])
				}
			}
			await setCard(cardList);
			window.open(_hPage, "_self");
		}
	}
}

function editTableObj(eType, n, i){
	const obj = {};

	if (i ==  0){
		//check Col
		obj["type"] = "checkbox";
		obj["className"] = "selectbox";

	} else if (i ==  1){
		//word Col
		obj["className"] = "input-word";
		
		if (eType == "addw"){
			obj["value"] = cards[n]; 
		}

	} else if (i ==  2){
		//meaning Col
		obj["className"] = "input-meaning";
		obj["rows"] = "2";

		if (eType == "addw"){
			obj["value"] = cards[n+1].replace("~", "\n");
		}

	}

	return obj
}

function editTableEle(i){
	let element;

	if (i == 0){
		element = document.createElement("input");
	} else if (i == 1 || i == 2){
		element = document.createElement("textarea");
	}

	return element
}

function editTable(eType, n){
	if (eType == "addn" || eType == "addw"){
		const row = table.insertRow(-1);
		for (var i = 0; i < 3; i++){
			row.insertCell(i).appendChild(
				Object.assign(
					editTableEle(i),
					editTableObj(eType, n, i)
				)
			);
		}
	}
	else if (eType == "delete"){
		if (table.rows.length > 3){
			table.deleteRow(n);
		}
	}

}

function addElement(){
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

