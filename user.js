var User = function(){	

	var user_id = "";
	var user_name = "";
	var user_session;

	User.prototype.getInfo = function(callback) {
		if(user_id.length > 0){
			return callback(user_id, user_name, user_session);			
		}
		else{
			chrome.storage.sync.get(["user_id","user_name","user_session"], function(result) {
				if (result.user_id && result.user_name && result.user_session) {
					user_id = result.user_id;
					user_name = result.user_name;
					user_session = 1;
					return callback(result.user_id,result.user_name,result.user_session);
				} else {
					new_id = "sifhmsdsuirghsmgss"; //pridať hash mailu
					new_name = "name";
					new_session = 1;
					chrome.storage.sync.set({
						"user_id": new_id,
						"user_name": new_name,
						"user_session": new_session
					}, function() {
						return callback(new_id, new_name, new_session);
					});
				}
			});
		}
    };
	
	User.prototype.changeSession = function(){
		user_session = user_session + 1;
		chrome.storage.sync.set({
			"user_session": user_session
		}, function() {
			//connection.send(logs); //odoslať nalogované dáta na začiatku nového sedenia
		});		
	}
	
	User.prototype.getId = function(){
		return user_id;
	}
	
	User.prototype.getName = function(){
		return user_name;
	}
	
	User.prototype.getSession = function(){
		return user_session;
	}
}