// ------------------------- DATA STRUCTS -----------------------------
let simulationData = {
  year: 2022,
  co2: '500',
  active_scenario_handle: 'Ref',
  wärme: 'y',
  strom: 'z',
  förderung: 'n'
}

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


const individualDataViewData =
{
  "buildings_groups": {
      "group_0": {
          "buildings": [
              {
                  "address": "R\u00fcsdorfer Stra\u00dfe 18",
                  "avg_spec_heat_consumption": 417.4165075,
                  "avg_spec_power_consumption": 35.305475,
                  "cluster_size": 4,
                  "emissions_graphs": "",
                  "energy_prices_graphs": "",
                  "CO2": 0.022635805,
                  "connection_to_heat_grid": false,
                  "connection_to_heat_grid_prior": false,
                  "refurbished": false,
                  "refurbished_prior": false,
                  "save_energy": false,
                  "save_energy_prior": false,
                  "energy_source": "Gas",
                  "cell": ""
              },
              {
                  "address": "R\u00fcsdorfer Stra\u00dfe 40",
                  "avg_spec_heat_consumption": 197.379868,
                  "avg_spec_power_consumption": 36.4716976,
                  "cluster_size": 25,
                  "emissions_graphs": "",
                  "energy_prices_graphs": "",
                  "CO2": 0.0120015825,
                  "connection_to_heat_grid": false,
                  "connection_to_heat_grid_prior": false,
                  "refurbished": false,
                  "refurbished_prior": false,
                  "save_energy": false,
                  "save_energy_prior": false,
                  "energy_source": "Gas",
                  "cell": ""
              }
          ],
          "connections": 0,
          "slider_handles": [
              "connection_to_heat_grid", "refurbished"
          ]
      },
      "group_1": {
          "buildings": [
              {
                  "address": "R\u00fcsdorfer Stra\u00dfe 61",
                  "avg_spec_heat_consumption": 119.17281,
                  "avg_spec_power_consumption": 16.1021586364,
                  "cluster_size": 22,
                  "emissions_graphs": "",
                  "energy_prices_graphs": "",
                  "CO2": 0.006376463,
                  "connection_to_heat_grid": false,
                  "connection_to_heat_grid_prior": false,
                  "refurbished": false,
                  "refurbished_prior": false,
                  "save_energy": false,
                  "save_energy_prior": false,
                  "energy_source": "Gas",
                  "cell": ""
              }
          ],
          "connections": 0,
          "slider_handles": ["connection_to_heat_grid", "refurbished"]
      },
      "group_2": {
          "buildings": [
              {
                  "address": "R\u00fcsdorfer Stra\u00dfe 47",
                  "avg_spec_heat_consumption": 147.10931,
                  "avg_spec_power_consumption": 33.40084,
                  "cluster_size": 2,
                  "emissions_graphs": "",
                  "energy_prices_graphs": "",
                  "CO2": 0.009385106,
                  "connection_to_heat_grid": false,
                  "connection_to_heat_grid_prior": false,
                  "refurbished": false,
                  "refurbished_prior": false,
                  "save_energy": false,
                  "save_energy_prior": false,
                  "energy_source": "Strom",
                  "cell": ""
              }
          ],
          "connections": 0,
          "slider_handles": ["save_energy"]
      },
      "group_3": {
          "buildings": [
              {
                  "address": "R\u00fcsdorfer Stra\u00dfe 16",
                  "avg_spec_heat_consumption": 344.119725,
                  "avg_spec_power_consumption": 50.34868,
                  "cluster_size": 4,
                  "emissions_graphs": "",
                  "energy_prices_graphs": "",
                  "CO2": 0.0191294115,
                  "connection_to_heat_grid": false,
                  "connection_to_heat_grid_prior": false,
                  "refurbished": false,
                  "refurbished_prior": false,
                  "save_energy": false,
                  "save_energy_prior": false,
                  "energy_source": "Gas",
                  "cell": ""
              }
          ],
          "connections": 0,
          "slider_handles": []
      }
  }
}


const individualDataViewDataNoSliderHandles =
{
  "buildings_groups": {
      "group_0": {
          "buildings": [
              {
                  "address": "R\u00fcsdorfer Stra\u00dfe 18",
                  "avg_spec_heat_consumption": 417.4165075,
                  "avg_spec_power_consumption": 35.305475,
                  "cluster_size": 4,
                  "emissions_graphs": "",
                  "energy_prices_graphs": "",
                  "CO2": 0.022635805,
                  "connection_to_heat_grid": false,
                  "connection_to_heat_grid_prior": false,
                  "refurbished": false,
                  "refurbished_prior": false,
                  "save_energy": false,
                  "save_energy_prior": false,
                  "energy_source": "Gas",
                  "cell": ""
              },
              {
                  "address": "R\u00fcsdorfer Stra\u00dfe 40",
                  "avg_spec_heat_consumption": 197.379868,
                  "avg_spec_power_consumption": 36.4716976,
                  "cluster_size": 25,
                  "emissions_graphs": "",
                  "energy_prices_graphs": "",
                  "CO2": 0.0120015825,
                  "connection_to_heat_grid": false,
                  "connection_to_heat_grid_prior": false,
                  "refurbished": false,
                  "refurbished_prior": false,
                  "save_energy": false,
                  "save_energy_prior": false,
                  "energy_source": "Gas",
                  "cell": ""
              }
          ],
          "connections": 0,
          "slider_handles": []
      },
      "group_1": {
          "buildings": [
              {
                  "address": "R\u00fcsdorfer Stra\u00dfe 61",
                  "avg_spec_heat_consumption": 119.17281,
                  "avg_spec_power_consumption": 16.1021586364,
                  "cluster_size": 22,
                  "emissions_graphs": "",
                  "energy_prices_graphs": "",
                  "CO2": 0.006376463,
                  "connection_to_heat_grid": false,
                  "connection_to_heat_grid_prior": false,
                  "refurbished": false,
                  "refurbished_prior": false,
                  "save_energy": false,
                  "save_energy_prior": false,
                  "energy_source": "Gas",
                  "cell": ""
              }
          ],
          "connections": 0,
          "slider_handles": []
      },
      "group_2": {
          "buildings": [
              {
                  "address": "R\u00fcsdorfer Stra\u00dfe 47",
                  "avg_spec_heat_consumption": 147.10931,
                  "avg_spec_power_consumption": 33.40084,
                  "cluster_size": 2,
                  "emissions_graphs": "",
                  "energy_prices_graphs": "",
                  "CO2": 0.009385106,
                  "connection_to_heat_grid": false,
                  "connection_to_heat_grid_prior": false,
                  "refurbished": false,
                  "refurbished_prior": false,
                  "save_energy": false,
                  "save_energy_prior": false,
                  "energy_source": "Strom",
                  "cell": ""
              }
          ],
          "connections": 0,
          "slider_handles": []
      },
      "group_3": {
          "buildings": [
              {
                  "address": "R\u00fcsdorfer Stra\u00dfe 16",
                  "avg_spec_heat_consumption": 344.119725,
                  "avg_spec_power_consumption": 50.34868,
                  "cluster_size": 4,
                  "emissions_graphs": "",
                  "energy_prices_graphs": "",
                  "CO2": 0.0191294115,
                  "connection_to_heat_grid": false,
                  "connection_to_heat_grid_prior": false,
                  "refurbished": false,
                  "refurbished_prior": false,
                  "save_energy": false,
                  "save_energy_prior": false,
                  "energy_source": "Gas",
                  "cell": ""
              }
          ],
          "connections": 0,
          "slider_handles": []
      }
  }
}


