var PatternControl = function(){
	
	var patternClosingSource;
	var patternClosingDomain;
	var isPaused = false;
	
	PatternControl.prototype.init = function(){
		patternClosingSource = new Pattern.closingSource();	
		patternClosingDomain = new Pattern.closingDomain();
	
	}	
	
	PatternControl.prototype.control = function(action,page,prevPage){
		if(!isPaused){
			patternClosingSource.control(action,page,prevPage);
			patternClosingDomain.control(action,page,prevPage);
		}
	}
	
	PatternControl.prototype.pause = function(){
		isPaused = true;
	}
	
	PatternControl.prototype.start = function(){
		isPaused = false;
	}
}