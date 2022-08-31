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
  else if (event.key == "v") { //d for dataview
    toggleVerboseMode()
  }
});

function calculateNextUserMode(currentUserMode){
  const userModes = ["input_scenarios", "buildings_interaction", "simulation", "questionnaire", "data_view_individual", "data_view_total"]
  const currentUserModeIndex = userModes.indexOf(currentUserMode)
  const nextUserModeIndex = (currentUserModeIndex + 1) % userModes.length
  return userModes[nextUserModeIndex]
}

//jquery log function
$.fn.log = function() {
  console.log.apply(console, this);
  return this;
};
