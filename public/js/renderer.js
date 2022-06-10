//dev function to print element that jquery captured
//usage: $(xxx).log()
$.fn.log = function() {
  console.log.apply(console, this);
  return this;
}

// ----------------------------- running modes ------------------------
const displayQuestionnaireMode = function(question){
    $(".questionnaire").show();
    $(".input_scenarios").hide();
    $(".input_households").hide();
    $(".simulationMode").hide();
    $(".dataViewMode").hide();
    $("#questionText").text(question)
}

const highlightAnswerYes = function(){
  $("#questionAnswerYes").addClass("questionAnswerYesActive")
}
const highlightAnswerNo = function(){
  $("#questionAnswerNo").addClass("questionAnswerNoActive")
}
const grayoutAnswerYes = function(){
  $("#questionAnswerYes").removeClass("questionAnswerYesActive")
}
const grayoutAnswerNo = function(){
  $("#questionAnswerNo").removeClass("questionAnswerNoActive")
}

const displayInputHouseholdsMode = function(){
  $(".questionnaire").hide();
  $(".input_scenarios").hide();
  $(".input_households").show();
  $(".simulationMode").hide();
  $(".dataViewMode").hide();
}
const displayInputEnvironmentMode = function(){
  $(".questionnaire").hide();
  $(".input_scenarios").show();
  $(".input_households").hide();
  $(".simulationMode").hide();
  $(".dataViewMode").hide();
}

const updateInputEnvironmentMode = function(scenario){
  // TODO: add "active" class to input scenario; drop from all others
  console.log(scenario);
}

const displaySimulationMode = function(){
    $(".questionnaire").hide();
    $(".input_scenarios").hide();
    $(".input_households").hide();
    $(".simulationMode").show();
    $(".dataViewMode").hide();
}

const displayDataViewMode = function(){
    $(".questionnaire").hide();
    $(".input_scenarios").hide();
    $(".input_households").hide();
    $(".simulationMode").hide();
    $(".dataViewMode").show();
    updateSimulationOutputs();
}

const switchUserMode = function(mode, questionID){
  //Todo: wrap in resetAnswer function
  grayoutAnswerYes()
  grayoutAnswerNo()
  if (mode == 'simulation'){
    displaySimulationMode()
  }
  else if (mode == 'input_scenarios'){
    displayInputEnvironmentMode()
  }
  else if (mode == 'input_households'){
    displayInputHouseholdsMode()
  }
  else if (mode == 'questionnaire'){
    const question = questions[questionID]
    displayQuestionnaireMode(question)
  }
  else if (mode == 'data_view'){
    displayDataViewMode()
    removeHouseholdCards()
    createHouseholdCards()
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}