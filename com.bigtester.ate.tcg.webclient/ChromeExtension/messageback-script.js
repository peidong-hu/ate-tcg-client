// document.querySelector('button').addEventListener('click', function() {
//  chrome.extension.sendMessage({action: 'message', content:"Changed by page"}, function(message){});
// });
/*document.querySelector('button').addEventListener('click', function() {
 sendObjectToDevTools({content: "Changed by page"});
 });*/
function sendObjectToDevTools(message) {
    // The callback here can be used to execute something on receipt
    chrome.extension.sendMessage(message, function (message) {
    });
}
function ate_add_invisible_marker(document) {
    var ate_hiddenElements = $("body", document).find(":hidden,[aria-hidden='true']").not("script");
    //var ate_ariaHiddenElements = $("body", document).find("[aria-hidden='true']").not("script");

    for (var ate_hiddenIndex = 0; ate_hiddenIndex < ate_hiddenElements.length; ate_hiddenIndex++) {
        ate_hiddenElements[ate_hiddenIndex].setAttribute("ate-invisible", "yes");
    }
    //some elements might have been mis-marked as hidden by previous screen's js, for example, the new screen's frame was hidden in previous one.
    // need to do double check
    //var ate_hidden_markedElements = $("body", document).find("[ate-invisible='yes']");
    //for (var ate_index = 0; ate_index < ate_hidden_markedElements.length; ate_index ++ ) {
    //    if (!$.inArray(ate_hidden_markedElements[ate_index], ate_hiddenElements)) {
    //        ate_hidden_markedElements[ate_index].setAttribute("ate-invisible", "no");
    //    }
    //}
}
function ate_remove_ate_invisible_marker(document) {
    var ate_invisibleElements = $("body", document).find("[ate-invisible='yes']");
    for (var ate_invisibleIndex = 0; ate_invisibleIndex < ate_invisibleElements.length; ate_invisibleIndex++) {
        ate_invisibleElements[ate_invisibleIndex].setAttribute("ate-invisible", "no");
    }
}
getAllClickBindElements = function (documentE) {
    //TODO this needs to be working for elements bind with jquery click event
    var allelmts = $('body').find("*");
    for (var i = 0; i < allelmts.length; i++) {
        var tempEvents = $._data(allelmts[i], "events");
        if (typeof tempEvents !== "undefined") {
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
getAllClickablesOnPage = function (docElmt) {
    var allClickables1 = $(docElmt).find("[onclick]");
    var allClickables2 = $(docElmt).find("input[type=button],input[type=submit],input[type=reset], button, a");
    var allClickables = allClickables1.add(allClickables2).add(getAllClickBindElements(docElmt));
    var offset = ate_ml_allClickables_in_page.length;
    for (var i = offset; i < allClickables.length; i++) {
        var invisibleAncestor = $(allClickables[i - offset]).closest("[ate-invisible='yes']");
        if (allClickables[i - offset].getAttribute("ate-invisible") !== "yes" && invisibleAncestor.length===0) {
            var tmp = {clickable: allClickables[i - offset].outerHTML};
            if ($.inArray(tmp, ate_ml_allClickables_in_page) === -1) {
                ate_ml_allClickables_in_page[i] = tmp;
            }
        }
    }
    ;
    //var offset = ate_ml_allClickables_in_page.length;

}
ate_remove_ate_invisible_marker(document);
ate_add_invisible_marker(document);
ate_ml_allDocs_in_page = [{
    index: 0,
    parentIndex: 0,
    xpathOfFrame: "path0",
    visible: true,
    domDoc: document.documentElement.outerHTML,
    docText: getText(document.body).replace(/\s\s+/g, ' ')
}];
ate_ml_allClickables_in_page = [];

ate_ml_allElements_in_page = [];

getAllClickablesOnPage(document.documentElement);
getAllDocumentsOnPage = function (topDocument, parentDocIndex, startingIndex, parentInvisible) {
    getAllClickablesOnPage(topDocument);
    var iframeElements;
    var frameElements;
    var allFrameNodes;
    var frameDoc;
    iframeElements = topDocument.getElementsByTagName("iframe");
    frameElements = topDocument.getElementsByTagName("frame");
    allFrameNodes = iframeElements;
    for (var i = 0; i < allFrameNodes.length; i++) {
        var frameInvisible = false;
        if (parentInvisible == true) {
            frameInvisible = true;
        } else {
            frameInvisible= (allFrameNodes[i].getAttribute("ate-invisible") === "yes") ? true : false;
            if (frameInvisible === false) {
                var invisibleAncestor = $(allFrameNodes[i]).closest("[ate-invisible='yes']");
                frameInvisible = (invisibleAncestor.length === 1) ? true : false;
            }
        }
        frameDoc = allFrameNodes[i].contentWindow.document;
        ate_remove_ate_invisible_marker(frameDoc);
        ate_add_invisible_marker(frameDoc);
        if (allFrameNodes[i].getAttribute("id") !== "FirebugUI") {
            ate_ml_allDocs_in_page[i + startingIndex] = {
                index: i + startingIndex,
                parentIndex: parentDocIndex,
                visible: (frameInvisible === true) ? false : true,
                xpathOfFrame: getElementXPath(allFrameNodes[i]),
                domDoc: frameDoc.documentElement.outerHTML,
                docText: getText(frameDoc.body).replace(/\s\s+/g, ' '),
                frameSrc: allFrameNodes[i].getAttribute("src")
            };
            var tempLength;
            tempLength = ate_ml_allDocs_in_page.length;
            getAllDocumentsOnPage(frameDoc.documentElement, i + startingIndex, i + startingIndex + 1, frameInvisible);
            startingIndex = ate_ml_allDocs_in_page.length - tempLength + startingIndex;
        }
    }
}
getAllDocumentsOnPage(document.documentElement, 0, 1, false);
getAllElementsInBody(document.body);

sendObjectToDevTools({
    content: {
        pages: ate_ml_allDocs_in_page,
        allClickables: ate_ml_allClickables_in_page,
        screenUrl: window.location.href.replace(/^.*\/\/[^\/]+/, ''),
        domain: window.location.host,
        domainProtocol: window.location.protocol,
        domainPort: window.location.port,
        allElementsInBody: ate_ml_allElements_in_page
    }
});
//http://stackoverflow.com/questions/17727977/how-to-get-all-text-from-all-tags-in-one-array to get the text on the page. need to iterate the frames

function getText(bodyElement) {
    var elements = bodyElement.getElementsByTagName("*");
    var retVal = " ";
    for (var i = 0; i < elements.length; i++) {
        var current = elements[i];
        if (current.children.length === 0 && current.textContent.replace(/ |\n/g, '') !== '') {
            // Check the element has no children && that it is not empty
            if (current.tagName.toLowerCase() != 'script' && current.tagName.toLowerCase() != 'style')
                retVal = retVal + " " + (current.textContent);
        }
    }
    return retVal;
}

/**
 * Gets an XPath for an element which describes its hierarchical location.
 */
function getElementXPath(element)
{
    if (element && element.id)
        return '//*[@id="' + element.id + '"]';
    else
        return this.getElementTreeXPath(element);
};

function getElementTreeXPath(element)
{
    var paths = [];

    // Use nodeName (instead of localName) so namespace prefix is included (if any).
    for (; element && element.nodeType == 1; element = element.parentNode)
    {
        var index = 0;
        for (var sibling = element.previousSibling; sibling; sibling = sibling.previousSibling)
        {
            // Ignore document type declaration.
            if (sibling.nodeType == Node.DOCUMENT_TYPE_NODE)
                continue;

            if (sibling.nodeName == element.nodeName)
                ++index;
        }

        var tagName = element.nodeName.toLowerCase();
        var pathIndex = (index ? "[" + (index+1) + "]" : "");
        paths.splice(0, 0, tagName + pathIndex);
    }

    return paths.length ? "/" + paths.join("/") : null;
};

function getAllElementsInBody(bodyElement)
{
    ate_ml_allElements_in_page = bodyElement.getElementsByTagName("*");


};