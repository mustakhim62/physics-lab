//	ShowTextsW appS = null;
var width = 490;
var height = 245;
var x0 = 115;
var y0 = 161;
var ymin = y0 - 80;
var xs = [x0 - 9, x0 - 21];
var ys = [ymin, y0 - 60];
var xs2 = [x0 - 9, x0 - 21];
var ys2 = [ymin, y0 - 60];
var xend = [x0 - 9, x0 - 21];
var yend = [ymin, y0 - 60];
var yi = [ymin, y0 - 60];
var xi = [x0 - 9, x0 - 21];
var sleeptime = 50;
var flags = [false, false, false, false, false];
var nflag = 4;
var nflagold = -1;
//var isFlash = true;
var flagL = false;
var tmpColor = "gray";
var tmpColor1 = "rgb(144,144,144)";
var stext = ["НЕБОЛЬШОЕ ВВЕДЕНИЕ :", "УСЛОВИЕ ВУЛЬФА-БРЭГГА"];
var context1;
var tanfi = 1.783; // fi = 61
var xA;
var yA;
var yB;
var iv = 0;
var iff = 0;

function init() {
    elem1 = document.getElementById('Canvas1');
    context1 = elem1.getContext('2d');
    paint();
} //init
//======================================================
function paint() {
    context1.fillStyle = "black";
    context1.fillRect(0, 0, width, height);
    context1.fillStyle = "white";
    context1.font = '13px bold Dialog';
    context1.fillText(stext[0], 140, 27);
    context1.fillStyle = "yellow";
    context1.font = '25px bold TimesRoman';
    var x01 = (width - context1.measureText(stext[1]).width) / 2;
    context1.fillText(stext[1], x01, 56);
    if (flagL) { // flagL
        context1.strokeStyle = "yellow";
        context1.lineWidth = 1;
        for (i = 0; i < 2; i++) {
            if (yi[i] < ymin) {
                yi[i] = ymin;
                xi[i] = x0 + 287;
            }
            context1.beginPath();
            context1.moveTo(xs[i], ys[i]);
            context1.lineTo(xi[i], yi[i]);
            context1.stroke();
            context1.beginPath();
            context1.moveTo(xs2[i], ys2[i]);
            context1.lineTo(xend[i], yend[i]);
            context1.stroke();
        }
    }
    context1.strokeStyle = "red";
    for (i = 0; i < 3; i++)
        for (j = 0; j < 9; j++) {
            context1.beginPath();
            context1.arc(x0 + j * 34, y0 + i * 26, 4, 0, 2 * Math.PI, true);
            context1.stroke();
        }
        //						OS.offscreenGC.drawOval(x0+j*34,y0+i*26,6,6);
    context1.fillStyle = "cyan";
    context1.strokeStyle = "cyan";
    for (i = 0; i < 2; i++) {
        context1.beginPath();
        context1.moveTo(x0 - 4, y0 + i * 26);
        context1.lineTo(x0 - 24, y0 + i * 26);
        context1.stroke();
    }
    context1.beginPath();
    context1.moveTo(x0 - 20, y0);
    context1.lineTo(x0 - 20, y0 + 26);
    context1.stroke();
    context1.font = '13px plain Serif';
    context1.fillText("d", x0 - 32, y0 + 20);
    if (flags[0]) { // flags[0]
        context1.beginPath();
        context1.moveTo(x0 + 135, y0);
        context1.lineTo(x0 + 112, y0);
        context1.arc(x0 + 135, y0, 24, Math.PI, 1.3 * Math.PI, false);
        context1.stroke();
        context1.fillText("" + '\u03C6', x0 + 127, y0 - 10);
    }
    context1.fillStyle = "lightGray";
    context1.strokeStyle = "lightGray";
    if (flags[1]) { // flags[1]
        context1.beginPath();
        context1.moveTo(x0 + 9, y0 - 91); //1-1
        context1.lineTo(x0 - 24, y0 - 39);
        context1.stroke();
        context1.fillText("1", x0 + 12, y0 - 80);
        context1.fillText("1", x0 - 15, y0 - 36);
    }
    if (flags[2]) { //flags[2]
        context1.beginPath();
        context1.moveTo(x0 + 259, y0 - 88); //2-2
        context1.lineTo(x0 + 288, y0 - 39);
        context1.stroke();
        context1.fillText("2", x0 + 252, y0 - 78);
        context1.fillText("2", x0 + 279, y0 - 33);
    }
    if (flags[3]) { //flags[3]
        for (i = 0; i < 2; i++) {
            context1.beginPath();
            context1.moveTo(x0 + 135, y0 + 3); // C B D
            context1.lineTo(x0 + 124 + i * 26, y0 + 23);
            context1.stroke();
        }
        context1.fillText("B", x0 + 132, y0 + 44);
        context1.fillText("C", x0 + 117, y0 + 34);
        context1.fillText("D", x0 + 148, y0 + 34);
    }
}
//==========================================================================
function startM() {
    flagL = true;
    xA = x0 + 139;
    yA = y0 + 3;
    yB = y0 + 29;
    nflagold = -1;
    Atimer = setInterval("run()", 50);
    iv = 0;
    /*	if (workThread == null)
    	{
    		workThread = new Thread(this);
    		workThread.start();
    	}*/
}
//==========================================================================
function stopM() {
    //	   if(workThread != null) workThread = null;
    /*while (isFlash)flash();*/
    paint();
}
//========================================================
function run() {
    if (iv == 148) {
        xend[0] = xA;
        yend[0] = yA;
        xs[0] = xA;
        ys[0] = yA;
    }
    if (iv == 160) {
        xend[1] = xA;
        yend[1] = yB;
        xs[1] = xA;
        ys[1] = yB;
    }
    xi[0] = xs2[0] + iv;
    xi[1] = xs2[1] + iv;
    yi[0] = yA - Math.round(Math.abs(iv - 148) / tanfi);
    yi[1] = yB - Math.round(Math.abs(iv - 160) / tanfi);
    paint();
    iv++;
    if (iv == 320) {
        clearInterval(Atimer);
        stopM();
    }
}
//==========================================================================
function doubleToString(d) {
    return String(round_double(d));
}
/*/========================================================
function flash()
{				
//	if(nflag!=nflagold){
		iff=0;
		isFlash = true;
		Btimer=setInterval("flash1()",150)
//	}
//	sleep_and_paint(5*sleeptime);
}
//========================================================
function flash1()
{				
	nflagold=nflag;
		flags[nflag]=!flags[nflag];
		iff++;
console.log("flash1 iff= "+iff+" nflag= "+nflag+" nflagold= "+nflagold+" flags[nflag]= "+flags[nflag]);
		paint();
		if(iff==9){clearInterval(Btimer);flags[nflag]=true;iff=0;rezetFlash()}
//		sleep_and_paint(3*sleeptime);
	
	if(nflagold==3)rezetFlash();
//	nflagold=nflag;
}*/
//========================================================
function setFlag(f) {
    nflag = f;
    if (nflagold != nflag) {
        flags[nflag] = true;
        nflagold = nflag;
        iff = 0;
    } else {
        flags[nflag] = !flags[nflag];
        iff++;
        if (iff == 10) flags[nflag] = true;
    }
    paint();
    //console.log("setFlag nflag= "+nflag+" nflagold= "+nflagold+" flags[nflag]= "+flags[nflag]);
    //	if(nflag!=nflagold)flash();
}
/*/========================================================
function rezetFlash()
{
	isFlash = false;
}*/