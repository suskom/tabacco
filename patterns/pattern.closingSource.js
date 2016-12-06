Pattern.closingSource = function(){
	Pattern.call(this);	
	
	Pattern.closingSource.prototype.setState = function(stateNum, action){
		stateNumber = stateNum;
		state = action;
		actions.length = 0;
		
		switch(stateNumber) {
			case 0:
				
				break;
			case 1:
				
				break;
			case 2:
				console.log("spusti reakciu zatvorenia kariet jedného zdroja");
				//reaction.start("clossingTabs");
				break;
		}
	}
	
	Pattern.closingSource.prototype.control = function(action){
		console.log("pattern controled");
	}
}
Pattern.closingSource.prototype = Object.create(Pattern.prototype);
	
		




