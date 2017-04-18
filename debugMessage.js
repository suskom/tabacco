var debugEnabled = true;

function debugMessage(file,line,message){
	if(debugEnabled)
		console.log("in: "+file+"\non line: "+line+"\n\""+message+"\"");
}

