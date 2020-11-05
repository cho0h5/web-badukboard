var ws = new WebSocket("ws://cho0h5.iptime.org:5500/ws");

ws.onopen = (event) => {
  let sendData = { event: "open" };
  ws.send(JSON.stringify(sendData));
};

ws.onmessage = (event) => {
  rocks = JSON.parse(event.data);
  console.log(rocks);
  gameManager.run();
};

function downRock(x, y, state) {
  // state 0: nothing
  // state 1: black rock
  // state 2: white rock

  x = parseInt(x);
  y = parseInt(y);

  let sendData = {
    event: "downRock",
    data: { x: x, y: y, state: state },
  };
  ws.send(JSON.stringify(sendData));
}

function remove_all() {
  if(confirm("Remove all stones really?") == false) return;

  let sendData = {
    event: "removeAll",
  };
  ws.send(JSON.stringify(sendData));
}
