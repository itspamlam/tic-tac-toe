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

  Board.MOVE_EVENT = 'move';
  Board.WINNING_EVENT = 'winningMove';
  Board.TIE_EVENT = 'catsgame';
 
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

  Board.prototype.addEventListener = function(eventName, callback) {
    if (!this.eventHandlers[eventName]) {
      this.eventHandlers[eventName] = [];
    }

    this.eventHandlers[eventName].push(callback);
  }

  Board.prototype.dispatchEvent = function(eventName, data) {
    if (this.eventHandlers[eventName]) {
      this.eventHandlers[eventName].forEach(function(handler) {
        handler(data);
      });
    }
  }

  Board.prototype.move = function(turn, row, col) {
    if (this.spaces[row][col] === undefined) {
      this.spaces[row][col] = turn;
    } else {
      return;
    }
    
    if (this.winningTests(turn)) {
      this.dispatchEvent(Board.WINNING_EVENT, turn);
    } else if (this.boardFull()) {
      this.dispatchEvent(Board.TIE_EVENT);
    } else {
      this.dispatchEvent(Board.MOVE_EVENT, turn);
    }
  }
  
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = Board;
  } else {
    window.Board = Board;
  }
})();



