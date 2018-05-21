(function(){
  function Computer(board) {
    this.board = board;
    const _this = this;
    this.board.addEventListener(Board.PLAYER_MOVE_EVENT, this.makeMove.bind(this));
  }

  Computer.MARKER = 'O';

  Computer.prototype.getMove = function() {
    return minmax(this.board, 0, Computer.MARKER);
  }

  Computer.prototype.makeMove = function() {
    const move = this.getMove();
    this.board.move(Computer.MARKER, move.i, move.j);
  }

  //logic for computer AI using minmax algorithm
  function minmax(newBoard, depth, turn) {
    const gameOver = newBoard.winningTests(Computer.MARKER) ||
                     newBoard.winningTests(Player.MARKER) ||
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
                                                    Player.MARKER ?
                                                    Computer.MARKER : Player.MARKER);
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
      if (turn === Computer.MARKER) {
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
    } else if (newBoard.winningTests(Player.MARKER)) {
      return depth - 10;
    } else if (newBoard.winningTests(Computer.MARKER)) {
      return 10 - depth;
    } else {
      return 0;
    } 
  }
  

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = Computer;
  } else {
    window.Computer = Computer;
  }
})();