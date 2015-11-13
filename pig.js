var di = function(sides) {
	this.sides = sides;
}

di.prototype.roll = function() {
	return Math.floor(Math.random() * (this.sides - 1)) + 1;
}

var player = function(name) {
	this.username = name;
	this.bankscore = 0;
}

player.prototype.addScore = function(turn_score) {
	this.bankscore = this.bankscore + turn_score;
	return this.bankscore;	
}

player.prototype.pig = function() {
	this.bankscore = 0;
	return this.bankscore;
}

var game = function() {
	this.turn_limit;
	this.win_score;
	this.turn_score = 0;
	this.turn_count = 0;
	this.player_list = [];
	this.dice = [];
}

/*game.prototype.outcomes = function() {
	if (this.dice[0].roll === 1 and this.dice[1].roll === 1){
		current_player
	}
}*/

game.prototype.start = function(no_of_players, player_names, win_score, turn_limit) {
	this.turn_limit = turn_limit;
	this.win_score = win_score;
	for (i = 0; i < no_of_players; i++){
		this.player_list.push( new player(player_names[i]));
	}
	for (i = 0; i < 2; i++){
		this.dice.push(new di(6));
	}
	return this;
}
