$(document).ready(function() {
  const player = 'X';
  const computer = 'O';
  
  //initiate blank board at start of game
  const board = [
    ['','',''],
    ['','',''],
    ['','','']
  ];

  function checkGameOver(board) {
    checkRows(board);
    checkColumns(board);
    checkDiagonals(board);
  }

  $('.square').click(function() {
    //when square is clicked, change it to player symbol
    $(this).html(player);

    //also save selection to board
    const i = $(this).data('i');
    const j = $(this).data('j');
    board[i][j] = player;

  });

});