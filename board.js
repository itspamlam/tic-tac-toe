(function(){
  function Board(spaces) {
    this.spaces = spaces || [
      [undefined, undefined, undefined],
      [undefined, undefined, undefined],
      [undefined, undefined, undefined]
    ];
    this.result = undefined;
  }

  Board.PLAYER = 'X';
  Board.COMPUTER = 'O';
  Board.TIE = 'CATSGAME';

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
  
  Board.prototype.checkForWinner = function(turn) {
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

  Board.prototype.computerMove = function() {
    return minmax(this, 0, Board.COMPUTER);
  }

  Board.prototype.playerMove = function(row, col) {
    if (this.spaces[row][col] === undefined) {
      this.spaces[row][col] = Board.PLAYER;
    } else {
      return;
    }
    
    //check if game over or computer moves
    if (this.checkForWinner(Board.PLAYER)) {
      this.result = Board.PLAYER;
      return;
    }
    
    if (this.boardFull()) {
      this.result = Board.TIE;
      return;
    }
    
    const move = this.computerMove();
    this.spaces[move.i][move.j] = Board.COMPUTER;
    
    if (this.checkForWinner(Board.COMPUTER)) {
      this.result = Board.COMPUTER;
      return;
    }
    
    if (this.boardFull()) {
      this.result = Board.TIE;
      return;
    }
  }

  //logic for computer AI using minmax algorithm
  function minmax(newBoard, depth, turn) {
    const gameOver = newBoard.checkForWinner(Board.COMPUTER) ||
                     newBoard.checkForWinner(Board.PLAYER) ||
                     newBoard.boardFull();
    //if there are still moves left in the game
    if (!gameOver) {
      //container for possible moves with scores
      const results = [];
      for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
          //make copy of board to avoid altering actual board
          const spaces = _.cloneDeep(newBoard.getSpaces());
          if (spaces[i][j] !== undefined) continue;
          spaces[i][j] = turn;
          //recursive call until you reach last possible move
          const boardCopy = new Board(spaces);
          let result = minmax(boardCopy, depth + 1, turn === 
                                                    Board.PLAYER ?
                                                    Board.COMPUTER : Board.PLAYER);
          results.push(
            { 
              score: result,
              square: {
                i: i,
                j: j
              }
            }
          );
        }
      }
      //search for max result 
      if (turn === Board.COMPUTER) {
        const max = Math.max.apply(Math,results.map(function(ele) { return ele.score;}));
        const maxDetails = results.find(function(ele) { return ele.score == max; });
        if (depth === 0) {
          return maxDetails.square;
        } else {
          return max;
        }
      } else {
        const min = Math.min.apply(Math,results.map(function(ele) { return ele.score;}));
        const minDetails = results.find(function(ele) { return ele.score == min; });
        if (depth === 0) {
          return minDetails.square;
        } else {
          return min;
        }
      }
    } else if (newBoard.checkForWinner(Board.PLAYER)) { // <-- player won
      return depth - 10;
    } else if (newBoard.checkForWinner(Board.COMPUTER)) { // <-- computer won
      return 10 - depth;
    } else { // <-- tie
      return 0;
    } 
  }
  
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = Board;
  } else {
    window.Board = Board;
  }

})();



