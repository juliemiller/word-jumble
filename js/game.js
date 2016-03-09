var Timer = require('./timer.js');
var Board = require("./board.js");
var Round = require('./round.js');

var Game = function($el) {
	this.$el = $el;
	var $timer = $("#navbar");
	var $board = $("#board");
	var $wordList = $("#words");

	this.round = new Round($wordList);
	this.timer = new Timer($timer, this.gameOver.bind(this));
	this.board = new Board($board, this.round)

	this.$el.on("click", ".startButton", this.toggleGame.bind(this));
}

Game.prototype.bindEvents = function() {
	this.$el.on("mousedown", ".square", this.startWord.bind(this));
	this.$el.on("mouseup", ".square", this.endWord.bind(this));
	this.$el.on("mouseenter", ".square", this.addLetters.bind(this));
	this.$el.on("mouseleave", ".row", this.endWord.bind(this));
}

Game.prototype.toggleGame = function(e) {
	e.preventDefault();

	if(this.timer.timing === false) {
		this.round.reset();
	}
	this.timer.toggleButton();

	this.board.createGrid();
	this.bindEvents();
}

Game.prototype.startWord = function(e) {
	e.preventDefault();
	this.board.startWord(e);
}

Game.prototype.endWord = function(e) {
	e.preventDefault();
	this.board.endWord();
}

Game.prototype.addLetters = function(e) {
	e.preventDefault();
	this.board.addLetters(e);
}

Game.prototype.gameOver = function() {
	this.unbindEvents();
	var score = this.round.calculateScore();
	console.log(score);
}

Game.prototype.unbindEvents = function() {
	this.$el.off("mousedown", ".square");
	this.$el.off("mouseup", ".square");
	this.$el.off("mouseenter", ".square");
	this.$el.off("mouseleave", ".row");
}

module.exports = Game;

