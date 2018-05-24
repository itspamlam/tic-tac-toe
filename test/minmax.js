describe('Minmax: Computer Blocks', function() {
  context('when player is about to win', function() {
    const board = new Board([
      ['O', 'X', 'X'],
      [undefined, 'X', undefined],
      [undefined, 'O', undefined]
    ]);
    it('should block the win', function() {
      chai.assert.deepEqual(minmax(board, 0, 'O', 'X', 'O'), { i: 2, j: 0 });
    });
  });
});

describe('Minmax: Computer Wins', function() {
  context('when computer has a winning move', function() {
    const board = new Board([
      ['O', undefined, 'O'],
      ['X', 'X', undefined],
      ['X', undefined, undefined]
    ]);
    it('should take the win', function() {
      chai.assert.deepEqual(minmax(board, 0, 'O', 'X', 'O'), { i: 0, j: 1 });
    });
  });
});

describe('Testing Minmax', function() {
  context('when computer vs computer', function() {
    const board = new Board();
    const computer1 = new Computer(board, 'X');
    const computer2 = new Computer(board, 'O');
    let result = false;
    board.addEventListener(Board.TIE_EVENT, function() {
      result = true;
    })
    it('should always be tie', function() {
      this.timeout(0);
      computer1.makeMove(computer2.getMarker());
      chai.assert.equal(result, true);
    });
  });
});