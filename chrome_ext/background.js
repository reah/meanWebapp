var POST_ROUTE = 'http://localhost:3000/post';

// Set up context menu at install time.
chrome.runtime.onInstalled.addListener(function() {
  var context = "selection";
  var title = "Add to meanWebApp";
  var id = chrome.contextMenus.create({"title": title, "contexts": [context],
                                         "id": "context" + context });  
});

function flashIcon() { 
    chrome.browserAction.setIcon({path: "chrome_ext/icon_invert16.png"});
    setTimeout(function() { 
        chrome.browserAction.setIcon({path: "chrome_ext/icon16.png"});
    }, 150);
}

chrome.browserAction.onClicked.addListener(function (tab) {
    var data = { title: tab.title, url: tab.url };
    // construct an HTTP request
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
        xhr.responseText;
        }
    }
    postHelper(xhr, POST_ROUTE, data);
    flashIcon();
});

// add click event
chrome.contextMenus.onClicked.addListener(onClickHandler);

// The onClicked callback function.
function onClickHandler(info, tab) {
    var data, title;
    // construct an HTTP request
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
        title = getTitle(xhr.responseText);
        data = { title: title, url: info.linkUrl };
        postHelper(xhr, POST_ROUTE, data);
        }
    }
    xhr.open("GET", info.linkUrl, true);
    xhr.send();
};

function getTitle(str) { 
    var matches = str.match(/<title>[\S\s]*?<\/title>/gi);
    return matches[0].replace(/(<\/?[^>]+>)/gi, '');
}

function postHelper(xhr, url, data) { 
    xhr.open("POST", url, true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    xhr.setRequestHeader("Content-length", data.length);

    // send the collected data as JSON
    xhr.send(JSON.stringify(data));
}
