$(document).ready(function() {
  const player = 'X';
  const computer = 'O';
  const tie = 'CATSGAME';
  let result = undefined;
  
  //initiate blank board at start of game
  const board = [
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
    [undefined, undefined, undefined]
  ];

  //check for winner
  function checkForWinner(board, turn) {
    return checkRows(board, turn) ||
           checkColumns(board, turn) ||
           checkDiagonals(board, turn);
  }

  //logic for computer AI using minmax algorithm
  function minmax(newBoard, depth, turn) {
    const gameOver = checkForWinner(newBoard, turn) || boardFull(newBoard);
    //if there are still moves left in the game
    if (!gameOver) {
      //container for possible moves with scores
      const results = [];
      for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
          //make copy of board to avoid altering actual board
          const boardCopy = _.cloneDeep(newBoard);
          if (boardCopy[i][j] !== undefined) continue;
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
    } else if (checkForWinner(newBoard, player)) { // <-- player won
      return depth - 10;
    } else if (checkForWinner(newBoard, computer)) { // <-- computer won
      return 10 - depth;
    } else { // <-- tie
      return 0;
    } 
  }

  function computerMove() {
    return minmax(board, 0, computer);
  }
  
  function playerMove(row, col) {
    if (board[row][col] === undefined) {
      board[row][col] = player;
    } else {
      return;
    }
    
    //check if game over or computer moves
    if (checkForWinner(board, player)) {
      result = player;
      return;
    }
    
    if (boardFull(board)) {
      result = tie;
      return;
    }
    
    const move = computerMove();
    board[move.i][move.j] = computer;
    
    if (checkForWinner(board, computer)) {
      result = computer;
      return;
    }
    
    if (boardFull(board)) {
      result = tie;
      return;
    }
  }

  function showResult(result) {
    let text = "";
        
    if (result === tie) {
      text = "CAT'S GAME";
    } else if (result === computer) {
      text = "OOPS! YOU LOST.";
    } else if (result === player) {
      text = "NOT GOING TO HAPPEN"
    }
    
    $('.winner-text').text(text);
    $('.game-over').css('visibility', 'visible');
  }

  function renderBoard(board) {
    //iterate through board to make DOM match
    for (let row = 0; row < 3; row += 1) {
      for (let col = 0; col < 3; col += 1) {
        $('.square[data-row=' + row + '][data-col=' + col + ']').html(board[row][col]);
      }
    }

    if (result !== undefined) {
      showResult(result);
    }
  }

  //identify which square was clicked
  $('.square').click(function() {
    const row = $(this).data('row');
    const col = $(this).data('col');

    playerMove(row, col);
    renderBoard(board);
  });

  //restart: new game
  $('#restart').click(function() {
    location.reload();
  });
});