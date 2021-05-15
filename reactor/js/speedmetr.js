var Rsp = 24;
var xssp = 45;
var yssp = 44;
var xV = xssp;
var yV = yssp + Rsp;
var v0 = 18;
var widthSp = 90;
var heightSp = 87


function initSp() {
    //    speed = new Image();
    //    speed.src = './images/speed.gif';
} //init

//=====================================================================
function paintSp() {
    elemSp = document.getElementById('CanvasSpeed');
    contextSp = elemSp.getContext('2d');
    contextSp.clearRect(0, 0, elemSp.width, elemSp.height);
    contextSp.fillStyle = "#000000";
    contextSp.fillRect(0, 0, elemSp.width, heightSp);
    contextSp.drawImage(speed, 0, 0);
    contextSp.strokeStyle = "red";
    contextSp.beginPath();
    contextSp.moveTo(xssp, yssp);
    contextSp.lineTo(xV, yV);
    contextSp.stroke();
}

//======================================================

function set_V(v) {
    var alfa = Math.PI * v / v0;
    //console.log("set_V v= "+v+" alfa= "+alfa*180/Math.PI+" ybutton= "+ybutton)
    xV = xssp - Math.round(Rsp * Math.sin(alfa));
    yV = yssp + Math.round(Rsp * Math.cos(alfa));
    paintSp();
}