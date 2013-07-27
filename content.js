var highlightWraper = function(word, meaning){
    var pattern = new RegExp('\\b' + word + '\\b', 'g');
    var span = '<span class="smart-dict hint--top hint--rounded hint--error ' +
            word + '" word="' + word + '" data-hint="' + meaning + '">' + word +
            // American tongue with argument type=2
            '<video class="smart-dict-audio" src="http://dict.youdao.com/dictvoice?audio=' + word + '&type=2"></video></span>';
    var newNode;
    var elements;

    var highlight = function(node){
        // Element Node && Document Node
        if(node.nodeType === 1 || node.nodeType === 9){
            for(var i = 0; i < node.childNodes.length; i ++){
                highlight(node.childNodes[i]);
            }
        }
        // Text Node
        else if(node.nodeType === 3 && pattern.test(node.nodeValue)){
            newNode = document.createElement('sd');
            newNode.innerHTML = node.nodeValue.replace(pattern, span);
            node.parentNode.replaceChild(newNode, node);
        }
    };
    highlight(document.body);

    // Add voice auto-play mouseover event
    elements = document.getElementsByClassName(word);
    var playVoice = function(e){
        e.target.getElementsByTagName('video')[0].play();
    };
    for(var i = 0; i < elements.length; i ++){
        elements[i].addEventListener('mouseover', playVoice);
    }
};

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse){
        // Confirm command highlight
        if(request.highlight){
            // console.log("received_msg_highlight:" + request.word);
            highlightWraper(request.word, request.meaning);
        }
    });

document.addEventListener('dblclick', function(e){
    var word;
    if(e.altKey){
        word = window.getSelection().toString().trim();
        if(/[A-Za-z\-]+/.test(word)){
            // As default, the message will be sent to associated extension
            chrome.runtime.sendMessage({add: true, word: word});
        }
    }
});

