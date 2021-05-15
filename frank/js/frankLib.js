var icase = 1;
var dxf = [3, 4, -5, -3, 3, 4, -5, 3, 3, -4, -3, -4, -5, 3, 5];
var dyf = [2, -3, -2, 3, 2, -2, 2, -3, 2, -2, 2, -3, -2, 3, -2];
var xsf = [10, 111, 40, 116, 50, 75, 115, 109, 50, 110, 100, 13, 60, 90, 115];
var ysf = [5, 8, 11, 13, 7, 7, 10, 13, 13, 8, 4, 10, 10, 5, 12];
var xif = new Array(15);
var yif = new Array(15);
var nlevels = [5, 6, 6, 9, 7, 6];
var energys = new Array(39);
var isLoad = false;
var currentColor = ["black", "blue", "green", "rgb(99,225,211)", "rgb(222,51,20)", "magenta", "orange", "yellow"];

function Init_frankLib(icase) //конструктор
{
    this.icase = icase;
    if (icase == 1) {
        xif = xsf;
        yif = ysf;
    } else {
        xif = ysf;
        yif = xsf;
    }
}
//========================================================
function drawAtoms(context0, icase, U, energy, x0, y0, width, height) {
    var N = 15;
    var xend, yflash, key;
    var xflash = [width, width, width]; //new int[3];
    var c = ["rgb(255,249,137)", "blue"];
    yflash = height; //??
    key = 0;
    for (i = 0; i < 3; i++)
        if (U > (i + 1) * energy) {
            key = i + 1;
            if (icase == 1) {
                xflash[i] = Math.round(width * (i + 1) * energy / U) - 20;
            } else yflash = Math.round(energy / U * height) - 6;
        }
    context0.fillStyle = "blue";
    context0.strokeStyle = "blue";
    for (i = 0; i < N; i++) {
        if ((xif[i] > width - 11) || (xif[i] < 3)) dxf[i] = -dxf[i];
        xif[i] += dxf[i];
        if ((yif[i] > height - 8) || (yif[i] < 3)) dyf[i] = -dyf[i];
        yif[i] += dyf[i];
        for (j = 0; j < (key) && (j < 3); j++) {
            if (icase == 1) xend = xflash[j] + 20;
            else xend = 0;
            if (((xif[i] > xflash[j]) && (xif[i] < xend)) /* || (yif[i]>yflash)*/ ) { // для конструктора только
                context0.fillStyle = c[0];
                context0.strokeStyle = c[0];
            } else {
                context0.fillStyle = c[1];
                context0.strokeStyle = c[1];
            }

        } //for j
        //  	    context0.strokeStyle=c[1];
        context0.beginPath();
        context0.arc(x0 + xif[i], y0 + yif[i], 2, 0, 2 * Math.PI, true);
        context0.fill();
        //  	    context0.strokeStyle=c[1];
        //context0.strokeStyle = "white";
        context0.arc(x0 + xif[i], y0 + yif[i], 2, 0, 2 * Math.PI, true);
        context0.stroke();
    } //for i
}
// ============================================  
function SetElectronField(canva, w, h, x0, y0, n, U) {
    var i;
    var x, y;
    //var w = canva.width;
    //var h = canva.height;
    //var	context0 = canva.getContext('2d');
    //alert("SetElectronField canva= "+canva+" n= "+n+" U= "+U+" w= "+w)	
    canva.fillStyle = "black";
    canva.fillRect(x0 + n * 116, y0, w, h);
    //	canva.clearRect(0,0,w,h);
    if (U > 0)
        if ((n == 0) || ((n == 1) && (U > 1))) {
            canva.fillStyle = "white";
            for (i = 0; i < 60 - n * 55; i++) {
                x = x0 + n * (113 + 3) + Math.round(w * Math.random()); // i*(113+3)+
                y = y0 + Math.round(h * Math.random());
                canva.fillRect(x, y, 1, 1);
            }
        }
}
// ============================================  
function energy_gaz(energy, ntransition, nt, c) {
    this.energy = 0;
    this.ntransition = 0;
    this.nt = [0, 0, 0];
    this.c = [0, 0, 0];
}
for (i = 0; i < 39; i++) energys[i] = new energy_gaz();
// ============================================
function getNumberEnergy(ngaz) {
    var n = 0;
    for (i = 0; i <= ngaz - 1; i++) n += nlevels[i];
    return n;
}
//==========================================================================
function round_double(x) {
    var tmp;
    if (Math.abs(x) < 0.1) tmp = 1000;
    else
    if (Math.abs(x) < 10.0) tmp = 100;
    else if (Math.abs(x) < 99.99) tmp = 10;
    else tmp = 1;
    return Math.round(x * tmp) / tmp;
}