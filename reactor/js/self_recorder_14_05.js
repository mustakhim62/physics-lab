var widthSr = 170;
var heightSr = 87;
var x0S = 51;
var y0S = 68;
var yp = y0S;
var stepS = 20;
var cnS = 0;
var isMoveS = false;
var Ktimer;

function initS() {
    self_rec = new Image();
    self_rec.src = './images/self_rec.gif';
    pen = new Image();
    pen.src = './images/pen.gif';
    FillPicture();
} //init

//==========================================================================
function FillPicture() {
    elem = document.getElementById('CanvasS');
    contextS = elem.getContext('2d');
    contextS.fillStyle = "black";
    contextS.fillRect(0, 0, widthSr, heightSr);
    contextS.drawImage(self_rec, 0, 0);
    contextS.fillStyle = "white";
    contextS.fillRect(50, 11, 95, 62);
    contextS.strokeStyle = "rgb(175,72,0)";
    contextS.strokeRect(50, +11, 95, 62);
    contextS.strokeStyle = "black";
    contextS.beginPath();
    for (i = 0; i < 3; i++) {
        contextS.moveTo(40, 12 + i * 21);
        contextS.lineTo(145, 12 + i * 21);
    }
    contextS.stroke();
    contextS.font = '10px plane TimesRoman';
    contextS.fillStyle = "yellow";
    contextS.fillText("T,C", 146, 12);
    for (i = 0; i < 3; i++)
        contextS.fillText(String((2 - i) * 500), 148 + i * 3, 16 + (i + 1) * stepS);
    contextS.strokeStyle = "black";
    contextS.beginPath();
    for (i = 1; i < 5; i++) {
        contextS.moveTo(x0S + i * 19, 11);
        contextS.lineTo(x0S + i * 19, 73);
    }
    contextS.stroke();
}
//=====================================================================
function paintS() {
    //		if(isMove)OS.offscreenGC.copyArea(51, 12, 94, 61, 1, 0);
    contextS.strokeStyle = "white";
    contextS.beginPath();
    contextS.moveTo(x0S, 13);
    contextS.lineTo(x0S, 72);
    contextS.strokeStyle = "black";
    for (i = 0; i < 3; i++) {
        contextS.moveTo(x0S, 12 + i * 21);
        contextS.lineTo(x0S, 12 + i * 21);
    }
    contextS.stroke();
    if (cnS == 0) {
        contextS.moveTo(x0S, 11);
        contextS.lineTo(x0S, 73);
    }
    contextS.strokeStyle = "red";
    contextS.moveTo(x0S, yp + 3);
    contextS.lineTo(x0S + 1, yp + 3);
    contextS.stroke();
    contextS.drawImage(pen, x0S - 16, yp);
}
//======================================================
function startSR() {
    alert("startSR")
    isMove = true;
    Ktimer = setInterval(runSR, 200)
}

function stopSR() {
    isMove = false;
}
//======================================================
function runSR() {
    cnS++;
    cnS = cnS % stepS;
    paintS();
    if (isMove == false) clearInterval(Ktimer)
}
//======================================================
function setT(T) {
    yp = y0S - Math.round(T * 63 / 1500);
    if (yp < 9) yp = 9;
}