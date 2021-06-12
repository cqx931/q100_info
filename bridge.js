// Require dgram module.
const dgram = require('dgram');
// Create udp server socket object.
const server = dgram.createSocket("udp4");

// When udp server started and listening.
server.on('listening', function () {
    // Get and print udp server listening ip address and port number in log console. 
    var address = server.address(); 
    console.log('UDP Server started and listening on ' + address.address + ":" + address.port);
});

//set up socket.io
const io = require("socket.io")(8081, {
  cors: {
    origin: "http://localhost:8000",
    methods: ["GET", "POST"]
  }
});
io.sockets.on('connection', function (socket) {
  console.log("socket.io is started.");

  // Make udp server listen on port 6155
  server.bind(6155);
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
