$(document).ready(function(){
    $('.area').hide();

    var to_DOM = function() {
        var game_template = $('#gameTemplate').html();
        var scoreboard_template = $('#scoreboardTemplate').html();
        $('#game').html(Mustache.render(game_template, {winScore: pig.win_score, remaining: pig.turn_limit, turnScore: pig.turn_score}))
        for (i = 0; i < pig.player_list.length; i++){
            $('#scoreboard').append(Mustache.render(scoreboard_template, {name: pig.player_list[i].username, score: pig.player_list[i].bankscore}))
        }
    };

    var currentPlayerCount = 2;
    $('#addPlayer').on('click', function(event){
        var template = $('#addPlayerTemplate').html();
        $(this).before(Mustache.render(template, {n: ++currentPlayerCount}))
    });
    
    $('form').on('submit', function(event){
        event.preventDefault();
        var players = [];
        $('input.players').each(function(index, value){
            players.push($(value).val());
        });
        var win_score = $("[name='winScore']").val();
        var turn_limit = $("[name='turnCount']").val();
        pig = new Game(players, win_score, turn_limit)
        $('form').hide();
        to_DOM();
        $('.area').fadeIn();        
    });

});