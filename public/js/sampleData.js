// ------------------------- DATA STRUCTS -----------------------------
let simulationData = {
  year: 2022,
  co2: '500',
  active_scenario_handle: 'Ref',
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


const dataViewIndividualData = {
    "data_view_individual_data": {
        "buildings_groups": {
            "group_0": {
                "buildings": [
                    {
                        "address": "Rüsdorfer Straße 18",
                        "avg_spec_heat_consumption": 168.2295352941,
                        "avg_spec_power_consumption": 0.0,
                        "cluster_size": 34.0,
                        "emissions_graphs": "data/outputs/output_test/individualDataViewCO2graph.png",
                        "energy_prices_graphs": "data/outputs/output_test/individualDataViewStormgraph.png",
                        "CO2": 0.022635805,
                        "connection_to_heat_grid": true,
                        "connection_to_heat_grid_prior": true,
                        "refurbished": true,
                        "refurbished_prior": true,
                        "environmental_engagement": true,
                        "environmental_engagement_prior": true,
                        "energy_source": "Gas",
                        "cell": ""
                    }
                ],
                "connections": 0
            },
            "group_1": {
                "buildings": [
                    {
                        "address": "Rüsdorfer Straße 18",
                        "avg_spec_heat_consumption": 168.2295352941,
                        "avg_spec_power_consumption": 0.0,
                        "cluster_size": 34.0,
                        "emissions_graphs": "data/outputs/output_test/individualDataViewCO2graph.png",
                        "energy_prices_graphs": "data/outputs/output_test/individualDataViewStormgraph.png",
                        "CO2": 0.022635805,
                        "connection_to_heat_grid": true,
                        "connection_to_heat_grid_prior": true,
                        "refurbished": true,
                        "refurbished_prior": true,
                        "environmental_engagement": true,
                        "environmental_engagement_prior": true,
                        "energy_source": "Gas",
                        "cell": ""
                    }
                ],
                "connections": 0
            },
            "group_2": {
                "buildings": [
                    {
                        "address": "Rüsdorfer Straße 18",
                        "avg_spec_heat_consumption": 168.2295352941,
                        "avg_spec_power_consumption": 0.0,
                        "cluster_size": 34.0,
                        "emissions_graphs": "data/outputs/output_test/individualDataViewCO2graph.png",
                        "energy_prices_graphs": "data/outputs/output_test/individualDataViewStormgraph.png",
                        "CO2": 0.022635805,
                        "connection_to_heat_grid": true,
                        "connection_to_heat_grid_prior": true,
                        "refurbished": true,
                        "refurbished_prior": true,
                        "environmental_engagement": true,
                        "environmental_engagement_prior": true,
                        "energy_source": "Gas",
                        "cell": ""
                    }
                ],
                "connections": 0
            },
            "group_3": {
                "buildings": [
                    {
                        "address": "Rüsdorfer Straße 18",
                        "avg_spec_heat_consumption": 168.2295352941,
                        "avg_spec_power_consumption": 0.0,
                        "cluster_size": 34.0,
                        "emissions_graphs": "data/outputs/output_test/individualDataViewCO2graph.png",
                        "energy_prices_graphs": "data/outputs/output_test/individualDataViewStormgraph.png",
                        "CO2": 0.022635805,
                        "connection_to_heat_grid": true,
                        "connection_to_heat_grid_prior": true,
                        "refurbished": true,
                        "refurbished_prior": true,
                        "environmental_engagement": true,
                        "environmental_engagement_prior": true,
                        "energy_source": "Gas",
                        "cell": ""
                    }
                ],
                "connections": 0
            },
        }
    }
}

const buildingInteractionModeData = 

{
    "buildings_groups": {
        "group_0": {
            "buildings": [
                {
                    "address": "R\u00fcsdorfer Stra\u00dfe 28",
                    "avg_spec_heat_consumption": 224.0,
                    "avg_spec_power_consumption": 19.678693,
                    "cluster_size": 10.0,
                    "emissions_graphs": "data/outputs/output_20220915_08-16-27/emissions/CO2_emissions_7.50.png",
                    "energy_prices_graphs": "data/outputs/output_20220915_08-16-27/energy_prices/energy_prices_7.50.png",
                    "CO2": 0.0125813315,
                    "connection_to_heat_grid": false,
                    "connection_to_heat_grid_prior": false,
                    "refurbished": false,
                    "refurbished_prior": false,
                    "environmental_engagement": false,
                    "environmental_engagement_prior": false,
                    "energy_source": "\u00d6l",
                    "cell": ""
                }
            ],
            "connections": 0
        },
        "group_1": {
            "buildings": [
                {
                    "address": "R\u00fcsdorfer Stra\u00dfe 40",
                    "avg_spec_heat_consumption": 196.4097951852,
                    "avg_spec_power_consumption": 36.5880559259,
                    "cluster_size": 27.0,
                    "emissions_graphs": "data/outputs/output_20220915_08-16-27/emissions/CO2_emissions_7.55.png",
                    "energy_prices_graphs": "data/outputs/output_20220915_08-16-27/energy_prices/energy_prices_7.55.png",
                    "CO2": 0.0120015825,
                    "connection_to_heat_grid": false,
                    "connection_to_heat_grid_prior": false,
                    "refurbished": false,
                    "refurbished_prior": false,
                    "environmental_engagement": true,
                    "environmental_engagement_prior": true,
                    "energy_source": "Gas",
                    "cell": ""
                }
            ],
            "connections": 1
        },
        "group_2": {
            "buildings": [
                {
                    "address": "R\u00fcsdorfer Stra\u00dfe 40",
                    "avg_spec_heat_consumption": 196.4097951852,
                    "avg_spec_power_consumption": 36.5880559259,
                    "cluster_size": 27.0,
                    "emissions_graphs": "data/outputs/output_20220915_08-16-27/emissions/CO2_emissions_7.55.png",
                    "energy_prices_graphs": "data/outputs/output_20220915_08-16-27/energy_prices/energy_prices_7.55.png",
                    "CO2": 0.0120015825,
                    "connection_to_heat_grid": false,
                    "connection_to_heat_grid_prior": false,
                    "refurbished": false,
                    "refurbished_prior": false,
                    "environmental_engagement": true,
                    "environmental_engagement_prior": true,
                    "energy_source": "Gas",
                    "cell": ""
                }
            ],
            "connections": 2
        },

        "group_3": {
            "buildings": [
                {
                    "address": "R\u00fcsdorfer Stra\u00dfe 40",
                    "avg_spec_heat_consumption": 196.4097951852,
                    "avg_spec_power_consumption": 36.5880559259,
                    "cluster_size": 27.0,
                    "emissions_graphs": "data/outputs/output_20220915_08-16-27/emissions/CO2_emissions_7.55.png",
                    "energy_prices_graphs": "data/outputs/output_20220915_08-16-27/energy_prices/energy_prices_7.55.png",
                    "CO2": 0.0120015825,
                    "connection_to_heat_grid": false,
                    "connection_to_heat_grid_prior": false,
                    "refurbished": false,
                    "refurbished_prior": false,
                    "environmental_engagement": true,
                    "environmental_engagement_prior": true,
                    "energy_source": "Gas",
                    "cell": ""
                }
            ],
            "connections": 3
        },

    }
}
const buildingsInteractionModeHighlight = {"sliders": {"id": "slider0", "handle": "environmental_engagement", "group": 0}}
