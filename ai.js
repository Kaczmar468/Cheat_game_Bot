$("#game_end").hide()
$("#rules").hide()
$("#player_frame").hide()
$("#turn_cards").hide()
$("#adding_cards").hide()
$("#turn_check").hide()
$("#your_cards_frame").hide()

var players_divs = 1, cards_divs = 0, current_player = 0, players_list
var bot = 1
var number = 0, rank = 0, cards, check = 0, prev_rank = 2, stack_height = 0, initial_amount = 0
var player_cards, thrown_cards, players_info = new Object(), player_board_info

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
	var after_content = "</p><div class='player_button' onclick='remove_cards(cards" + cards_divs + ",  &quot;" + rank + "&quot;, " + number + ")'><p>Remove</p></div><div class='clear_both'></div></div>";
	$("#your_cards").append(before_content + number + " cards of rank " + rank + after_content)
	cards_divs++
	player_cards[rank]+=number
	player_board_info[rank]+=number
	console.log(player_cards)
}

function move_up(playerid){
	$(playerid).insertBefore($(playerid).prev())
}

function move_down(playerid){
	$(playerid).insertAfter($(playerid).next())
}

function remove_player(playerid){
	$(playerid).remove()
}

function remove_cards(cardsid, r_rank, r_number){
	$(cardsid).remove()
	player_cards[r_rank] -= r_number
	player_board_info[r_rank] -= r_number
}

function example(){
	//remember to add sleep and comments in html
	$("#input").val("Roma")
	add_player()
	$("#input").val("Ala")
	add_player()
	start_game()
	rank = 3
	number = 2
	add_cards()
	rank = 7
	number = 3
	add_cards()
	rank = 8
	number = 2
	add_cards()
	rank = 10
	number = 2
	add_cards()
	rank = "K"
	number = 3
	add_cards()
	rank = "A"
	number = 1
	add_cards()
	all_of_them()
	/*number = 2
	rank = 3
	confirm_cards()*/
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
	player_board_info = {2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, "J": 0, "Q": 0, "K": 0, "A": 0}
	thrown_cards = {2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, "J": 0, "Q": 0, "K": 0, "A": 0}
	players_info_div = $("#input_info").val()
	if (players_info_div == ""){
		for (var i = 0; i < players_list.length; i++)
			players_info[ players_list[ i ] ] = {
				"turns": 0,
				"times_checked": 0,
				"times_lied": 0
			}
	}else{
		var input_data = $("#input_info").val().split(";")
		for (var piece of input_data){
			piece = piece.split(":")
			name = piece[0]
			piece = piece[1].split(",")
			players_info[name] = new Object()
			for (var attr of piece){
				var splitted = attr.split(".")
				console.log(players_info, name, attr)
				players_info[name][splitted[0]] = parseInt(splitted[1])
			}
		}
		for (var i = 0; i < players_list.length; i++)
			if (! (players_list[ i ] in players_info))
				players_info[ players_list[ i ] ] = {
					"turns": 0,
					"times_checked": 0,
					"times_lied": 0
				}
	}
	prev_rank = 2
	check = stack_height = initial_amount = 0
}

function end_game(){
	$("#turn_cards").hide()
	$("#turn_check").hide()
	$("#player_frame").hide()
	$("#your_cards_frame").hide()
	$("#game_end").hide()
	$("#game_start").show()
	$("#before_game").show()
	var players_info_formatted = ""
	for (const [player, info] of Object.entries(players_info)){
		players_info_formatted += player + ":" 
		for (const [key, value] of Object.entries(info)){
			players_info_formatted += key + "." + value + "," 
		}
		players_info_formatted = players_info_formatted.substr(0,players_info_formatted.length-1) + ";"
	}
	$("#input_info").val(players_info_formatted.substr(0,players_info_formatted.length-1))
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
	stack_height += number
	game_turn()
	prev_rank = rank
}

function confirm_check(){
	$(".checking_div").css({"background-color":bot_color(),"color":"white"})
	players_info[ players_list[ current_player ] ][ "turns" ] += 1
	if (check >= 1)
		players_info[ players_list[ current_player ] ][ "times_checked" ] += 1
	if (check == 2){
		thrown_cards = {2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, "J": 0, "Q": 0, "K": 0, "A": 0}
		stack_height = 0
		players_info[ players_list[ current_player ] ][ "times_lied" ] += 1
		prev_rank = 2
		if (players_list[current_player] == "You"){
			$("#turn_check").hide()
			$("#confirm_cards").hide()
			$("#turn_cards").show()
			$("#adding_cards").show()
			$("#your_cards_frame").show()
			return
		}else{
			for (const [key, value] of Object.entries(player_cards))
				player_board_info[key] = value
		}
	}

	current_player = (current_player + 1) % players_list.length
	$("#player_name").html(players_list[ current_player ])
	if (players_list[current_player] == "You"){
		game_turn()
	}else{
		$("#turn_check").hide()
		$("#turn_cards").show()		
	}
}

function all_of_them(){
	$("#confirm_cards").show()
	$("#player_frame").show()
	$("#adding_cards").hide()
	$("#your_cards_frame").hide()
	$("#your_cards").html("")
	$(".number_of_cards").css({"background-color":bot_color(),"color":"white"})
	$(".card_rank").css({"background-color":bot_color(),"color":"white"})
	if (check == 0){
		for (const [key, value] of Object.entries(player_cards))
				initial_amount += value
	}
	if (players_list[current_player] == "You"){
		if (check == 0){
			$("#turn_cards").hide()
			$("#turn_check").show()
			game_turn()
		}else{
			$("#turn_check").hide()
			$("#turn_cards").show()
			current_player = (current_player + 1) % players_list.length
			$("#player_name").html(players_list[ current_player ])
		}
	}
}

function checking_inp(num){
	$(".checking_div").css({"background-color":bot_color(),"color":"white"})
	$(event.target).css({"background-color":"white","color":"black"})
	check = num
	console.log(check)
}

function rank_to_num(r){
	switch(r){
		case "A":
			return 14
		case "K":
			return 13
		case "Q":
			return 12
		case "J":
			return 11
		default:
			return r
	}
}

function num_to_rank(n){
	switch(n){
		case 14:
			return "A"
		case 13:
			return "K"
		case 12:
			return "Q"
		case 11:
			return "J"
		default:
			return n
	}
}


function lowest_possible(){
	for (var i = rank_to_num(prev_rank); i <= 14; i++)
		if (player_cards[ num_to_rank(i) ] > 0)
			return num_to_rank(i)
	for (var i = 2; i <= 14; i++)
		if (player_cards[ num_to_rank(i) ] > 0)
			return num_to_rank(i)
	return false
}


function game_turn(){
	if (players_list[current_player] == "You"){
		var thrown_rank = lowest_possible(), lie = 0
		var thrown_number = player_cards[thrown_rank]
		if (rank_to_num(thrown_rank) < rank_to_num(prev_rank)){
			thrown_number = Math.min(thrown_number, 2)
			lie = 1
		}
		console.log(thrown_rank, thrown_number, lie)
		// THROWNIG
		if (bot == 1){
			$("#bot_log").html("You should throw " + thrown_number + " cards of rank " + thrown_rank)
			player_cards[thrown_rank] -= thrown_number
			stack_height += thrown_number
		}else{
			if (lie == 0 && player_cards[ num_to_rank(rank_to_num(thrown_rank) + 1) ] > thrown_number){
				thrown_rank = num_to_rank(rank_to_num(thrown_rank) + 1)
				thrown_number = player_cards[thrown_rank]
			}
			if (lie == 1 && thrown_number == 1 && (Math.random() > 0.55 || stack_height < 10)){
				for (var i = rank_to_num(thrown_rank) + 1; i <= 14; i++)
					if (player_cards[ num_to_rank(i) ] > 0){
						$("#bot_log").html("You should throw 1 card of rank " + thrown_rank + " and 1 card of rank " + num_to_rank(i))
						player_cards[ thrown_rank ] -= 1
						player_cards[ num_to_rank(i) ] -= 1
						return
					}
			}
			player_cards[thrown_rank] -= thrown_number
			$("#bot_log").html("You should throw " + thrown_number + " cards of rank " + thrown_rank)
		}
	}else{
		// CHECKING
		// OBVIOUS LIE
		if (number + player_board_info[rank] > 4){
			$("#bot_log").html(players_list[current_player] + " lies for 100%")
			return		
		}
		if(bot == 1){
			$("#bot_log").html("You shouldn't check " + players_list[current_player])
			return
		}
		var name = players_list[ current_player ]
		var cur_amount = 0
		for (const [key, value] of Object.entries(player_cards))
			cur_amount += value
		var p = players_info[ name ][ "times_lied" ]/players_info[ name ][ "times_checked" ]
		var confidence = players_info[ name ][ "turns" ]
		var cur_player_info = ". Player lied in " + p + " of previous " + confidence + " turns and " + players_info[ name ][ "times_checked" ] +  " checks."
		if (players_info[ name ][ "times_checked" ] == 0)
			cur_player_info = "."
		if (stack_height < 8 && cur_amount < initial_amount && confidence > 15 && p > 0.7 && player_board_info[ rank ] + thrown_cards[ rank ] >= 3){
			$("#bot_log").html("You may want to check " + name + cur_player_info )
			return
		}
		$("#bot_log").html("You shouldn't check " + players_list[current_player] + cur_player_info)
	}
}
