// ---------------------------- KEY EVENTS ----------------------------
document.addEventListener('keydown', function (event) {
  if (event.key == " ") { // space
    const nextUserMode = calculateNextUserMode(currentUserMode)
    switchUserMode(nextUserMode, getRandomInt(5));
    currentUserMode = nextUserMode
    console.log("current user mode", currentUserMode);
  } else if (event.key == "d") { //d for dataview
    toggleDataViewContent()
  }
  else if (event.key == "v") {
    toggleVerboseMode()
    // show hidden elements:
    if ($('.dataViewIndividualMode .quarterSection').css("visibility") == "hidden") {
      $('.dataViewIndividualMode .quarterSection').css("visibility", "visible");
    }
  }
  else if (event.key == "t") {
    currentIterationRound++;
    console.log(currentIterationRound);
    tableAddColumn(currentIterationRound);

    const data =
      { "buildings_groups": { "group_0": { "buildings": [{ "address": "Rüsdorfer Straße 18", "avg_spec_heat_consumption": 419.435035, "avg_spec_power_consumption": 38.00364, "cluster_size": 2.0, "emissions_graphs": "data/outputs/output_20220928_11-15-26/emissions/CO2_emissions_7.44.png", "energy_prices_graphs": "data/outputs/output_20220928_11-15-26/energy_prices/energy_prices_7.44.png", "CO2": 0.022635805, "connection_to_heat_grid": 2026, "connection_to_heat_grid_prior": false, "refurbished": false, "refurbished_prior": false, "environmental_engagement": false, "environmental_engagement_prior": false, "energy_source": "Gas", "cell": "" }], "connections": 1 }, "group_1": [""], "group_2": [""], "group_3": [""] } };

    injectDataToIndividualDataView(data);
  }
});

function calculateNextUserMode(currentUserMode) {
  // const userModes = ["input_scenarios", "buildings_interaction", "simulation", "questionnaire", "individual_data_view", "total_data_view"]
  const userModes = ["buildings_interaction", "simulation", "individual_data_view", "total_data_view"]
  const currentUserModeIndex = userModes.indexOf(currentUserMode)
  const nextUserModeIndex = (currentUserModeIndex + 1) % userModes.length
  return userModes[nextUserModeIndex]
}

//jquery log function
$.fn.log = function () {
  console.log.apply(console, this);
  return this;
};
