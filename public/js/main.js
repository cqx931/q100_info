
//------------------------- COMMUNICATION -----------------------------
// ----------------- processing of incoming data ----------------------
const socket = io('localhost:8081');

let previousMessage;
socket.on('message', function (message) {
  // only log if it's different
  if (previousMessage != message) {
    const json = JSON.parse(message);

    console.log("incoming message:", json);

    // ------------------------- ENVIRONMENT --------------------------
    if (json.hasOwnProperty('mode')) {
      const nextUserMode = json.mode;
      switchUserMode(nextUserMode);
    }
    if (json.hasOwnProperty("current_iteration_round")) {
      if (currentIterationRound != json.current_iteration_round) {
        currentIterationRound = json.current_iteration_round;
        console.log("current_iteration_round = " + currentIterationRound);
        tableAddColumn(json.current_iteration_round);
      }
    }

    // ------------------------ QUESTIONNAIRE -------------------------
    if (json.hasOwnProperty('answer')) {
      const answer = json.answer
      //Todo make a function to judge this condition
      if (answer == "yes") {
        highlightAnswerYes();
      } else if (answer == "no") {
        highlightAnswerNo();
      }
    }

    // -------------------- BUILDINGS INTERACTION ---------------------
    if (json.hasOwnProperty('buildings_groups')) {
      if ('group_0' in json.buildings_groups) renderHouseInfo(json.buildings_groups.group_0, "dataViewIndividualQuarter0");
      if ('group_1' in json.buildings_groups) renderHouseInfo(json.buildings_groups.group_1, "dataViewIndividualQuarter1");
      if ('group_2' in json.buildings_groups) renderHouseInfo(json.buildings_groups.group_2, "dataViewIndividualQuarter2");
      if ('group_3' in json.buildings_groups) renderHouseInfo(json.buildings_groups.group_3, "dataViewIndividualQuarter3");

      // households and cluster data:
      // const data = processData(json);
      // updateClusterCharts(data);
      // updateTotalCharts(data);
      updateSelectedConnectionsNumber(json);
      injectDataToIndividualDataView(json);
    }

    // scenarios:
    // if (json.hasOwnProperty('active_scenario_handle') && json.hasOwnProperty('mode')){
    //   updateInputEnvironmentMode(json.active_scenario_handle);
    // }
    // energy prices:
    if (json.hasOwnProperty('scenario_energy_prices')) {
      updateCurrentScenarioGraph(json.scenario_energy_prices);
    }
    if (json.hasOwnProperty('scenario_num_connections')) {
      updateConnectionsScenario(json.scenario_num_connections);
    }

    if (json.hasOwnProperty('scenario_data')) {
      processScenarioList(json.scenario_data);
    }

    // slider:
    if (json.hasOwnProperty('sliders')) {
      processSliderHandle(json.sliders);
    }

    // --------------------------- DATA VIEW --------------------------
    // for updating imgs on data view after rendering at if(json.mode) section
    // for updating multiLineGraph on data view after rendering at if(json.mode) section
    if (json.hasOwnProperty("data_view_neighborhood_data")) {
      injectDataToDataView(json.data_view_neighborhood_data)
    }
    if (json.hasOwnProperty("neighborhood_images")) {
      renewResultsImages(json.neighborhood_images)
    }

    // update canvas image
    // updateMapImage();

    // --------------------------- SIMULATION -------------------------
    if (json.hasOwnProperty("final_step")) {
      simulationFinalStep = json.final_step;
    }
    if (json.hasOwnProperty("step")) {
      updateSimulationProgress(json.step)
    }

    previousMessage = message;
  }
});

async function fetchDataFromApi(arg) {
  const path = '/api/' + arg
  return await axios.get(path)
}

// fetch simulation_df from node express server /api/data endpoint
// implemented for development purpose (in production mode, data should be handled only through socket)
async function fetchSimulationDataFrame() {
  const dataObject = await fetchDataFromApi('data');
  const retval = dataObject.data
  return retval
}

async function fetchQuestions() {
  const questionsObject = await fetchDataFromApi('questions');
  const retval = questionsObject.data
  return retval
}

// async function fetchGAMAData() {
//   const questionsObject = await fetchDataFromApi('GAMAData');
//   const retval = questionsObject.data
//   return retval
// }


// simulation_df = await fetchSimulationDataFrame()
// questions = await fetchQuestions()
// GAMAData = await fetchGAMAData()



//////////////////////////// MAIN SCRIPT //////////////////////////////
// ------------------------ UPDATE FUNCTIONS --------------------------
function initialRender() {
  // console.log("simulation_df", simulation_df);
  // console.log("questions", questions);
  // updateClusterCharts(clusterBefore);
  // updateTotalCharts(totalBefore);

  // toggleVerboseMode();
  // if ($('.dataViewIndividualMode .quarterSection').css("visibility") == "hidden") {
  //   $('.dataViewIndividualMode .quarterSection').css("visibility", "visible");
  // }

  // updateSelectedConnectionsNumber(buildingInteractionModeData)
  // processScenarioData(simulationData); // replaces variables in simulation_template
  // renderSimulationScreen(simulation_df, districtData);
  switchUserMode(currentUserMode, getRandomInt(5)); //initial render
  // dev use sampleData/sampleGAMAImgSrcPaths 0-3 for rendering dataview
  // ToDo: after testing UDP messaging for dataview, graphs_wrapper_0 should be replaced with empty div like other sections
  // renewDataViewGAMAImgSrcPath(sampleGAMAImgSrcPaths2.iteration_round, sampleGAMAImgSrcPaths2)
  // renewDataViewGAMAImgsPerSection(sampleGAMAImgSrcPaths2.iteration_round)

  // injectDataToDataView(sampleDataViewData.data_view_data)
  // injectDataToIndividualDataView(dataViewIndividualData.data_view_individual_data)

  // TODO: move sample data injection to devtool
  // let individual_data_view_data_temp = individualDataViewData.buildings_groups
  // if ('group_0' in individual_data_view_data_temp) renderHouseInfo(individual_data_view_data_temp.group_0, "dataViewIndividualQuarter0");
  // if ('group_1' in individual_data_view_data_temp) renderHouseInfo(individual_data_view_data_temp.group_1, "dataViewIndividualQuarter1");
  // if ('group_2' in individual_data_view_data_temp) renderHouseInfo(individual_data_view_data_temp.group_2, "dataViewIndividualQuarter2");
  // if ('group_3' in individual_data_view_data_temp) renderHouseInfo(individual_data_view_data_temp.group_3, "dataViewIndividualQuarter3");

}

initialRender()
