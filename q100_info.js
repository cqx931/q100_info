// Require dgram module.
const dgram = require('dgram'),
      path = require('path'),
      open = require('open'),
      express = require('express');

const http_port = 8000,
      websocket_port = 8081,
      udp_port = 6155;

// I. udp server
// Create udp server socket object.
const server = dgram.createSocket("udp4");
server.on('listening', function () {
    // Get and print udp server listening ip address and port number in log console. 
    var address = server.address(); 
    console.log('UDP Server started and listening on ' + address.address + ":" + address.port);
});

// Make udp server listen on port 6155
server.bind(udp_port);

// II. set up socket.io
const io = require("socket.io")(websocket_port, {
  cors: {
    origin: "http://localhost:8000",
    methods: ["GET", "POST"]
  }
});

io.sockets.on('connection', function (socket) {
  console.log("socket.io is started.");
  // When udp server receive message.
	server.on("message", function (message) {
	    // Create output message.
	    var output = "Udp server receive message : " + message + "\n";
      const json = JSON.parse(message);
	    // Print received message in stdout, here is log console.
	    //process.stdout.write(output);
      socket.emit("message", JSON.stringify(json));
      console.log(json);
	});

  socket.on("message", function (obj) {
    //
  });
});

// III. http server
const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.listen(http_port);
console.log('HTTP Server started at http://localhost:' + http_port);

open('http://localhost:' + http_port);

