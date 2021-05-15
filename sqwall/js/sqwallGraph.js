var widthG = 250;
var heightG = 250;
var imYGr;
var imXGr;
var xminGr = 90;
var wrGr = 250;
var imHeightGr = 5;
var imWidthGr = 5;
var isStartGr = false;
var y0G = 0;
var n0 = 1;
var xs, xs0;
var ys;
var x0G = 50;
var wg = 250;
var hg = 210;
var yg = 9;
var npGr = 200;
var xmax = 1000.0;
var ymax = 0.4;
var scaleX6, scaleY6;
var indexXY = 0; // для наполнения
var dataX_Y = new Array();
var xreal0, xreal1, yreal1;
var nameX = "";
var nameY = "";
var ctx;
var isCross6 = true;
var signColor = ["#660000", "#000066", "blue"];
var nColor = 0;
var work = 1;
var fi;
var N_fi4 = 0;
//===========================
function init_scatterGraph(xmax, ymax, nameX, nameY, nameY1) {
    this.xmax = xmax;
    this.ymax = ymax;
    scaleX6 = xmax / 250;
    scaleY6 = ymax / 250;
    this.nameX = nameX;
    this.nameY = nameY;
    this.nameY1 = nameY1;
    Canvas6.onmousedown = mousePressedGr;

    imXGr = x0G;
    imYGr = yg + hg - 5;
    ys = heightG - 8;
    xs = xs0 = 10;
    setTimeout("paintGrf()", 200);
} //init
//=============================================
function paintGrf() {
    //alert("paintGrf indexXY= "+indexXY+" dataX_Y[0][0]= "+dataX_Y[0][0]+" dataX_Y[0][1]= "+dataX_Y[0][1]+" imHeightGr= "+imHeightGr);
    if (!ctx) return;
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, widthG, heightG);
    fillFrame(x0G, yg, wg, hg);
    //=====================================
    ctx.fillStyle = "cyan";
    ctx.fillRect(2, 2, 55, 20);
    ctx.font = '14px sans-serif';
    ctx.fillStyle = "red";
    ctx.fillText("Очистка", 3, 15);
    //=======================================
    j = 0;
    ctx.fillStyle = "black";
    console.log("paintGrf isCross6= " + isCross6 + " dataX_Y.length= " + dataX_Y.length)
    if (isCross6) {
        ctx.strokeStyle = signColor[nColor]; //"blue";
        ctx.beginPath();
        ctx.lineWidth = 2;
        console.log("paintGrf2 isCross6= " + isCross6 + " dataX_Y.length= " + dataX_Y.length)
        for (i = 0; i < indexXY; i++) {
            ctx.beginPath();
            ctx.moveTo(dataX_Y[i][0], dataX_Y[i][1]);
            ctx.lineTo(dataX_Y[i][0], dataX_Y[i][1] + 2 * imHeightGr);
            ctx.moveTo(dataX_Y[i][0] - imWidthGr, dataX_Y[i][1] + imHeightGr);
            ctx.lineTo(dataX_Y[i][0] + imWidthGr, dataX_Y[i][1] + imHeightGr);
            //		ctx.arc(dataX_Y[i][0],dataX_Y[i][1]+imHeightGr,1,0, 2 * Math.PI, true);
            ctx.stroke();
        }

    }
}

function fillFrame(x, y, width, h) {
    if (!ctx) return;
    var y0 = y;
    ctx.fillStyle = "cyan";
    ctx.fillRect(x, y0, width, h);
    ctx.lineWidth = 0.8;
    ctx.strokeStyle = "black";
    ctx.strokeRect(x, y0, width, h);
    ctx.font = '14px sans-serif';
    ctx.fillStyle = "black";
    for (i = 0; i < 2; i++) {
        ctx.fillText(i * xmax / 2, x0G + i * width / 2 - 9, 235);
        ctx.moveTo(x0G + (i + 1) * width / 2, y0 + 214);
        ctx.lineTo(x0G + (i + 1) * width / 2, y0 + 210);
        ctx.moveTo(x, y0 + h / 2);
        ctx.lineTo(x + 5, y0 + h / 2);
        ctx.stroke();
    }
    ctx.fillText(ymax / 2, 25, y0 + 110);
    ctx.font = '18px sans-serif';
    ctx.fillStyle = "blue";
    ctx.fillText(nameX, 130, 240);
    ctx.fillText(nameY, 3, y0 + 90);
    //	if(nameY1!=="") ctx.fillText(nameY1,5,y0+130);
    ctx.font = '14px sans-serif';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.strokeStyle = "lightgrey";
    for (i = 1; i < 5; i++) {
        ctx.moveTo(x, y + h - i * h / 5);
        ctx.lineTo(x + width, y + h - i * h / 5);
        ctx.moveTo(x + i * width / 5, y);
        ctx.lineTo(x + i * width / 5, y + h);
    }
    ctx.stroke();
}
// ============================================
function ClearGraphGr() {
    indexXY = -1;
    dataX_Y.length = 0;
    isCross6 = false;
    paintGrf();
}
// ============================================
function changeColor() {
    nColor = (nColor + 1) % 3;
}
/*/ ============================================
function setPosCross(P, V)  {
//	alert("setPosCross P= "+P)
     imXGr = Math.round(V/scaleX+x0G);
     imYGr = Math.round(wg+y0G+imHeightGr-P/scaleY);
     setCross(true);
	paintGrf();
  }
// ============================================
function set_nuR(x)  {
	nuR=x;
  }
// ============================================
function setT(x)  {
	T0=x;
  }*/
/*/ ============================================
function setModel(n)  {
	model = n;
	fi=2;
	work = 2;
	Ftimer=setInterval(run,100);
  }
// ============================================
function ClearGraphGr()  {
	index=0; indexXY=0;
    dataX_Y=[];
	paintGrf();
  }
 // ============================================
function setStart( b){
	  work = b;
	  fi=4;
	  t=GetThickness();
	  Ftimer=setInterval(run,100);
	  //repaint();
  }*/
function mousePressedGr(e) {
    Canvas6 = refObj('Canvas6'); //document.getElementById('Q_U');
    var mouse = {
        x: e.clientX - Math.round(Canvas6.getBoundingClientRect().left),
        y: e.clientY - Math.round(Canvas6.getBoundingClientRect().top)
    }
    if (mouse.x > 3 && mouse.x < 55 && mouse.y > 2 && mouse.y < 22) ClearGraphGr();
} // ============================================
function drawPointXY(V, P) {
    var i = indexXY; //*2;
    if (indexXY < 0 /*|| i > 2*npGr-2*/ ) return;
    var x = Math.round(V / scaleX6 + x0G);
    var y = Math.round(hg + y0G + imHeightGr - P / scaleY6);
    dataX_Y.push([x, y]);
    //            dataX_Y.add((int)Math.round(wg+y0+imHeightGr-P/scaleY6));
    if (dataX_Y[i][0] > x0G + wg || dataX_Y[i][1] < yg) return;
    indexXY++;
    isCross6 = true;
    paintGrf();
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
//======================================================================