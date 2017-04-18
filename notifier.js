var Notifier = function(){
	
	Notifier.prototype.notify = function(reaction){
		
		chrome.windows.create({url: "/notification.html?"+reaction, type:"popup",top: 0, left: 0, width: 270, height: 450, state: "docked", focused: false},function callback(window){
			chrome.windows.update(window.id,{drawAttention: true},function callback(window){
				chrome.tabs.query({windowType: "popup"}, function(tabs) {

				});	
			});
		});
	}
}