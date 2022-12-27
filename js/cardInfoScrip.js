document.body.onload = addElement();

function addElement(){
	//edite
	document.getElementById("name").innerText = sessionStorage.getItem("name");
	document.getElementById("caption").innerText = sessionStorage.getItem("caption");
}
