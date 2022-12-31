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
window.addEventListener("resize", editElementSize);

function handleClick(event){
	if (event.target.className == "fa-solid fa-circle-plus"){
		editTable("addn");
		const checkboxs = document.getElementsByClassName("selectbox");
	
		for (var i = 0; i < checkboxs.length; i++){
			checkboxs[i].checked = false;
		}
	}
	else if (event.target.className == "fa-solid fa-circle-minus"){
		const checkboxs = document.getElementsByClassName("selectbox");
		let haveChacked = false;
		for (var i = 0; i <checkboxs.length; i++){
			if (checkboxs[i].checked){
				editTable("delete", checkboxs[i].parentNode.parentNode.rowIndex)
				haveChacked = true; 
			}
		}
		if (!haveChacked){
			editTable("delete", -1)
		}
	}
	else if (event.target.className == "fa-solid fa-trash"){
		console.log("delete set");
	}
}

function editTablePara(eType, n, i){
	const obj = {};

	if (i ==  0){
		//check Col
		obj["type"] = "checkbox";
		obj["className"] = "selectbox";

	} else if (i ==  1){
		//word Col
		obj["placeholder"] = "input word";
		obj["id"] = "input";
		
		if (eType == "addw"){
			obj["value"] = cards[n]; 
		}

	} else if (i ==  2){
		//meaning Col
		obj["placeholder"] = "input meaning";
		obj["id"] = "input";

		if (eType == "addw"){
			obj["value"] = cards[n+1];
		}

	}

	return obj
}

function editTable(eType, n){
	if (eType == "addn" || eType == "addw"){
		const row = table.insertRow(-1);
		for (var i = 0; i < 3; i++){
			row.insertCell(i).appendChild(
				Object.assign(
					document.createElement("input"),
					editTablePara(eType, n, i)
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
	editElementSize();

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

function editElementSize(){
	//icon
	const H = name.offsetHeight-10;
	const icon = document.getElementsByClassName("fa-trash")[0];

	icon.style.fontSize = H+"px";

}
