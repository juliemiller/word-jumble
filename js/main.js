var Game = require('./game.js');

$(function() {
	var $board = $("#board");
	var $game = $("#game");
	new Game($game);
});
