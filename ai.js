/* GAME RULES TOGGLING */
$("#game_end").hide()
$("#rules").hide()
$("#player_frame").hide()
$("#number_frame").hide()
$("#rank_frame").hide()
$("#rules_button").click(function(){
	$("#rules").toggle();
});

var players = 0;

function add_player(){
	var nick = $("#input").val();
	console.log(nick)
	$("#input").val("")
	var before_nick = "<div class='player' id='player"+ players +"'><p class='nick'>";
	var after_nick = "</p><button class='player_button' onclick='remove_player(player"+players+")'>Remove</button><div class='clear_both'></div></div>";
	$("#players").append(before_nick+nick+after_nick)
	players++;
}

function remove_player(playerid){
	//console.log(playerid)
	$(playerid).remove()
}

function example(){
	$("#input").val("Roma")
	add_player()
	$("#input").val("Kuba")
	add_player()
	$("#input").val("Ala")
	add_player()
}
example();

//console.log(5 * 6);