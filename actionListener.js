var ActionListener = function(){
	var actions = [], allPages = [], activePages = [], keywords = [],
	previousState = {windowId: null, tabId: null, tabPosition: null, pageId: null},
	timeout,
	prevActionTime = null,
	minGap = 200;
	
	var isOutTimegap = function(actionTime){
		return (!prevActionTime || actionTime-prevActionTime > minGap);
	}
	
	var getSubdomain = function(url){
		var domain, parts, partsLength;
		return domain = url.split("//")[1].split("/")[0].split(":")[0];
	}
	
	var getPageId = function(pageUrl, prevPageId){
		var i = allPages.length-1;
		while(i>=0 && allPages[i].url != pageUrl) i--;
		
		if(i >= 0) return i;
		
		var page = {
			url: pageUrl,
			domain: "",
			subdomain: getSubdomain(pageUrl),
			keywords: {},
			sourceId: prevPageId
		}
		allPages.push(page);
		return allPages.length-1;
	}
	
	var saveAction = function(action){
		actions.push(action);

		console.log(action.name);

		patternControl.control(action,allPages[action.pageId],allPages[action.prevPageId]);		
		if(actions.length > 10){
			//connection.send();
			actions.length = 0;
			allPages.length = 0;
		}
	}
	
	var createAction = function(name, windowId, tabId, actionInfo){
		
		var action = {
			name: name,
			sessionId: user.getSession(),
			time: + new Date(),
			windowId: windowId,
			prev_windowId: null,
			tabId: tabId,
			prev_tabId: null,
			tabPosition: null,
			prev_tabPosition: null,
			pageId: null,
			prev_pageId: null			
		}
		var pageUrl = null;
		
		if(name != "tabRemoved")
		chrome.tabs.get(tabId, function(tab){
			action.tabPosition = tab.index;
			action.pageId = getPageId(tab.url, previousState.pageId);

			for(key in previousState){
				action["prev_"+key] = previousState[key];
				previousState[key] = action[key];
			}		
			
			//Tag: id, názov, počet výskytov pre stránku, čas posledného výskytu, čas strávený na stránkach s tagom
			saveAction(action);
		});
		else
			saveAction(action);
	}
	
	ActionListener.prototype.start = function(){

		
		//akcie s oknami
		chrome.windows.onFocusChanged.addListener(function(windowId){
			if(windowId != chrome.windows.WINDOW_ID_NONE)
				chrome.windows.get(windowId, function(window){
					chrome.tabs.query({active: true, windowId: window.id}, function(tabs) {
						if(tabs.length > 0)
							createAction("windowActivated",tabs[0].windowId,tabs[0].id, null);							
					});
				});			
		}); 
				
		//akcie s kartami
		//vytvorenie tabu
		chrome.tabs.onCreated.addListener(function(tab){
			createAction("tabCreated",tab.windowId, tab.id, null);
		}); 
		
		//presun tabu v okne
		chrome.tabs.onMoved.addListener(function(tabId, moveInfo){
			createAction("tabMoved",moveInfo.windowId, tabId, moveInfo);
		});
		//aktivácia tabu
		chrome.tabs.onActivated.addListener(function(activeInfo){
			chrome.tabs.get(activeInfo.tabId, function(tab){
				if(typeof tab !== "undefined"){
					createAction("tabActivated",tab.windowId, tab.id, activeInfo);
				}
			});
		});	
		//pripojenie tabu k oknu
		chrome.tabs.onAttached.addListener(function(tabId, attachInfo){
			chrome.tabs.get(tabId, function(tab){
				createAction("tabAttached",tab.windowId, tab.id, attachInfo);
			});
		});	
		//zatvorenie tabu
		chrome.tabs.onRemoved.addListener(function(tabId, removeInfo){
			if(!removeInfo.isWindowClosing)
				createAction("tabRemoved",removeInfo.windowId, tabId, removeInfo);
		});	
		//zmena stránky tabu
		chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
			if(changeInfo.status == "complete"){
				createAction("tabUpdated",tab.windowId, tabId, changeInfo);
			}
		}); 
	}
}