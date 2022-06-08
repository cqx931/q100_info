// ------------------------- DATA STRUCTS -----------------------------
let simulationData = {
  year: 2022,
  co2: '500',
  wärme: 'y',
  strom: 'z',
  förderung: 'n'
}

const sampleHouseInfo = [{
  "address": "Straßenname 19",
  "CO2": 0.2036314841,
  "connection_to_heat_grid": 0,
  "electricity_supplier": "gray",
  "spec_heat_consumption": 71921,
  "spec_power_consumption": 10260,
  "refurbished": false,
  "environmental_engagement": 0.5
}, {
  "address": "Straßenname 15",
  "CO2": 0.2488510615,
  "connection_to_heat_grid": 1,
  "electricity_supplier": "green",
  "spec_heat_consumption": 161150,
  "spec_power_consumption": 46197,
  "refurbished": false,
  "environmental_engagement": 0.1
}, {
  "address": "Straßenname 8",
  "CO2": 0.317290762,
  "connection_to_heat_grid": 0,
  "electricity_supplier": "mix",
  "spec_heat_consumption": 251721,
  "spec_power_consumption": 71428,
  "refurbished": true,
  "environmental_engagement": 0.9
}]

const districtData = [
  {
    "step": 0,
    "attributes": {
      "Verbrauch": 1000000,
      "CO2": 10.813611631,
      "Investment": 0.3,
    }
  },
  {
    "step": 1,
    "attributes": {
      "Verbrauch": 900000,
      "CO2": 9.813611631,
      "Investment": 0.4,
    }
  },
  {
    "step": 2,
    "attributes": {
      "Verbrauch": 800000,
      "CO2": 8.813611631,
      "Investment": 0.5,
    }
  },
  {
    "step": 3,
    "attributes": {
      "Verbrauch": 700000,
      "CO2": 7.813611631,
      "Investment": 0.6,
    }
  }
]
