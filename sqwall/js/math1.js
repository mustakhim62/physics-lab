var width2 = 150; // Данные переменные хранят ширину и
var height2 = 30; //  высоту апплета
var nlevel = 1;
var pi2;
var flag = false;
var xi1, yi1, w1;
var context2;
var Atimer;

function init2() {
    pi2 = new Image();
    pi2.src = './images/piWhite.gif';
    xi2 = width2 / 2;
    yi2 = height2 / 2;
    Canvas2 = refObj('Canvas2');
    //alert(Canvas2)  
    context2 = Canvas2.getContext('2d');
    //alert(context2)  
    setTimeout("paint2()", 200);
}

//==========================================================================
function paint2() {
    context2.fillStyle = "black";
    context2.fillRect(0, 0, width2, height2);
    //alert("paint2 flag= "+flag)
    //	prepare_screen2();
    if (flag) {
        prepare_screen2();
        //		OS.offscreenGC.drawImage(small.offscreenImage, 0, 0, null);
        context2.drawImage(pi2, xi2, yi2);
    }
}
//==========================================================================
function prepare_screen2() {
    var x, y;
    context2.fillStyle = "black";
    context2.fillRect(0, 0, width2, height2);
    context2.fillStyle = "rgb(130,130,150)";
    var w1 = 400 / nlevel;
    w = width2 / nlevel;
    for (j = 0; j < nlevel; j++) {
        xm = j * w + w / 2;
        var dx = w / 5;
        for (i = 0; i < w1 + w1 / 4; i++) {
            x = Gauss(xm, dx);
            //			x=Math.round(xm+/*r.nextGaussian*/Math.random()*dx);
            y = 10 + Math.round(Math.random() * 10);
            context2.fillRect(x, y, 1, 1);
        }
    }
}
//==========================================================================
function startM2() {
    if (flag) Atimer = setInterval("run2()", 100);
    //console.log("startM2 Atimer= "+Atimer)
    /*	if (workThread == null)
    	{
    		workThread = new Thread(this,"math1");
    		workThread.start();
    	}*/
}
//==========================================================================
function stop2() {
    flag = false;
    clearInterval(Atimer); // 
    //console.log("stop2 Atimer= "+Atimer)
    /*	if(workThread != null) workThread.interrupt();
    	workThread = null;
    	notifyAll();*/
}
//==========================================================================
function run2() {
    var xm = Math.round(Math.random() * nlevel) * width2 + width2 / 2;
    var dx = width2 / 5;
    xi2 = Gauss(xm, dx);

    //		x=Math.round(xm+/*r.nextGaussian*/gaussianRand()*dx);//xi=Math.round(xm+r.nextGaussian()*dx);
    yi2 = 10 + Math.round(Math.random() * 10);
    paint2();
    //	stop();
}
//==========================================================================
function setNlevel(n) {
    //alert("setNlevel n= "+n+" flag= "+flag)
    nlevel = n;
    prepare_screen();
    flag = true;
    startM2();
}
//==========================================================================
function stopM2() {
    context2.fillStyle = "black";
    context2.fillRect(0, 0, width2, height2);
    flag = false;
    stop2();
    paint2();
}
//..==========================
function Gauss(mean, dev) {
    var u, v, s;
    do {
        u = 2.0 * Math.random() - 1.0;
        v = 2.0 * Math.random() - 1.0;
        s = u * u + v * v;
    } while (s > 1.0 || s == 0.0);

    var r = Math.sqrt(-2.0 * Math.log(s) / s);
    return r * v * dev + mean;
}