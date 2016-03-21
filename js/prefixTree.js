
var PrefixTree = function(wordList) {
	
	// this.wordList = wordList;
	this.head = wordList;
	// this.createTree();
}

// PrefixTree.prototype.createTree = function() {
// 	for (var i = 0; i < this.wordList.length; i++) {
// 		var word = this.wordList[i];
// 		this.add(word);
// 	};
// };

PrefixTree.prototype.add = function(word) {
	var currentNode = this.head;

	for (var i = 0; i < word.length; i++) {
		if (!currentNode[word[i]]) {
			currentNode[word[i]] = {};
		}
		currentNode = currentNode[word[i]];
	};

	currentNode.$ = true;
};

PrefixTree.prototype.hasWord = function(str) {
	var word = str.toLowerCase();
	var currentNode = this.head;
	for (var i = 0; i < word.length; i++) {
		if (!currentNode[word[i]]) {
			return false;
		}
		currentNode = currentNode[word[i]];
	};
	if (currentNode.$ === undefined) {
		return false;
	}
	return currentNode.$;
};

PrefixTree.prototype.possibleWord = function(str) {
	var prefix = str.toLowerCase();
	var currentNode = this.head;
	for (var i = 0; i < prefix.length; i++) {
		if (!currentNode[prefix[i]]) {
			return false
		}
		currentNode = currentNode[prefix[i]];
	};

	return true;
};

module.exports = PrefixTree;