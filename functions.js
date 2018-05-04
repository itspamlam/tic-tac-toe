function checkRows(board) {
  for (let i = 0; i < 3; i += 1) {
    if (board[i][0] !== '' &&
        board[i][0] === board[i][1] &&
        board[i][0] === board[i][2]) {
        return board[i][0]; // <-- return winner
    }
  }
  return null;
}

function checkColumns(board) {
  for (let j = 0; j < 3; j += 1) {
    if (board[0][j] !== '' &&
        board[0][j] === board[1][j] &&
        board[0][j] === board[2][j]) {
        return board[0][j]; // <-- return winner
    }
  }
  return null;
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

  return null;
}

module.exports = {checkRows: checkRows, checkColumns: checkColumns, checkDiagonals: checkDiagonals};