// const size = 1080;
// const offset = 30;
// const num_of_line = 19;

// class GameManager {
//   run() {
//     // const ui = new UI(size, offset, num_of_line);
//     const ui = new UI(1080, 60, 19);
//     ui.drawBoard();
//   }
//   checkDown(x, y, state) {
//     const ratio = canvas.width / canvas.getBoundingClientRect().width;
//     x *= ratio;
//     y *= ratio;

//     const r = ((coor[1] - coor[0]) * 0.9) / 2;
//     for (const x_coor in coor) {
//       for (const y_coor in coor) {
//         let distance =
//           Math.pow(coor[x_coor] - x, 2) + Math.pow(coor[y_coor] - y, 2);
//         if (distance < Math.pow(r, 2)) {
//           downRock(x_coor, y_coor, state);
//           break;
//         }
//       }
//     }
//   }
// }

// const gameManager = new GameManager();
// gameManager.run();

// canvas.addEventListener("mousedown", (e) => {
//   gameManager.checkDown(e.offsetX, e.offsetY, state);
// });

const ui = new UI(1080, 19);
ui.drawBoard();

ui.drawStone(0, 0, 1);
ui.drawStone(9, 8, 2);
ui.drawStone(6, 14, 2);
ui.drawStone(10, 3, 1);
