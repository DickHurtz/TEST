var cash = 4500;
var cartcount = 0;
document.getElementById("cash").innerHTML = cash;
$(".cart> h3 > span").text(cartcount);
var container = document.getElementById("container");
var cart = document.getElementById("owned");

var ourRequest = new XMLHttpRequest();
ourRequest.open('GET', 'data.json');
ourRequest.onload = function(){
	var ourData = JSON.parse(ourRequest.responseText);
	renderHTML(ourData);
};
ourRequest.send();

var adding2Cart = function(e, price){
	var id = e.target.parentNode.id;
	var img = $("#" + e.target.parentNode.id + " img").attr("src");
	var name = $("#" + e.target.parentNode.id + " > h3").text();
	if($("#"+id).hasClass("new")){
		var htmlStringCart = "<div class='owned new' id='"+id+"_incart'><h3>"+name+"<p>"+price+"<span>&nbsp</span></p></h3><span>New</span><img src="+img+"><button type='button' class='cancel' onclick='Cancel($(this),"+price+","+id+")'><i class='mark x'></i><i class='mark xx'></i></button></div>";
	}else{
		var htmlStringCart = "<div class='owned' id='"+id+"_incart'><h3>"+name+"<p>"+price+"<span>&nbsp</span></p></h3><img src="+img+"><button type='button' class='cancel' onclick='Cancel($(this),"+price+","+id+")'><i class='mark x'></i><i class='mark xx'></i></button></div>";
	};
	
	cart.insertAdjacentHTML('beforeend', htmlStringCart);
	cartcount++;
	$(".cart > h3 > span").text(cartcount);
	Summary(price);
};

var Summary = function(price){
	var wholeprice = $(".summary > span").text();
	var newprice = parseInt(price, 10) + parseInt(wholeprice, 10);
	$(".summary").show();
	$(".summary > span").text(newprice);
};

var new_cashCheck = function(){
	$('.price').each(function(e){
		var price = $(this).text();
		if(price > cash){
			$(this).addClass("exp");
		}else{
			$(this).removeClass("exp");
		}
	});
};

var Restore = function(price){
	var newcash = parseInt(price, 10) + cash;
	var newprice = parseInt($(".summary > span").text(), 10) - price;
	cash = newcash;
	$("#cash").text(newcash);
	$(".summary > span").text(newprice);
}

var Cancel = function(prod,price, id){
		cartcount--;
	if(cartcount < 1)
		$(".summary").hide();
	Restore(price);
	$(".cart> h3 > span").text(cartcount);
	prod.closest(".owned").replaceWith();
	$("#"+id+">.price").removeClass("in_cart");
	new_cashCheck();
	$("#"+id+">.price").html(price+"<span>&nbsp;</span>");
};

var Done = function(){
	$("#owned > *").replaceWith();
	$(".summary").hide();
	cartcount = 0;
	$(".cart> h3 > span").text(cartcount);
	$(".in_cart").addClass("yours2go").text("yours 2 shoot");
};

function renderHTML(data){
	var htmlString = "";
	
	for(i = 0;i < data.length; i++){
		if(parseInt(data[i].fresh, 10) != 0){
			htmlString += "<div class='box'><div class='content new' id='"+ i +"'><h3>" + data[i].name + "</h3><span>New</span><div class='carier'><img src='" + data[i].image + "' alt=" + data[i].name + "></div><p class='price'>" + data[i].price + "<span>&nbsp</span></p></div></div>";
		}else{
			htmlString += "<div class='box'><div class='content' id='"+ i +"'><h3>" + data[i].name + "</h3><div class='carier'><img src='" + data[i].image + "' alt=" + data[i].name + "></div><p class='price'>" + data[i].price + "<span>&nbsp</span></p></div></div>";
		}
		
		
	}
	
	container.insertAdjacentHTML('beforeend', htmlString);
	
	$('.price').each(function(){
		var in_cart = false;
		if(Math.floor($(this).text()) <= Math.floor($("#cash").text())){
			$(this).on("click", function(e){
			var price = $("#" + e.target.parentNode.id + " > .price").text();
			if(Math.floor($(this).text()) <= Math.floor($("#cash").text()) && Math.floor($("#cash").text()) > 0){
					var new_cash = cash - Math.floor($(this).text());
					$("#cash").text(new_cash);
					cash = new_cash;
					$(this).addClass("in_cart").text("In cart");
					//in_cart = true;
					adding2Cart(e, price);
				}else{
					$(this).addClass("exp");
				}
				new_cashCheck();
			});
		}else{
			$(this).addClass("exp");
		}
		if(Math.floor($(this).text()) > Math.floor($("#cash").text())){
			$(this).addClass("exp");
		}
	});
}

$(document).ready(function(){
	$(".exp").on("click", function(){
		alert("too expensive");
	});
	$(".content > h3, .content > img").on("click", function(){
		alert("it could be a link to weapon params but it wasn't in the task");
	});
	$(".summary").on("click", function(){
		var total = $(".summary > span").text();
		alert("Yo total is: "+total+"$, engjoy your guns");
		Done();
	});
});