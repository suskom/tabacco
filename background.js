var user, actionListener, patternControl, notifier, reactionControl;
var test = "";
var timeout;

user = new User();

user.getInfo(function(user_id, user_name, user_session){
	debugMessage("background.js","8","user name: "+user_name+" (id:"+user_id+") session: "+user_session);
	
	actionListener = new ActionListener();
	actionListener.start();
	patternControl = new PatternControl();
	patternControl.init();
	notifier = new Notifier();
	reactionControl = new ReactionControl();
});

chrome.idle.setDetectionInterval(600); //nastaviť čas po ktorom je idle
chrome.idle.onStateChanged.addListener(function (newState){
	debugMessage("background.js","18",newState);
	if(newState == "idle"){
		user.changeSession();
	}
	user.getInfo(function(user_id, user_name, user_session){
		debugMessage("background.js","23","user name: "+user_name+" (id:"+user_id+") session: "+user_session);
	});
});