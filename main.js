$(document).ready(function() {
  const board = new Board();
  const player = new Player(board);
  const computer = new Computer(board);

  function showResult(result) {
    let text = "";
        
    if (result === Board.TIE) {
      text = "CAT'S GAME";
    } else if (result === Computer.MARKER) {
      text = "OOPS! YOU LOST.";
    } else if (result === Player.MARKER) {
      text = "NOT GOING TO HAPPEN"
    }
    
    $('.winner-text').text(text);
    $('.game-over').css('visibility', 'visible');
  }

  function renderBoard(board) {
    const spaces = board.getSpaces();
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

  $('.square').click(function() {
    const row = $(this).data('row');
    const col = $(this).data('col');

    player.move(row, col);
  });

  board.addEventListener(Board.MOVE_EVENT, renderBoard.bind(this, board));

  $('#restart').click(function() {
    location.reload();
  });
});