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

ate_ml_allDocs_in_page = [{parentIndex: 0, xpathOfFrame: "path0", domDoc: document.documentElement.outerHTML}];
getAllDocumentsOnPage = function(topDocument, parentDocIndex, startingIndex) {
    //topDocument = window.parent.document.documentElement;
    var iframeElements;
    var frameElements;
    var allFrameNodes;
    var frameDoc;
    iframeElements = topDocument.getElementsByTagName("iframe");
    frameElements = topDocument.getElementsByTagName("frame");
    allFrameNodes = iframeElements;
    for (i = 0; i < allFrameNodes.length; i++) {
        frameDoc = allFrameNodes[i].contentWindow.document;
        if (allFrameNodes[i].getAttribute("id")!=="FirebugUI") {
            ate_ml_allDocs_in_page[i + startingIndex] = {
                parentIndex: parentDocIndex,
                xpathOfFrame: "xxpath",
                domDoc: frameDoc.documentElement.outerHTML
            };
    //        getAllDocumentsOnPage(frameDoc, i + startingIndex, i + startingIndex + 1);
            //startingIndex = allDocs.length - i;
        }
    }
}
getAllDocumentsOnPage(document.documentElement, 0, 1);


sendObjectToDevTools({content: ate_ml_allDocs_in_page});
