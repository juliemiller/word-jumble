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

var Board = function($el, round, tree) {
	this.$el = $el;
	this.round = round;
	this.tree = tree;
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
			this.gridLetters[[i,j]] = alphabet[idx];
			var li = "<li>" + alphabet[idx] + "</li>";
			var $square = $(li).addClass("square").data("pos", [i, j]);
			$row.append($square);
		}
	}
	this.$el.append($row);
	this.solution = {};
	this.allWords = [];
	this.solveBoard();
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

Board.prototype.solveBoard = function() {
	for (var i = 0; i < 4; i++) {
		for (var j=0; j < 4; j++) {
			var path = {};
			this.buildPath(this.gridLetters[[i,j]], path, [i,j]);
		}
	}
	this.allWords = Object.keys(this.solution);
	console.log(this.allWords);
}

Board.prototype.neighbors = function(coord) {
	var neighbors = [];
	for (var i = Math.max(coord[0] - 1, 0); i < Math.min(coord[0] + 2, 4); i++) {
		for (var j = Math.max(coord[1] - 1, 0); j < Math.min(coord[1] + 2, 4); j++) {
			if (!(i === coord[0] && j === coord[1])){
				neighbors.push([i,j]);
			}
		}
	}
	return neighbors;
}

Board.prototype.buildPath = function(string_start, path, last_cell) {
	path[last_cell] = true;
	if (this.tree.hasWord(string_start) && string_start.length > 2) {
		this.solution[string_start] = true;
	}

	var neighbors = this.neighbors(last_cell);
	neighbors.forEach(function(cell) {
		var alreadySeenIndex = false;

		if (path[cell]) {
			alreadySeenIndex = true;
		}

		if (!alreadySeenIndex) {
			var new_str = string_start + this.gridLetters[cell];
			if (this.tree.possibleWord(new_str)) {
				var new_path = Object.assign({}, path);
				this.buildPath(new_str, new_path, cell);
			}
		}
	}.bind(this));
}

module.exports = Board;