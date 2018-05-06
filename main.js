$(document).ready(function() {
  const player = 'X';
  const computer = 'O';
  
  //initiate blank board at start of game
  const board = [
    ['','',''],
    ['','',''],
    ['','','']
  ];

  //check for winner
  function checkGameOver(board) {
    if (checkRows(board)) return checkRows(board);
    if (checkColumns(board)) return checkColumns(board);
    if (checkDiagonals(board)) return checkDiagonals(board);
    return boardFull(board);
  }

  //logic for computer AI using minmax algorithm
  function minmax(newBoard, depth, turn) {
    const gameOver = checkGameOver(newBoard);
    //if there are still moves left in the game
    if (gameOver === false) {
      //container for possible moves with scores
      const results = [];
      for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
          //make copy of board to avoid altering actual board
          const boardCopy = _.cloneDeep(newBoard);
          if (boardCopy[i][j] !== "") continue;
          boardCopy[i][j] = turn;
          //recursive call until you reach last possible move
          let result = minmax(boardCopy, depth + 1, turn === player ? computer : player);
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
      if (turn === computer) {
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
    } else if (gameOver === player) { // <-- player won
      return depth - 10;
    } else if (gameOver === computer) { // <-- computer won
      return 10 - depth;
    } else if (gameOver === null) { // <-- tie
      return 0;
    } 
  }

  function computerMove() {
    return minmax(board, 0, computer);
  }

  function showResult(text) {
    $('.winner-text').text(text);
    $('.game-over').css('visibility', 'visible');
  }

  $('.square').click(function() {
    //when square is clicked, change it to player symbol if it is empty
    if ($(this).html() === '') {
      $(this).html(player);
  
      //also save selection to board
      const i = $(this).data('i');
      const j = $(this).data('j');
      board[i][j] = player;
    } else {
      return;
    }

    //check if game over or computer moves
    const gameOver = checkGameOver(board); 

    if (gameOver) {
      const text = setWinText(gameOver);
      showResult(text);
    } else if(gameOver === null) {
      const text = setWinText(gameOver);
      showResult(text);
    } else {
      const move = computerMove();
      board[move.i][move.j] = computer;
      $('.square[data-i=' + move.i + '][data-j=' + move.j + ']').html(computer);

      //check for game over again
      const newCheck = checkGameOver(board);
      if (newCheck) {
        const text = setWinText(newCheck);
        showResult(text);
      }
    }
  });

  $('#restart').click(function() {
    location.reload();
  });

});