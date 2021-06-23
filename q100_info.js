const path = require('path'),
      open = require('open'),
      express = require('express');

const http_port = 8000,
      websocket_port = 8081;

// set up socket.io
const io = require("socket.io")(websocket_port, {
  cors: {
    origin: "http://localhost:8000",
    methods: ["GET", "POST"]
  }
});

io.sockets.on('connection', socket => {
  console.log("A client has connected.");

  socket.on("message", obj => {
    socket.broadcast.emit("message", obj);
  });
});

// http server
const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.listen(http_port);
console.log('HTTP Server started at http://localhost:' + http_port);

open('http://localhost:' + http_port);
