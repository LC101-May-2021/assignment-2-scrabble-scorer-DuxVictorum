// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

// Algo #2 - Traditional Scoring [WILL BE REPLACED BELOW]
function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
	let totalPoints = 0;
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			totalPoints += Number(pointValue);
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	letterPoints += `Total points for word: ${totalPoints}.\n`;
	return totalPoints;		// Used to be "return letterPoints"
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   console.log("Let's play some scrabble!\n");
   let userWord = input.question("Enter a word to score: ");
   return userWord.toLowerCase();
};

// SCORING ALGORITHMS
// Algo #0 - Simple Scoring
let simpleScore = function (word) {
	let totalPoints = word.length;
	return totalPoints;
};

// Algo #1 - Vowel Bonus Scoring
let vowelBonusScore = function (word) {
	word = word.toLowerCase();
	let vowelArr = ['a', 'e', 'i', 'o', 'u'];
	let totalPoints = 0;
	for (let i = 0; i < word.length; i++) {
		if (vowelArr.includes(word[i])) {
			totalPoints += 3;
		} else {
			totalPoints += 1;
		}
	}
	return totalPoints;
};

// Algo #2 - Traditional Scrabble Scoring [THIS REPLACES THE ONE ABOVE]
let scrabbleScore = function (word) {
	word = word.toLowerCase();
	let totalPoints = 0;
	for (let i = 0; i < word.length; i++) {
		for (letter in newPointStructure) {
			if (letter === word[i]) {
				totalPoints += newPointStructure[letter];
			}
		}
	}
	return totalPoints;	
}

// ALGORITHM OBJECTS
// Object #0
const simple = {
	name: "Simple Scoring",
	description: "Each word is 1 point",
	scorerFunction: simpleScore
};

// Object #1
const vowelBonus = {
	name: "Vowel Bonus Scoring",
	description: "Consonants are 1 point, but vowels are 3 points",
	scorerFunction: vowelBonusScore
};

// Object #2
const regular = {
	name: "Traditional Scrabble Scoring",
	description: "The traditional Scrabble method",
	scorerFunction: scrabbleScore
};

const scoringAlgorithms = [simple, vowelBonus, regular];


function scorerPrompt() {
	let scoringSelect = input.question(`\nWhich scoring method will you use?
	0 - Simple (1 pt per letter)
	1 - Vowel Bonus (1 pt per consonant, 3 pts per vowel)
	2 - Traditional Scrabble Scoring

Enter 0, 1, or 2: `);
	let scoringAlgo;
	if (scoringSelect === "0") {
		scoringAlgo = scoringAlgorithms[0];
	} else if (scoringSelect === "1") {
		scoringAlgo = scoringAlgorithms[1];
	} else if (scoringSelect === "2") {
		scoringAlgo = scoringAlgorithms[2];
	}
	return scoringAlgo;
}

function transform(oldStruct) {
	let newStruct = {};
	let letters = [];
	let pointValue;
	// Create list of letters from oldPointStructure
	for (keyNum in oldStruct) {
		for (let i = 0; i < oldStruct[keyNum].length; i++) {
			let l = oldStruct[keyNum][i].toLowerCase()
			letters.push(l);
		}
	}
	letters.sort();
	// Populate newPointStructure
	for (let i = 0; i < letters.length; i++) {
		for (keyNum in oldStruct) {
			if (oldStruct[keyNum].includes(letters[i].toUpperCase())) {
				pointValue = Number(keyNum);
			}
		}
		newStruct[letters[i]] = pointValue;
	}
	newStruct[' '] = 0;
	return newStruct;
}

let newPointStructure = transform(oldPointStructure);

function runProgram() {
   let wordToScore = initialPrompt();
   let algo = scorerPrompt();
   console.log(`\nScore for "${wordToScore}" using ${algo.name}: 
   ${algo.scorerFunction(wordToScore)} pts.`);
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

