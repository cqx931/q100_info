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
}, {
  "adresse": "Rüsdorfer Straße 15",
  "CO2": 0.2488510615,
  "anschluss": 1,
  "investment": 3,
  "versorgung": "gruen",
  "Wärmeverbrauch 2017 [kWh]": 161150,
  "Stromverbrauch 2017 [kWh]": 46197
}, {
  "adresse": "Rüsdorfer Straße 8",
  "CO2": 0.317290762,
  "anschluss": 0,
  "investment": 1,
  "versorgung": "medium",
  "Wärmeverbrauch 2017 [kWh]": 251721,
  "Stromverbrauch 2017 [kWh]": 71428
}]

const quatierData = [
  {
    "step":0,
    "attributes": {
      "Verbrauch": 1000000,
      "CO2": 10.813611631,
      "Investment": 0.3,
      "EEH": 0.4458936055
    }
  },
  {
    "step":1,
    "attributes":{
      "Verbrauch": 900000,
      "CO2": 9.813611631,
      "Investment": 0.4,
      "EEH": 0.5458936055
    }
  },
  {
    "step":2,
    "attributes":{
      "Verbrauch": 800000,
      "CO2": 8.813611631,
      "Investment": 0.5,
      "EEH": 0.6458936055
    }
  },
  {
    "step":3,
    "attributes":{
      "Verbrauch": 700000,
      "CO2": 7.813611631,
      "Investment": 0.6,
      "EEH": 0.7458936055
    }
  }
]

console.log(simulation_df);
updateClusterCharts(clusterBefore);
updateTotalCharts(totalBefore);
renderHouseInfo(sampleHouseInfo);
renderSimulationVariables(simulationData); // replaces variables in simulation_template
renderSimulationScreen(simulation_df, quatierData);

document.addEventListener('keydown', function(event) {
  if (event.keyCode == 32) { // space
    toggleSimulationScreen();
  }
});
