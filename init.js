var User = {
	ID: "",
	EMAIL: "",
	NAME: ""	
};

document.addEventListener('DOMContentLoaded', function() {
  chrome.identity.getProfileUserInfo(function(userInfo) {
		if(User.ID.length < 1){
			var userName = document.getElementById('user_name');
			
			User.USER_ID = userInfo.id;
			User.USER_EMAIL = userInfo.email;
			User.USER_NAME = userInfo.email.substring(0, userInfo.email.indexOf("@"));
			userName.innerHTML = User.USER_NAME;
		}
	});
});