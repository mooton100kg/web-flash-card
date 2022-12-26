const _page1 = "index.html";
const _page2 = "secondmenu.html";
document.body.onload = checkPage(location.href.split("/").slice(-1)[0]);
document.addEventListener("click", handleClick);

function checkPage(page){
	if (page == _page1){
		const list = [["1", "name1", "cap1"],["2","name2","cap2"]];
		addElement1(list);
	}
	else if (page == _page2){
	}
}

function handleClick(event){
	if (event.target.parentNode.className == "card"){
		const card = event.target.parentNode;
		for (let i = 0; i < 2; i++){
			if (card.children[i].className == "name") {
				n = card.children[i].innerText;
			}
			if (card.children[i].className == "caption") {
				c = card.children[i].innerText;
			}
		}
		card.onclick = function(){
			window.open("secondmenu.html", "_self");
			
		}
	}
}

function addElement1(list){
	console.log("loaded page1 ele");
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

function addElement2(n, c){
	document.getElementById("name").innerText = n;
	document.getElementById("caption").innerText = c;
}
