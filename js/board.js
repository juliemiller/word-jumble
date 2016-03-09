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
	var $row = $("<ul>").addClass("row");
	for (var i = 0; i < 4; i ++) {
		for (var j = 0; j < 4; j ++) {
			var idx = Math.round(Math.random() * 990);
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
	this.$el.on("mouseleave", ".row", this.endWord.bind(this));
}

Board.prototype.startWord = function(e) {
	this.round.startWord();
	this.addLetters(e);
}

Board.prototype.endWord = function(e) {
	this.round.endWord();
	$(".square").removeClass("selected");
}

Board.prototype.addLetters = function(e) {
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
			$(".messages").text("You can only use each tile once in a word.");
			this.round.currentWord = "";
			this.endWord();
		}
	}
}


module.exports = Board;