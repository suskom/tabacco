var ReactionControl = function(){
	
	var lastReaction = 0;
	
	chrome.runtime.onMessage.addListener(
		function(request, sender, {}) {		
			if (request.answer == "áno"){
				console.log("aktivácia reakcie");
				reactionControl.trigger(sender.url.split("?")[1]);
			}
			else if(request.answer == "nie")
			{
				console.log("zatvorenie okna");
			}
	});
	
	ReactionControl.prototype.trigger = function(reaction){
		console.log("reaction "+reaction+" started"); 
	}
	
	
	
	ReactionControl.prototype.init = function(){
		
	}	
}