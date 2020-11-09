const size = 1080;
const num_of_line = 19;

// test UI
ui = new UI(size, num_of_line);
ui.drawBoard();

// test Communicator
function drawStonesFunction(stones) {
  ui.drawBoard();
  stones.forEach((stone) => {
    this.ui.drawStone(stone.x, stone.y, stone.state);
  });
  if (stones.length > 0) ui.drawTriangle(stones[stones.length - 1]);
}

// test Input
input = new Input(size, num_of_line, (x, y, state) => {
  downStone(x, y, state);
});
