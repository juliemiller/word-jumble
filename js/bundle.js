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

	var Game = __webpack_require__(1);
	
	$(function() {
		var $board = $("#board");
		var $game = $("#game");
		new Game($game);
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Timer = __webpack_require__(2);
	var Board = __webpack_require__(3);
	var Round = __webpack_require__(7);
	
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
			$(".row li").empty().removeClass("gameOver");
			setTimeout(function(){$(".square").addClass("flip")},0);		
			this.round.reset();
			$(".row li").addClass("playing");
			setTimeout(function(){this.board.createGrid()}.bind(this), 1000);
			this.bindEvents();
		}
		this.timer.toggleButton();
	}
	
	Game.prototype.startWord = function(e) {
		e.preventDefault();
		this.board.startWord(e);
		$(".messages").text("")
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
		$(".square").addClass("gameOver");
		var score = "Game Over! Total Points: " + this.round.calculateScore();
		$(".messages").text(score)
	}
	
	Game.prototype.unbindEvents = function() {
		this.$el.off("mousedown", ".square");
		this.$el.off("mouseup", ".square");
		this.$el.off("mouseenter", ".square");
		this.$el.off("mouseleave", ".row");
	}
	
	module.exports = Game;
	


/***/ },
/* 2 */
/***/ function(module, exports) {

	var Timer= function($el, gameOverCallback) {
		this.gameOverCallback = gameOverCallback;
		this.seconds = 60;
		this.$el = $el;
		this.timing = false;
	
		this.display();
	}
	
	Timer.prototype.display = function() {
		startButton = "<button>Start Game</button>"
		if (this.seconds === 60) {
			var seconds = "1:00";
		}
		if (this.seconds < 60) {
			var seconds = "0:"+ this.seconds;
		} else if (this.seconds < 10) {
			var seconds = "0:0" + this.seconds;
		}
		timer = "<span> Time: " + seconds +"</span>"
		var $timer = $(timer).addClass("timer");
		var $button = $(startButton).addClass("startButton");
		this.$el.append($timer);
		this.$el.append($button);
	}
	
	Timer.prototype.start = function() {
		this.timing = true;
		this.interval = setInterval(this.tick.bind(this), 1000)
		$('.startButton').text("Reset Game")
	}
	
	Timer.prototype.stop = function() {
		this.timing = false;
		this.gameOverCallback();
		clearInterval(this.interval);
		$(".timer").removeClass("runningOutOfTime")
		this.seconds = 60;
		$('.startButton').text("Start Game")
		this.updateTimer();
	}
	
	Timer.prototype.tick = function() {
		this.decrementSeconds();
		if (this.seconds === 10) {
			$(".timer").addClass("runningOutOfTime")
		} else if (this.seconds === 0) {
			this.stop();
		}
		this.updateTimer();
	}
	
	Timer.prototype.updateTimer = function() {
		var $timer = $(".timer");
		if (this.seconds === 60) {
			var seconds = "Time: 1:00";
		} else if (this.seconds < 10) {
			var seconds = "Time: 0:0"+ this.seconds;
		} else if (this.seconds < 60) {
			var seconds = "Time: 0:" + this.seconds;
		}
		$timer.text(seconds);
	}
	
	Timer.prototype.toggleButton = function() {
		if (this.timing) {
			this.stop();
		} else {
			this.start();
		}
	}
	
	Timer.prototype.decrementSeconds = function() {
		this.seconds -= 1;
	}
	
	module.exports = Timer;

/***/ },
/* 3 */
/***/ function(module, exports) {

	var frequencies = { 
		"E": 120,
		"T": 91,
		"A": 81,
		"O": 76,
		"I": 73,
		"N": 69,
		"S": 62,
		"R": 60,
		"H": 59,
		"D": 43,
		"L": 39,
		"U": 28,
		"C": 27,
		"M": 26,
		"F": 23,
		"Y": 21,
		"W": 20,
		"G": 20,
		"P": 18,
		"B": 14,
		"V": 11,
		"K": 6,
		"X": 1,
		"Q": 1,
		"J": 1,
		"Z": 1
	};
	
	var alphabet = [];
	
	Object.keys(frequencies).forEach(function(letter) {
		for(var i = 0; i < frequencies[letter]; i++) {
			alphabet.push(letter);
		}
	});
	
	var Board = function($el, round) {
		this.$el = $el;
		this.round = round;
		this.createGrid();
	};
	
	Board.prototype.createGrid = function() {
		$(".row").empty();
		$(".row").remove();
		this.gridLetters = {};
		var $row = $("<ul>").addClass("row");
		for (var i = 0; i < 4; i ++) {
			for (var j = 0; j < 4; j ++) {
				var idx = Math.round(Math.random() * 990);
				if (this.gridLetters[alphabet[idx]] === undefined) {
					this.gridLetters[alphabet[idx]] = [[i, j]];
				} else {
					this.gridLetters[alphabet[idx]].push([i, j]);
				}
				var li = "<li>" + alphabet[idx] + "</li>";
				var $square = $(li).addClass("square").data("pos", [i, j]);
				$row.append($square);
			}
		}
		this.$el.append($row);
	}
	
	Board.prototype.startWord = function(e) {
		this.round.startWord();
		this.addLetters(e);
	}
	
	Board.prototype.endWord = function() {
		this.round.endWord();
		$(".square").removeClass("selected");
	}
	
	Board.prototype.addLetters = function(e) {
		if (this.round.makingWord) {
			var $sq = $(e.currentTarget)
			var letterLocation = $sq.data("pos");
			$sq.addClass("selected");
			var currentX = letterLocation[0];
			var currentY = letterLocation[1];
			if (this.round.currentWordPositions.length > 0) {
				var lastX = this.round.currentWordPositions[this.round.currentWord.length-1][0];
				var lastY = this.round.currentWordPositions[this.round.currentWord.length-1][1];
			}
			if (this.round.currentWordPositions.length > 0 && (Math.abs(currentX-lastX) > 1 || Math.abs(currentY-lastY) > 1)) {
				$(".messages").text("Letters must be adjacent to form a word!");
				this.round.currentWord = "";
				this.endWord();
			} else if (this.round.currentWordPositions.indexOf(letterLocation) === -1) {
				this.round.currentWord += e.currentTarget.innerHTML;
				this.round.currentWordPositions.push(letterLocation);
			} else {
				$(".messages").text("You can only use each tile once in a word.");
				this.round.currentWord = "";
				this.endWord();
			}
		}
	
	}
	
	Board.prototype.rotateBoard = function() {
		for (var i = 0; i < 4; i ++) {
			for (var j = 0; j< 4; j ++) {
				
			}
		}
	}
	
	
	
	module.exports = Board;

/***/ },
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */
/***/ function(module, exports) {

	
	function Round($el) {
		this.currentWord = "";
		this.currentWordPositions = [];
		this.makingWord = false;
		this.words = [];
		this.$el = $el;
	
		this.displayWords();
	}
	
	Round.prototype.startWord = function() {
		this.makingWord = true;
		this.currentWord = "";
		this.currentWordPositions = [];
	}
	
	Round.prototype.displayWords = function() {
		var $list = $("<ul>").addClass("list")
		this.$el.append($list);
	}
	
	Round.prototype.endWord = function() {
		this.makingWord = false;
		if (this.currentWord.length === 0) {
		} else if (this.currentWord.length < 3 && this.currentWord.length > 0) {
			$('.messages').text("Words must be at least 3 letters long")
		} else if (Word_List.isInList(this.currentWord)) {
			if (this.words.indexOf(this.currentWord) === -1) {
				this.words.push(this.currentWord);
				$list = $(".list");
				var $word = "<li>" + this.currentWord + "</li>";
				$list.append($word);
			} else {
				$('.messages').text("You already found that word!")
			}	
		} else {
			$(".messages").text("Word not in dictionary");
		}
		this.currentWord = "";
	}
	
	Round.prototype.creatingWord = function() {
		return this.makingWord;
	}
	
	Round.prototype.calculateScore = function() {
		var points = 0;
		this.words.forEach(function(word) {
			if (word.length <= 4) {
				points += 1;
			} else if (word.length === 5) {
				points += 2
			} else if (word.length === 6) {
				points += 3
			} else if (word.length === 7) {
				points += 5
			} else if (word.length > 8) {
				points += 11;
			}
		})
		return points;
	}
	
	Round.prototype.reset = function() {
		this.words = [];
		this.currentWord = "";
		$(".list").empty();
		$(".list").remove();
		this.displayWords();
		$(".messages").text("");
	}
	
	module.exports = Round;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map