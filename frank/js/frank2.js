var width = 230; // Данные переменные хранят ширину и
var height = 270; //  высоту апплета
var sleeptime = 50;
var w_tube = 48;
var x1_tube = 165;
var h_tube = 127;
var y1_tube = 60;
//var current_gaz;
var icase = 2;
//var nFirstEnergy = -1;
var nEnergy = 1;
var nEnergyOld;
var U;
var imHeight2;
var imWidth2;
var bBeginDrag = false;
var imX02 = 87;
var imY02, imY2;
var dy2 = 0;
var yr = 62 - 14;
var hr = 114 + 27;
var Um = 14.1; //11.4;
var OnOff = false;
var Dtimer;

function init2() {
    creepV = new Image();
    creepV.src = './images/creepV.gif';
    frank2 = new Image();
    frank2.src = './images/frank2.gif';
    imHeight2 = 9; //creepV.height;    
    imWidth2 = 12; //creepV.width;
    imY02 = yr + hr - 5 * imHeight2 / 8;
    imY2 = imY02;
    U = 0;
    nEnergyOld = nEnergy;
    Canvas2 = refObj('Canvas2');
    context2 = Canvas2.getContext('2d');
    Canvas2.onmouseup = mouseReleased;
    Canvas2.onmousedown = mousePressed;
    Canvas2.onmousemove = mouseDragged;
    Canvas2.tabIndex = 1000;
    refObj("Canvas2").addEventListener("keyup", keyPressed, false);
    Init_frankLib(icase);
    frank2.onload = function() {
            paint2();
        }
        //	setTimeout("paint2()",100);
}

function paint2() {
    context2.drawImage(frank2, 0, 0);
    SetElectronField(context2, w_tube, h_tube, x1_tube, y1_tube, 0, U);
    if (nFirstEnergy == -1) tm = 4.9;
    else tm = energys[nFirstEnergy].energy;
    drawAtoms(context2, icase, U, tm, x1_tube, y1_tube, w_tube, h_tube);
    context2.drawImage(creepV, imX02, imY2);
    if (OnOff) {
        context2.fillStyle = "rgb(222,214,198)";
        context2.fillRect(11, 51, 13, 12);
        context2.strokeStyle = "rgb(74,82,82)";
        context2.beginPath();
        context2.lineWidth = 2;
        context2.moveTo(24, 51);
        context2.lineTo(24, 67);
        context2.stroke();
    }
    context2.fillStyle = "white";
    context2.font = '14px bold Serif';
    context2.fillText("U = " + String(round_double(U)) + " " + " В", 90, 255);
}
//==========================================================================
function rezet() {
    U = 0;
    nEnergyOld = 1;
    showVA();
    paint2();
}
//==========================================================================
function startF2() {
    Dtimer = setInterval(paint2, 100);
}
//==========================================================================
function startM2() {
    OnOff = !OnOff; //nFirstEnergy = fLib.getNumberEnergy(current_gaz);
    startNew(); //rezet();
}
//==========================================================================
function startNew() {
    if (ntext == 2) OnOff = false; //||ntext==4
    imY2 = imY02;
    current_gaz = Math.round(6 * Math.random(6));
    if (current_gaz > 5) current_gaz = 5;
    load(current_gaz);
    nFirstEnergy = getNumberEnergy(current_gaz);
    rezet();
}
//==========================================================================
function start() {
    startNew();
    if (icase == 3) startM();
}
//==========================================================================
function stopM() {
    paint2();
}
//==========================================================================
function run() {
    while (true) {
        paint2();
    }
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
function setOnOff() {
    OnOff = true;
    paint2();
}
// ============================================  
function showVA() {
    if (OnOff) U = Um * (yr + hr - imY2 - imHeight2 / 2) / hr;
    else U = 0;
    if (U == 0) nEnergyOld = 1;
    nEnergy = 1;
    while ((nEnergy < nlevels[current_gaz] + 1) && (U > energys[nFirstEnergy + nEnergy - 1].energy - 0.005))
        nEnergy++;
    //alert("showVA nEnergy= "+nEnergy)	
    if (nEnergy > nEnergyOld && ntext < 3) {
        setFair();
    }
    nEnergyOld = nEnergy;
    //console.log("showVA nEnergy= "+nEnergy+" U= "+U)
    showLevels(current_gaz, nEnergy, U);
}
// ============================================	
// ============================================	
function mousePressed(e) {
    Canvas2 = refObj('Canvas2');
    var mouse = {
        x: e.clientX - Math.round(Canvas2.getBoundingClientRect().left),
        y: e.clientY - Math.round(Canvas2.getBoundingClientRect().top)
    }
    if (mouse.x > imX02 && mouse.x < imX02 + imWidth2 && mouse.y > imY2 + dy2 && mouse.y < imY2 + dy2 + imHeight2) {
        bBeginDrag = true;
        dy2 = imY2 - mouse.y + dy2;
    } else bBeginDrag = false;
    //console.log("mousePressed mouse.y= "+mouse.y+" imY2= "+imY2+" mouse.x= "+mouse.x+" imX02= "+imX02+" dy2= "+dy2+" mouse.y>imY2+dy2= "+(mouse.y>imY2+dy2)+" mouse.y<imY2+dy2+imHeight2= "+(mouse.y<imY2+dy2+imHeight2)+" bBeginDrag= "+bBeginDrag)
} //mouseDown
//** ============================================  
function mouseDragged(e) {
    var newY = e.clientY - Math.round(Canvas2.getBoundingClientRect().top);
    if (bBeginDrag) {
        if (newY < yr - dy2) imY2 = yr - dy2;
        else
        if ((newY + imHeight2 / 2 + dy2) > hr + yr) imY2 = hr + yr - 5 * imHeight2 / 8;
        else imY2 = newY; //-dy;	      
        showVA();
        paint2();
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
    //  if(isProgram) return;
    switch (code) {
        case 38:
            if ((imY2) > yr) {
                imY2--;
            }
            break;
        case 40:
            if ((imY2 + imHeight2) < yr + hr) {
                imY2++;
            }
            break;
    }
    showVA();
    paint2();
}