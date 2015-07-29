// This creates and maintains the communication channel between
// the inspectedPage and the dev tools panel.
//
// In this example, messages are JSON objects
// {
//   action: ['code'|'script'|'message'], // What action to perform on the inspected page
//   content: [String|Path to script|Object], // data to be passed through
//   tabId: [Automatically added]
// }
var ate_global_page_documents;
(function createChannel() {
    //Create a port with background page for continous message communication
    var port = chrome.extension.connect({
        name: "Sample Communication" //Given a Name
    });

    // Listen to messages from the background page
    port.onMessage.addListener(function (message) {
        if (message.content === "ate_page_jquery_not_exist") {
            sendObjectToInspectedPage({action: "script", content: "jslib/jquery-1.9.1.min.js"});
            sendObjectToInspectedPage({action: "script", content: "messageback-script.js"});
        } else if (message.content === "ate_page_jquery_exist") {
            sendObjectToInspectedPage({action: "script", content: "messageback-script.js"});
        } else {
            ate_global_page_documents = message.content;
            document.querySelector('#number1').setAttribute("value", message.content[0].domDoc);
        }
      // port.postMessage(message);
    });

}());

// This sends an object to the background page 
// where it can be relayed to the inspected page
function sendObjectToInspectedPage(message) {
    message.tabId = chrome.devtools.inspectedWindow.tabId;
    chrome.extension.sendMessage(message);
}