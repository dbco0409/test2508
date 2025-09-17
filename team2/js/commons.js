$(document).ready(function(){
	$("#header .menuBtn").click(function(){
		$("#menu").fadeIn();
	})
	$("#closeBtn").click(function(){
		$("#menu").fadeOut();
	})
})


function showPop(a){
	$(a).fadeIn();
}

function hidePop(a){
	$(a).fadeOut();
}

function fnMove(seq){
		var offset = $(seq).offset();
		$('html, body').animate({scrollTop : offset.top}, 400);
}

function fnback(n){
	history.back();
}
function loca(n){
	location.href=n;
}
