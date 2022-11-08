// ---------------------------- KEY EVENTS ----------------------------
let individualDataViewData_isSliderHandles = false

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
    currentIterationRound = (currentIterationRound + 1) % 4;
    console.log(currentIterationRound);
    tableAddColumn(currentIterationRound);
    
    const data =
      { "buildings_groups": { "group_0": { "buildings": [{ "address": "Rüsdorfer Straße 18", "spec_heat_consumption": 419.435035, "spec_power_consumption": 38.00364, "cluster_size": 2.0, "emissions_graphs": "data/outputs/output_test/emissions/CO2_emissions_7.55.png", "energy_prices_graphs": "data/outputs/output_test/energy_prices/energy_prices_7.55.png", "CO2": 0.022635805, "connection_to_heat_grid": 2026, "connection_to_heat_grid_prior": false, "refurbished": false, "refurbished_prior": false, "save_energy": false, "save_energy_prior": false, "energy_source": "Gas", "cell": "" }], "connections": 1 }, "group_1": [""], "group_2": [""], "group_3": [""] } };
      
    updateIndividualData(data);
    if (currentIterationRound == 0){
      location.reload(); // reload page
    }
  }
  else if (event.key == "i") {
    let individual_data_view_data_temp
    
    if (individualDataViewData_isSliderHandles == false) {
      individualDataViewData_isSliderHandles = true
      console.log(individualDataViewData_isSliderHandles)
      individual_data_view_data_temp = individualDataViewData.buildings_groups
    } else {
      individualDataViewData_isSliderHandles = false
      console.log(individualDataViewData_isSliderHandles)
      individual_data_view_data_temp = individualDataViewDataNoSliderHandles.buildings_groups
    }

    // sample data injection to individual data view
    if ('group_0' in individual_data_view_data_temp) renderHouseInfo(individual_data_view_data_temp.group_0, "dataViewIndividualQuarter0");
    if ('group_1' in individual_data_view_data_temp) renderHouseInfo(individual_data_view_data_temp.group_1, "dataViewIndividualQuarter1");
    if ('group_2' in individual_data_view_data_temp) renderHouseInfo(individual_data_view_data_temp.group_2, "dataViewIndividualQuarter2");
    if ('group_3' in individual_data_view_data_temp) renderHouseInfo(individual_data_view_data_temp.group_3, "dataViewIndividualQuarter3");
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
