const size = 1080;
const num_of_line = 19;

class GameManager {
  run() {

  }
}

const gameManager = new GameManager();
gameManager.run();

///////////////////////////////////////

// test UI
const ui = new UI(size, num_of_line);
ui.drawBoard();

// test Input
const input = new Input(size, num_of_line, downStone);

// test Communicator
function drawStones(stones) {
  stones.forEach((stone) => {
    ui.drawStone(stone.x, stone.y, stone.state);
  });
}

const communicator = new Communicator(drawStones);

function downStone(x, y, state) {
  communicator.downStone(x, y, state);
}
