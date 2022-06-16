// TODO: move to devTools
import axios from 'https://cdn.skypack.dev/axios'; //communication between node express server (q100_info.js) and main.js via HTTP
//------------------------- COMMUNICATION -----------------------------
// ----------------- processing of incoming data ----------------------
const socket = io('localhost:8081');

let previousMessage;
socket.on('message', function (message) {
  // only log if it's different
  if (previousMessage != message) {
    const json = JSON.parse(message);
    console.log(json);

    const data = processData(json);
    updateClusterCharts(data);
    // updateTotalCharts(data);

    if (json.clusters) renderHouseInfo(json.clusters);

    if (json.mode){
      const nextUserMode = json.mode;

      //ToDo: get question number from UDP
      switchUserMode(nextUserMode, getRandomInt(5));

      if (json.answer){
        const answer = json.answer
        //Todo make a function to judge this condition
        if (answer == "yes") {
          highlightAnswerYes();
        } else if (answer == "no") {
          highlightAnswerNo();
        }
      }
    }
    if (json.active_scenario){
      const scenario = json.scenario;
      updateInputEnvironmentMode(scenario);
    }
    updateMapImage();
    previousMessage = message;
  }
});

async function fetchDataFromApi(arg) {
  const path = '/api/'+arg
  return await axios.get(path)
}

// fetch simulation_df from node express server /api/data endpoint
// implemented for development purpose (in production mode, data should be handled only through socket)
async function fetchSimulationDataFrame() {
  const dataObject = await fetchDataFromApi('data');
  const retval = dataObject.data
  return retval
}

async function fetchQuestions() {
  const questionsObject = await fetchDataFromApi('questions');
  const retval = questionsObject.data
  return retval
}

async function fetchGAMAData() {
  const questionsObject = await fetchDataFromApi('GAMAData');
  const retval = questionsObject.data
  return retval
}


simulation_df = await fetchSimulationDataFrame()
questions = await fetchQuestions()
GAMAData = await fetchGAMAData()



//////////////////////////// MAIN SCRIPT //////////////////////////////
// ------------------------ UPDATE FUNCTIONS --------------------------
function initialRender(){
  console.log("simulation_df", simulation_df);
  console.log("questions", questions);
  updateClusterCharts(clusterBefore);
  // updateTotalCharts(totalBefore);
  renderHouseInfo(sampleHouseInfo);
  renderSimulationVariables(simulationData); // replaces variables in simulation_template
  renderSimulationScreen(simulation_df, districtData);
  switchUserMode(currentUserMode, getRandomInt(5)); //initial render
}

initialRender()
