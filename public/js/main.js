const socket = io('localhost:8081');

let previousMessage;

socket.on('message', function(message) {
  // only log if it's different
  if (previousMessage != message) {
    const json = JSON.parse(message);
    const data = processData(json);
    console.log(data)
    updateInfoScreen(data);
  }
  previousMessage = message;
});

renderInfoScreen();

function renderInfoScreen() {

let simulationData = {
  year: 2022,
  co2: '500',
  wärme: 'y',
  strom: 'z',
  förderung: 'n'
}

renderGraphic_horizontal();
updateInfoScreenWithAnimation(animationJson);
renderHouseInfo();
renderSimulationVariables(simulationData); // replaces variables in simulation_template

}
