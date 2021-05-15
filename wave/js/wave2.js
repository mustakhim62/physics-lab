var width2 = 291; // Данные переменные хранят ширину и
var height2 = 269; //  высоту апплета
var isCount = false;
var isStart = false;
var isFirst = true;
var Nx, sleeptime;
var t = 1;
var d = 1;
var angle = 70;
var angleold = angle;
var fi_rad = Math.PI / 4;
var sinfi, cosfi, sinfi1, cosfi1;
var x02 = 113;
var y02 = 143; //136;
var x5, y5, x8, y8, tmpx, tmpy;
var U = 100;
var current_element = 0;
var n = 1;
var d0 = [0.1730, 0.2027, 0.2034, 0.2088, 0.2225, 0.2265, 0.2338, 0.2855];
var Ia = 0;
var context2;

function init2() {
    elem2 = document.getElementById('Canvas2');
    context2 = elem2.getContext('2d');
    wave2 = new Image();
    wave2.src = './images/wave2a.gif';
    wave2.onload = function() {
            paint2()
        }
        //	setTimeout("paint2()",300); 
    SetAngle1(angle);
    current_element = rand(7);
}
//==========================================================================
function paint2() {
    context2.fillStyle = "black";
    context2.fillRect(0, 0, width2, height2);
    context2.drawImage(wave2, 0, 0);
    var s = '\u03C6' + " = " + String(90 - angle) + '\u00B0';
    context2.fillStyle = "yellow";
    context2.font = '16px plain Arial';
    context2.fillText(s, 160, 50, 27);
    rocket();
    collimator();
    cillF();
    context2.fillStyle = "black";
    context2.fillRect(110, 130, 8, 12);
    target();
    if (isStart) {
        context2.strokeStyle = "lightblue";
        context2.setLineDash([3, 5]);
        context2.beginPath();
        context2.moveTo(x02 + 2, 46 + d);
        context2.lineTo(x02 + 2, 134);
        context2.stroke();
        context2.setLineDash([]);
        DrawScatteringE();
    } else {
        var x = [138, 127, 70, 183, 255];
        var y = [61, 145, 163, 194, 67];
        context2.font = '13px bold Dialog';
        context2.fillStyle = "white";
        for (i = 0; i < 5; i++) context2.fillText(String(i + 1), x[i], y[i]);
    }
    DrawIa(Ia);
    d = (d + 2) % 7;
}
//==========================================================================
function startTime() // Запуск потока
{
    Btimer = setInterval("run2()", 50);

}
//========================================================
function stopTime() {
    clearInterval(Btimer);
}
//========================================================
function run2() {
    paint2();
}

function Igraphic() {
    var ntmp;
    var tmp, firad, sinfi;
    var lamda = 1.225 / Math.sqrt(U);
    tmp = 2 * Math.PI * d0[current_element] / lamda;
    var fi_rad = Math.PI / 180 * (90 - angle);
    sinfi = Math.sin(fi_rad);
    Ia = 5000 * Math.pow(Math.sin(tmp * sinfi - Math.PI / 2 + 4 * Math.PI) / (tmp * sinfi - Math.PI / 2 + 4 * Math.PI), 2);
    if (angle > angleold) ntmp = 3;
    else ntmp = n; //0,1,2
    switch (n) {
        case 1:
            data1.push([90 - angle, Ia]);
            break;
        case 2:
            data2.push([90 - angle, Ia]);
            break;
        case 3:
            data3.push([90 - angle, Ia]);
    }
    graph = Flotr.draw(container, [data1, data2, data3], properties);
    angleold = angle;
}
//========================================================
function SetAngle1(f) {
    angle = f;
    fi_rad = Math.PI / 180 * angle;
    var fi_rad1 = Math.PI * (1.0 - angle / 90);
    sinfi = Math.sin(fi_rad);
    cosfi = Math.cos(fi_rad);
    sinfi1 = Math.sin(fi_rad1);
    cosfi1 = Math.cos(fi_rad1);
    //repaint();
    if (isStart) Igraphic();
}

function collimator() {
    var hcoll = 57; //45;
    var w = [13, 4];
    var tmpx = new Array(2);
    var tmpy = new Array(2);
    var xtmp = x02 + Math.round(hcoll * sinfi1);
    var ytmp = y02 + Math.round(hcoll * cosfi1);
    for (i = 0; i < 2; i++) {
        tmpx[i] = Math.round(w[i] * cosfi1);
        tmpy[i] = Math.round(w[i] * sinfi1);
    }
    context2.strokeStyle = "cyan";
    context2.beginPath();
    context2.moveTo(xtmp - tmpx[0], ytmp + tmpy[0]);
    context2.lineTo(xtmp - tmpx[1], ytmp + tmpy[1]);
    context2.stroke();
    context2.beginPath();
    context2.moveTo(xtmp + tmpx[0], ytmp - tmpy[0]);
    context2.lineTo(xtmp + tmpx[1], ytmp - tmpy[1]);
    context2.stroke();
}

function cillF() {
    var Rf = 64;
    var deltaFi = 60;
    var angleSI = Math.PI / 180 * (90 - angle);
    var xline, yline, xc, yc, xtmp, ytmp;
    xc = x02 + Math.round(Rf * sinfi1);
    yc = y02 + Math.round(Rf * cosfi1);
    context2.strokeStyle = "lightGray";
    context2.beginPath();
    context2.arc(xc - 2, yc - 2, 11, -2 * angleSI, Math.PI - 2 * angleSI, false);
    context2.stroke();
    xtmp = x02 + Math.round((Rf + 7) * sinfi1);
    ytmp = y02 + Math.round((Rf + 7) * cosfi1);
    xline = x02 + Math.round((Rf + 18) * sinfi1);
    yline = y02 + Math.round((Rf + 18) * cosfi1);
    context2.beginPath();
    context2.moveTo(xtmp, ytmp);
    context2.lineTo(xline, yline);
    context2.lineTo(205, yline);
    context2.lineTo(205, 154);
    context2.stroke();
}
//========================================================
function rocket() {
    var R2 = 40;
    var alfa = 20 * 3.14 / 180;
    var a_start = 70 * Math.PI / 180;
    var angleSI = angle * 3.14 / 180;
    var h58 = 38;
    var h67 = 77;
    var x6, y6, x7, y7;
    sinfi = Math.sin(fi_rad);
    context2.strokeStyle = "cyan";
    context2.beginPath();
    context2.arc(x02, y02, R2, Math.PI / 2 + alfa - 3 * a_start + 2 * angleSI - 0.15, 3 * Math.PI / 2 - alfa - 2 * a_start + angleSI, true);
    context2.stroke();
    context2.beginPath();
    context2.arc(x02, y02, R2, 3 * Math.PI / 2 + 0.5 * alfa + angleSI - 3 * a_start, -Math.PI / 2 + alfa + 2 * angleSI, true);
    context2.stroke();
    var xtmp = x02 + Math.round(h58 * sinfi1);
    var ytmp = y02 + Math.round(h58 * cosfi1);
    tmpx = Math.round(13 * cosfi1);
    x5 = xtmp + tmpx;
    x8 = xtmp - tmpx;
    tmpy = Math.round(13 * sinfi1);
    y5 = ytmp - tmpy;
    y8 = ytmp + tmpy;
    xtmp = x02 + Math.round(h67 * sinfi1);
    ytmp = y02 + Math.round(h67 * cosfi1);
    x6 = xtmp + tmpx;
    x7 = xtmp - tmpx;
    y6 = ytmp - tmpy;
    y7 = ytmp + tmpy;
    context2.beginPath();
    context2.moveTo(x5, y5);
    context2.lineTo(x6, y6);
    context2.stroke();
    context2.beginPath();
    context2.moveTo(x8, y8);
    context2.lineTo(x7, y7);
    context2.stroke();
    context2.beginPath();
    context2.moveTo(x6, y6);
    context2.lineTo(x7, y7);
    context2.stroke();
}
//========================================================
function DrawScatteringE() {
    var tetarad;
    do {
        tetarad = Gasdev() * Math.PI / 8;
    }
    while (Math.abs(tetarad) > Math.PI / 2);
    tetarad = tetarad - Math.PI / 2 + 2 * fi_rad;
    var sint = Math.sin(tetarad);
    var cost = Math.cos(tetarad);
    context2.strokeStyle = "lightblue";
    context2.setLineDash([3, 5]);
    context2.beginPath();
    context2.moveTo(113, 136);
    context2.lineTo(113 + Math.round(34 * cost), 136 + Math.round(34 * sint));
    context2.stroke();
    context2.setLineDash([]);
}
//========================================================
function target() {
    var xtmp = x02 + Math.round(5 * sinfi);
    var ytmp = y02 - Math.round(5 * cosfi);
    tmpx = Math.round(13 * cosfi);
    tmpy = Math.round(13 * sinfi);
    var xPoints = [x02 + tmpx, x02 - tmpx, xtmp - tmpx, xtmp + tmpx];
    var yPoints = [y02 + tmpy, y02 - tmpy, ytmp - tmpy, ytmp + tmpy];
    context2.fillStyle = "rgb(143,207,240)";
    context2.beginPath();
    context2.moveTo(xPoints[0], yPoints[0]);
    for (var i = 0; i < xPoints.length - 1; i++) {
        context2.lineTo(xPoints[i + 1], yPoints[i + 1]);
    }
    context2.closePath();
    context2.fill();
    context2.stroke();
    sinfi = -sinfi;
    tmpy = -tmpy;
    var xh1 = x02 + Math.round(30 * sinfi);
    var xh2 = x02 + Math.round(60 * sinfi);
    var xh3 = x02 + Math.round(65 * sinfi);
    var yh1 = y02 + Math.round(30 * cosfi);
    var yh2 = y02 + Math.round(60 * cosfi);
    var yh3 = y02 + Math.round(65 * cosfi);
    var xPointsL = [x02, xh1 + tmpx, xh2 + tmpx, xh3, xh2 - tmpx, xh1 - tmpx];
    var yPointsL = [y02, yh1 - tmpy, yh2 - tmpy, yh3, yh2 + tmpy, yh1 + tmpy];
    context2.strokeStyle = "red";
    context2.beginPath();
    context2.moveTo(xPointsL[0], yPointsL[0]);
    for (var i = 0; i < xPointsL.length - 1; i++) {
        context2.lineTo(xPointsL[i + 1], yPointsL[i + 1]);
    }
    context2.closePath();
    context2.stroke();
}
//========================================================
function DrawIa(I) {
    var R = 17;
    var xs = 257;
    var ys = 108;
    var alf = Math.PI * I / 30;
    var xV = xs + Math.round(Math.sin(alf - 1.3) * R);
    var yV = ys - Math.round(Math.cos(alf - 1.3) * R);
    context2.strokeStyle = "red";
    context2.beginPath();
    context2.moveTo(xs, ys);
    context2.lineTo(xV, yV);
    context2.stroke();
}
//========================================================
function setColorPoint2(nc) {
    n = nc;
}
//========================================================
function setU(u) {
    U = u;
}
//========================================================
function getAnswer(ntext) {
    var sin20 = 0.342;
    var sin70 = 0.939;
    var a;
    var U_2 = Math.sqrt(U);
    switch (ntext) {
        case 2:
            a = String(round_double(0.590 * U_2));
            break;
        case 3:
            a = String(round_double(1.225 / U_2));
            break;
        case 4:
            var tmp = 2 * d0[current_element] * U_2 / 1.225;
            var ntask = Math.round(tmp);
            ntask = ntask - rand(2);
            var s = ntask / tmp; //{ sin(fi) }
            if (s < sin20) ntask++;
            if (s > sin70) ntask--;
            s = ntask / tmp;
            tmp = s / Math.sqrt(1 - s * s); //{ tg(fi) }
            var fitask = 180 / Math.PI * Math.atan(tmp);
            a = String(ntask);
            data3.push([fitask, 2.5]);
            graph = Flotr.draw(container, [data1, data2, data3], properties);
            break;
        default:
            a = "***";
    }
    return a;
}
//========================================================
function getD() {
    return String(d0[current_element]);
}
//========================================================
function begin() {
    isStart = true;
    startTime();
}