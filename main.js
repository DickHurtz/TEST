var test = document.getElementById("test");
var btn = document.getElementById("btn");

btn.addEventListener("click", function(){
	var ourRequest = new XMLHttpRequest();
	ourRequest.open('GET', 'data.json');
	ourRequest.onload = function(){
		var ourData = JSON.parse(ourRequest.responseText);
		renderHTML(ourData);
		console.log(ourData);
	};
	ourRequest.send();
});

function renderHTML(data){
	var htmlString = "testtest";
	test.insertAdjacentHTML('beforeend', htmlString);
}
