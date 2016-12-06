chrome.idle.setDetectionInterval(5);
chrome.idle.onStateChanged.addListener(function (newState){
	console.log(newState);	
});