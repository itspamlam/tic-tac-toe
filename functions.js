(function(){
  function checkRows(board, player) {
    for (let i = 0; i < 3; i += 1) {
      if (board[i][0] === player &&
          board[i][1] === player &&
          board[i][2] === player) {
        return true;
      }
    }
    return false;
  }
      
  function checkColumns(board, player) {
    for (let j = 0; j < 3; j += 1) {
      if (board[0][j] === player &&
          board[1][j] === player &&
          board[2][j] === player) {
        return true;
      }
    }
    return false;
  }
  
  function checkDiagonals(board, player) {
    if (board[0][0] === player &&
        board[1][1] === player &&
        board[2][2] === player) {
      return true;
    } else if (board[0][2] === player &&
        board[1][1] === player &&
        board[2][0] === player) {
      return true;
    }
    return false;
  }
  
  function boardFull(board) {
    for (let i = 0; i < 3; i += 1) {
      for (let j=0; j < 3; j += 1) {
        if (board[i][j] === undefined) {
          return false;
        }
      }
    }
    return true;
  }

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = { 
      checkRows: checkRows,
      checkColumns: checkColumns,
      checkDiagonals: checkDiagonals,
      boardFull: boardFull
    };
  } else {
    window.checkRows = checkRows;
    window.checkColumns = checkColumns;
    window.checkDiagonals = checkDiagonals;
    window.boardFull = boardFull;
  }

})();



