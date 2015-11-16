var Di = function(sides) {
	this.sides = sides;
	this.current_value = 0;
}

Di.prototype.roll = function() {
	this.current_value = Math.floor(Math.random() * (this.sides - 1)) + 1;
	return this.current_value;
}

var Player = function(name) {
	this.username = name;
	this.bankscore = 0;
}

Player.prototype.addScore = function(turn_score) {
	this.bankscore = this.bankscore + turn_score;
	return this.bankscore;	
}

Player.prototype.pig = function() {
	this.bankscore = 0;
	return this.bankscore;
}

var Game = function() {
	this.turn_limit;
	this.win_score;
	this.turn_score = 0;
	this.turn_count = 0;
	this.player_list = [];
	this.dice = [];
	this.current_leader;
	this.current_player;
}

Game.prototype.outcomes = function() {
	if ((this.dice[0].current_value === 1) && (this.dice[1].current_value === 1)) {
		console.log('double pig')
		this.player_list[this.turn_count].pig();
		this.end_turn(); 
	} else if ((this.dice[0].current_value === 1) || (this.dice[1].current_value === 1)) {
		console.log('pig')
		this.turn_score = 0;
		this.end_turn(); 
	} else if (this.dice[0].current_value === this.dice[1].current_value) {
		console.log('doubles')
		this.turn_score += (this.dice[0].current_value + this.dice[1].current_value);
		this.roll();
	} else {
		console.log('turn score increased')
		this.turn_score += (this.dice[0].current_value + this.dice[1].current_value);
	}

}

Game.prototype.start = function(no_of_players, player_names, win_score, turn_limit) {
	this.turn_limit = turn_limit;
	this.win_score = win_score;
	for (i = 0; i < no_of_players; i++){
		this.player_list.push( new Player(player_names[i]));
	}
	for (i = 0; i < 2; i++){
		this.dice.push(new Di(6));
	}
	return this;
}

Game.prototype.roll = function() {
	for (i = 0; i < this.dice.length; i++) {
		this.dice[i].roll();
	}
	return this.dice;
}

Game.prototype.end_turn = function() {
	if (this.turn_score > 0) {
		current_player.addScore(this.turn_score);
		this.turn_score = 0;
	}
	if (current_player.bankscore >= this.win_score) {
		this.declare_winner(current_player);
		return;
	}
	if (current_player.bankscore > current_leader.bankscore){
		current_leader = current_player;
	}
	this.is_game_over();
	return;
}


Game.prototype.is_game_over = function() {
	if (this.turn_limit === 0){
		this.declare_winner(current_leader);
		return true;
	}
	if (this.player_list.length < 2){
		this.declare_winner(this.player_list[0]);
		return true;
	}
	this.turn_count = (this.turn_count + 1) % this.player_list.length;
	this.turn_limit -= 1;
	this.current_player = player_list[this.turn_count]
	return false;
}