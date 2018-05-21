(function(){
  function Board(spaces) {
    this.spaces = spaces || [
      [undefined, undefined, undefined],
      [undefined, undefined, undefined],
      [undefined, undefined, undefined]
    ];
    this.result = undefined;
    this.eventHandlers = {};

  }

  Board.TIE = 'CATSGAME';
  Board.MOVE_EVENT = 'move';
  Board.PLAYER_MOVE_EVENT = 'playerMove';
 
  Board.prototype.getSpaces = function() {
    return this.spaces;
  }
  
  Board.prototype.getResult = function() {
    return this.result;
  }

  Board.prototype.checkRows = function(player) {
    for (let i = 0; i < 3; i += 1) {
      if (this.spaces[i][0] === player &&
          this.spaces[i][1] === player &&
          this.spaces[i][2] === player) {
        return true;
      }
    }
    return false;
  }
      
  Board.prototype.checkColumns = function(player) {
    for (let j = 0; j < 3; j += 1) {
      if (this.spaces[0][j] === player &&
          this.spaces[1][j] === player &&
          this.spaces[2][j] === player) {
        return true;
      }
    }
    return false;
  }
  
  Board.prototype.checkDiagonals = function(player) {
    if (this.spaces[0][0] === player &&
        this.spaces[1][1] === player &&
        this.spaces[2][2] === player) {
      return true;
    } else if (this.spaces[0][2] === player &&
        this.spaces[1][1] === player &&
        this.spaces[2][0] === player) {
      return true;
    }
    return false;
  }
  
  Board.prototype.winningTests = function(turn) {
    return this.checkRows(turn) ||
           this.checkColumns(turn) ||
           this.checkDiagonals(turn);
  }

  Board.prototype.boardFull = function() {
    for (let i = 0; i < 3; i += 1) {
      for (let j=0; j < 3; j += 1) {
        if (this.spaces[i][j] === undefined) {
          return false;
        }
      }
    }
    return true;
  }

  Board.prototype.checkForGameOver = function(turn) {
    if (this.winningTests(turn)) {
      this.result = turn;
      return;
    }

    if (this.boardFull()) {
      this.result = Board.TIE;
      return;
    }
  }

  Board.prototype.addEventListener = function(eventName, callback) {
    this.eventHandlers[eventName] = callback;
  }

  Board.prototype.dispatchEvent = function(eventName) {
    if (this.eventHandlers[eventName]) {
      this.eventHandlers[eventName]();
    }
  }

  Board.prototype.move = function(turn, row, col) {
    if (this.spaces[row][col] === undefined) {
      this.spaces[row][col] = turn;
    } else {
      return;
    }

    this.checkForGameOver(turn);
    
    this.dispatchEvent(Board.MOVE_EVENT);

    if (turn === Player.MARKER && !this.result) {
      this.dispatchEvent(Board.PLAYER_MOVE_EVENT);
    }
  }
  
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = Board;
  } else {
    window.Board = Board;
  }
})();



