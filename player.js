(function(){
  function Player(board, marker){
    this.board = board;
    this.marker = marker;
  }

  Player.prototype.move = function(row, col) {
    this.board.move(this.marker, row, col);
  }

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = Player;
  } else {
    window.Player = Player;
  }
})();