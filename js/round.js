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