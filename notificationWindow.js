
	var reaction, reactionText, title, message, buttons = ["áno","nie"], buttonsHolder, newButton;

	getreactionText = function(reaction){
		switch(reaction){
			case "R1":
				return {title: "zatváranie kariet jedného zdroja", message: "Bol zachytený vzor zatvárania kariet, ktoré vznikli z rovnakého zdroja. Chcete zatvoriť všetky takéto karty?"};
			case "R2":
				return {title: "zatváranie kariet jednej domény", message: "Bol zachytený vzor zatvárania kariet s rovnakou doménou. Chcete zatvoriť všetky takéto karty?"};
			default:
				return {title: "zaznamenaný vzor", message: "Bol zaznamenaný vzor na ktorý existuje navrhnutá reakcia. Vykonať?"};
		}
	}
	
	reaction = window.location.search.substring(1);
	reactionText = getreactionText(reaction);
	title = document.getElementById('title');
	title.innerHTML = reactionText.title;
	
	message = document.getElementById('message');
	message.innerHTML = reactionText.message;

	buttonsHolder = document.getElementById('buttons');

	var buttonPressed = function(e){
		chrome.runtime.sendMessage({answer: e.toElement.innerHTML});
	};
	
	for(var i = 0; i<buttons.length;i++){
		console.log(buttons.length);
		newButton = document.createElement("a");
		newButton.className = "button";
		newButton.addEventListener("click", buttonPressed);
		newButton.innerHTML = buttons[i];
		
		buttonsHolder.appendChild(newButton);
		
	}
	
