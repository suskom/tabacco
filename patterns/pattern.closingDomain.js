Pattern.closingDomain = function(){
	
	var currentState = {
		"index": 0,
		"timegap": 200
	};	
	
	var states = [
		{
			index: 0,
			edges:[
				{
					rewrite: ["time","tabPosition"],//"name,sessionId","time","windowId","prev_windowId","tabId","prev_tabId","tabPosition","prev_tabPosition","pageId","prev_pageId"
					toState: 1,
					is_equal_to_constant: {
						name: "tabActivated"
					}
				}
			]
		},
		{
			index: 1,
			edges:[
				{
					rewrite: ["time","tabPosition"],
					toState: 2,
					is_equal_to_constant: {
						name: "tabActivated"
					},
					is_moremiddle_to_state: {
						time: 10000,
						tabPosition: 3
					}			
				}
			]
		},
		{
			index: 2,
			edges:[
				{
					rewrite: [],
					toState: "R1",
					is_equal_to_constant: {
						name: "tabActivated"
					},
					is_moremiddle_to_state: {
						time: 10000
					},
					is_lessmiddle_to_state: {	
						tabPosition: 2
					}
				}
			]
		}
	];
	
	var reactions = {
		"R1": "nie je žiadna reackia"
	};
	
	var pattern = new Pattern(currentState, reactions, states);
	
	Pattern.closingDomain.prototype.control = function(action,page,prevPage){
		pattern.control(action,page,prevPage);
	}
}
	
		




