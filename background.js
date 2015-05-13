// Set up context menu at install time.
chrome.runtime.onInstalled.addListener(function() {
  var context = "selection";
  var title = "Add to meanWebApp";
  var id = chrome.contextMenus.create({"title": title, "contexts": [context],
                                         "id": "context" + context });  
});

chrome.browserAction.onClicked.addListener(function (tab) {
    var data = { title: tab.title, url: tab.url };

    // construct an HTTP request
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
        alert(xhr.responseText);
        }
    }
    xhr.open("POST", "http://localhost:3000/post", true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    xhr.setRequestHeader("Content-length", data.length);

    // send the collected data as JSON
    xhr.send(JSON.stringify(data));
    // alert('posted');
});

// add click event
chrome.contextMenus.onClicked.addListener(onClickHandler);

// The onClicked callback function.
function onClickHandler(info, tab) {
    // construct an HTTP request
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
        alert(xhr.responseText);
        }
    }
    xhr.open("GET", info.linkUrl, true);
    xhr.send();

//  need to parse title from xhr.responseText and post via routes

};



