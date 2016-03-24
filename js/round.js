
function Round($el, tree) {
	this.currentWord = "";
	this.currentWordPositions = [];
	this.makingWord = false;
	this.words = [];
	this.$el = $el;
	this.tree = tree;
	this.displayWords();
}

Round.prototype.startWord = function() {
	this.makingWord = true;
	this.currentWord = "";
	this.currentWordPositions = [];
}

Round.prototype.displayWords = function() {
	var $list = $("<ul>").addClass("list");
	var $list2 = $("<ul>").addClass("list2");
	this.$el.append($list);
	this.$el.append($list2);
}

Round.prototype.endWord = function() {
	this.makingWord = false;

	if (this.currentWord.length === 0) {
	} else if (this.currentWord.length < 3 && this.currentWord.length > 0) {
		$('.messages').text("Words must be at least 3 letters long")
	} else if (this.tree.hasWord(this.currentWord)) {
		if (this.words.indexOf(this.currentWord) === -1) {
			this.words.push(this.currentWord);
			if (this.words.length < 20) {
				$list = $(".list");
			} else {
				$list = $(".list2");
			}
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
	$(".list2").empty();
	$(".list2").remove();
	this.displayWords();
	$(".messages").text("");
}

module.exports = Round;