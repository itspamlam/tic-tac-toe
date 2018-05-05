const assert = require('chai').assert;
const f = require('../functions.js');

const board = [
  ['X','X','X'],
  ['','',''],
  ['','','']
];

const gameOver = null;

describe('Rows', function(){
  it('should return X', function(){
    assert.equal(f.checkRows(board), 'X');
  });
});

describe('Columns', function(){
  it('should return null', function(){
    assert.equal(f.checkColumns(board), null);
  });
});

describe('Diagonals', function(){
  it('should return null', function(){
    assert.equal(f.checkDiagonals(board), null);
  });
});

describe('Board Full', function(){
  it('should return false', function(){
    assert.equal(f.boardFull(board), false);
  });
});

describe('Set Result', function() {
  it('should show tied result', function() {
    assert.equal(f.setWinText(gameOver), "CAT'S GAME");
  });
});