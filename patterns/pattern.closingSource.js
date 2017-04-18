Pattern.closingSource = function(){
	
	var currentState = {
		"index": 0,
		"timegap": 200
	};	
	
	var states = [
		{
			index: 0,
			edges:[
				{
					rewrite: ["name","sessionId","time","windowId","prev_windowId","tabId","prev_tabId","tabPosition","prev_tabPosition","pageId","prev_pageId"],
					toState: 1,
					is_equal_to_constant: {name: "tabRemoved"}
				}
			]
		},
		{
			index: 1,
			edges:[
				{
					rewrite: ["name","sessionId","time","windowId","prev_windowId","tabId","prev_tabId","tabPosition","prev_tabPosition","pageId","prev_pageId"],
					toState: "1",
					is_equal_to_constant: {name: "tabRemoved"},
					not_equal_to_state: ["pageId.sourceId"]
				},
				{
					rewrite: ["name","sessionId","time","windowId","prev_windowId","tabId","prev_tabId","tabPosition","prev_tabPosition","pageId","prev_pageId"],
					toState: "1",
					is_equal_to_constant: {name: "tabRemoved"},
					is_more_than_constant: {time: 1000}
				},
				{
					rewrite: [],
					toState: "1",
					not_equal_to_constant: {name: "tabRemoved"}
				},
				{
					rewrite: [],
					toState: "R1",
					is_equal_to_constant: {name: "tabRemoved"},
					is_equal_to_state: ["pageId.sourceId"],
					not_moremiddle_than_state: {position: 1},
					not_lessmiddle_than_state: {position: 1},
				}
			]
		},
	];
	
	var reactions = {
		"R1": "nie je žiadna reackia"
	};
	
	var _pattern = new Pattern(currentState, reactions, states);
	
	Pattern.closingSource.prototype.control = function(action,page,prevPage){
		_pattern.control(action,page,prevPage);
	}
}
	
		




