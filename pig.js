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

var Game = function(player_names, win_score, turn_limit) {
	this.turn_limit = turn_limit;
	this.win_score = win_score;
	this.turn_score = 0;
	this.turn_count = player_names.length;
	this.player_list = [];
	for (i = 0; i < player_names.length; i++){
		this.player_list.push( new Player(player_names[i]));
	}
	this.dice = [];
	for (i = 0; i < 2; i++){
		this.dice.push(new Di(6));
	}
	this.current_leader = this.player_list[0];
	this.current_player = this.player_list[0];
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

Game.prototype.roll = function() {
	for (i = 0; i < this.dice.length; i++) {
		this.dice[i].roll();
	}
	this.outcomes();
	return this.dice;
}

Game.prototype.end_turn = function() {
	if (this.turn_score > 0) {
		this.current_player.addScore(this.turn_score);
		this.turn_score = 0;
	}
	if (this.current_player.bankscore >= this.win_score) {
		this.declare_winner(this.current_player);
		return;
	}
	if (this.current_player.bankscore > this.current_leader.bankscore){
		this.current_leader = this.current_player;
	}
	this.is_game_over();
	return;
}


Game.prototype.is_game_over = function() {
	if (this.turn_limit === 0){
		this.declare_winner(this.current_leader);
		return true;
	}
	if (this.player_list.length < 2){
		this.declare_winner(this.player_list[0]);
		return true;
	}
	this.turn_count = (this.turn_count + 1) % this.player_list.length;
	this.turn_limit -= 1;
	this.current_player = this.player_list[this.turn_count]
	return false;
}

Game.prototype.declare_winner = function(player) {
	console.log(player.username + " is the winner!");
}

Game.prototype.drop_player = function() {
	if (this.current_player === this.player_list[this.turn_count]) {
		this.player_list.splice(this.turn_count,1)
	}
}
