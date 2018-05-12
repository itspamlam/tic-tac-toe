const assert = require('chai').assert;
const f = require('../functions.js');

describe('Rows', function() {
  context('when X wins', function() {
    const player = 'X';
    const board = [
      ['X', 'X', 'X'],
      [undefined, 'O', undefined],
      ['O', undefined, undefined]
    ];
    it('should return true', function() {
      assert.equal(f.checkRows(board, player), true);
    });
  });
  context('when O wins', function() {
    const player = 'O';
    const board = [
      [undefined, 'X', undefined],
      ['O', 'O', 'O'],
      [undefined, 'X', undefined]
    ];
    it('should return true', function() {
      assert.equal(f.checkRows(board, player), true);
    });
  });
});

describe('Columns', function() {
  context('when O wins', function() {
    const player = 'O';
    const board = [
      ['O', 'X', 'X'],
      ['O', undefined, 'O'],
      ['O', 'X', undefined]
    ];
    it('should return true', function() {
      assert.equal(f.checkColumns(board, player), true);
    });
  });
});

describe('Diagonals', function() {
  context("when O wins \\", function() {
    const player = 'O';
    const board = [
      ['O', 'X', 'X'],
      [undefined, 'O', undefined],
      ['O','X','O']
    ];
    it('should return true', function() {
      assert.equal(f.checkDiagonals(board, player), true);
    });
  });
});

describe('Board Full', function() {
  context('when the board is not full yet', function() {
    const board = [
      ['O', 'X', 'X'],
      [undefined, 'O', undefined],
      ['O', 'X', 'O']
    ];
    it('should return false', function() {
      assert.equal(f.boardFull(board), false);
    });
   });
});
