var user, actionListener, patternControl;
var test = "";
var timeout;

user = new User();

user.getInfo(function(user_id, user_name, user_session){
	console.log("user name: "+user_name+" (id:"+user_id+") session: "+user_session);
	
	actionListener = new ActionListener();
	patternControl = new PatternControl();
	actionListener.start();
	patternControl.init();
});

chrome.idle.setDetectionInterval(600); //nastaviť čas po ktorom je idle
chrome.idle.onStateChanged.addListener(function (newState){
	console.log(newState);
	if(newState == "idle"){
		user.changeSession();
	}
	user.getInfo(function(user_id, user_name, user_session){
		console.log("user name: "+user_name+" (id:"+user_id+") session: "+user_session);
	});
});