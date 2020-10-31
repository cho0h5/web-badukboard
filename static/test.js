const height = 900;
const width = 900;
const offset = 30;
const num_of_line = 19;

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

class UI {
  constructor() {
    // 초기 변수 설정 (ex. width, height, offset etc.)
  }
  drawBoard(width, height, offset, num_of_line) {
    ctx.fillStyle = "rgb(210,165,73)";
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = "rgb(0,0,0)";
    for (let i = 0; i < 19; i++) {
      const vertical_line_x =
        (i * (width - 2 * offset)) / (num_of_line - 1) + offset;
      ctx.beginPath();
      ctx.moveTo(vertical_line_x, offset);
      ctx.lineTo(vertical_line_x, width - offset);
      ctx.stroke();

      const horizon_line_y =
        (i * (height - 2 * offset)) / (num_of_line - 1) + offset;
      ctx.beginPath();
      ctx.moveTo(offset, horizon_line_y);
      ctx.lineTo(height - offset, horizon_line_y);
      ctx.stroke();
    }
  }
}

let ui = new UI();
ui.drawBoard(900, 900, 30, 19);