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
  $(".input_households").hide();
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

const displayInputHouseholdsMode = function () {
  $(".questionnaire").hide();
  $(".input_scenarios").hide();
  $(".input_households").show();
  $(".simulationMode").hide();
  $(".dataViewIndividualMode").hide();
  $(".dataViewTotalMode").hide();
}
const displayInputEnvironmentMode = function () {
  $(".questionnaire").hide();
  $(".input_scenarios").show();
  $(".input_households").hide();
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
  $(".input_households").hide();
  $(".simulationMode").show();
  $(".dataViewIndividualMode").hide();
  $(".dataViewTotalMode").hide();
}

const displayDataViewIndividualMode = function () {
  $(".questionnaire").hide();
  $(".input_scenarios").hide();
  $(".input_households").hide();
  $(".simulationMode").hide();
  $(".dataViewIndividualMode").show();
  $(".dataViewTotalMode").hide();
  initDataViewIndividualContent();
  // updateSimulationOutputs();
}

const displayDataViewTotalMode = function () {
  $(".questionnaire").hide();
  $(".input_scenarios").hide();
  $(".input_households").hide();
  $(".simulationMode").hide();
  $(".dataViewIndividualMode").hide();
  $(".dataViewTotalMode").show();
  // updateSimulationOutputs();
}

const switchUserMode = function (mode, questionID) {
  // TODO: wrap in resetAnswer function
  grayoutAnswerYes()
  grayoutAnswerNo()
  if (mode == 'simulation') {
    displaySimulationMode()
  }
  else if (mode == 'input_scenarios') {
    displayInputEnvironmentMode()
  }
  else if (mode == 'input_households') {
    displayInputHouseholdsMode()
  }
  else if (mode == 'questionnaire') {
    const question = questions[questionID]
    displayQuestionnaireMode(question)
  }
  else if (mode == 'data_view_individual') {
    displayDataViewIndividualMode()
    removeHouseholdCards()
    createHouseholdCards()
  }
  else if (mode == 'data_view_total') {
    displayDataViewTotalMode()
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

//////////////////////////// slider ///////////////////////////
function processSliderHandle(slider_data){
  console.log(slider_data)
  if (slider_data.slider0 == "scenario_energy_prices"){
    $("#current_energy_prices_scenario").css("border", "5px goldenrod solid"); // create thick golden border
  }
  else {
    $("#current_energy_prices_scenario").css("border", ""); // remove border
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

const updateSimulationProgress = function(step){
  const totalSimulationStep = 9496
  const percentage = Math.ceil(step * 100 / totalSimulationStep)
  $("#simulationProgress").text(percentage)

}

