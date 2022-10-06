//dev function to print element that jquery captured
//usage: $(xxx).log()
$.fn.log = function () {
  console.log.apply(console, this);
  return this;
}

// ----------------------------- running modes ------------------------
const displayQuestionnaireMode = function (question) {
  $(".questionnaire").show();
  $(".input_scenarios").hide();
  $(".buildings_interaction").hide();
  $(".simulationMode").hide();
  $(".dataViewIndividualMode").hide();
  $("#questionText").text(question)
}

const highlightAnswerYes = function () {
  $("#questionAnswerYes").addClass("questionAnswerYesActive")
}
const highlightAnswerNo = function () {
  $("#questionAnswerNo").addClass("questionAnswerNoActive")
}
const grayoutAnswerYes = function () {
  $("#questionAnswerYes").removeClass("questionAnswerYesActive")
}
const grayoutAnswerNo = function () {
  $("#questionAnswerNo").removeClass("questionAnswerNoActive")
}

const displayBuildingsInteractionMode = function () {
  $(".questionnaire").hide();
  $(".input_scenarios").hide();
  $(".buildings_interaction").show();
  $(".simulationMode").hide();
  $(".dataViewIndividualMode").hide();
  $(".dataViewTotalMode").hide();
}
const displayInputEnvironmentMode = function () {
  $(".questionnaire").hide();
  $(".input_scenarios").show();
  $(".buildings_interaction").hide();
  $(".simulationMode").hide();
  $(".dataViewIndividualMode").hide();
  $(".dataViewTotalMode").hide();
}

const updateInputEnvironmentMode = function (scenario_handle) {
  $(".scenario img").css("border", "") // reset border
  let identifier = "#scenario_img_" + scenario_handle;
  $(identifier).css("border", "5px goldenrod solid"); // create thick golden border
}

const displaySimulationMode = function () {
  $(".questionnaire").hide();
  $(".input_scenarios").hide();
  $(".buildings_interaction").hide();
  $(".simulationMode").show();
  $(".dataViewIndividualMode").hide();
  $(".dataViewTotalMode").hide();
}

const displayDataViewIndividualMode = function () {
  $(".questionnaire").hide();
  $(".input_scenarios").hide();
  $(".buildings_interaction").hide();
  $(".simulationMode").hide();
  $(".dataViewIndividualMode").show();
  $(".dataViewTotalMode").hide();
  initDataViewIndividualContent();
  // updateSimulationOutputs();
}

const displayDataViewTotalMode = function () {
  $(".questionnaire").hide();
  $(".input_scenarios").hide();
  $(".buildings_interaction").hide();
  $(".simulationMode").hide();
  $(".dataViewIndividualMode").hide();
  $(".dataViewTotalMode").show();
  // updateSimulationOutputs();
}

const switchUserMode = function (mode) {
  // TODO: wrap in resetAnswer function
  grayoutAnswerYes()
  grayoutAnswerNo()
  if (mode == 'simulation') {
    displaySimulationMode()
  }
  else if (mode == 'input_scenarios') {
    displayInputEnvironmentMode()
  }
  else if (mode == 'buildings_interaction') {
    displayBuildingsInteractionMode()
  }
  else if (mode == 'questionnaire') {
    const question = questions[getRandomInt(5)] //TODO: get question number from UDP

    displayQuestionnaireMode(question)
  }
  else if (mode == 'individual_data_view') {
    displayDataViewIndividualMode()
    removeHouseholdCards()
    createHouseholdCards()
  }
  else if (mode == 'total_data_view') {
    displayDataViewTotalMode()
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

//////////////////////////// slider ///////////////////////////
function processSliderHandle(slider_data) {
  console.log(slider_data)
  if (slider_data.id == "slider0") {
    if (slider_data.handle == "scenario_energy_prices") {
      $("#current_energy_prices_scenario").css("border", "5px goldenrod solid"); // create thick golden border
    }
    else {
      $("#current_energy_prices_scenario").css("border", "1px goldenrod dotted"); // remove border
    }
    if (slider_data.handle == "num_connections") {
      $("#scenario_num_connections").css("border", "5px chartreuse solid"); // create thick blue border
    }
    else{
      $("#scenario_num_connections").css("border", "1px chartreuse dotted"); // create thick blue border
    }
  }


}

////////////////////////// dev tools //////////////////////////
const initDataViewIndividualContent = function () {
  $("#data_view_d3").hide();
  $("#data_view_img").show();
}

const toggleDataViewContent = function () {
  if ($("#data_view_d3").is(":visible")) {
    $("#data_view_d3").hide();
    $("#data_view_img").show();
  } else {
    $("#data_view_d3").show();
    $("#data_view_img").hide();
  }
}

let verBoseMode = false
const toggleVerboseMode = function () {
  verBoseMode = !verBoseMode
  if (verBoseMode)
    $("div").css("border", "1px black solid")
  else
    $("div").css("border", "")
}

const updateSimulationProgress = function (step) {
  const percentage = Math.ceil(step * 100 / simulationFinalStep)
  $("#simulationProgress").text(percentage)

}

