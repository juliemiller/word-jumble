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