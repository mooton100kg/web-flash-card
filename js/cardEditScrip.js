//get data from sessionStorage
if (sessionStorage.length != 0){
	var setName = sessionStorage.getItem("name");
}
else{
	var setName = null;
}

document.body.onload = addElement();

function addElement(){
	if (setName != null){
		console.log(setName);
	}
	else{
		console.log("nothing");
	}
}

