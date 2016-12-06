var PatternControl = function(){
	
	var closingSource;
	
	PatternControl.prototype.init = function(){
		closingSource = new Pattern.closingSource();
	}
	
	PatternControl.prototype.control = function(action){
		closingSource.control();
	}
	
}