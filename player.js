(function(){
  function Player(board){
    this.board = board;
  }

  Player.MARKER = 'X';

  Player.prototype.move = function(row, col) {
    this.board.move(Player.MARKER, row, col);
  }

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = Player;
  } else {
    window.Player = Player;
  }
})();