/* GAME RULES TOGGLING */
$("#game_end").hide()
$("#rules").hide()
$("#player_frame").hide()
$("#turn_cards").hide()
var players = 0;
var bot = 1;

bot1()
example()


function rules_button(){
	$("#rules").toggle()
}

function add_player(){
	var nick = $("#input").val();
	console.log(nick)
	$("#input").val("")
	var before_nick = "<div class='player' id='player"+ players +"'><p id='player"+ players +"nick' class='nick'>";
	var after_nick = "</p><button class='player_button' onclick='remove_player(player"+players+")'>Remove</button><div class='clear_both'></div></div>";
	$("#players").append(before_nick+nick+after_nick)
	players++
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
	start_game()
}


function get_players(){
	var players_list=[]
	$(".player").each(function(){
		 console.log(this.id)
		 players_list.push($("#"+this.id+"nick").html())
	})
	return players_list
}

function confirm_cards(){

}

function start_game(){
	$("#before_game").hide()
	$("#player_frame").show()
	$("#turn_cards").show()
	var players_list = get_players()
	$("#player_name").html(players_list[0])
}

function end_game(){
}

function bot1(){
	$("body").css({"background-color":"#000033"})
}

function bot2(){
	$("body").css({"background-color":"#4d0000"})
}
