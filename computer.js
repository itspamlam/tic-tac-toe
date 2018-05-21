(function(){
  function Computer(board) {
    this.board = board;
    const _this = this;
    this.board.addEventListener(Board.PLAYER_MOVE_EVENT, this.makeMove.bind(this));
  }

  Computer.MARKER = 'O';

  Computer.prototype.getMove = function() {
    return minmax(this.board, 0, Computer.MARKER);
  }

  Computer.prototype.makeMove = function() {
    const move = this.getMove();
    this.board.move(Computer.MARKER, move.i, move.j);
  }
  
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = Computer;
  } else {
    window.Computer = Computer;
  }
})();