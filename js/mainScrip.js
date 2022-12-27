const list = [["1", "name1", "cap1"],["2","name2","cap2"]];
const _page2 = "html/cardInfo.html";

document.body.onload = addElement(list) 
document.addEventListener("click", handleClick);

function handleClick(event){
	if (event.target.parentNode.className == "card"){
		const card = event.target.parentNode;
		for (let i = 0; i < 2; i++){
			let k = card.children[i].className;
			let v = card.children[i].innerText;

			sessionStorage.setItem(k, v);
		}
		window.location.replace(_page2);

	}
}

function addElement(list){
	for (let i = 0; i < list.length; i++){
		const newCard = document.createElement("div");
		newCard.className = "card";
		newCard.id = list[i][0];

		const newName = document.createElement("h1");
		newName.className = "name";
		newName.innerText = list[i][1];

		const newCaption = document.createElement("p");
		newCaption.className = "caption";
		newCaption.innerText = list[i][2];

		newCard.appendChild(newName);
		newCard.appendChild(newCaption);

		const container = document.getElementById("container");
		container.appendChild(newCard);
	}

}

