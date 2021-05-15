var width3 = 170; // Данные переменные хранят ширину и
var height3 = 270; //  высоту апплета
//	firing appF = null;
//	spectrF appS = null;
//laser1 appL = null;
var stopFlag;
//	private Image pic = null;
var icase = 2;
var ylevel = new Array(11);
var ynotice = new Array(11);
var x03 = 30;
var n1 = 1;
var n2 = 1;
var isVisible = false;
var isNotice = true;
var isFlash = false;
var col;
var Uf;
var sw = true;
var imHeight3;
var imWidth3;
var imX03;
var imY03, imY3;
var n_up, n_down; // current_gaz, nFirstEnergy, 
var nEnergy = 1;
var nMaxEnergy = 1;
var deltaE; //{ эВ/точка }
var dE; //{ E2 - E1 }
var answer = new Array(4);
var name_gaz = ["натрия", "меди", "калия", "цезия", "ртути", "водорода"];
var context3;

function init3() {
    eExcit = new Image();
    eExcit.src = './images/eExcit.gif';
    pointer1 = new Image();
    pointer1.src = './images/pointer1.gif';
    imHeight3 = pointer1.height;
    imWidth3 = 18; //pointer1.width;
    imX03 = x03 - imWidth3 - 1;
    imY03 = height3 - 9 - imHeight3 / 2;
    imY3 = imY03;
    Canvas3 = refObj('Canvas3');
    context3 = Canvas3.getContext('2d');
    CalculateYlevel();
}

//==========================================================================
function showLevels(current_gaz, nEnergy, U) {
    var Eend;
    this.nEnergy = nEnergy;
    this.current_gaz = current_gaz;
    this.Uf = U;
    nFirstEnergy = getNumberEnergy(current_gaz);
    nMaxEnergy = nlevels[current_gaz];
    if (icase == 3) {
        if ((!isFlash) && (U >= energys[nFirstEnergy + nMaxEnergy - 1].energy)) {
            n_up = nFirstEnergy + 1 + Math.floor((nMaxEnergy - 3) * Math.random());
            //		n_up = nFirstEnergy+1+Math.round((nMaxEnergy-3)*Math.random());
            n_down = energys[n_up].nt[0];
            if (n_down == 1) Eend = 0;
            else Eend = energys[nFirstEnergy + n_down - 2].energy;
            answer[2] = String(round_double(energys[n_up].energy - Eend));
            answer[3] = String(round_double(1241 / (energys[n_up].energy - Eend)));
            n_up = n_up - nFirstEnergy + 2;
            isNotice = false;
            isFlash = true;
        }
    } else {
        answer[0] = String(energys[nFirstEnergy + nMaxEnergy - 1].energy);
        answer[1] = name_gaz[current_gaz];
    }
    deltaE = energys[nFirstEnergy + nMaxEnergy - 1].energy / (height3 - 29); //{ эВ/точка }
    CalculateYlevel();
    imY3 = ylevel[0] - Math.round(U / deltaE) - imHeight3 / 2;
    paint3();
    var Utmp = 1 - U / energys[nFirstEnergy].energy;
    if (Utmp < 0) Utmp = 0;
    if (ntext < 3) {
        if (U > 0) setStar(Utmp, imY3);
        else onStart()
    };
    if (Math.abs(U - energys[nFirstEnergy + nEnergy - 1].energy) < 0.08) isExcit = true;
    else isExcit = false;
    if (ntext < 3) paint4();
}
//==========================================================================
function paint3() {
    context3.fillStyle = "black";
    context3.fillRect(0, 0, width3, height3);
    ShowEnergy();
    for (i = 1; i < nEnergy; i++) {
        context3.strokeStyle = "yellow";
        //console.log("paint3 isNotice= "+isNotice)
        if (isNotice) {
            if (ynotice[i] > ylevel[i]) {
                context3.beginPath();
                context3.moveTo(width3 - 55, ylevel[i]);
                context3.lineTo(width3 - 44, ynotice[i]);
                context3.stroke();
            }
            context3.fillStyle = "yellow";
            context3.font = '14px bold Serif';
            context3.fillText(nameLevel(i), width3 - 37, ynotice[i] + 3);
        }
    } //for
    //alert("paint3 imY3= "+imY3)
    context3.drawImage(pointer1, imX03, imY3);
}
//==========================================================================
function startF3() {
    Ftimer = setInterval("run()", 200)
}
//==========================================================================
function stop() {
    stopFlag = true;
}
//==========================================================================
function run() {
    //console.log("run sw = "+sw)
    sw = !sw;
    paint3();
}
//==========================================================================
//==========================================================================
function ShowEnergy() {
    var dx = 56;
    var y0 = 20;
    var shift = 0;
    var nline = 0;
    var l = 0;
    var dxp;
    if (current_gaz < 3) dxp = 10;
    else dxp = 8;
    context3.strokeStyle = "yellow";
    context3.beginPath();
    context3.moveTo(x03, 10);
    context3.lineTo(x03, height3 - 5);
    context3.stroke();
    tt = PrepareArrow(x03, 10, Math.PI / 2);
    drawPoly(context3, tt, "yellow");
    context3.drawImage(eExcit, 5, 40); //20  
    context3.fillStyle = "lightGray";
    context3.fillRect(x03 + 6, y0 - 10, width3 - dx - 28, 10);
    for (i = 0; i < nEnergy; i++) {
        context3.strokeStyle = "white";
        if (i < nMaxEnergy) {
            context3.beginPath();
            context3.moveTo(x03 + 8, ylevel[i]);
            context3.lineTo(width3 - dx, ylevel[i]);
            context3.stroke();
        }
    } //for
    context3.fillStyle = "white";
    context3.font = '14px bold Serif';
    context3.fillText("0.0", width3 - 37, ylevel[0] + 2);
    setLine(current_gaz, 0, 0, "black");
    for (j = 2; j < nEnergy + 1; j++)
        for (i = 0; i < energys[nFirstEnergy + j - 2].ntransition; i++) {
            n1 = j;
            n2 = energys[nFirstEnergy + j - 2].nt[i];
            col = currentColor[energys[nFirstEnergy + j - 2].c[i]];
            if (isFlash && (n1 == n_up) && (n2 == n_down) && sw) col = "black";
            ShowTransition(x03 + 2 * dxp + shift, col);
            //setFlash();	  		
            setLine(current_gaz, nline, Math.round(1241 / dE), col);
            nline++; //**
            shift += dxp;
        }
}
//----------------------------------------------	
function CalculateYlevel() {
    var y0 = 20;
    var dn = 10;
    ylevel[0] = y0 + height3 - 29;
    for (i = 1; i < nEnergy; i++)
        ylevel[i] = ylevel[0] - Math.round(energys[nFirstEnergy + i - 1].energy / deltaE);
    ynotice[nEnergy - 1] = ylevel[nEnergy - 1];
    ynotice[0] = ylevel[0] - 3;
    for (i = nEnergy - 2; i > 0; i--)
        if (ynotice[i + 1] + dn < ylevel[i]) ynotice[i] = ylevel[i];
        else ynotice[i] = ynotice[i + 1] + dn;
}
//==========================================================================
function ShowTransition(x0, color) {
    var d = 3 * Math.PI / 2;
    dE = (ylevel[n2 - 1] - ylevel[n1 - 1]) * deltaE;
    context3.strokeStyle = color;
    context3.lineWidth = 1;
    if ((dE < 3.1) && (dE > 1.55)) isVisible = true;
    else isVisible = false;
    if (isVisible) {
        context3.beginPath();
        context3.moveTo(x0, ylevel[n1 - 1]);
        context3.lineTo(x0, ylevel[n2 - 1]);
        context3.stroke();
    } else {
        var dashList = [4, 2]; // Create a dot/dash sequence    
        context3.lineWidth = 1;
        context3.setLineDash(dashList);
        context3.beginPath();
        context3.moveTo(x0, ylevel[n1 - 1]);
        context3.lineTo(x0, ylevel[n2 - 1]);
        context3.stroke();
        context3.setLineDash([]);
    }
    tt = PrepareArrow(x0, ylevel[n2 - 1], d);
    drawPoly(context3, tt, color);
    //	}
}
//==========================================================================
function nameLevel(i) {
    return String(round_double(energys[nFirstEnergy + i - 1].energy));
}
//==========================================================================
function getAnswer(i) {
    return answer[i]; //((i<2)?answer[i]:" ");
}
//==========================================================================
function setFlash() {
    isFlash = false;
    isNotice = true;
}
//==========================================================================
function set_icase(n) {
    icase = n;
    showLevels(current_gaz, nEnergy, Uf)
}
// ============================================  
function getFlash() {
    return isFlash;
}
//==========================================================================
function drawPoly(ctx, arr, colorplane) {
    // Начинаем отрисовку
    ctx.beginPath();
    for (var i = 0; i < arr.length; i++) {
        // Ставим точку на исходную позицию
        if (i == 0) ctx.moveTo(arr[i][0], arr[i][1]);
        // Рисуем линии от точки к точке
        else ctx.lineTo(arr[i][0], arr[i][1]);
    }
    // Задаем цвет заливки в формате RGBA
    ctx.fillStyle = colorplane; //"rgba(255,128,128,0.5)";
    // Зальем полученный многоугольник цветом
    ctx.fill();
}
//========================================================
function PrepareArrow(x0, y0, alfa) {
    var tr = new Array();
    var a = 12;
    var b = 4;

    var cosa = Math.cos(alfa);
    var sina = Math.sin(alfa);

    var acos = Math.round(a * cosa);
    var asin = Math.round(a * sina);
    var bcos = Math.round(b * cosa);
    var bsin = Math.round(b * sina);
    tr.push([x0, y0]);
    tr.push([x0 - bsin - acos, y0 - bcos + asin]);
    tr.push([x0 + bsin - acos, y0 + bcos + asin]);
    return tr;
}