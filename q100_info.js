const path = require('path'),
      open = require('open'),
      express = require('express');
      fs = require('fs');
      csv = require('csv-parse/sync');

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

  // set endpoint for question.csv
  // see https://csv.js.org/parse/
  const questions = loadQuestionsCSV()
  app.get('/api/questions', (req, res) => {
    res.json(questions);
  });
  
  // set endpoint for .csv
  // see https://csv.js.org/parse/
  const GAMAData = loadGAMADataCSV()
  app.get('/api/GAMAData', (req, res) => {
    res.json(GAMAData);
  });

  open('http://localhost:' + http_port);
}

function loadAndParseJson(path) {
  const simulation_df = fs.readFileSync(path, 'utf8');
  var jsonData = JSON.parse(simulation_df);
  return jsonData
}

function loadQuestionsCSV() {
  const input = fs.readFileSync("public/data/questions.csv", 'utf8');
  const questionsFromCSV = csv.parse(input, {
    delimiter: '/n',
    skip_empty_lines: true,
  });
  const questions = formatQuestions(questionsFromCSV)
  return questions
}

function formatQuestions(rawQuestions) {
  let questions = []
  for(const element of rawQuestions) {
    questions.push(element[0])
  }
  return questions
}

function loadGAMADataCSV() {
  const input = fs.readFileSync("public/data/includes/csv_export/csv_export_test.csv", 'utf8');
  const GAMADataFromCSV = csv.parse(input, {
    delimiter: ",",
    skip_empty_lines: true,
    columns: true,
    to: 9499
  });
  return GAMADataFromCSV
}
