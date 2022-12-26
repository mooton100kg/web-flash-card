document.body.onload = addElement();

function addElement(){
	for (let i = 0; i < 8; i++){
		console.log("func");

		const newCard = document.createElement("div");
		newCard.className = "card";
		newCard.id = i;

		const newName = document.createElement("h1");
		newName.className = "name";
		newName.innerText = "newname";

		const newCaption = document.createElement("p");
		newCaption.className = "caption";
		newCaption.innerText = "newcap";

		newCard.appendChild(newName);
		newCard.appendChild(newCaption);
		
		const container = document.getElementById("container");
		container.appendChild(newCard);

	}
}

document.getElementById("6").onclick = function(){window.open("secondmenu.html", "_self")};
