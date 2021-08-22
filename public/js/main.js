const socket = io('localhost:8081');

let previousMessage;

socket.on('message', function(message) {
  // only log if it's different
  if (previousMessage != message) {
    const json = JSON.parse(message);
    console.log(json);
    const data = processData(json);
    updateInfoScreen(data);
  }
  previousMessage = message;
});

renderInfoScreen();

function renderInfoScreen() {

const simulationData = {
  year: '2021',
  co2: 'x',
  wärme: 'y',
  strom: 'z',
  förderung: 'n'
}

renderGraphic_horizontal();
updateInfoScreenWithAnimation(animationJson);
renderHouseInfo();
renderSimulationVariables(simulationData);

}
