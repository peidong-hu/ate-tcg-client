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
var ate_global_page_context;

var ate_global_page_context_Watch = (function() {
    var watches = {};

    return {
        watch: function(callback) {
            var id = Math.random().toString();
            watches[id] = callback;

            // Return a function that removes the listener
            return function() {
                watches[id] = null;
                delete watches[id];
            }
        },
        trigger: function() {
            for (var k in watches) {
                watches[k](window.ate_global_page_context);
            }
        }
    }
})();

/*setTimeout(function() {
    window.ate_global_page_context = {prop: "new value"};
    ate_global_page_context_Watch.trigger();
}, 1000);*/

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
            ate_global_page_context = message.content;
            ate_global_page_documents = message.content.pages;
            ate_global_all_clickables = message.content.allClickables;
            /*ate_global_screenUrl = message.content.screenUrl;*/
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