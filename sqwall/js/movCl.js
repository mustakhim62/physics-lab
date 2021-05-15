var width3 = 150; // Данные переменные хранят ширину и
var height3 = 30; //  высоту апплета
var flag3 = true;
//	Image pic;
var x3, y3, xs3, dir;
var x03 = 12;
var sleeptime = 100;
var Btimer;

function init3() {
    ballm = new Image();
    ballm.src = './images/ballm.gif';
    Canvas3 = refObj('Canvas3');
    //alert(Canvas1)  
    context3 = Canvas3.getContext('2d');
    xs3 = 10 + Math.round(Math.random() * (width3 - 50));
    x3 = xs3;
    y3 = height3 / 2 - 3;
    dir = 5;
    setTimeout("paint3()", 200)
}

//==========================================================================
function paint3() {
    context3.fillStyle = "black";
    context3.fillRect(0, 0, width3, height3);
    context3.fillStyle = "darkGray";
    for (i = 0; i < 2; i++) context3.fillRect(0 + i * (width3 - x03), 0, x03, height3);
    context3.drawImage(ballm, x3, y3);
}
//==========================================================================
function startM3() {
    flag3 = true;
    Btimer = setInterval("run3()", parseInt(sleeptime));
    //console.log("startM3 Btimer= "+Btimer+" sleeptime= "+sleeptime)
    /*	if (workThread == null)
    	{
    		workThread = new Thread(this,"movCl");
    		//System.out.println("start "+workThread.toString());
    		workThread.start();
    	}*/
}
//==========================================================================
function stop3() {
    flag3 = false;
    clearInterval(Btimer);
    //console.log("stop3 Btimer= "+Btimer+" sleeptime= "+sleeptime)
    sleeptime = 100;
    /*	sleeptime=50;
    	if(workThread != null) {
    		//System.out.println("stop "+workThread.toString());
    		workThread.interrupt();}
    	workThread = null;
    	notifyAll();*/
}
//==========================================================================
function stopM3() {
    stop3();
}
//==========================================================================
function run3() {
    //xs = 10+mlib.rand(width-50); x=xs;
    if (flag3) {
        x3 += dir;
        if ((x3 > width3 - 2 * x03) || (x3 < x03))
            dir = -dir;
        paint3();
    } else stop3();
}
//==========================================================================
function setSleep(s) {
    sleeptime = s;
    //	stop3();
    //	startM3();
}
//==========================================================================
function rezetFlag() {
    flag3 = false;
}