var Test = document.getElementById("test");
var ourRequest = new XMLHttpRequest();
ourRequest.open('GET', 'data.json');
ourRequest.onload = function(){
	var ourData = JSON.parse(ourRequest.responseText);
	console.log(ourData);
	renderHTML(ourData);
}
ourRequest.send();

function renderHTML(data){
	var htmlString = "testtest";
	Test.insertAdjacentHTML('beforeend',htmlString);
}