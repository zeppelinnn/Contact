function Game(){
	this.id = '123123'
	this.players = {};
	this.state = 'pregame';

	this.time = 0;
	this.currentWord = [];
	this.lettersFound = 1;

	this.currentPlayer = undefined;
	this.currentQuestion = undefined;
}

Game.prototype.update = function (){}
Game.prototype.draw = function () {}
Game.prototype.addPlayer = function () {}
Game.prototype.removePlayer = function () {}

Game.prototype.validWord = function (word) {}
Game.prototype.startGame = function (){}
Game.prototype.startTurn = function (player) {}
Game.prototype.endTurn = function () {}

// Return true if the game has ended
Game.prototype.checkWin = function (){}
// Start and end the timer 
Game.prototype.startTimer = function () {}
Game.prototype.stopTimer = function () {}

Game.prototype.endGame = function () {}

function Player(){
	this.playerId = '123';
	this.name = 'Anon';
	this.displayName = 'Display';
	this.currentGuess = [];
	this.playerWord = '';
	this.question = '';
}

Player.prototype.askQuestion = function () {}
Player.prototype.answerQuestion = function () {}
Player.prototype.guessWord = function () {}











