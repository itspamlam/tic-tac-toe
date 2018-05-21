describe('Rows', function() {
  context('when X wins', function() {
    const board = new Board([
      ['X', 'X', 'X'],
      [undefined, 'O', undefined],
      ['O', undefined, undefined]
    ]);
    it('should return true', function() {
      chai.assert.equal(board.checkRows(Player.MARKER), true);
    });
  });
  context('when O wins', function() {
    const board = new Board([
      [undefined, 'X', undefined],
      ['O', 'O', 'O'],
      [undefined, 'X', undefined]
    ]);
    it('should return true', function() {
      chai.assert.equal(board.checkRows(Computer.MARKER), true);
    });
  });
});

describe('Columns', function() {
  context('when O wins', function() {
    const board = new Board([
      ['O', 'X', 'X'],
      ['O', undefined, 'O'],
      ['O', 'X', undefined]
    ]);
    it('should return true', function() {
      chai.assert.equal(board.checkColumns(Computer.MARKER), true);
    });
  });
});

describe('Diagonals', function() {
  context("when O wins \\", function() {
    const board = new Board([
      ['O', 'X', 'X'],
      [undefined, 'O', undefined],
      ['O','X','O']
    ]);
    it('should return true', function() {
      chai.assert.equal(board.checkDiagonals(Computer.MARKER), true);
    });
  });
});

describe('Board Full', function() {
  context('when the board is not full yet', function() {
    const board = new Board([
      ['O', 'X', 'X'],
      [undefined, 'O', undefined],
      ['O', 'X', 'O']
    ]);
    it('should return false', function() {
      chai.assert.equal(board.boardFull(), false);
    });
   });
});

describe('Minmax Test', function() {
  context('when player is about to win', function() {
    const board = new Board([
      ['O', 'X', 'X'],
      [undefined, 'X', undefined],
      [undefined, 'O', undefined]
    ]);
    it('should block the win', function() {
      chai.assert.deepEqual(minmax(board, 0, Computer.MARKER), { i: 2, j: 0 });
    });
  });
});
