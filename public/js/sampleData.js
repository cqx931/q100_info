// ------------------------- DATA STRUCTS -----------------------------
let simulationData = {
  year: 2022,
  co2: '500',
  active_scenario: 'Ref',
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

const sampleGAMAImgSrcPaths0 =
  { 'iteration_round': 0, 'images': ['data/outputs/output/snapshot/Chartsnull-9.png', 'data/outputs/output/snapshot/Emissions cumulativenull-9.png', 'data/outputs/output/snapshot/Emissions per yearnull-9.png', 'data/outputs/output/snapshot/households_employment_pienull-9.png', 'data/outputs/output/snapshot/Modernizationnull-9.png', 'data/outputs/output/snapshot/neighborhoodnull-9.png'] }
const sampleGAMAImgSrcPaths1 =
  { 'iteration_round': 1, 'images': ['data/outputs/output/snapshot/Chartsnull-9.png', 'data/outputs/output/snapshot/Emissions cumulativenull-9.png', 'data/outputs/output/snapshot/Emissions per yearnull-9.png', 'data/outputs/output/snapshot/households_employment_pienull-9.png', 'data/outputs/output/snapshot/Modernizationnull-9.png', 'data/outputs/output/snapshot/neighborhoodnull-9.png'] }
const sampleGAMAImgSrcPaths2 =
  { 'iteration_round': 2, 'images': ['data/outputs/output/snapshot/Chartsnull-9.png', 'data/outputs/output/snapshot/Emissions cumulativenull-9.png', 'data/outputs/output/snapshot/Emissions per yearnull-9.png', 'data/outputs/output/snapshot/households_employment_pienull-9.png', 'data/outputs/output/snapshot/Modernizationnull-9.png', 'data/outputs/output/snapshot/neighborhoodnull-9.png'] }
const sampleGAMAImgSrcPaths3 =
  { 'iteration_round': 3, 'images': ['data/outputs/output/snapshot/Chartsnull-9.png', 'data/outputs/output/snapshot/Emissions cumulativenull-9.png', 'data/outputs/output/snapshot/Emissions per yearnull-9.png', 'data/outputs/output/snapshot/households_employment_pienull-9.png', 'data/outputs/output/snapshot/Modernizationnull-9.png', 'data/outputs/output/snapshot/neighborhoodnull-9.png'] }



const sampleDataViewData = {
  "data_view_data": [{
    "iteration_round": 0,
    "gama_iteration_images": [
      "data/outputs/output/snapshot/Chartsnull-9495.png",
      "data/outputs/output/snapshot/Emissions cumulativenull-9495.png",
      "data/outputs/output/snapshot/Emissions per yearnull-9495.png",
      "data/outputs/output/snapshot/households_employment_pienull-9495.png",
      "data/outputs/output/snapshot/Modernizationnull-9495.png",
      "data/outputs/output/snapshot/neighborhoodnull-9495.png"
    ],
    "emissions_data_paths": [
      "data/includes/csv_export/emissions/csv_export_co2_graph_test_7.51.csv",
      "data/includes/csv_export/emissions/csv_export_co2_graph_test_2.09.csv",
      "data/includes/csv_export/emissions/csv_export_co2_graph_test_7.14.csv",
      "data/includes/csv_export/emissions/csv_export_co2_graph_test_2.19.csv",
      "data/includes/csv_export/emissions/csv_export_co2_graph_test_3.04.csv",
      "data/includes/csv_export/emissions/csv_export_co2_graph_test_7.58.csv",
      "data/includes/csv_export/emissions/csv_export_co2_graph_test_7.54.csv",
      "data/includes/csv_export/emissions/csv_export_co2_graph_test_7.03.csv",
      "data/includes/csv_export/emissions/csv_export_co2_graph_test_7.57.csv",
      "data/includes/csv_export/emissions/csv_export_co2_graph_test_1.03.csv",
      "data/includes/csv_export/emissions/csv_export_co2_graph_test_2.13.csv"
    ]
  }
  ]
}