var ws = new WebSocket("ws://localhost:8090/");

ws.onopen = (event) => {
  let sendData = { event: "open" };
  ws.send(JSON.stringify(sendData));
};

ws.onmessage = (event) => {
    console.log(event.data)
//   let recData = JSON.parse(event.data);
//   switch (recData.event) {
//     case "response":
//       console.log(recData.data);
//       break;
//   }
};

function downRock(x, y, state) {
  console.log(x, y);
  let sendData = {
    event: "request",
    data: [x, y],
  };
  ws.send(JSON.stringify(sendData));
}