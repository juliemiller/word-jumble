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
	"Qu": 1,
	"J": 1,
	"Z": 1
};

var letterArray = [];

Object.keys(frequencies).forEach(function(letter) {
	for(var i = 0; i < frequencies[letter]; i++) {
		letterArray.push(letter);
	}
});

console.log(letterArray.length)