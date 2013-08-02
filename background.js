// Map dict object to persistent localStorage
var dict = window.localStorage;
// After the browser started, new words can be added
chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse){
		if(sender.tab && request.action === 'add'){
			if(dict[request.word] === undefined){
				// Handle message sending in xhr callback
				getMeaning(request.word);
			}
			else{
				chrome.tabs.sendMessage(sender.tab.id, {action: 'highlight', word: word, meaning: dict[word]});
			}
		}
		else if(sender.tab && request.action === 'highlight_all'){
			// Traverse all words in dict and get them highlighted
			for(var word in dict){
				chrome.tabs.sendMessage(sender.tab.id, {action: 'highlight', word: word, meaning: dict[word]});
			}
		}
	});

chrome.browserAction.onClicked.addListener(function(tab){
	// Popup for deleting words
	
});


var getMeaning = function(word){
	var xhr = new XMLHttpRequest();
	var meaning;
	var res;
	xhr.open('GET', 'http://fanyi.youdao.com/openapi.do?keyfrom=chrome-dict&key=409786153&type=data&doctype=json&version=1.1&q=' + word);
	xhr.onload = function(){
		var i;
		if(xhr.status === 200){
			// Receive meaning JSON object and convert it into proper format
			res = JSON.parse(xhr.response);
			meaning = word + ': ';
			if(res.basic.phonetic){
				meaning += '/' + res.basic.phonetic + '/';
			}
			// basic explains splitted by types of a word, an array
			if(res.basic.explains){
				for(i in res.basic.explains){
					meaning += '\n' + res.basic.explains[i];
				}
			}
			// web-based explains，an array
			if(res.web){
				meaning += '\n网络释义： ';
				for(i in res.web[0].value){
					// Surprisingly, i is not an integer
					if(i != 0) meaning += '；';
					meaning += res.web[0].value[i];
				}
			}
			dict[word] = meaning;
			chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
				chrome.tabs.sendMessage(tabs[0].id, {action: 'highlight', word: word, meaning: dict[word]});
			});
		}
	};
	xhr.send();
};

