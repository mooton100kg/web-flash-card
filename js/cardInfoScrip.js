//get data from sessionStorage
const cards = sessionStorage.getItem("cards");
const setName = sessionStorage.getItem("name");

//HTML element
const table = document.getElementsByClassName("table-users")[0];
const name = document.getElementById("name");
const pen = document.getElementsByClassName("fa-pen")[0];

//load & edite element
document.body.onload = addElement();
window.addEventListener("resize", editeIconSize);

//change to edit page
pen.onclick = function(){
	window.open("cardEdit.html", "_self");
};

function editeIconSize(){
	const H = name.offsetHeight;
	const icons = document.getElementsByClassName("fa-solid");

	for (var i = 0; i < icons.length; i++)
		icons[i].style.fontSize = H+"px";
}

function addElement(){
	//edite
	document.getElementById("name").innerText = setName;
	document.getElementById("caption").innerText = sessionStorage.getItem("caption");
	editeIconSize();

	const cardInfo = cards.split(",");

	for(var i = 0; i < cardInfo.length; i+=2){
		addDataInCard(cardInfo[i], cardInfo[i+1]);
	}
}

function addDataInCard(w, m){
	const row = table.insertRow(-1);
	const wordCol = row.insertCell(0);
	const meaningCol = row.insertCell(1);
	
	wordCol.innerHTML = w;
	meaningCol.innerHTML = m;
}
