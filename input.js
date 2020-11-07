class Input {
  // 중복
  constructor(size, num_of_line, downStoneFunction) {
    this.size = size; // 중복
    this.offset = size / 36;
    this.num_of_line = num_of_line;
    this.downStone = downStoneFunction;

    this.state = 2; // state -> color 교체

    this.coor = [];

    this.canvas = document.getElementById("canvas"); // 중복
    this.canvas.addEventListener("mousedown", (e) => {
      this.onclick(e.offsetX, e.offsetY);
    });

    this.calculateCoor(); // 중복
  }

  // 중복
  calculateCoor() {
    for (let i = 0; i < this.num_of_line; i++) {
      const line_coor =
        (i * (this.size - 2 * this.offset)) / (this.num_of_line - 1) +
        this.offset;
      this.coor.push(line_coor);
    }
  }

  // set stone's color(state)
  // state 0: undo
  // state 1: black rock
  // state 2: white rock
  pick_remove() {
    this.state = 0;
  }
  pick_white() {
    this.state = 1;
  }
  pick_black() {
    this.state = 2;
  }

  onclick(x, y) {
    // calculate real mouse coor
    const ratio = this.canvas.width / this.canvas.getBoundingClientRect().width;
    x *= ratio;
    y *= ratio;

    // check coordinate
    const radius = ((this.coor[1] - this.coor[0]) * 0.9) / 2; // 중복
    for (const x_coor in this.coor) {
      for (const y_coor in this.coor) {
        let distance =
          Math.pow(this.coor[x_coor] - x, 2) +
          Math.pow(this.coor[y_coor] - y, 2);
        if (distance <= Math.pow(radius, 2)) {
          this.downStone(x_coor, y_coor, this.state); // 수정 콜백
          break;
        }
      }
    }
  }
}
