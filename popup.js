chrome.storage.sync.get(['user_name'], function(result) {
	if (result.user_name) {
		var userName = document.getElementById('user_name');
		userName.innerHTML = "again "+result.user_name;
	}
});

