var context1;
var height1, width1;
var colorRGB = "pink";
var bColor;
var sleeptime = 50;
var ncurrent = 0;
var massa = 1.0;
var xball, yball, yi, ys, tint;
var isMoveBall = false;
var nh = 20;
var scaleY = 130000; // точек/м
var y0 = 14;
var t0, ti, ytmp, q, r0;
var v = new Array(2);
var dt = 0.04;
var g = 9.81;
var eta = 18e-6; //Па*с
var ro = 900; // кг/м^3
var ne = 1;
var qelectron = 1.6e-19; // Кл
var dir = 1; // вниз
var dM = 0.005; // 5 мм
var indexV = 0;
var Atimer;
var Atmp, mg;

function init1() {
    elem1 = document.getElementById('Canvas1');
    context1 = elem1.getContext('2d');
    height1 = elem1.getBoundingClientRect().height;
    width1 = elem1.getBoundingClientRect().width;
    context1.canvas.height = height1;
    context1.canvas.width = width1;
    balor = new Image();
    balor.src = './images/ball_yellow2.gif';
    tube = new Image();
    tube.src = './images/tube.gif';
    yball = y0; //height1-3-balor.height;
    xball = width1 / 2 - 3;
    balor.onload = function() {
        paint1()
    }
}
//=====================================================================
function paint1() {
    context1.fillStyle = "#ffffff";
    context1.fillRect(0, 0, width1, height1);
    context1.drawImage(tube, 250 - 4, 0);
    context1.strokeStyle = "#000000";
    context1.strokeRect(0, 0, width1, height1);
    context1.strokeStyle = "#808080";
    context1.lineWidth = 1;
    var dashList = [7, 5]; // Create a dot/dash sequence    
    context1.setLineDash(dashList);
    for (i = 0; i < 2; i++) {
        context1.moveTo(70, 100 + i * 262.5);
        context1.lineTo(430, 100 + i * 262.5);
    }
    context1.stroke();
    context1.setLineDash([]);
    context1.fillStyle = "blue";
    context1.fillRect(208, 14, 90, 3);
    context1.fillStyle = "rgba(0,0,255,0.2)";
    context1.fillRect(0, 14, 208, 3);
    context1.fillRect(300, 14, 200, 3);
    context1.fillStyle = "#ffffff";
    context1.fillRect(width1 / 2 - 3, 14, 10, 10);
    context1.fillStyle = colorRGB;
    context1.fillRect(10, height1 - 4, width1 - 20, 3);
    if (isMoveBall)
        context1.drawImage(balor, xball, yball);
    context1.font = "bold 24px sans-serif";
    context1.fillStyle = "red";
    context1.textAlign = "right";
    context1.textBaseline = "bottom";
    context1.fillText("+", 490, 490);
    context1.fillStyle = "blue";
    context1.textAlign = "right";
    context1.textBaseline = "top";
    context1.fillText("-", 490, 8);
    for (i = 0; i < 5; i++) {
        context1.strokeStyle = 'rgb(' + (128 + i * 15) + ',' + (128 + i * 15) + ',' + (128 + i * 15) + ')';
        context1.lineWidth = 2;
        context1.beginPath();
        context1.arc(width1 / 2, height1 / 2, width1 / 2 - i * 2 - 3, 0, 2 * Math.PI, true);
        context1.stroke();
    }
}

//========================================================
function prepareData() {
    indexV = 0;
    im = 1;
    isMoveBall = true;
    r0 = (0.9 + 0.02 * Math.round(3 * Math.random())) * 1E-6;
    //		r0=0.9e-6;
    Atmp = 6 * 3.14 * eta * r0;
    mg = 4 / 3 * 3.14 * Math.pow(r0, 3) * ro * 9.81;
    v[indexV] = mg / Atmp;
    t0 = 0.002 / v[indexV];
    dt = sleeptime / 1e3; //t0/200;
    ti = 0;
    yball = y0 = 14;
    //		y0=4;
    n = 3 + Math.round(5 * Math.random());
    q = n * qelectron;
    var F = q * 400 / 0.005;
    v[1] = (F - mg) / Atmp;
    //console.log("prepareData v1= "+v[indexV]+" r0= "+r0+" t0= "+t0+" Atmp= "+Atmp+" mg= "+mg+" 400В v[1]= "+v[1]+" F= "+F+" (v1+v2)Atmp= "+(v[indexV]+v[1])*Atmp)
}
//========================================================
function run1() {
    ytmp = dir * v[indexV] * ti;
    yball = y0 + Math.round(ytmp * scaleY) + 6;
    paint1();
    ti = ti + dt;
    if (yball < 13 || yball > height1) {
        //console.log("run1  yball= "+yball+" isMoveBall= "+isMoveBall);
        ti = 0;
        dir = 1;
        isMoveBall = false;
        refObj("OnOff").innerHTML = "Қосу";
        onOff = true;
        U = 0;
    }
    if (!isMoveBall) stopM();
} //run

function startM() {
    if (isMoveBall) {
        stopM();
        return;
    }
    prepareData();
    //console.log("startM v1= "+v[indexV]+" t0= "+t0+" dt= "+dt+" n= "+n)
    Atimer = setInterval("run1()", sleeptime);
}

function stopM() {
    yball = y0;
    ti = 0;
    clearInterval(Atimer);
}

function cngU() {
    if (U == 0) {
        dir = 1;
        indexV = 0;
        y0 = yball;
        ti = 0;
        return;
    }
    tmp = (q * U / dM - 4 / 3 * 3.14 * Math.pow(r0, 3) * ro * g) / (6 * 3.14 * eta * r0);
    if (tmp > 0) {
        dir = -1;
        indexV = 1;
        v[indexV] = tmp;
    } else dir = 1;
    y0 = yball;
    ti = 0;
    //console.log("cngU r0= "+r0+" U= "+U+" q*U/dM= "+q*U/dM+"  4/3*3.14*Math.pow(r0,3)*ro*g= "+4/3*3.14*Math.pow(r0,3)*ro*g)
    //console.log("cngU v1= "+v[0]+" v2= "+v[1])
}