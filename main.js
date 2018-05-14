$(document).ready(function() {
  const board = new Board();

  function showResult(result) {
    let text = "";
        
    if (result === Board.TIE) {
      text = "CAT'S GAME";
    } else if (result === Board.COMPUTER) {
      text = "OOPS! YOU LOST.";
    } else if (result === Board.PLAYER) {
      text = "NOT GOING TO HAPPEN"
    }
    
    $('.winner-text').text(text);
    $('.game-over').css('visibility', 'visible');
  }

  function renderBoard(board) {
    const spaces = board.getSpaces();
    //iterate through board to make DOM match
    for (let row = 0; row < 3; row += 1) {
      for (let col = 0; col < 3; col += 1) {
        $('.square[data-row=' + row + '][data-col=' + col + ']').html(spaces[row][col]);
      }
    }
    const result = board.getResult();
    if (result !== undefined) {
      showResult(result);
    }
  }

  //identify which square was clicked
  $('.square').click(function() {
    const row = $(this).data('row');
    const col = $(this).data('col');

    board.playerMove(row, col);
    renderBoard(board);
  });

  //restart: new game
  $('#restart').click(function() {
    location.reload();
  });
});