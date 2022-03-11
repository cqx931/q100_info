const path = require('path'),
      open = require('open'),
      express = require('express');
      fs = require('fs');

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
initServer()

function initServer() {
  const app = express();
  app.use(express.static(path.join(__dirname, 'public')));
  app.listen(http_port);

  console.log('HTTP Server started at http://localhost:' + http_port);
  
  // set endpoint for simulation_df
  // implemented for development purpose (in production mode, data should be handled only through socket)
  const simulation_df_json = loadAndParseJson("public/data/simulation_df.json");
  app.get('/api/data', (req, res) => {
    res.json(simulation_df_json);
  });

  open('http://localhost:' + http_port);
}

function loadAndParseJson(path) {
  const simulation_df = fs.readFileSync(path, 'utf8');
  var jsonData = JSON.parse(simulation_df);
  return jsonData
}
