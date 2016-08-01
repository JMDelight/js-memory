(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function Game() {
  this.gameState = 8000000000000;
  this.shuffledGame = "8aabbccddeeff";
}

Game.prototype.guess = function(guessSquare) {
  if(this.gameState.toString().charAt(guessSquare) === "0") {
    this.gameState += Math.pow(10, 12 - guessSquare);
    var gameStateString = this.gameState.toString();
    var revealedGuesses = gameStateString.replace(/[^1]/, "").length;
    if (revealedGuesses === 2) {
      var guess1 = gameStateString.indexOf("1");
      var guess2 = gameStateString.indexOf("1", guess1 + 1);
      if (shuffledGame.charAt(guess1) === shuffledGame.charAt(guess2)) {
        this.gameState = this.gameState + Math.pow(10, guess1) + Math.Pow(10, guess2);
      } else {
        this.gameState = this.gameState - Math.pow(10, guess1) - Math.Pow(10, guess2);
      }

    }

  }
};

exports.gameModule = Game;

},{}],2:[function(require,module,exports){
var Game = require("./../js/game.js").gameModule;

// $(document).ready(function() {
  var currentGame = new Game();

  var canvas = document.getElementById('game-board');
  var draw = canvas.getContext('2d');

  var drawGame = function(passedGame) {
    var imageToDraw = 1
    passedGameStateString = passedGame.gameState.toString();
    draw.clearRect(0,0, canvas.width, canvas.height);
    draw.fillStyle = "#000";
    draw.strokeStyle = "#fff";
    draw.font = "50px Arial";
    for(var x = 0; x < 4; x++) {
      for(var y = 0; y < 3; y++) {
        if (passedGameStateString.charAt(imageToDraw) === 0) {
          draw.fillRect(x*200, y*200, 200, 200)
          draw.strokeRect(x*200, y*200, 200, 200)
        } else {
          draw.strokeText(passedGame.shuffledGame.charAt(imageToDraw), x*200, y*200);
        }
        imageToDraw ++;
      }
    }
  };

  var clickPlacer = function(x, y) {
    var clickValue = 1;
    clickValue += x / 200;
    clickValue += (y / 200) * 4;
    currentGame.guess(clickValue);
    drawGame(currentGame);
  };

  var getPosition = function(event) {
    var x = event.x;
    var y = event.y;
    x -= canvas.offsetLeft;
    y -= canvas.offsetTop;
    clickPlacer(x, y);
  };

  drawGame(currentGame);
  canvas.addEventListener("mousedown", getPosition, false);

// });

},{"./../js/game.js":1}]},{},[2]);
