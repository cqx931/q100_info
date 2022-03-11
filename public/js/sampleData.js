// ------------------------- DATA STRUCTS -----------------------------
let simulationData = {
  year: 2022,
  co2: '500',
  wärme: 'y',
  strom: 'z',
  förderung: 'n'
}

const sampleHouseInfo = [{
  "adresse": "Straßenname 19",
  "CO2": 0.2036314841,
  "anschluss": 0,
  "investment": 2,
  "versorgung": "konventionell",
  "Wärmeverbrauch 2017 [kWh]": 71921,
  "Stromverbrauch 2017 [kWh]": 10260
}, {
  "adresse": "Straßenname 15",
  "CO2": 0.2488510615,
  "anschluss": 1,
  "investment": 3,
  "versorgung": "gruen",
  "Wärmeverbrauch 2017 [kWh]": 161150,
  "Stromverbrauch 2017 [kWh]": 46197
}, {
  "adresse": "Straßenname 8",
  "CO2": 0.317290762,
  "anschluss": 0,
  "investment": 1,
  "versorgung": "medium",
  "Wärmeverbrauch 2017 [kWh]": 251721,
  "Stromverbrauch 2017 [kWh]": 71428
}]

const quartierData = [
  {
    "step": 0,
    "attributes": {
      "Verbrauch": 1000000,
      "CO2": 10.813611631,
      "Investment": 0.3,
      "EEH": 0.4458936055
    }
  },
  {
    "step": 1,
    "attributes": {
      "Verbrauch": 900000,
      "CO2": 9.813611631,
      "Investment": 0.4,
      "EEH": 0.5458936055
    }
  },
  {
    "step": 2,
    "attributes": {
      "Verbrauch": 800000,
      "CO2": 8.813611631,
      "Investment": 0.5,
      "EEH": 0.6458936055
    }
  },
  {
    "step": 3,
    "attributes": {
      "Verbrauch": 700000,
      "CO2": 7.813611631,
      "Investment": 0.6,
      "EEH": 0.7458936055
    }
  }
]

const sampleQuestions = [
  "Die globale Erderwärmung wird durch von Menschen produzierte Emissionen verstärkt.",
  "Der Schutz der Umwelt ist ein Mittel zur Stärkung des Wirtschaftswachstums in Deutschland.",
  "Ich glaube, dass wir jedes Mal, wenn wir Kohle, Öl oder Gas verwenden, zum Klimawandel beitragen.",
  "Ich würde meinen Energieverbrauch reduzieren, wenn mein Haushalt mehr Energie verbraucht als ähnliche Haushalte.",
  "Wenn ein erneuerbarer Energietarif bei einem anderen Energieversorger verfügbar wäre, würde ich meinen Anbieter wechseln.",
]