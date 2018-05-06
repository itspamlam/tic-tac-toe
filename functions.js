(function(){
  function checkRows(board) {
    for (let i = 0; i < 3; i += 1) {
      if (board[i][0] !== '' &&
          board[i][0] === board[i][1] &&
          board[i][0] === board[i][2]) {
        return board[i][0]; // <-- return winner
      }
    }
  }
      
  function checkColumns(board) {
    for (let j = 0; j < 3; j += 1) {
      if (board[0][j] !== '' &&
          board[0][j] === board[1][j] &&
          board[0][j] === board[2][j]) {
        return board[0][j]; // <-- return winner
      }
    }
  }
  
  function checkDiagonals(board) {
    //check \ diagonal
    if (board[0][0] !== '' &&
        board[0][0] === board [1][1] &&
        board[0][0] === board [2][2]) {
      return board[0][0]; // <-- return winner
    }
  
    //check / diagonal
    if (board[0][2] !== '' &&
        board[0][2] === board [1][1] &&
        board[0][2] === board [2][0]) {
      return board[0][2]; // <-- return winner
    }
  }
  
  function boardFull(board) {
    for (let i = 0; i < 3; i += 1) {
      for (let j=0; j < 3; j += 1) {
        if (board[i][j] === '') {
          return false;
        }
      }
    }
    return null;
  }
  
  function setWinText(gameOver) {
    let text = "";
    
    if (gameOver === null) {
      text = "CAT'S GAME";
    } else if (gameOver === 'O') {
      text = "OOPS! YOU LOST.";
    } else if (gameOver === 'X') {
      text = "NOT GOING TO HAPPEN"
    }
    return text;
  }

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = { 
      checkRows: checkRows,
      checkColumns: checkColumns,
      checkDiagonals: checkDiagonals,
      boardFull: boardFull,
      setWinText: setWinText
    };
  } else {
    window.checkRows = checkRows;
    window.checkColumns = checkColumns;
    window.checkDiagonals = checkDiagonals;
    window.boardFull = boardFull;
    window.setWinText = setWinText;
  }

})();



