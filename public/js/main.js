const socket = io('localhost:8081');

let previousMessage;

socket.on('message', function(message) {
  // only log if it's different
  if (previousMessage != message) {
    const json = JSON.parse(message);
    console.log(json);
    const data = processData(json);
    updateInfoScreen(data);
  }
  previousMessage = message;
});

renderInfoScreen_horizontal();
updateInfoScreenWithAnimation(animationJson);
