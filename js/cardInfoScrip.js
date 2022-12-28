//parameter
const cards = sessionStorage.getItem("cards");

//HTML element
const setName = sessionStorage.getItem("name");
const table = document.getElementsByClassName("table-users")[0];

//load & edite element
document.body.onload = addElement();

function addElement(){
	//edite
	document.getElementById("name").innerText = setName;
	document.getElementById("caption").innerText = sessionStorage.getItem("caption");
	console.log(cards);	
	cards.forEach((card)=>{console.log(card.data())});

}

function addDataInCard(card){
	const row = table.insertRow(-1);
	const wordCol = row.insertCell(0);
	const meaningCol = row.insertCell(1);
	
	wordCol.innerHTML = card.data().word;
	meaningCol.innerHTML = card.data().meaning;
	console.log(card.data().word, card.data().meaning);
}
