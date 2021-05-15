var width1 = 350; // Данные переменные хранят ширину и
var height1 = 280; //  высоту апплета
var sleeptime = 50;
var w_tube = [113, 14];
var width_t = w_tube[0] + w_tube[1] + 2;
var x1_tube = [122, 237];
var h_tube = 43;
var y1_tube = 28;
var current_gaz, icase;
var nFirstEnergy = -1;
var U, Ia;
//   private Image[] images = new Image[2];
var imHeight1;
var imWidth1;
//	Rectangle rcImage;
var bBeginDrag = false;
var imX01, imX1;
var imY01 = 194;
var dx1 = 0;
var xr = 78;
var wr = 112;
var Um = 12;
var OnOff = false;
var nameV = "В";
var nameI = "мкА";
var Canvas1;
var context1;
var Ctimer;

function init1() {
    creep = new Image();
    creep.src = './images/creep.gif';
    frank1 = new Image();
    frank1.src = './images/frank1.gif';
    imHeight1 = 12; //creep.height;    
    imWidth1 = 9; //creep.width;
    imX01 = xr + wr - imWidth1 / 2;
    imX1 = imX01;
    Canvas1 = refObj('Canvas1');
    //alert(Canvas1)  
    context1 = Canvas1.getContext('2d');
    Canvas1.onmouseup = mouseReleased;
    Canvas1.onmousedown = mousePressed;
    Canvas1.onmousemove = mouseDragged;
    //refObj("Canvas1").addEventListener("mouseup",mouseReleased,false);
    Canvas1.tabIndex = 1000;
    refObj("Canvas1").addEventListener("keyup", keyPressed, false);
    U = 0;
    Ia = 0;
    icase = 1;
    Init_frankLib(1);
    frank1.onload = function() {
            paint1();
        }
        //		setTimeout("paint1()",100);
}

//==========================================================================
function paint1() {
    context1.drawImage(frank1, 0, 0);
    for (i = 0; i < 2; i++) {
        SetElectronField(context1, w_tube[i], h_tube, x1_tube[0], y1_tube, i, U);
    }
    if (nFirstEnergy == -1) tm = 4.9;
    else tm = energys[nFirstEnergy].energy;
    drawAtoms(context1, icase, U, tm, x1_tube[0], y1_tube, width_t, h_tube);
    //	drawAtoms(context1,icase,U,energys[nFirstEnergy].energy, x1_tube[0],y1_tube,width_t,h_tube);
    context1.drawImage(creep, imX1, imY01);
    if (OnOff) {
        context1.fillStyle = "rgb(222,214,198)";
        context1.fillRect(66, 258, 19, 14);
        context1.strokeStyle = "rgb(74,82,82)";
        context1.beginPath();
        context1.lineWidth = 2;
        context1.moveTo(66, 259);
        context1.lineTo(86, 259);
        context1.stroke();
    }
    context1.fillStyle = "white";
    context1.font = '14px bold Serif';
    context1.fillText("U = " + String(round_double(U)) + " " + nameV, 118, 131);
    context1.fillText("I = " + String(round_double(Ia)) + " " + nameI, 274, 129);
}
//==========================================================================
function startM() {
    OnOff = !OnOff; //true;
    //	if(!OnOff)return;
    U = 0;
    Ia = 0;
    imX1 = imX01;
    dx1 = 0;
    current_gaz = Math.round(6 * Math.random(6));
    load(current_gaz);
    nFirstEnergy = getNumberEnergy(current_gaz); // 11.03.2005
    //alert("startM nFirstEnergy= "+nFirstEnergy+" energys[nFirstEnergy].energy= "+energys[nFirstEnergy].energy)		
    showVA();
    ClearGraph();
    paint1();
}
//==========================================================================
function startF() {
    Ctimer = setInterval(paint1, 100);
}
//==========================================================================
function startF() {
    Atimer = setInterval(paint1, 100);
}
//==========================================================================
function run() {}
///==========================================================================
function VA_function(U, Ukr) {
    var n;
    var I, Utmp, kU;
    n = 1;
    if (current_gaz < 5) kU = 10;
    else kU = 20; // 11.03.2005
    if (U > 1.0) {
        I = 1.0 * Math.exp(1.5 * Math.log(U));
    } else I = 0;
    if (U < Ukr) return I;
    while (U > (n + 1) * Ukr) { n++; }
    Utmp = U - n * Ukr;
    if (icase == 1) {
        I = I - 1.0 - kU * n * Math.sqrt(Utmp) * Math.exp(-Utmp); // 11.03.2005
        if (I < 0) I = 0;
    }
    return I;
}
// ============================================  
function getU1() {
    return String(round_double(energys[nFirstEnergy].energy));
}
// ============================================  
function getOnOff() {
    return OnOff;
}
// ============================================  
function showVA() {
    if (OnOff) {
        U = Um * (xr + wr - imX1 - imWidth1 / 2) / wr;
        Ia = VA_function(U, energys[nFirstEnergy].energy); //Hg
        drawPointXY(U, Ia);
    } else {
        U = 0;
        Ia = 0;
    }
}
// ============================================	
function mousePressed(e) {
    Canvas1 = refObj('Canvas1');
    var mouse = {
            x: e.clientX - Math.round(Canvas1.getBoundingClientRect().left),
            y: e.clientY - Math.round(Canvas1.getBoundingClientRect().top)
        }
        //console.log("mousePressed mouse.x= "+mouse.x+" imX1= "+imX1+" dx1= "+dx1+" imWidth1= "+imWidth1)
    if (mouse.x > imX1 + dx1 && mouse.x < imX1 + dx1 + imWidth1 && mouse.y > imY01 && mouse.y < imY01 + imHeight1) {
        bBeginDrag = true;
        dx1 = imX1 - mouse.x + dx1;
    } else bBeginDrag = false;
} //mouseDown
//** ============================================  
function mouseDragged(e) {
    var newX = e.clientX - Math.round(Canvas1.getBoundingClientRect().left);
    if ((bBeginDrag) && (newX > xr) && (imX1 < xr + wr)) {
        if (newX < xr - dx1) imX1 = xr - dx1;
        else
        if ((newX + imWidth1 / 2 + dx1) > xr + wr)
            imX1 = xr + wr - imWidth1 / 2;
        else imX1 = newX + dx1;
        showVA();
        paint1();
    }
}

function mouseReleased(e) {
    bBeginDrag = false;
    dx1 = 0;
}
// ============================================  
// keyPressed
// ============================================
function keyPressed(ke) {
    var code = ke.keyCode;
    switch (code) {
        case 37:
            if ((imX1) > 90) {
                imX1--;
            }
            break;
        case 39:
            if ((imX1 + imWidth1 / 2) < xr + wr) {
                imX1++;
            }
            break;
    }
    showVA();
    paint1();
}
//==========================================================================
function addV() {
    if (imX1 > xr) imX1--;
    showVA();
    paint1();
}