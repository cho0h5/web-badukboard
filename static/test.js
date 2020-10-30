const height = 900;
const width = 900;
const offset = 30;
const num_of_line = 19;

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

ctx.fillStyle = "rgb(210,165,73)";
ctx.fillRect(0, 0, width, height);

ctx.fillStyle = "rgb(0,0,0)";
for (
  let i = offset;
  i <= width - offset + offset * 0.4;
  i += (width - offset * 2) / (num_of_line -1)
) {
  ctx.beginPath();
  ctx.moveTo(i, offset);
  ctx.lineTo(i, width - offset);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(offset, i);
  ctx.lineTo(height - offset, i);
  ctx.stroke();
}
