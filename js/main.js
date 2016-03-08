var Board = require("./board.js");
var Round = require('./round.js');

$(function() {
	var $game = $("#game");
	var round = new Round();
	new Board($game, round);
});