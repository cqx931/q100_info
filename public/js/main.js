const socket = io('localhost:8081');

let previousMessage;

socket.on('message', function(message) {
  // only log if it's different
  if (previousMessage != message) {
    const json = JSON.parse(message);

    const data = processData(json);
    updateClusterCharts(data);
    if (json.clusters) renderHouseInfo(json.clusters);
  }
  previousMessage = message;
});

let simulationData = {
  year: 2022,
  co2: '500',
  wärme: 'y',
  strom: 'z',
  förderung: 'n'
}

updateClusterCharts(clusterBefore);
updateTotalCharts(totalBefore);
renderHouseInfo();
renderSimulationVariables(simulationData); // replaces variables in simulation_template
