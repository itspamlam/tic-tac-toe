const assert = require('chai').assert;
const Board = require('../board.js');

describe('Rows', function() {
  context('when X wins', function() {
    const board = new Board([
      ['X', 'X', 'X'],
      [undefined, 'O', undefined],
      ['O', undefined, undefined]
    ]);
    it('should return true', function() {
      assert.equal(board.checkRows(Board.PLAYER), true);
    });
  });
  context('when O wins', function() {
    const board = new Board([
      [undefined, 'X', undefined],
      ['O', 'O', 'O'],
      [undefined, 'X', undefined]
    ]);
    it('should return true', function() {
      assert.equal(board.checkRows(Board.COMPUTER), true);
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
      assert.equal(board.checkColumns(Board.COMPUTER), true);
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
      assert.equal(board.checkDiagonals(Board.COMPUTER), true);
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
      assert.equal(board.boardFull(), false);
    });
   });
});
