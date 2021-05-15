var widthG = 460;
var heightG = 350;
var imY0Gr, imYGr, imYstartGr, imXstartGr;
var imX0Gr, imXGr;
var xminGr = 90;
var wrGr = 250;
var bBeginDrag = false;
var dxg = 0;
var dyg = 0;
var imHeightGr = 5;
var imWidthGr = 5;
//	AppletContext ac = null;
var isStartGr = false;
var isWrite = false;
//var isBegin=true;
var isCross = true;
var isDraw = false;
var isClose = false;
var xstart, xend, yend;
var y0G = 0;
var n0 = 1;
var xs, xs0;
var ys;
var x0G = 90;
var wg = 350;
var hg = 300;
var yg = 9;
var np = 200;
var xmax = 800.0;
var ymax = 0.4;
var scaleX, scaleY; // 1/250 MPa/point
var index = 0; // для наполнения при рисовании
var indexXY = 0; // для наполнения
var V_P = [
    [404, 762],
    [408, 752],
    [435, 684],
    [466, 604],
    [485, 554],
    [513, 484],
    [546, 400],
    [577, 322],
    [579, 316],
    [614, 226],
    [690, 32]
];
//var V_P=[[]];
//var x_y;// new Array();// при рисовании
var x_yG = new Array();
var dataX_Y = new Array();
var x_dat = new Array();
var y_dat = new Array();
var cc = new Array();
var xreal0, xreal1, yreal1; //, Vstart, Pstart; // , nuR
var ctx;
//var colorCross="red";
var is1 = 2;
var nameVa2X = "k";
var nameY1 = "";
var nameX = "&lambda";
var unitX = [400, 550];
var xmin = 400;
//var nameVa2Y = "P";

function Create2DArray(rows) {
    var arr = [];

    for (var i = 0; i < rows; i++) {
        arr[i] = [];
    }

    return arr;
}

function init_condensGraph(ct, xmax, ymax, nameX, nameY, nameY1, is1) {
    //var imX, imY;//    для отладки
    this.ctx = ct;
    this.xmax = xmax;
    this.ymax = ymax;
    scaleX = (xmax - xmin) / wg; // 400/250 sm3/point engine
    scaleY = ymax / hg; // 1/250 MPa/point
    //console.log("init_condensGraph scaleX= "+scaleX+" scaleY= "+scaleY)
    this.nameX = nameX; //"&lambda";
    this.nameY = nameY; //"k";
    if (nameY1 !== "") this.nameY1 = nameY1; //"МПа";
    if (is1 !== "") this.is1 = parseInt(is1);
    //	setForeground(Color.black);

    imX0Gr = imXGr = 205; // width/2;//100; 180 sm^3
    imY0Gr = imYGr = 180; //height/2; 0.3 MPa
    ys = heightG - 8;
    xs = xs0 = 10;
    /*//    для отладки
    	indexXY=11;
    	for(i=0;i<11;i++){
        	imX=Math.round((V_P[i][0]-400)/scaleX+x0G);
    		imY=Math.round(hg+y0G+imHeightGr-V_P[i][1]/scaleY);
    		dataX_Y.push([imX,imY]);
    	}*/
    //    для отладки
    paintGrf();
} //init
//=============================================
function paintGrf() {
    //alert("paintGrf indexXY= "+indexXY+" dataX_Y[0][0]= "+dataX_Y[0][0]+" dataX_Y[0][1]= "+dataX_Y[0][1]+" imHeightGr= "+imHeightGr);
    if (!ctx) return;
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, widthG, heightG);
    ctx.strokeStyle = "rgb(221,221,221)";
    fillFrame(x0G, yg, wg, hg);
    j = 0;
    ctx.fillStyle = "black";
    if (isCross) { // ||isBegin
        xreal1 = round_double(scaleX * (imXGr - x0G));
        yreal1 = Math.round((scaleY * (hg + y0G - imYGr + imHeightGr) * 1000)) / 1000;
        //  for(i=0;i<3;i++){
        ctx.strokeStyle = "red";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(imXGr, imYGr);
        ctx.lineTo(imXGr, imYGr + 2 * imHeightGr);
        ctx.moveTo(imXGr - imWidthGr, imYGr + imHeightGr);
        ctx.lineTo(imXGr + imWidthGr, imYGr + imHeightGr);
        ctx.stroke();
        ctx.fillStyle = "black";
        ctx.font = '14px bold sans-serif';
        ctx.fillText(String.fromCharCode(955) + " = " + parseInt(xmin + xreal1) + "  k = " + parseInt(yreal1), xs, ys + 4);
    }
    ctx.strokeStyle = "blue";
    ctx.beginPath();
    ctx.lineWidth = 2;
    //console.log("paintGrf indexXY= "+indexXY+" dataX_Y= "+dataX_Y);
    for (i = 0; i < indexXY; i++) {
        ctx.moveTo(dataX_Y[i][0], dataX_Y[i][1] + imHeightGr);
        ctx.lineTo(dataX_Y[i][0] + 1, dataX_Y[i][1] + imHeightGr);
        ctx.arc(dataX_Y[i][0], dataX_Y[i][1] + imHeightGr, 2, 0, 2 * Math.PI, true);
        ctx.stroke();
    }
    if (isDraw) {
        //		console.log("paintGrf indexXY= "+indexXY+" x_yG= "+x_yG);
        ctx.fillStyle = "black";
        for (i = 0; i < 270; i++) {
            ctx.fillRect(x_yG[i][0], x_yG[i][1] + imHeightGr, 1, 1)
        }
    }
}

function fillFrame(x, y, width, h) {
    //alert("fillFrame ctx= "+ctx);
    if (!ctx) return;
    /*    ctx.fillStyle = "white";
        ctx.fillRect(0,0,widthG,heightG);*/
    var y0 = y;
    ctx.fillStyle = "cyan";
    ctx.fillRect(x, y0, width, h);
    ctx.lineWidth = 0.8;
    ctx.strokeStyle = "black";
    ctx.strokeRect(x, y0, width, h);
    ctx.font = '14px sans-serif';
    ctx.fillStyle = "black";
    for (i = 0; i < 2; i++) {
        ctx.fillText(unitX[i], x0G + i * width / 2 - 8, 330);
        ctx.moveTo(x0G + (i + 1) * width / 2, y0 + 300);
        ctx.lineTo(x0G + (i + 1) * width / 2, y0 + 308);
        ctx.moveTo(x, y0 + h / 2);
        ctx.lineTo(x + 5, y0 + h / 2);
        ctx.stroke();
    }
    ctx.fillText(ymax / 2, 60, y0 + 150);
    ctx.fillText("0", 70, y0 + 300);
    ctx.font = '18px sans-serif';
    ctx.fillStyle = "blue";
    ctx.fillText(nameX, 190, 330);
    ctx.fillText(nameY, 22, y0 + 145);
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
function prepare_data() {
    //alert("prepare_data indexXY= "+indexXY+" V_P[2][0]= "+V_P[2][0])
    for (i = 0; i < indexXY; i++) {
        x_dat[i] = V_P[i][0];
        y_dat[i] = V_P[i][1];
    }
    cc = Coeff(indexXY, x_dat, y_dat); // {Нашли коэффициенты C с помощью прогонки}
}
// ============================================
function prepare_curve() {
    var imX, imY;
    //alert("begin prepare_curve x_dat= "+x_dat)
    for (i = 0; i < 270; i++) {
        Spl(indexXY, x_dat, y_dat, cc, xmin + i);
        imX = Math.round(i / scaleX + x0G);
        imY = Math.round(hg + y0G + imHeightGr - p / scaleY);
        //console.log("prepare_curve i= "+i+" p= "+p+" imX= "+imX+" imY= "+imY);
        x_yG.push([imX, imY]);
    }
    //alert("end prepare_curve x_yG= "+x_yG)	
}
/*/ ============================================
function ClearGraphGr1()  {
	d1=[];
	Draw_Graph1(graph1,d1);
  }*/
// ============================================
function ClearGraphGr2() {
    index = 0;
    indexXY = 0;
    isWrite = false;
    dataX_Y = new Array();
    paintGrf();
}
// ============================================
/*function clearWriteData()  {
    V_P=[];
//	paintGrf();
  }*/
// ============================================
/*function clearVisualData()  {
//    wtButton.setForeground(new Color(0x333333));
    indexXY=0;
    dataX_Y=[];
//	paintGrf();
  }*/
/*/ ============================================
function drawPointXY( V, P)  {
//alert("drawPointXY V= "+V+" indexXY= "+indexXY);
            var i = indexXY;//*2;
            if( indexXY < 0 ) return;
            imXGr=Math.round(V/scaleX+x0G);
            imYGr=Math.round(wg+y0G+imHeightGr-P/scaleY);
            dataX_Y.push([imXGr,imYGr]);
//            dataX_Y.add((int)Math.round(wg+y0+imHeightGr-P/scaleY));
            if( dataX_Y[i][0] >x0G+wg || dataX_Y[i][1] < yg ) return;
        indexXY++;
paintGrf();
  }*/
/*/ ============================================
function delClose(){
	isClose=false;
}*/
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

function shift_horiz(dir) {
    switch (dir) {
        case -1:
            if (imXGr > xminGr) {
                imXGr--;
                dxg = 0;
                dyg = 0; //if(isWrite)drawPoint();
            }
            break;
        case +1:
            if (((imXGr + imHeightGr) < wrGr + x0G) /*&&checkT()*/ ) {
                imXGr++;
                dxg = 0;
                dyg = 0; //if(isWrite)drawPoint();
            }
    }
    paintGrf();
}

function shift_up(dir) {
    switch (dir) {
        case 1:
            if ((imYGr > yg - imHeightGr)) {
                imYGr--;
                dxg = 0;
                dyg = 0; //if(isWrite)drawPoint();
            }
            break;
        case -1:
            if (imYGr < yg + hg - imHeightGr + 1) {
                imYGr++;
                dxg = 0;
                dyg = 0; //if(isWrite)drawPoint();
            }
            break;
    }
    paintGrf();
}

function write_sign() {
    var Vtmp, Ptmp;
    var i = index; //*2;
    if (index < 0 || i > /*2**/ np - 2)
        return;
    Vtmp = round_double(scaleX * (imXGr - x0G));
    Ptmp = Math.round((scaleY * (hg + y0G - imYGr + imHeightGr) * 1000)) / 1000;
    V_P.push([Vtmp, Ptmp]);
    index++;
    //	isWrite=!isWrite;
    isCross = true;
    dataX_Y.push([imXGr, imYGr]);
    //alert("write_sign dataX_Y= "+dataX_Y);
    indexXY++;
    paintGrf();
}
//========================================================
//engineGraph