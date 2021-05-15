var test;
$.ajax({
    url: "test.txt",
    dataType: "text",
    async: true,
    success: function(msg) {
        test = msg;
        alert('Содержимое файла: ' + test);
    }
});
//----------------------------------------------
HTMLElement.prototype.load = function(url) {
    var el = this; // сслыка на DOM-объект
    var http = new XMLHttpRequest();
    http.open("GET", url);
    http.onreadystatechange = function() {
        if (http.readyState != 4 && http.status != 200) return; // можно ошибки обрабатывать
        el.innerHTML = http.responseText;
    }
    http.send(null);
}

/* используем */
document.body.load("test.php"); // как то так, самая простая реализация
//--------------------------------------------    
loadURL = function(url) {
    var oRequest = new XMLHttpRequest();
    oRequest.open('GET', url, false);
    oRequest.setRequestHeader("User-Agent", navigator.userAgent);
    oRequest.send(null);

    return oRequest.responseText;
};
//----------------------------------
var reader = new FileReader();
reader.onload = function(event) {
    var contents = event.target.result;
    console.log("Содержимое файла: " + contents);
};

reader.onerror = function(event) {
    console.error("Файл не может быть прочитан! код " + event.target.error.code);
};

reader.readAsText(file);
//--------------------------------
function OnLoad() {
    httpRequest = new XMLHttpRequest();
    httpRequest.open("GET", "/test.txt", true);
    httpRequest.onreadystatechange = OnRequestStateChange;
    httpRequest.send(null);
}

function OnRequestStateChange() {
    if (httpRequest.readyState != 4)
        return;
    if (httpRequest.status != 200)
        return;
    document.getElementById("textPlace").innerHTML = httpRequest.responseText;
}