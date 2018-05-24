describe('Minmax: Computer Blocks', function() {
  context('when player is about to win', function() {
    const board = new Board([
      ['O', 'X', 'X'],
      [undefined, 'X', undefined],
      [undefined, 'O', undefined]
    ]);
    it('should block the win', function() {
      chai.assert.deepEqual(minmax(board, 0, 'O'), { i: 2, j: 0 });
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
      chai.assert.deepEqual(minmax(board, 0, 'O'), { i: 0, j: 1 });
    });
  });
});