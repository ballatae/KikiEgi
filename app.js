// TODO: Step 3 - Prevent your Battlesnake from colliding with other Battlesnakes
// opponents = gameState.board.snakes;
function avoidCollisions(gameState) {
  const myHead = gameState.you.head;
  const myBody = gameState.you.body;

  const obstacles = gameState.board.snakes.reduce((obs, snake) => {
    if (snake.id === gameState.you.id) {
      return obs;
    }
    return obs.concat(snake.body);
  }, []);

  const possibleMoves = getSafeMoves(myHead, obstacles, gameState.board.width, gameState.board.height);

  if (possibleMoves.length === 0) {
    return "up"; // No safe moves, just go up as a last resort
  }

  const preferredMoves = getPreferredMoves(possibleMoves, myBody);

  return selectMove(preferredMoves);
}





function getSafeMoves(position, obstacles, width, height) {
  const safeMoves = [];

  const directions = ["up", "down", "left", "right"];

  for (const direction of directions) {
    const newPosition = getNewPosition(position, direction);
    if (!isOutOfBounds(newPosition, width, height) && !isObstacle(newPosition, obstacles)) {
      safeMoves.push(direction);
    }
  }

  return safeMoves;
}

function getPreferredMoves(possibleMoves, myBody) {
  const preferredMoves = [];

  for (const move of possibleMoves) {
    const nextPosition = getNewPosition(myBody[0], move);
    const distanceToFood = getDistanceToFood(nextPosition, myBody[0]);
    const distanceToTail = getDistanceToTail(nextPosition, myBody);

    if (distanceToFood < distanceToTail) {
      preferredMoves.push(move);
    }
  }

  if (preferredMoves.length === 0) {
    return possibleMoves;
  }

  return preferredMoves;
}

function selectMove(moves) {
  return moves[Math.floor(Math.random() * moves.length)];
}

function getNewPosition(position, direction) {
  const newPosition = { ...position };
  switch (direction) {
    case "up":
      newPosition.y += 1;
      break;
    case "down":
      newPosition.y -= 1;
      break;
    case "left":
      newPosition.x -= 1;
      break;
    case "right":
      newPosition.x += 1;
      break;
  }
  return newPosition;
}

function isOutOfBounds(position, width, height) {
  return position.x < 0 || position.y < 0 || position.x >= width || position.y >= height;
}

function isObstacle(position, obstacles) {
  return obstacles.some((obstacle) => obstacle.x === position.x && obstacle.y === position.y);
}

function getDistanceToFood(position, food) {
  return Math.abs(position.x - food.x) + Math.abs(position.y - food.y);
}

function getDistanceToTail(position, body) {
  if (body.length === 1) {
    return 0;
  }
  return getDistanceToFood(position, body[body.length - 1]);
}

function move(gameState) {
  const move = avoidCollisions(gameState);
  return { move };
}
