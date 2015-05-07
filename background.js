chrome.browserAction.onClicked.addListener(function (tab) {
    var data = { url : tab.url};

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
    alert('posted');
});