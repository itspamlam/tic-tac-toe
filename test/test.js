const assert = require('chai').assert;
const f = require('../functions.js');

const board = [
  ['X','X','X'],
  ['','',''],
  ['','','']
];

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

describe('Empty Spaces', function(){
  it('should return null', function(){
    assert.equal(f.stillSpace(board), null);
  });
});