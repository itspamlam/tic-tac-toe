(function(){
  function getPossibleMoves(newBoard, depth, turn, computerMarker, playerMarker) {
    const results = [];
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        const spaces = _.cloneDeep(newBoard.getSpaces());
        if (spaces[i][j] !== undefined) continue;
        spaces[i][j] = turn;

        const boardCopy = new Board(spaces);
        let result = minmax(boardCopy, depth + 1, turn === 
                                                  playerMarker ?
                                                  computerMarker : playerMarker,
                                                  computerMarker,
                                                  playerMarker);
        results.push(
          { 
            score: result,
            square: {
              i: i,
              j: j
            }
          }
        );
      }
    }
    return results;
  }

  function getScore(fn, moves, depth) {
    const result = fn.apply(Math,moves.map(function(ele) { return ele.score;}));
    const details = moves.find(function(ele) { return ele.score == result; });
    if (depth === 0) {
      return details.square;
    } else {
      return result;
    }
  }

  function minmax(newBoard, depth, turn, computerMarker, playerMarker) {
    const gameOver = newBoard.winningTests(computerMarker) ||
                     newBoard.winningTests(playerMarker) ||
                     newBoard.boardFull();

    if (!gameOver) {
      const moves = getPossibleMoves(newBoard, depth, turn, computerMarker, playerMarker);
      if (turn === computerMarker) {
        return getScore(Math.max, moves, depth);
      } else {
        return getScore(Math.min, moves, depth);
      }
    } else if (newBoard.winningTests(playerMarker)) {
      return depth - 10;
    } else if (newBoard.winningTests(computerMarker)) {
      return 10 - depth;
    } else {
      return 0;
    } 
  }

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = minmax;
  } else {
    window.minmax = minmax;
  }
})();