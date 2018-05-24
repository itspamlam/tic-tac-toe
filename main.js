$(document).ready(function() {
  const board = new Board();
  const player = new Player(board, 'X');
  const computer = new Computer(board, 'O');

  function showWinner(result) {
    renderBoard(board);
    
    let text = "";
        
    if (result === 'O') {
      text = "OOPS! YOU LOST.";
    } else if (result === 'X') {
      text = "NOT GOING TO HAPPEN"
    }
    
    $('.winner-text').text(text);
    $('.game-over').css('visibility', 'visible');
  }

  function showTie() {
    renderBoard(board);
    $('.winner-text').text("CAT'S GAME");
    $('.game-over').css('visibility', 'visible');
  }

  function renderBoard(board) {
    const spaces = board.getSpaces();
    for (let row = 0; row < 3; row += 1) {
      for (let col = 0; col < 3; col += 1) {
        $('.square[data-row=' + row + '][data-col=' + col + ']').html(spaces[row][col]);
      }
    }
  }

  $('.square').click(function() {
    const row = $(this).data('row');
    const col = $(this).data('col');

    player.move(row, col);
  });

  board.addEventListener(Board.MOVE_EVENT, renderBoard.bind(this, board));
  board.addEventListener(Board.WINNING_EVENT, showWinner);
  board.addEventListener(Board.TIE_EVENT, showTie);

  $('#restart').click(function() {
    location.reload();
  });
});