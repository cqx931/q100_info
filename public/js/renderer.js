//dev function to print element that jquery captured
//usage: $(xxx).log()
$.fn.log = function() {
  console.log.apply(console, this);
  return this;
}

// ----------------------------- running modes ------------------------
const displayQuestionnaireMode = function(question){
    $(".questionnaire").show();
    $(".inputMode").hide();
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

const displayInputMode = function(){
    $(".questionnaire").hide();
    $(".inputMode").show();
    $(".simulationMode").hide();
    $(".dataViewMode").hide();
}

const displaySimulationMode = function(){
    $(".questionnaire").hide();
    $(".inputMode").hide();
    $(".simulationMode").show();
    $(".dataViewMode").hide();
}

const displayDataViewMode = function(){
    $(".questionnaire").hide();
    $(".inputMode").hide();
    $(".simulationMode").hide();
    $(".dataViewMode").show();

}

const switchUserMode = function(mode, question){
  //Todo: wrap in resetAnswer function
  grayoutAnswerYes()
  grayoutAnswerNo()
  if (mode == 'simulation'){
    displaySimulationMode()
  }
  else if (mode == 'input'){
    displayInputMode()
  }
  else if (mode == 'questionnaire'){
    displayQuestionnaireMode(question)
  }
  else if (mode == 'dataView'){
    displayDataViewMode()
    removeHouseholdCards()
    createHouseholdCards()
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}