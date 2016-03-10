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



module.exports = Board;