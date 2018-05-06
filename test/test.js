const assert = require('chai').assert;
const f = require('../functions.js');

describe('Rows', function() {
  context('when X wins', function() {
    const board = [
      ['X','X','X'],
      ['','O',''],
      ['O','','']
    ];
    it('should return X', function() {
      assert.equal(f.checkRows(board), 'X');
    });
  });
  context('when O wins', function() {
    const board = [
      ['','X',''],
      ['O','O','O'],
      ['','X','']
    ];
    it('should return O', function() {
      assert.equal(f.checkRows(board), 'O');
    });
  });
});

describe('Columns', function() {
  context('when O wins', function() {
    const board = [
      ['O','X','X'],
      ['O','','O'],
      ['O','X','']
    ];
    it('should return null', function() {
      assert.equal(f.checkColumns(board), 'O');
    });
  });
});

describe('Diagonals', function() {
  context("when O wins \\", function() {
    const board = [
      ['O','X','X'],
      ['','O',''],
      ['O','X','O']
    ];
    it('should return O', function() {
      assert.equal(f.checkDiagonals(board), 'O');
    });
  });
});

describe('Board Full', function() {
  context('when the board is not full yet', function() {
    const board = [
      ['O','X','X'],
      ['','O',''],
      ['O','X','O']
    ];
    it('should return false', function() {
      assert.equal(f.boardFull(board), false);
    });
  });
});

describe('Set Result', function() {
  context('when no one wins', function() {
    const gameOver = null;
    it("should return CAT'S GAME", function() {
      assert.equal(f.setWinText(gameOver), "CAT'S GAME");
    });
  });
  context('when X wins', function() {
    const gameOver = 'X';
    it('should return NOT GOING TO HAPPEN', function() {
      assert.equal(f.setWinText(gameOver), 'NOT GOING TO HAPPEN');
    });
  });
  context('when O wins', function() {
    const gameOver = 'O';
    it('should return OOPS! YOU LOST.', function() {
      assert.equal(f.setWinText(gameOver), 'OOPS! YOU LOST.');
    });
  });
});