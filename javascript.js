(function () {
  class Square {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }

    getPath() {
      let result = `[${this.path[0][0]},${this.path[0][1]}]`;
      for (let i = 1; i < this.path.length; i++) {
        result += `,[${this.path[i][0]},${this.path[i][1]}]`;
      }
      return result;
    }
  }

  class GameBoard {
    constructor() {
      this.board = [];
      for (let i = 0; i < 8; i++) {
        const row = [];
        for (let j = 0; j < 8; j++) {
          row.push(new Square(i, j));
        }
        this.board.push(row);
      }
    }
  }

  class Knight {
    constructor() {}

    getNeighbors(x, y) {
      const neighbors = [];
      for (let i = -2; i < 3; i++) {
        for (let j = -2; j < 3; j++) {
          if (
            Math.abs(i) - Math.abs(j) !== 0 &&
            i !== 0 &&
            j !== 0 &&
            x + i >= 0 &&
            y + j >= 0 &&
            x + i < 8 &&
            y + j < 8
          ) {
            neighbors.push([x + i, y + j]);
          }
        }
      }
      return neighbors;
    }
  }

  function knightMoves(start, end) {
    if (start[0] < 0 || start[0] > 7 || start[1] < 0 || start[1] > 7) {
      return `[${start}] is an invalid starting location. Select a start that is on the board`;
    }
    const gameBoard = new GameBoard();
    const knight = new Knight();
    const queue = [gameBoard.board[start[0]][start[1]]];
    queue[0].path = [start];
    let idx = 0;
    while (idx < queue.length) {
      const square = queue[idx];
      if (square.x === end[0] && square.y === end[1]) {
        return `You made it in ${
          square.path.length - 1
        } moves! Here's your path: ${square.getPath()}`;
      }
      const pathSoFar = square.path;
      square.visited = true;
      const neighbors = knight.getNeighbors(square.x, square.y);
      for (const neighbor of neighbors) {
        const neighborSquare = gameBoard.board[neighbor[0]][neighbor[1]];
        if (!neighborSquare.visited) {
          neighborSquare.path = pathSoFar.slice();
          neighborSquare.path.push(neighbor);
          queue.push(neighborSquare);
        }
      }
      idx++;
    }
    return `It is impossible to get to [${end}] from [${start}] because [${end}] is off the board!`;
  }

  console.log(knightMoves([0, 0], [7, 7]));
})();
