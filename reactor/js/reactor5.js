var width5, height5;
var nameS = "Увы...";
var isMove = false;
var Vu = 4.8; //{ объем урана в куб.м }
var Sf = 19.3; //{ макросечение деления, 1/м }
var R = 0.014; //{ радиус стержня, м }
var Mu = 92000; //{ масса урана в кг }
var roU = 19000; //{ плотность урана,кг/м3 }
var Cu = 138; //{ теплоемкость урана, Дж/кг*град }
var Cg = 1030; //{ теплоемкость теплоносителя, Дж/кг*град }
var v = 2E5; //{ скорость тепловых нейтронов м/c }
//{  alfa=0.239E4;} { коэффициент теплоотдачи Дж/м2*c*град }
var S = 670; //{ суммарная площадь поверхности ТВЭЛов, кв.м }
var H = 6.1; //{ высота активной зоны, м }
var Au = 2E-5; //{ температурный коэффициент,1/град }
var k, tau;
var t, dtr, deltaTu, deltaTg;
var Pwt, q, ro, deltaRo, Tu, Tg1, Tg2, Tgmed, nre, Fi;
var W, alfa, alfa_W;
var vg = 2;
var isStop = false;
var isMoveRod = false;
var yrod = 50;
var hrod = 50;
var isCrash = false;
var Ftimer;
var Htimer;
var Mtimer;

function init5() {
    //    reactor = new Image();
    //do{	  
    //    reactor.src = './images/reactor.gif';
    //} while(reactor.width==0);
    reactor_off = new Image();
    reactor_off.src = './images/reactor_off.gif';
    elem = document.getElementById('Canvas5');
    context5 = elem.getContext('2d');
    width5 = elem.width;
    height5 = elem.height;
    //	prepareImage();
}
/*/==========================================================================
void prepareImage(){
    PlugInFilter pif;
	ReactorFilter bf = new ReactorFilter(false,15);
	pif = bf;
	OS1 = mlib.makeDoubleBuffer( this,reactor.getWidth(this), reactor.getHeight(this));
	OS1.offscreenImage = pif.filter(this,reactor);
}*/
//========================================================================
function startM5() {
    prepdata5();
    Htimer = setInterval(run5, 100);
    /*	if (workThread == null)
    	{
    		workThread = new Thread(this);
    		workThread.start();
    	}*/
}
/*public void stop()
{
	if(workThread != null) workThread = null;
}*/
//==========================================================================
function paint5() {
    context5.drawImage(reactor, 0, 0)
    if (isCrash) {
        context5.drawImage(reactor_off, 0, 0)
        drawCrash();
        clearInterval(Htimer);
        clearInterval(Ktimer);
    } else {
        //console.log("paint5 reactor.width= "+ reactor.width)
        //console.log("paint5 after reactor.width= "+ reactor.width)
        context5.fillStyle = "rgb(47,23,32)";
        context5.fillRect(119, 60, 3, yrod + 8);
        context5.fillStyle = "rgb(223,208,192)";
        context5.fillRect(119, 68 + yrod, 3, 56 - yrod);
    } //else
}
//==========================================================================
function run5() {
    var a, b, tmp;
    var cn = 0;
    b = 2 / R;
    a = 1 / Mu / Cu;
    /*	appG = (graphNew)ac.getApplet("GraphA");
    	appIPw = (indicator)ac.getApplet("IPw");
    	appIRo = (indicator)ac.getApplet("IRo");//
    	appSR = (self_recorder)ac.getApplet("SR");
    	appTp = (tapeValue)ac.getApplet("Tp");*/
    //    do {
    ro = k - 1 - deltaRo - Au * (Tu - 24);
    set_digits(1, ro);
    //console.log("run5 nre= "+nre+" ro= "+ro+" ro*dtr/tau= "+(ro*dtr/tau)+" Math.exp(ro*dtr/tau)= "+Math.exp(ro*dtr/tau))
    nre = nre * Math.exp(ro * dtr / tau);
    //console.log("run5_2 nre= "+nre)
    Fi = nre * v;
    Pwt = Sf * Fi * Vu / 3.1E10;
    set_digits(0, Pwt / 1e6);
    setValueT(1 + Math.round(Pwt / 1e6));
    //ShowPwt;
    q = Pwt / S; // тепловой напор,Вт/м2 }
    defineW_alfa();
    tmp = b * alfa * (Tu - Tgmed);
    if (tmp > 0) Tg2 = Tg1 + tmp / W / Cg;
    else tmp = 0;
    Tu = Tu + (Pwt - tmp) * dtr * a;
    if ((ro > 0) && (Tg2 < 140)) Tg1 = Tg2;
    if ((q < 10) && (Tg1 > 24)) Tg1 = Tg1 - 0.5;
    Tgmed = (Tg1 + Tg2) / 2;
    setT(Tu);
    if ((Tgmed > 240) || (Tu > 1300)) shimmer();
    if (Tu > 1500) { crash(); return; }
    t += dtr;
    d1.push([t / 200, Math.log(n) - 12]);
    plot = $.plot("#Graph5", [d1], plotParams1);
    if (cn == 0) {
        d1.push([t / 200, Math.log(nre) - 12]);
        plot = $.plot("#Graph5", [d1], plotParams1);
        //		  appG.Pg.drawPoint(t/200,Math.log(n)-12);
        //		  appG.repaint();
    }
    cn++;
    cn = cn % 100;
    setT(Tu);
    paint5();
}
//==========================================================================
function prepdata5() {
    Tu = 20;
    Tg1 = 20;
    Tg2 = 20;
    Tgmed = 20;
    nre = 1.0E6; //{ 1/m3 }
    deltaTu = 0;
    deltaTg = 0;
    t = 0;
    dtr = 1;
    tau = 2;
    k = 1.03;
    deltaRo = 0.06;
    //{    ro:=k-1;      }
    alfa_W = Cg / S;
    //vg = 1.5;
    defineW_alfa(); // кг/с }
    Pwt = 0;
}

function defineW_alfa() { //весовой расход теплоносителя, кг/с
    //коэффициент теплопередачи, Дж/(м2*с*град) }
    W = 800 * Math.exp(0.8 * Math.log(vg / 30));
    alfa = alfa_W * W;
}

function set_V5(v) {
    vg = v;
}
//==========================================================================
function setY(up) {
    if (up) { if (yrod > 0) yrod--; } else if (yrod < 50) {
        yrod++;
    }
    deltaRo = 0.06 * Math.pow(Math.sin(yrod / hrod), 2);
    paint5();
}
//=====================================================================
function startRod(up) {
    isMoveRod = true;
    Ftimer = setInterval(runMoveRod(up), 100)
}

function RodDown() {
    yrod++;
    deltaRo = 0.06 * Math.pow(Math.sin(yrod / hrod), 2);
    if (yrod == 50) clearInterval(Mtimer);
}
//=====================================================================
function stopRod() {
    isMoveRod = false;
    clearInterval(Ftimer);
}
//=====================================================================
function rezet() { //rezet()
    //	while(yrod<50){
    Mtimer = setInterval(RodDown, 40);
    //	try {Thread.sleep(40);}
    //	catch (InterruptedException ex) {}		if(yrod==50){clearInterval(Mtimer)}

    //	}
}
//==========================================================================
function crash() {
    var i = 0;
    while (i < 7) {
        isCrash = !isCrash;
        paint5();
        i++;
        //	try {Thread.sleep(200);}
        //	catch (InterruptedException ex) {}
    }
    isStop = true;
    isMove = false;
    paint5();
    //	stop();
}
//==========================================================================
function drawCrash() {
    var gradient = context5.createLinearGradient(20, 20, 130, 130);

    // Добавляем два цвета
    gradient.addColorStop(0, "magenta");
    gradient.addColorStop(1, "yellow");
    var xpoints = [20, 70, 150, 200, 130, 40, 20];
    var ypoints = [20, 70, 40, 100, 130, 70, 20];
    context5.fillStyle = gradient;
    //  	context5.fillStyle="black";
    context5.beginPath();
    context5.moveTo(xpoints[0], ypoints[0]);
    for (var i = 0; i < xpoints.length - 1; i++) {
        context5.lineTo(xpoints[i + 1], ypoints[i + 1]);
    }
    context5.closePath();
    context5.fill();
    context5.stroke();
    context5.font = '18px bold TimesRoman';
    context5.fillStyle = "black";
    context5.fillText(nameS + "    " + nameS, width5 / 3, height5 / 2 + 5);
}
//==========================================================================
function getPw() {
    return Math.round(Pwt / 1e6);
}
//==========================================================================
//}//reactor5
//------------------------------------------------------
/*class moveRodThread extends Thread
{
  reactor5 appR = null;
  boolean up;}
  public moveRodThread (Applet app, boolean up)
  {
    super("moveRodThread");
	appR = (reactor5)app;
	this.up = up;
	this.start();
  }*/
//========================================================
function runMoveRod(up) {
    setY(up);
}