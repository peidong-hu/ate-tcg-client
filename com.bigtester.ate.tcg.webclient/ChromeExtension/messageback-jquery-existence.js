// document.querySelector('button').addEventListener('click', function() {
//  chrome.extension.sendMessage({action: 'message', content:"Changed by page"}, function(message){});
// });
/*document.querySelector('button').addEventListener('click', function() {
    sendObjectToDevTools({content: "Changed by page"});
});*/
function sendObjectToDevTools(message) {
    // The callback here can be used to execute something on receipt
    chrome.extension.sendMessage(message, function(message){});
}

if(!window.jQuery)
{
    sendObjectToDevTools({content: "ate_page_jquery_not_exist"});
} else {
    sendObjectToDevTools({content: "ate_page_jquery_exist"});
}


