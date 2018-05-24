(function(){
  function Computer(board, marker) {
    this.board = board;
    this.marker = marker;
    this.board.addEventListener(Board.MOVE_EVENT, this.makeMove.bind(this));
  }

  Computer.prototype.getMove = function() {
    return minmax(this.board, 0, this.marker, this.marker, this.marker === 'O' ? 'X' : 'O');
  }

  Computer.prototype.getMarker = function() {
    return this.marker;
  }

  Computer.prototype.makeMove = function(marker) {
    if (marker !== this.marker) {
      const move = this.getMove();
      this.board.move(this.marker, move.i, move.j);
    }
  }
  
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = Computer;
  } else {
    window.Computer = Computer;
  }
})();