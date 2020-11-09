class UI {
  constructor(size, num_of_line) {
    this.size = size;
    this.offset = size / 36;
    this.num_of_line = num_of_line;

    this.coor = [];

    this.canvas = document.getElementById("canvas");
    this.ctx = canvas.getContext("2d");

    this.calculateCoor();
  }

  calculateCoor() {
    for (let i = 0; i < this.num_of_line; i++) {
      const line_coor =
        (i * (this.size - 2 * this.offset)) / (this.num_of_line - 1) +
        this.offset;
      this.coor.push(line_coor);
    }
  }

  drawBoard() {
    // draw background color
    this.ctx.fillStyle = "rgb(210,165,73)"; // set background color
    this.ctx.fillRect(0, 0, this.size, this.size);

    // draw vertical and horizon lines
    this.ctx.fillStyle = "rgb(0,0,0)"; // set line color
    this.coor.forEach((line_coor) => {
      // draw 1 vertical lines
      this.ctx.beginPath();
      this.ctx.moveTo(line_coor, this.offset);
      this.ctx.lineTo(line_coor, this.size - this.offset);
      this.ctx.stroke();

      // draw 1 horizon lines
      this.ctx.beginPath();
      this.ctx.moveTo(this.offset, line_coor);
      this.ctx.lineTo(this.size - this.offset, line_coor);
      this.ctx.stroke();
    });

    // if num_of_line is 19
    // draw 9 points
    if (this.num_of_line == 19) {
      [3, 9, 15].forEach((x) => {
        [3, 9, 15].forEach((y) => {
          this.ctx.beginPath();
          this.ctx.arc(
            this.coor[x],
            this.coor[y],
            this.size / 216,
            0,
            2 * Math.PI
          );
          this.ctx.fill();
        });
      });
    }
  }

  drawStone(x, y, state) {
    // pick color
    switch (state) {
      case 1:
        this.ctx.fillStyle = "rgb(233,234,239)";
        break;
      case 2:
        this.ctx.fillStyle = "rgb(12,11,10)";
        break;
      default:
        return;
    }

    // draw stone
    this.ctx.beginPath();
    this.ctx.arc(
      this.coor[x],
      this.coor[y],
      ((this.coor[1] - this.coor[0]) * 0.9) / 2,
      0,
      2 * Math.PI
    );
    this.ctx.fill();
  }

  fun() {
    console.log("ih");
  }

  drawTriangle(stone) {
    if (stone.state == 1) {
      this.ctx.fillStyle = "rgb(12,11,10)";
    } else if (stone.state == 2) {
      this.ctx.fillStyle = "rgb(233,234,239)";
    }

    this.ctx.beginPath();
    this.ctx.moveTo(this.coor[stone.x], this.coor[stone.y]);
    this.ctx.lineTo(this.coor[stone.x] + this.offset / 1.5, this.coor[stone.y]);
    this.ctx.lineTo(this.coor[stone.x], this.coor[stone.y] + this.offset / 1.5);
    this.ctx.fill();
  }
}
