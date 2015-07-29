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
function ate_add_invisible_marker(document) {
    var ate_hiddenElements = $("body", document).find(":hidden").not("script");
    for (ate_hiddenIndex = 0; ate_hiddenIndex < ate_hiddenElements.length; ate_hiddenIndex++) {
        ate_hiddenElements[ate_hiddenIndex].setAttribute("ate-invisible", "yes")
    }
}
ate_add_invisible_marker(document);
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
        ate_add_invisible_marker(frameDoc);
        if (allFrameNodes[i].getAttribute("id")!=="FirebugUI") {
            ate_ml_allDocs_in_page[i + startingIndex] = {
                parentIndex: parentDocIndex,
                xpathOfFrame: "xxpath",
                domDoc: frameDoc.documentElement.outerHTML
            };
            var tempLength;
            tempLength = ate_ml_allDocs_in_page.length;
            getAllDocumentsOnPage(frameDoc.documentElement, i + startingIndex, i + startingIndex + 1);
            startingIndex = ate_ml_allDocs_in_page.length - tempLength + startingIndex;
        }
    }
}
getAllDocumentsOnPage(document.documentElement, 0, 1);


sendObjectToDevTools({content: ate_ml_allDocs_in_page});
