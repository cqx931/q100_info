//////////////////////////// MAIN SCRIPT //////////////////////////////
import axios from 'https://cdn.skypack.dev/axios'; //communication between node express server (q100_info.js) and main.js via HTTP
//------------------------- COMMUNICATION -----------------------------
// ----------------- processing of incoming data ----------------------
const socket = io('localhost:8081');

let previousMessage;
// let userMode = 'input';
let userMode = 'questionnaire';

socket.on('message', function (message) {
  // only log if it's different
  if (previousMessage != message) {
    const json = JSON.parse(message);
    console.log(json);
    const data = processData(json);
    updateClusterCharts(data);
    if (json.clusters) renderHouseInfo(json.clusters);

    if (json.mode){
      console.log(userMode)
      userMode = json.mode;
      switchUserMode(userMode);
    }
    updateImage();
    previousMessage = message;
  }
});


// fetch simulation_df from node express server /api/data endpoint
const dataSet = async function fetchData() {
  return await axios.get('/api/data');
}

async function fetchSimulationDataFrame() {
  const dataObject = await dataSet();
  const retval = dataObject.data
  return retval
}
const simulation_df = await fetchSimulationDataFrame()

// ------------------------ UPDATE FUNCTIONS --------------------------
console.log(simulation_df);
updateClusterCharts(clusterBefore);
updateTotalCharts(totalBefore);
renderHouseInfo(sampleHouseInfo);
renderSimulationVariables(simulationData); // replaces variables in simulation_template
renderSimulationScreen(simulation_df, quartierData);

switchUserMode(userMode); //initial render

// ---------------------------- KEY EVENTS ----------------------------
document.addEventListener('keydown', function (event) {
  console.log(userMode);
  if (event.key == " ") { // space
    const nextUserMode = calculateNextUserMode(userMode)
    switchUserMode(nextUserMode);
    userMode = nextUserMode
  }
});

function calculateNextUserMode(currentUserMode){
  const userModes = ["input", "simulation", "questionnaire"]
  const currentUserModeIndex = userModes.indexOf(currentUserMode)
  const nextUserModeIndex = (currentUserModeIndex + 1) % 3
  return userModes[nextUserModeIndex]
}