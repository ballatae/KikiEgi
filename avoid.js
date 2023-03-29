// function avoidCollisions(gameState) {
//   const myHead = gameState.you.head;
//   const myBody = gameState.you.body;
//   const boardWidth = gameState.board.width;
//   const boardHeight = gameState.board.height;

//   const obstacles = myBody.slice(0, -1); // Exclude my tail from obstacles
//   gameState.board.snakes.forEach(snake => {
//     const snakeBody = snake.body;
//     obstacles.push(...snakeBody);
//   });

//   const possibleMoves = ['up', 'down', 'left', 'right'];
//   const safeMoves = possibleMoves.filter(move => {
//     const newPos = getNewPosition(myHead, move);
//     return !outOfBounds(newPos, boardWidth, boardHeight) && !isObstacle(newPos, obstacles);
//   });

//   return safeMoves.length > 0 ? getPreferredMoves(safeMoves, gameState) : ['up'];
// }

// function isObstacle(position, obstacles) {
//   return obstacles.some(obstacle => {
//     return obstacle.x === position.x && obstacle.y === position.y;
//   });
// }

const opponents = gameState.board.snakes;
for (let i = 0; i < opponents.length; i++) {
  const opponent = opponents[i];
  for (let j = 0; j < opponent.body.length; j++) {
    const opponentSegment = opponent.body[j];
    if (opponentSegment.x === myHead.x && opponentSegment.y === myHead.y) {
      if (opponentSegment.y < myHead.y) {
        isMoveSafe.down = false;
      }
      if (opponentSegment.y > myHead.y) {
        isMoveSafe.up = false;
      }
      if (opponentSegment.x < myHead.x) {
        isMoveSafe.left = false;
      }
      if (opponentSegment.x > myHead.x) {
        isMoveSafe.right = false;
      }
    }
  }
}




