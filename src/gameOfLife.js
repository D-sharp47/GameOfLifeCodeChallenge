const gameOfLife = (board) => {
  const rows = board.length;
  const cols = board[0].length;
  const nextGrid = board.map((row) => [...row]);

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      nextGrid[i][j] = nextState(board, j, i);
    }
  }

  return nextGrid;
};

const nextState = (board, xPos, yPos) => {
  const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];
  const isAlive = board[yPos][xPos];
  let liveNeighborCount = 0;

  for (const [dx, dy] of directions) {
    const newX = xPos + dx;
    const newY = yPos + dy;
    if (liveNeighborCount > 3) break;
    if (
      newX >= 0 &&
      newX < board[0].length &&
      newY >= 0 &&
      newY < board.length
    ) {
      if (board[newY][newX] === 1) {
        liveNeighborCount++;
      }
    }
  }

  if (isAlive === 1) {
    return liveNeighborCount < 2 || liveNeighborCount > 3 ? 0 : 1;
  } else {
    return liveNeighborCount !== 3 ? 0 : 1;
  }
};

export default gameOfLife;
