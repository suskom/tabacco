var Pattern = function(initCurrentState, initReactions, initStates){

	this.currentState = initCurrentState;
	this.reactions = initReactions;
	this.states = initStates;

	this.controlEdgeParameter = function(conditions,values,action){
		var result, diffValue;
			
			for(key in values){
				if(conditions[3] == "state"){
					if(typeof(this.currentState[key]) == "string"){
						if(this.currentState[key] == action[key]) diffValue = 0;
						else diffValue = 1;
					}
					else{
						diffValue = this.currentState[key] - action[key];
					}
				}					
				else 
					if(typeof(action[key]) == "string"){
						if(values[key] == action[key]) diffValue = 0;
						else diffValue = 1;
					}
					else{
						diffValue = values[key] - action[key];
					}
				if(conditions[1] == "equal")
					if(diffValue) result = false;
					else result = true;
				if(conditions[1] == "less")
					if(diffValue > 0) result = true;
					else result = false;
				if(conditions[1] == "more")
					if(diffValue <= 0) result = true;
					else result = false;
				if(conditions[1] == "moremiddle"){

					if(diffValue <= 0 && diffValue+values[key] > 0) result = true;
					else result = false;
				}	
				if(conditions[1] == "lessmiddle"){
					
					if(diffValue > 0 && diffValue-values[key] <= 0) result = true;
					else result = false;
				}
				if(conditions[0] == "is" && !result || conditions[0] == "not" && !result) return false;
			}
			return true;
	}

	this.controlEdge = function(edge, action){
		
		var conditions, result = true;
		
		for(key in edge){
			if(key != "rewrite" && key != "state"){
				conditions = key.split("_");
				if(!this.controlEdgeParameter(conditions,edge[key],action)) return false;
			}
		}
		return true;
	}
	
	this.changeState = function(edge, action){
		this.currentState.index = edge.toState;
		if(this.currentState.index[0] == 'R'){
			notifier.notify(this.currentState.index);
			console.log("start pattern");
			this.changeState({toState: 0},null);			
		}	
		else if(this.currentState.index != 0){
			for(key in edge.rewrite){
				this.currentState[edge.rewrite[key]] = action[edge.rewrite[key]];
			}
		}
	}
	

}
	Pattern.prototype.control = function(action,page,prevPage){
		action.pageId = page;
		action.prevPageId = prevPage;
		for(var i = 0; i < this.states[this.currentState.index].edges.length; i++){
			if(this.controlEdge(this.states[this.currentState.index].edges[i], action)){
				this.changeState(this.states[this.currentState.index].edges[i], action);
				return;
			}
		}
		this.changeState({toState: 0},null);
	}
	
	Pattern.prototype.reset = function(){
		this.changeState({toState: 0},null);
	}