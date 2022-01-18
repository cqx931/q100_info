const socket = io('localhost:8081');

let previousMessage;

socket.on('message', function(message) {
  // only log if it's different
  if (previousMessage != message) {
    const json = JSON.parse(message);
    console.log(json);
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

const sampleHouseInfo = [{
  "adresse": "Rüsdorfer Straße 19",
  "CO2": 0.2036314841,
  "anschluss": 0,
  "investment": 2,
  "versorgung": "konventionell",
  "Wärmeverbrauch 2017 [kWh]": 71921,
  "Stromverbrauch 2017 [kWh]": 10260
},{
  "adresse": "Rüsdorfer Straße 15",
  "CO2": 0.2488510615,
  "anschluss": 1,
  "investment": 3,
  "versorgung": "gruen",
  "Wärmeverbrauch 2017 [kWh]": 161150,
  "Stromverbrauch 2017 [kWh]": 46197
},{
  "adresse": "Rüsdorfer Straße 8",
  "CO2": 0.317290762,
  "anschluss": 0,
  "investment": 1,
  "versorgung": "medium",
  "Wärmeverbrauch 2017 [kWh]": 251721,
  "Stromverbrauch 2017 [kWh]": 71428
}]


updateClusterCharts(clusterBefore);
updateTotalCharts(totalBefore);
renderHouseInfo(sampleHouseInfo);
renderSimulationVariables(simulationData); // replaces variables in simulation_template
