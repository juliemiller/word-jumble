/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/js/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Board = __webpack_require__(1);
	var Round = __webpack_require__(2);
	
	$(function() {
		var $game = $("#game");
		var round = new Round();
		new Board($game, round);
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	var alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
	 								"N", "O", "P", "Qu", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
	
	var Board = function($el, round) {
		this.$el = $el;
		this.round = round;
		this.createGrid();
		this.bindEvents();
	};
	
	Board.prototype.createGrid = function() {
		var $row = $("<ul>").addClass("row");
		for (var i = 0; i < 4; i ++) {
			for (var j = 0; j < 4; j ++) {
				var idx = Math.floor(Math.random() * 25);
				var li = "<li>" + alphabet[idx] + "</li>";
				var $square = $(li).addClass("square").data("pos", [i, j]);
				$row.append($square);
			}
		}
		this.$el.append($row);		
	}
	
	Board.prototype.bindEvents = function() {
		this.$el.on("mousedown", ".square", this.startWord.bind(this));
		this.$el.on("mouseup", ".square", this.endWord.bind(this));
		this.$el.on("mouseenter", ".square", this.addLetters.bind(this));
	}
	
	Board.prototype.startWord = function(e) {
		e.preventDefault();
		this.round.startWord();
		this.addLetters(e);
		console.log("starting word");
	}
	
	Board.prototype.endWord = function(e) {
		e.preventDefault();
		this.round.endWord();
		$(".square").removeClass("selected")
		console.log(this.round.words);
	}
	
	Board.prototype.addLetters = function(e) {
		e.preventDefault();
		if (this.round.makingWord) {
			var $sq = $(e.currentTarget)
			var letterLocation = $sq.data("pos");
			$sq.addClass("selected");
			console.log(this.round.currentWordPositions);
			if (this.round.currentWordPositions.indexOf(letterLocation) === -1) {
				this.round.currentWord += e.currentTarget.innerHTML;
				this.round.currentWordPositions.push(letterLocation);
				console.log(this.round.currentWord);
			} else {
				console.log("ALREADY CLICKED THERE")
			}
		}
	}
	
	
	module.exports = Board;

/***/ },
/* 2 */
/***/ function(module, exports) {

	// var wordList = require('word-list-json');
	
	function Round() {
		this.currentWord = "";
		this.currentWordPositions = [];
		this.makingWord = false;
		this.words = [];
	}
	
	Round.prototype.startWord = function() {
		this.makingWord = true;
		this.currentWord = "";
		this.currentWordPositions = [];
	}
	
	Round.prototype.endWord = function() {
		this.makingWord = false;
		if (words.indexOf(this.currentWord) !== -1 ) {
			console.log("IN DICTIONARY");
			if (this.words.indexOf(this.currentWord) === -1) {
				this.words.push(this.currentWord);
			}	
		} else {
			console.log("NOT A WORD");
		}
		
	}
	
	Round.prototype.creatingWord = function() {
		return this.makingWord;
	}
	
	Round.prototype.reset = function() {
		this.words = [];
	}
	module.exports = Round;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map