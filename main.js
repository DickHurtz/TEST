var container = document.getElementById("container");

var ourRequest = new XMLHttpRequest();
ourRequest.open('GET', 'data.json');
ourRequest.onload = function(){
	var ourData = JSON.parse(ourRequest.responseText);
	renderHTML(ourData);
	console.log(ourData);
};
ourRequest.send();

function renderHTML(data){
	var htmlString = "";
	
	for(i = 0;i < data.length; i++){
		htmlString += "<div class='box' id='namba-"+ i +"'><div class='content'><h3>" + data[i].name + "</h3><img src='" + data[i].image + "' alt=" + data[i].name + "><a class='price'>" + data[i].price + "</a></div></div>";
	}
	
	container.insertAdjacentHTML('beforeend', htmlString);
	$('.price').each(function(){
		if(Math.floor($(this).text()) > Math.floor($("#cash").text())){ //price to b expensive
			$(this).addClass("exp");
		}
		/*if(){
			$(this).text("Owened");
		}*/
	});
}
$(document).ready(function(){
	$(".exp").on("click", function(){
		alert("too expensive");
	});
	$(".content > h3, .content > img").on("click", function(){
		alert("it could be a link to weapon params but it wasn't in the task");
	});
});