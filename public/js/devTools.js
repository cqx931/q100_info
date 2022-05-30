// ---------------------------- KEY EVENTS ----------------------------
document.addEventListener('keydown', function (event) {
  console.log("current user mode", currentUserMode);
  if (event.key == " ") { // space
    const nextUserMode = calculateNextUserMode(currentUserMode)
    switchUserMode(nextUserMode, sampleQuestions[getRandomInt(5)]);
    currentUserMode = nextUserMode
  }
});

function calculateNextUserMode(currentUserMode){
  const userModes = ["input_environment", "input_households", "simulation", "questionnaire", "data_view"]
  const currentUserModeIndex = userModes.indexOf(currentUserMode)
  const nextUserModeIndex = (currentUserModeIndex + 1) % userModes.length
  return userModes[nextUserModeIndex]
}
