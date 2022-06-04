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
}

const displaySimulationMode = function(){
    $(".questionnaire").hide();
    $(".inputMode").hide();
    $(".simulationMode").show();
}

const switchUserMode = function(mode, questionID){
  //Todo: wrap in resetAnswer function
  grayoutAnswerYes()
  grayoutAnswerNo()
  if (mode == 'simulation'){
    displaySimulationMode()
  }
  else if (mode == 'input_environment' || mode == 'input_households'){
    displayInputMode()
  }
  else if (mode == 'questionnaire'){
    const question = questions[questionID]
    displayQuestionnaireMode(question)
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}