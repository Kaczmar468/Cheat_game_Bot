$("#game_end").hide()
$("#rules").hide()
$("#player_frame").hide()
$("#turn_cards").hide()
$("#adding_cards").hide()
$("#turn_check").hide()
$("#your_cards_frame").hide()

var players_divs = 1, cards_divs = 0, current_player = 0, players_list;
var bot = 1;
var number = 0, rank = 0, cards, check
var player_cards, thrown_cards 

bot1()
//example()


function rules_button(){
	$("#rules").toggle()
}

function add_player(){
	var nick = $("#input").val().trim();
	if (nick == "")
		return
	if (get_players().includes(nick))
		return
	console.log(nick)
	$("#input").val("")
	var before_content = "<div class='player' id='player" + players_divs + "'><p id='player" + players_divs + "nick' class='nick'>";
	var button_up = "<div class='player_button' onclick='move_up(player" + players_divs + ")'><p>Up</p></div>";
	var button_down = "<div class='player_button' onclick='move_down(player" + players_divs + ")'><p>Down</p></div>";
	var button_remove = "<div class='player_button' onclick='remove_player(player" + players_divs + ")'><p>Remove</p></div>"
	var after_content = "<div class='clear_both'></div></div>";
	$("#players").append(before_content + nick + "</p>" + button_remove + button_down + button_up + after_content)
	players_divs++
}

function add_cards(){
	var before_content = "<div class='your_cards' id='cards" + cards_divs + "'><p id='cards" + cards_divs + "text' class='nick'>";
	var after_content = "</p><div class='player_button' onclick='remove_cards(cards" + cards_divs + ")'><p>Remove</p></div><div class='clear_both'></div></div>";
	$("#your_cards").append(before_content + number + " cards of rank " + rank + after_content)
	cards_divs++
	player_cards[rank]+=number
	console.log(player_cards)
}

function move_up(playerid){
	$(playerid).insertBefore($(playerid).prev())
}

function move_down(playerid){
	$(playerid).insertAfter($(playerid).next())
}

function remove_player(playerid){
	//console.log(playerid)
	$(playerid).remove()
}

function remove_cards(cardsid){
	//console.log(playerid)
	$(cardsid).remove()
}

function example(){
	$("#input").val("Roma")
	add_player()
	$("#input").val("Kuba")
	add_player()
	$("#input").val("Ala")
	add_player()
	start_game()
	player_cards[3]=2
	player_cards[7]=3
	player_cards["K"]=3
	player_cards[8]=3
	all_of_them()
	number = 2
	rank = 3
	confirm_cards()
}


function get_players(){
	var players_list=[]
	$(".player").each(function(){
		 console.log(this.id)
		 players_list.push($("#"+this.id+"nick").html())
	})
	return players_list
}

function start_game(){
	$("#before_game").hide()
	$("#game_start").hide()
	$("#game_end").show()
	$("#player_frame").show()
	$("#turn_cards").show()
	players_list = get_players()
	current_player = 0
	$("#player_name").html(players_list[current_player])
	$("#adding_cards").show()
	$("#confirm_cards").hide()
	$("#player_frame").hide()
	$("#your_cards_frame").show()
	$("#your_cards").html("")
	player_cards = {2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, "J": 0, "Q": 0, "K": 0, "A": 0}
	thrown_cards = {2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, "J": 0, "Q": 0, "K": 0, "A": 0}
}

function end_game(){
	$("#turn_cards").hide()
	$("#turn_check").hide()
	$("#player_frame").hide()
	$("#your_cards_frame").hide()
	$("#game_end").hide()
	$("#game_start").show()
	$("#before_game").show()
}

function bot_color_set(){
	$(".number_of_cards").css({"background-color":bot_color(),"color":"white"})
	$(".card_rank").css({"background-color":bot_color(),"color":"white"})
	$(".checking_div").css({"background-color":bot_color(),"color":"white"})
}

function bot1(){
	bot = 1
	$("body").css({"background-color":bot_color()})
	bot_color_set()
}

function bot2(){
	bot = 2
	$("body").css({"background-color":bot_color()})
	bot_color_set()
}

function bot_color(){
	if (bot == 1)
		return "#000033"
	else
		return "#4d0000"
}

function number_of_cards(){
	$(".number_of_cards").css({"background-color":bot_color(),"color":"white"})
	$(event.target).css({"background-color":"white","color":"black"})
	number = parseInt($(event.target).html())
	console.log(number)
}

function card_rank(){
	$(".card_rank").css({"background-color":bot_color(),"color":"white"})
	$(event.target).css({"background-color":"white","color":"black"})
	rank = $(event.target).html()
	console.log(rank)
}

function confirm_cards(){
	$("#turn_cards").hide()
	$("#turn_check").show()
	$(".number_of_cards").css({"background-color":bot_color(),"color":"white"})
	$(".card_rank").css({"background-color":bot_color(),"color":"white"})
	thrown_cards[rank]+=number
	if (players_list[current_player] == "You"){
		player_cards[rank]-=number
	}
	game_turn()
}

function confirm_check(){
	$("#turn_check").hide()
	$("#turn_cards").show()
	current_player=(current_player+1)%players_list.length
	$("#player_name").html(players_list[current_player])
	$(".checking_div").css({"background-color":bot_color(),"color":"white"})
}

function all_of_them(){
	$("#confirm_cards").show()
	$("#player_frame").show()
	$("#adding_cards").hide()
	$("#your_cards_frame").hide()
}

function checking_inp(num){
	$(".checking_div").css({"background-color":bot_color(),"color":"white"})
	$(event.target).css({"background-color":"white","color":"black"})
	check = num
	console.log(check)
}

function game_turn(){

}