// ----------------------------- running modes ------------------------
const displayQuestionnaireMode = function(question){
    $(".questionnaire").show();
    $(".inputMode").hide();
    $(".simulationMode").hide();

    if (question){
      $("#question").text(question)
    } else {
      $("#question").text(sampleQuestions[getRandomInt(5)])
    }
    
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

const switchUserMode = function(mode, question){
  if (mode == 'simulation'){
    displaySimulationMode()
  }
  else if (mode == 'input'){
    displayInputMode()
  }
  else if (mode == 'questionnaire'){
    displayQuestionnaireMode(question)
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}