var widthSr = 170;
var heightSr = 87;
var x0S = 51;
var y0S = 68;
var yp = y0S;
var stepS = 20;
var cnS = 0;
var isMoveS = false;
var Ktimer;
var m_canvas;
var m_context;
var m1_canvas;
var m1_context;
var elem;

function initS() {
    /*    self_rec = new Image();
        self_rec.src = './images/self_rec.gif';
        pen = new Image();
        pen.src = './images/pen.gif';*/
    m_canvas = document.createElement('canvas');
    m_canvas.width = 94;
    m_canvas.height = 61;
    m_context = m_canvas.getContext('2d');
    m1_canvas = document.createElement('canvas');
    m1_canvas.width = 15;
    m1_canvas.height = 87;
    m1_context = m1_canvas.getContext('2d');
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
    m_context.drawImage(elem, 51, 12, 94, 61, 0, 0, 94, 61);
    m1_context.drawImage(elem, 35, 0, 15, 87, 0, 0, 15, 87);
}
//=====================================================================
function paintS() {
    if (isMove) {
        contextS.drawImage(m_canvas, 52, 12);
        contextS.drawImage(m1_canvas, 35, 0);
    }
    //	OS.offscreenGC.copyArea(51, 12, 94, 61, 1, 0);
    contextS.strokeStyle = "white";
    contextS.beginPath();
    contextS.moveTo(x0S, 13);
    contextS.lineTo(x0S, 72);
    contextS.stroke();
    contextS.strokeStyle = "black";
    contextS.beginPath();
    for (i = 0; i < 3; i++) {
        contextS.moveTo(x0S, 12 + i * 21 - 1);
        contextS.lineTo(x0S, 12 + i * 21 + 1);
    }
    contextS.stroke();
    if (cnS == 0) {
        contextS.beginPath();
        contextS.moveTo(x0S, 11);
        contextS.lineTo(x0S, 73);
        contextS.stroke();
    }
    contextS.strokeStyle = "red";
    contextS.beginPath();
    contextS.moveTo(x0S, yp + 3);
    contextS.lineTo(x0S + 1, yp + 3);
    contextS.stroke();
    contextS.drawImage(pen, x0S - 16, yp);
    elem = document.getElementById('CanvasS');
    m_context.drawImage(elem, 51, 12, 94, 61, 0, 0, 94, 61);
}
//======================================================
function startSR() {
    //alert("startSR")
    isMove = true;
    //	Ktimer=setTimeout(runSR,200)
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