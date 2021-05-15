var widthG = 290;
var heightG = 260;
var xminGr = 90;
var imYGr, imXGr;
var imHeightGr = 5;
//var imWidthGr=5;
var wrGr = 200;
var y0G = 0;
var n0 = 1;
var xs, xs0;
var ys;
var x0G = 90;
var wg = 200;
var hg = 220;
var yg = 9;
var xmax = 15;
var ymax = 80;
var scaleXG, scaleY; // 1/250 MPa/point
var indexXY = 0; // для наполнения
var I_U = [
    []
];
//var V_P0= new Array();
var dataX_Y = new Array();
var xreal0, xreal1, yreal1; //, Vstart, Pstart; // , nuR
var nameX = "U, В";
var nameY = "I, мкА";
var ctx;

function init4() {
    Canvas4 = refObj('Canvas4');
    ctx = Canvas4.getContext('2d');
    scaleXG = xmax / 250; // 400/250 sm3/point engine
    scaleY = ymax / 250; // 1/250 MPa/point
    ys = heightG - 8;
    xs = xs0 = 10;
    Canvas4.onmousedown = mousePressedGr;
    //    fillFrame( x0G, yg, wg, hg);
    paint4();
    //    V_P=[];
} //init
//=============================================
function paint4() {
    if (!ctx) return;
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, widthG, heightG);
    ctx.strokeStyle = "rgb(221,221,221)";
    fillFrame(x0G, yg, wg, hg);
    j = 0;
    ctx.fillStyle = "black";
    for (i = 0; i < indexXY; i++) {
        ctx.fillRect(dataX_Y[i][0], dataX_Y[i][1] + imHeightGr, 4, 4);

    }
}

function fillFrame(x, y, width, h) {
    //alert("fillFrame ctx= "+ctx);
    if (!ctx) return;
    /*    ctx.fillStyle = "white";
        ctx.fillRect(0,0,widthG,heightG);*/
    var y0 = y;
    ctx.fillStyle = "cyan";
    ctx.fillRect(10, y0, 70, 20);
    ctx.fillRect(x, y0, width, h);
    ctx.lineWidth = 0.8;
    ctx.strokeStyle = "black";
    ctx.strokeRect(x, y0, width, h);
    ctx.font = '14px sans-serif';
    ctx.fillStyle = "black";
    ctx.fillText("Очистка", 17, y0 + 15);
    for (i = 0; i < 2; i++) {
        ctx.fillText(i * xmax / 2, x0G + i * width / 2 - 8, 275);
        ctx.moveTo(x0G + (i + 1) * width / 2, y0 + 219);
        ctx.lineTo(x0G + (i + 1) * width / 2, y0 + 215);
        ctx.moveTo(x, y0 + h / 2);
        ctx.lineTo(x + 5, y0 + h / 2);
        ctx.stroke();
    }
    //	ctx.fillText(ymax/2,65,y0+130);
    ctx.font = '18px sans-serif';
    ctx.fillStyle = "blue";
    ctx.fillText(nameX, 190, y + h + 20);
    ctx.fillText(nameY, 12, y0 + 120);
    ctx.font = '14px sans-serif';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.strokeStyle = "rgb(221,221,221)";
    // alert("ctx.strokeStyle= "+ctx.strokeStyle)
    for (i = 1; i < 5; i++) {
        ctx.moveTo(x, y + h - i * h / 5);
        ctx.lineTo(x + width, y + h - i * h / 5);
        ctx.moveTo(x + i * width / 5, y);
        ctx.lineTo(x + i * width / 5, y + h);
    }
    ctx.stroke();
}
// ============================================
function drawPointXY(U, I) {
    var i = indexXY; //*2;
    if (indexXY < 0) return;
    imXGr = Math.round(U / scaleXG + x0G);
    imYGr = Math.round(wg + y0G + imHeightGr - I / scaleY);
    dataX_Y.push([imXGr, imYGr]);
    //            dataX_Y.add((int)Math.round(wg+y0+imHeightGr-P/scaleY));
    if (dataX_Y[i][0] > x0G + wg || dataX_Y[i][1] < yg) return;
    indexXY++;
    paint4();
}

function ClearGraph() {
    index = 0;
    indexXY = 0;
    dataX_Y = new Array();
    paint4();
}

function mousePressedGr(e) {
    Canvas1 = refObj('Canvas1'); //document.getElementById('Q_U');
    var mouse = {
        x: e.clientX - Math.round(Canvas4.getBoundingClientRect().left),
        y: e.clientY - Math.round(Canvas4.getBoundingClientRect().top)
    }
    if (mouse.x > 11 && mouse.x < 79 && mouse.y > yg && mouse.y < yg + 19) ClearGraph();
}