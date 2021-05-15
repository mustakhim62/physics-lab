var width3 = 240; // Данные переменные хранят ширину и
var height3 = 244; //  высоту апплета
/*    AppletContext ac = null;
	counter appC = null;
	graphSc appG = null;		
	MyLib mlib = new MyLib();
	VectorLib vlib = new VectorLib();
	MathAtomic mathA = new MathAtomic();
	Rezerford rz = new Rezerford();		
    offscreenType OS = new offscreenType();
	Thread countThr = null; // переменная типа Поток
	Thread workThr = null;*/ // переменная типа Поток
var sleep = 100;
var isElectron = false;
var isCount3 = false;
var isFirst = true;
var Nx3, sleeptime;
var t3 = 1;
var d3 = 1;
var angle3 = 0;
var fi_rad3 = 0;
var sinfi3, cosfi3;
var x03 = 114;
var y03 = 136;
var dashList = [5, 5]; // Create a dot/dash sequence    
var ctt = 0;
var Etimer;

function init3() {
    scatter3m = new Image();
    scatter3m.src = './images/scatter3m.gif';
    sinfi3 = 0;
    cosfi3 = 1;
    var elem = document.getElementById('Canvas3');
    //alert("w= "+elem.clientWidth)  
    context3 = elem.getContext('2d');
}
//==========================================================================
function paint3() {
    var elem = document.getElementById('Canvas3');
    context3 = elem.getContext('2d');
    context3.fillStyle = "rgb(24,106,106)"; // или white
    context3.fill();
    context3.drawImage(scatter3m, 0, 0);
    var s = String.fromCharCode(966) + " = " + String(angle) + String.fromCharCode(176);
    context3.font = '14px PLAIN sans-serif';
    context3.fillStyle = "yellow";

    //		OS.offscreenGC.copyArea(0, height, width, height, 0, -height);
    context3.fillText(s, 160, 50);
    rocket();
    collimator();
    cillF();
    if (isElectron) {
        ctt = ctt % 8;
        ctt++;
        context3.fillStyle = "black";
        context3.fillRect(110, 130, 8, 12);
        context3.lineWidth = 1;
        context3.strokeStyle = "Magenta"; //magenta";
        context3.setLineDash(dashList);
        context3.lineDashOffset = -ctt; // Animate the lines
        context3.beginPath();
        context3.moveTo(54, 136);
        context3.lineTo(140, 136);
        context3.stroke();
        context3.beginPath();
        context3.strokeStyle = "LightBlue";
        context3.moveTo(114, 46);
        context3.lineTo(114, 180);
        context3.stroke();
        context3.setLineDash([]);
        //		vlib.DrawDashedLineH( OS.offscreenGC,54+d,140, 136, Color.magenta );
        //		vlib.DrawDashedLineV( OS.offscreenGC,113,46+d, 132, Color.blue );
        DrawScatteringE();
    }
    //		d = (d+2)%7;
}

function StartMove3() {
    /*	var sinfi4;
    	var constantT_dOmega = 7.81;
    	var A0=0.1;
    	sinfi4 = Math.pow(Math.sin(fi_rad3),4);
    	//System.out.println("begin StartCount Nx = "+Nx);
        Nx = calc_Ne(angle3);*/
    if (isFirst) {
        isElectron = true; // Запуск потока
        Etimer = setInterval(paint3, sleep);
        isFirst = false;
    }
    isCount = true;
    StartCount3();
}
//========================================================
function SetAngle3(f) {
    angle3 = f;
    //alert("angle3= "+angle3)
    fi_rad3 = Math.PI / 180 * angle3;
    sinfi3 = Math.sin(fi_rad3);
    cosfi3 = Math.cos(fi_rad3);
    paint3();
}

function collimator() {
    var hcoll = 57; //45;
    var w = [13, 4];
    var tmpx = [];
    var tmpy = [];
    var xtmp = x03 + Math.round(hcoll * sinfi3);
    var ytmp = y03 + Math.round(hcoll * cosfi3);
    for (i = 0; i < 2; i++) {
        tmpx[i] = Math.round(w[i] * cosfi3);
        tmpy[i] = Math.round(w[i] * sinfi3);
    }
    context3.beginPath();
    context3.lineWidth = 1;
    context3.strokeStyle = "cyan";
    context3.moveTo(xtmp - tmpx[0], ytmp + tmpy[0]);
    context3.lineTo(xtmp - tmpx[1], ytmp + tmpy[1]);
    context3.moveTo(xtmp + tmpx[0], ytmp - tmpy[0]);
    context3.lineTo(xtmp + tmpx[1], ytmp - tmpy[1]);
    context3.stroke();
}

function cillF() {
    var a = angle * Math.PI / 180;
    var Rf = 64;
    var deltaFi = 60;
    var xline, yline, xc, yc, xtmp, ytmp;
    xc = x03 + Math.round(Rf * sinfi3);
    yc = y03 + Math.round(Rf * cosfi3);
    context3.strokeStyle = "lightGray";
    //alert("angle= "+angle+" xc= "+xc+" yc= "+yc)
    context3.beginPath();
    context3.arc(xc, yc - 2, 10, Math.PI - a, -a, true);
    context3.stroke();
    //	g.drawArc(xc-5,yc-5,11,11,angle,-180);
    xtmp = x03 + Math.round((Rf + 7) * sinfi3);
    ytmp = y03 + Math.round((Rf + 7) * cosfi3);
    xline = x03 + Math.round((Rf + 18) * sinfi3);
    yline = y03 + Math.round((Rf + 18) * cosfi3);
    context3.beginPath();
    context3.moveTo(xtmp, ytmp);
    context3.lineTo(xline, yline);
    context3.moveTo(xline, yline);
    context3.lineTo(214, 218);
    context3.moveTo(223, 218);
    context3.lineTo(width3, height3);
    context3.stroke();
}
//========================================================
function rocket() {
    var R2 = 40;
    var alfa = 20 * Math.PI / 180;
    var h58 = 38;
    var h67 = 77;
    var a = angle * Math.PI / 180;
    var x5, y5, x6, y6, x8, y8, x7, y7;
    context3.strokeStyle = "cyan";
    context3.beginPath();
    context3.arc(x03, y03, R2, Math.PI / 2 - alfa - a, Math.PI + alfa, true);
    context3.stroke();
    context3.beginPath();
    context3.arc(x03, y03, R2, Math.PI - alfa, Math.PI / 2 + alfa - a, true);
    context3.stroke();
    //	g.drawArc(x0-R2,y0-R2,2*R2,2*R2,270+alfa+angle,3*Math.PI/2-2*alfa-angle);
    //	g.drawArc(x0-R2,y0-R2,2*R2,2*R2,180+alfa,90-2*alfa+angle);
    var xtmp = x03 + Math.round(h58 * sinfi3);
    var ytmp = y03 + Math.round(h58 * cosfi3);
    var tmpx = Math.round(13 * cosfi3);
    x5 = xtmp + tmpx;
    x8 = xtmp - tmpx;
    var tmpy = Math.round(13 * sinfi3);
    y5 = ytmp - tmpy;
    y8 = ytmp + tmpy;
    xtmp = x03 + Math.round(h67 * sinfi3);
    ytmp = y03 + Math.round(h67 * cosfi3);
    x6 = xtmp + tmpx;
    x7 = xtmp - tmpx;
    y6 = ytmp - tmpy;
    y7 = ytmp + tmpy;
    context3.beginPath();
    context3.moveTo(x5, y5);
    context3.lineTo(x6, y6);
    context3.moveTo(x8, y8);
    context3.lineTo(x7, y7);
    context3.moveTo(x6, y6);
    context3.lineTo(x7, y7);
    context3.stroke();
}
//========================================================
function DrawScatteringE() {
    var tetarad;
    do {
        tetarad = Gasdev() * Math.PI / 6;
    }
    while (Math.abs(tetarad) > Math.PI / 2);
    tetarad = tetarad + Math.PI / 2;
    var sint = Math.sin(tetarad);
    var cost = Math.cos(tetarad);
    context3.setLineDash([2, 3]);
    context3.beginPath();
    context3.moveTo(113, 136);
    context3.lineTo(113 + Math.round(34 * cost), 136 + Math.round(34 * sint));
    context3.stroke();
    context3.setLineDash([]);
    //	vlib.DrawDottedLine( g,113,136,	113+Math.round(34*cost),136+Math.round(34*sint),4 );		
}