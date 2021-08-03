const socket = io('localhost:8081');
let message;

socket.on('message', function(obj) {
	const json = JSON.parse(obj);
	// only log if it's different
	if (JSON.stringify(message) != JSON.stringify(json)) {
	  	console.log(json);
	  	message = json;
	  	const data = processData(json)
	  	updateInfoScreen(data);
	}

});

renderInfoScreen_horizontal(window.innerWidth, window.innerHeight, {"data":"tmp"});
updateInfoScreenWithAnimation(animationJson);
