import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 4000 });

wss.on("connection", function connection(ws) {
  console.log("Client connected");

  ws.on("error", console.error);

  ws.on("message", function message(data) {
    // console.log("Desde el cliente", data);
    // Todo: enviar la data al cliente de regreso
    const payload = JSON.stringify({
      type: "custom-message",
      payload: data.toString(),
    });
    // ws.send(JSON.stringify(payload));
    //* Todos - incluyente
    // wss.clients.forEach(function each(client) {
    //   if (client.readyState === WebSocket.OPEN) {
    //     client.send(payload, { binary: false });
    //   }
    // });

    //* Todos - excluyente
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(payload, { binary: false });
      }
    });
  });

  // ws.send("Hola desde el servidor!");

  ws.on("close", function close() {
    console.log("Client disconnected");
  });

  // setInterval(() => {
  //   ws.send("Hola de nuevo!!");
  // }, 2000);
});

console.log("http://localhost:4000");
