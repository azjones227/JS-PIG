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
	this.status = 0;
	this.message = ["Please roll the dice.", "Double Pig! Your score is reset. Turn Over.", "Pig! Turn score reset.", "Doubles! Please roll again.", "Turn score increased.", ""]
}

Game.prototype.outcomes = function() {
	if ((this.dice[0].current_value === 1) && (this.dice[1].current_value === 1)) {
		this.status = 1;
		this.player_list[this.turn_count].pig(); 
	} else if ((this.dice[0].current_value === 1) || (this.dice[1].current_value === 1)) {
		this.status = 2;
		this.turn_score = 0; 
	} else if (this.dice[0].current_value === this.dice[1].current_value) {
		this.status = 3;
		this.turn_score += (this.dice[0].current_value + this.dice[1].current_value);
	} else {
		this.status = 4;
		this.turn_score += (this.dice[0].current_value + this.dice[1].current_value);
	}

}

Game.prototype.roll = function() {
	if ((this.status === 1) || (this.status === 2) || (this.status === 5)){
		return
	} else {
		for (i = 0; i < this.dice.length; i++) {
			this.dice[i].roll();
		}
		this.outcomes();
		return this.dice;
	}
}

Game.prototype.end_turn = function() {
	if ((this.status === 0) || (this.status === 3) || (this.status === 5)){
		return
	}
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
		this.status = 5;
		this.declare_winner(this.current_leader);
	}
	if (this.player_list.length < 2){
		this.status = 5;
		this.declare_winner(this.player_list[0]);
	}
	this.turn_count = (this.turn_count + 1) % this.player_list.length;
	this.turn_limit -= 1;
	this.current_player = this.player_list[this.turn_count]
	this.status = 0;
	return;
}

Game.prototype.declare_winner = function(player) {
	this.message[5] = player.username + " is the winner! Game Over.";
}

Game.prototype.drop_player = function() {
	if (this.current_player === this.player_list[this.turn_count]) {
		this.player_list.splice(this.turn_count,1);
		this.is_game_over();
	}
	return;
}
