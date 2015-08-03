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
getAllClickBindElements = function(documentE) {
    var allelmts = $('body').find("*");
    for (var i =0; i< allelmts.length; i++) {
    var tempEvents = $._data(allelmts[i], "events");
        if (typeof tempEvents !=="undefined") {
            for (var j = 0; j < tempEvents.length; j++) {
                alert("ab");
                var oneevent = tempEvents[j];
                alert(oneevent.type);
                //for (var k=0; k<
            }
        }
    }
    //return temp;
}
getAllClickablesOnPage = function(docElmt){
    var allClickables1 = $(docElmt).find("[onclick]");
    var allClickables2 = $(docElmt).find("input[type=button],input[type=submit],input[type=reset], button, a");
    var allClickables = allClickables1.add(allClickables2).add(getAllClickBindElements(docElmt));
    var offset = ate_ml_allClickables_in_page.length;
    for (var i = offset ; i< allClickables.length; i++) {
        var tmp = {clickable: allClickables[i - offset].outerHTML};
        if ($.inArray(tmp, ate_ml_allClickables_in_page)===-1) {
            ate_ml_allClickables_in_page[i] = tmp;
        }
    };
    //var offset = ate_ml_allClickables_in_page.length;

}
ate_add_invisible_marker(document);
ate_ml_allDocs_in_page = [{parentIndex: 0, xpathOfFrame: "path0", domDoc: document.documentElement.outerHTML}];
ate_ml_allClickables_in_page = [];
getAllClickablesOnPage(document.documentElement);
getAllDocumentsOnPage = function(topDocument, parentDocIndex, startingIndex) {
    getAllClickablesOnPage(topDocument);
    var iframeElements;
    var frameElements;
    var allFrameNodes;
    var frameDoc;
    iframeElements = topDocument.getElementsByTagName("iframe");
    frameElements = topDocument.getElementsByTagName("frame");
    allFrameNodes = iframeElements;
    for (var i = 0; i < allFrameNodes.length; i++) {
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


sendObjectToDevTools({content: {pages: ate_ml_allDocs_in_page, allClickables: ate_ml_allClickables_in_page}});
