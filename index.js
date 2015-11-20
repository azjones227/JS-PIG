var myGame;

$(document).ready(function(){
	$('#new').on('click', '.add', function(event){
		event.preventDefault();
    	$("input").after('<label>Player</label> <input class="player" type="text" />');
    });
    $('#new').on('click', 'submit', function(event) {
    	event.preventDefault():
    });
});