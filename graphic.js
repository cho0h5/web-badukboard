const size = 1080;
const offset = 30;
const num_of_line = 19;

let rocks = {};
let coor = [];

let state = 2;

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

class UI {
  drawBoard(size, offset, num_of_line) {
    // cross coor for drawing points and rocks

    // draw background color
    ctx.fillStyle = "rgb(210,165,73)";
    ctx.fillRect(0, 0, size, size);

    // draw vertical and horizon lines
    // and calculate coor
    coor = [];
    ctx.fillStyle = "rgb(0,0,0)";
    for (let i = 0; i < num_of_line; i++) {
      const line_coor = (i * (size - 2 * offset)) / (num_of_line - 1) + offset;

      ctx.beginPath();
      ctx.moveTo(line_coor, offset);
      ctx.lineTo(line_coor, size - offset);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(offset, line_coor);
      ctx.lineTo(size - offset, line_coor);
      ctx.stroke();

      coor.push(line_coor);
    }

    // if num_of_line is 19
    // draw 9 points
    if (num_of_line == 19) {
      [3, 9, 15].forEach((x) => {
        [3, 9, 15].forEach((y) => {
          ctx.beginPath();
          ctx.arc(coor[x], coor[y], 5, 0, 2 * Math.PI);
          ctx.fill();
        });
      });
    }

    // draw rocks
    for (const [x, rest] of Object.entries(rocks)) {
      for (const [y, state] of Object.entries(rest)) {
        switch (state) {
          case 0:
            continue;
          case 1:
            ctx.fillStyle = "rgb(233,234,239)";
            break;
          case 2:
            ctx.fillStyle = "rgb(12,11,10)";
            break;
        }
        ctx.beginPath();
        ctx.arc(
          coor[x],
          coor[y],
          ((coor[1] - coor[0]) * 0.9) / 2,
          0,
          2 * Math.PI
        );
        ctx.fill();
      }
    }
  }
}

class GameManager {
  run() {
    const ui = new UI();
    ui.drawBoard(size, offset, num_of_line);
  }
  checkDown(x, y, state) {
    const ratio = canvas.width / canvas.getBoundingClientRect().width;
    x *= ratio;
    y *= ratio;

    const r = ((coor[1] - coor[0]) * 0.9) / 2;
    for (const x_coor in coor) {
      for (const y_coor in coor) {
        let distance =
          Math.pow(coor[x_coor] - x, 2) + Math.pow(coor[y_coor] - y, 2);
        if (distance < Math.pow(r, 2)) {
          console.log(x_coor, y_coor, state);
          downRock(x_coor, y_coor, state);
          break;
        }
      }
    }
  }
}

function pick_remove() {
  state = 0;
}
function pick_white() {
  state = 1;
}
function pick_black() {
  state = 2;
}

const gameManager = new GameManager();
gameManager.run();

canvas.addEventListener("mousedown", (e) => {
  gameManager.checkDown(e.offsetX, e.offsetY, state);
});
