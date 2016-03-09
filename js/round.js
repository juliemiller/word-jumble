
function Round($el, timer) {
	this.currentWord = "";
	this.currentWordPositions = [];
	this.makingWord = false;
	this.words = [];
	this.$el = $el;
	this.timer = timer;

	this.displayWords();
}

Round.prototype.endRound = function() {

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
	if (this.currentWord.length < 3) {

	} else if (Word_List.isInList(this.currentWord)) {
		if (this.words.indexOf(this.currentWord) === -1) {
			this.words.push(this.currentWord);
			$list = $(".list");
			var $word = "<li>" + this.currentWord + "</li>";
			$list.append($word);
		}	
	} else {
		console.log("NOT A WORD");
	}
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
	console.log(points);
	return points;
}

Round.prototype.reset = function() {
	this.words = [];
}
module.exports = Round;