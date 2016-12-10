var patterns = [
		{
			"pattern": "testingPatterns",
			"states": [
				{
					"index": 0,
					"resetState": 0,
					"edges":[
						{
							"rewrite": ["name,sessionId","time","windowId","prev_windowId","tabId","prev_tabId","tabPosition","prev_tabPosition","pageId","prev_pageId"],
							"toState": 1,
							"equals": {
								"name": "tabActivated"
							}
						}
					]
				},
				{
					"index": 1,
					"resetState": 0,
					"edges":[
						{
							"rewrite": [],
							"toState": "R1",
							"equals": {
								"name": "tabActivated"
							}
						}
					]
				}
			],
			"reactions": {
				"R1": "R1 has no reaction" 
			}
		}
	];