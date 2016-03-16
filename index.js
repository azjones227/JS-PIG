$(document).ready(function(){
    $('.area').hide();

    var setup_DOM = function() {
        var game_template = $('#gameTemplate').html();
        var scoreboard_template = $('#scoreboardTemplate').html();
        $('#game').html(Mustache.render(game_template, {winScore: pig.win_score, remaining: pig.turn_limit, turnScore: pig.turn_score}))
        for (i = 0; i < pig.player_list.length; i++){
            $('#scoreboard').append(Mustache.render(scoreboard_template, {name: pig.player_list[i].username, score: pig.player_list[i].bankscore}))
        }
        $("#die0").attr('src', 'images/1.png');
        $("#die1").attr('src', 'images/1.png');
        $("#status").text('Welcome to PIG! Please roll the dice or click "Help" for tips on how to play.');
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
        setup_DOM();
        $('.area').fadeIn();        
    });

    $('#roll').on('click', function(event){
        event.preventDefault();
        pig.roll();
    });

    $('#end').on('click', function(event){

    });

    $('#drop').on('click', function(event){

    });

    $('#help').on('click', function(event){

    });

    toDom = {
        roll_update: function(){
        $('#die0').attr('src', 'images/' + pig.dice[0].current_value + '.png')
        $('#die1').attr('src', 'images/' + pig.dice[1].current_value + '.png')

        },
        end_update: function(){

        },
        drop_update: function(){
            
        }
    };
});