var ActionListener = function(){
	var actions = [];
	
	saveAction = function(action){
		actions.push(action);
		console.log("cathed: "+action);
		patternControl.control(action);
		if(actions.length > 200){
			//connection.send();
			actions.length = 0;
		}
	}
	
	ActionListener.prototype.start = function(){
		//akcie s oknami
		chrome.windows.onCreated.addListener(function(window){
			return saveAction({
				name: "windowCreated",
				session_ID: user.getSession(),
				chrome_session: window.sessionid,
				time: + new Date(),
				window_ID: window.id,
				prev_window_ID: "treba získať",
				tab_ID: "",
				prev_tab_ID: "treba zistiť",
				page_ID: "treba vytvoriť štruktúru",
				prev_page_ID: "treba zistiť"
			});
		});
		chrome.windows.onRemoved.addListener(function(window){
			return saveAction({
				name: "windowRemoved",
				session_ID: user.getSession(),
				chrome_session: window.sessionid,
				time: + new Date(),
				window_ID: window.id,
				prev_window_ID: "treba získať",
				tab_ID: "",
				prev_tab_ID: "treba zistiť",
				page_ID: "treba vytvoriť štruktúru",
				prev_page_ID: "treba zistiť"
			});
		});
		chrome.windows.onFocusChanged.addListener(function(windowid){ //keďže vracia integer a nie objekt musím prerobiť
			if(windowid != -1){
				chrome.windows.get(windowid, function(window){
					return saveAction({
						name: "windowFocused",
						session_ID: user.getSession(),
						chrome_session: "",  //window.sessionid je undeffined??
						time: + new Date(),
						window_ID: windowid,
						prev_window_ID: "treba získať",
						tab_ID: "",
						prev_tab_ID: "treba zistiť",
						page_ID: "treba vytvoriť štruktúru",
						prev_page_ID: "treba zistiť"
					});
				});			
			}
			else{
				console.log("používateľ mimo chromu");
			}
		}); 
		
		//akcie s kartami
		//vytvorenie tabu
		chrome.tabs.onCreated.addListener(function(tab){
			return saveAction({
				name: "tabCreated",
				session_ID: user.getSession(),
				chrome_session: tab.sessionid,
				time: + new Date(),
				window_ID: tab.windowid,
				prev_window_ID: "treba získať",
				tab_ID: tab.id,
				prev_tab_ID: "treba zistiť",
				page_ID: "treba vytvoriť štruktúru",
				prev_page_ID: "treba zistiť"
			});
		}); 
		//zmena stránky tabu
		chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
			return saveAction({
				name: "tabUpdated",
				session_ID: user.getSession(),
				chrome_session: tab.sessionid,
				time: + new Date(),
				window_ID: tab.windowid,
				prev_window_ID: "treba získať",
				tab_ID: tabid,
				prev_tab_ID: "treba zistiť",
				page_ID: "treba vytvoriť štruktúru",
				prev_page_ID: "treba zistiť"
			});
		}); 
		//presun tabu v okne
		chrome.tabs.onMoved.addListener(function(tabId, moveInfo){
			chrome.tabs.get(tabId, function(tab){
				return saveAction({
					name: "tabMoved",
					session_ID: user.getSession(),
					chrome_session: tab.sessionid,
					time: + new Date(),
					window_ID: tab.windowid,
					prev_window_ID: "treba získať",
					tab_ID: tab.id,
					prev_tab_ID: "treba zistiť",
					page_ID: "treba vytvoriť štruktúru",
					prev_page_ID: "treba zistiť"
				});
			});
		});
		//aktivácia tabu
		chrome.tabs.onActivated.addListener(function(activeInfo){
			chrome.tabs.get(activeInfo.tabId, function(tab){
				return saveAction({
					name: "tabActivated",
					session_ID: user.getSession(),
					chrome_session: tab.sessionid,
					time: + new Date(),
					window_ID: tab.windowid,
					prev_window_ID: "treba získať",
					tab_ID: tab.id,
					prev_tab_ID: "treba zistiť",
					page_ID: "treba vytvoriť štruktúru",
					prev_page_ID: "treba zistiť"
				});
			});
		});	
		//oddelenie tabu od okna
		chrome.tabs.onDetached.addListener(function(tabId, detachInfo){
			chrome.tabs.get(tabId, function(tab){
				return saveAction({
					name: "tabDetached",
					session_ID: user.getSession(),
					chrome_session: tab.sessionid,
					time: + new Date(),
					window_ID: tab.windowid,
					prev_window_ID: detachInfo.oldWindowId,
					tab_ID: tab.id,
					prev_tab_ID: null,
					page_ID: null,
					prev_page_ID: null
				});
			});
		});	
		//pripojenie tabu k oknu
		chrome.tabs.onAttached.addListener(function(tabId, attachInfo){
			chrome.tabs.get(tabId, function(tab){
				return saveAction({
					name: "tabDetached",
					session_ID: user.getSession(),
					chrome_session: tab.sessionid,
					time: + new Date(),
					window_ID: attachInfo.newWindowId,
					prev_window_ID: "zistiť",
					tab_ID: tab.id,
					prev_tab_ID: null,
					page_ID: null,
					prev_page_ID: null
				});
			});
		});	
		//zatvorenie tabu
		chrome.tabs.onRemoved.addListener(function(tabId, removeInfo){
			chrome.tabs.get(tabId, function(tab){
				return saveAction({
					name: "tabDetached",
					session_ID: user.getSession(),
					chrome_session: tab.sessionid,
					time: + new Date(),
					window_ID: null,
					prev_window_ID: removeInfo.WindowId,
					tab_ID: tab.id,
					prev_tab_ID: null,
					page_ID: null,
					prev_page_ID: null
				});
			});
		});	
	}
}