var width4 = 213; // Данные переменные хранят ширину и
var height4 = 246; //  высоту апплета
//	graphSqwall appG1 = null;
//	graphW appG2 = null;
//	Table_for_sq tb = null;
var isGraphClear = true;
var isGraph = false;
var h = 6.62E-34;
var me = 9.1E-31;
var a0 = 0.53E-10;
var qelectron = 1.6E-19;
var E0 = h / a0 / a0 / me * h / qelectron;
var i4, Nmax4, N4;
var gamma, sin2delta, delta, k_a, k1_a, U, U0, a, massa, cn, m_a2, d;
var nold = 777;
var En = new Array(100);
//	MyVector vs = new MyVector(0,-50,Math.PI/2,Color.black);
var imX04 = 1;
var imY04, imY4, dy4;
var ymin4 = 36;
var hr4 = 229;
var scaleY4 = 179; //200;
//Image imPointer,pi;
var bBeginDrag4 = false;
var imHeight4;
var imWidth4;
var isLevel4 = false;
var nlevel4 = 0,
    nlevelmax = 0;
//	String nameF;
var eVname = "эВ";
var nColor = 0;
var context4;
var Canvas4;

function init4() {
    pointer4 = new Image();
    pointer4.src = './images/pointer1.gif';
    imHeight4 = 12;
    imWidth4 = 18;
    imY04 = 223;
    imY4 = imY04;
    dy4 = 0;
    U0 = 0;
    Canvas4 = refObj('Canvas4');
    context4 = Canvas4.getContext('2d');
    Canvas4.onmouseup = mouseReleased;
    Canvas4.onmousedown = mousePressed;
    Canvas4.onmousemove = mouseDragged;
    Canvas4.tabIndex = 1000;
    refObj("Canvas4").addEventListener("keyup", keyPressed, false);
    setTimeout("paint4()", 200)
}

//==========================================================================
function paint4() {
    context4.fillStyle = "#FFFFF8";
    context4.fillRect(0, 0, width4, height4);
    prepare_screen4();
    context4.drawImage(pointer4, imX04, imY4 + dy4);
    var yn;
    var Ec = U0 * (hr4 - imY4 - dy4 - imHeight4 / 2) / scaleY4;
    context4.strokeStyle = "red";
    for (j = 0; j < nlevelmax; j++) {
        yn = hr4 - Math.round(scaleY4 * En[j + 1] / U);
        context4.beginPath();
        context4.lineWidth = 2;
        context4.moveTo(33, yn);
        context4.lineTo(165, yn);
        context4.stroke();
    }
    context4.fillStyle = "rgb(200,0,0)";
    context4.font = '16px bold TimesRoman';
    context4.fillText("E = " + String(round_double(Ec)) + " " + eVname, 80, 22);
}
//==========================================================================
function prepare_screen4() {
    var s1 = ["a", "x"];
    context4.fillStyle = "red";
    context4.font = '16px bold TimesRoman';
    context4.fillText("E", 8, 19);
    context4.fillStyle = "rgb(0,0,200)";
    context4.fillText("U", 178, 147);
    context4.fillText("o", 188, 149);
    context4.lineWidth = 2;
    context4.strokeStyle = "black";
    context4.beginPath();
    context4.moveTo(19, 20);
    context4.lineTo(19, 228);
    context4.stroke();
    tt = PrepareArrow(19, 20, Math.PI / 2); //(1-i)*164   i*
    drawPoly(context4, tt, "black");
    //  context4.strokeStyle="black";
    context4.beginPath();
    context4.moveTo(20, 229);
    context4.lineTo(180, 229);
    context4.stroke();
    tt = PrepareArrow(190, 229, 0); //(1-i)*164   i*
    drawPoly(context4, tt, "black");
    context4.lineWidth = 1;
    for (j = 0; j < 11; j++) {
        context4.beginPath();
        context4.moveTo(14, 229 - 178 * j / 10, 19);
        context4.lineTo(19, 229 - 178 * j / 10);
        context4.stroke();
    }
    context4.fillStyle = "#EEEEE8";
    context4.fillRect(33, 50, 133, 178);
    context4.lineWidth = 2;
    context4.beginPath();
    context4.moveTo(31, 50);
    context4.lineTo(31, 229);
    context4.moveTo(166, 50);
    context4.lineTo(166, 228);
    context4.moveTo(166, 50);
    context4.lineTo(190, 50);
    context4.moveTo(31, 50);
    context4.lineTo(22, 50);
    context4.stroke();
    context4.fillStyle = "black";
    context4.fillText("0", 26, 242);
    for (i = 0; i < 2; i++) context4.fillText(s1[i], 162 + i * 38, 242);
}
//======================================================================
function chet_nechet(i) {
    if (i % 2 == 0) return 1;
    else return -1;
}
//======================================================================
var nechet = function(x) {
    //  var map(x) {
    return Math.cos(x) - chet_nechet(i - 1) * gamma * x;
    //                }
};
//======================================================================
var dnechet = function(x) {
    //              public double map(double x) {
    return -Math.sin(x) - chet_nechet(i - 1) * gamma;
    //                }
};
//======================================================================
var dchet = function(x) {
    //  public double map(double x) {
    return Math.cos(x) - chet_nechet(i - 1) * gamma;
    //  }
};
//======================================================================
var chet = function(x) {
    //  public double map(double x) {
    return Math.sin(x) - chet_nechet(i - 1) * gamma * x;
    //  }
};
//======================================================================
function calcInputData(n) {
    var tg2delta;
    sin2delta = En[n] / U;
    tg2delta = sin2delta / (1 - sin2delta);
    delta = Math.atan(Math.sqrt(tg2delta));
    k_a = Math.sqrt(4 * En[n] / m_a2);
    k1_a = Math.sqrt(4 * (U - En[n]) / m_a2);
    cn = 2 / (1 + 2 * sin2delta / k1_a - Math.sin(k_a) * Math.cos(k_a + 2 * delta) / k_a);
    //console.log("calcInputData n= "+n+" U= "+U+" En[n]= "+En[n]+" U= "+U+" k1_a= "+k1_a+" cn= "+cn)
}

function psi_2(n, x) {
    var x_, xexp;
    if ((n != nold) || (x == -0.5)) {
        calcInputData(n);
        nold = n;
    }
    if (x > 0.5) x_ = 1 - x;
    else x_ = x;
    //console.log("psi_2 n= "+n+" k1_a= "+k1_a+" x= "+x+" x_= "+x_)
    if (x_ < 0) {
        xexp = 2 * k1_a * x_;
        //console.log("psi_2 x_<0 x_= "+x_+" xexp= "+xexp)
        if (xexp > -10) return cn * sin2delta * Math.exp(xexp);
        else return 0;
    } else return cn * Math.pow(Math.sin(k_a * x_ + delta), 2);
}
//======================================================================
function f1(r1, r2) {
    return cn * sin2delta * (Math.exp(2 * k1_a * r2) - Math.exp(2 * k1_a * r1)) / 2 / k1_a;
}

function integralPsi(n, xleft, xright) {
    var s1, s2, s3, xtmp1, xtmp2, dx;
    if (n == 0) return 0;
    calcInputData(n);
    s1 = s2 = s3 = 0;
    xtmp1 = 0;
    xtmp2 = 1;
    if (xleft < 0) {
        if (xright < 0) xtmp1 = xright;
        s1 = f1(xleft, xtmp1);
    } else if (xleft < 1) xtmp1 = xleft;
    if (xright < 1) xtmp2 = xright;
    dx = xtmp2 - xtmp1;
    if (xtmp1 >= 0)
        s2 = cn * (dx - Math.sin(k_a * dx) * Math.cos(k_a * (xtmp2 + xtmp1) + 2 * delta) / k_a) / 2;
    if (xleft >= 1) xtmp2 = xleft;
    if (xright > 1) s3 = f1(1 - xright, 1 - xtmp2);
    return s1 + s2 + s3;
}
//======================================================================
function Ej(x) {
    return m_a2 * Math.pow(x, 2);
}
//======================================================================
function Elevel() {
    var j;
    var xstart, ksi;
    i = 1;
    do {
        j = 2 * i - 1;
        xstart = Math.PI / 2 * (j - 0.5);
        //alert("Elevel xstart= "+xstart)       
        ksi = Newton(xstart, nechet, dnechet);
        En[j] = Ej(ksi);
        //console.log("Elevel1  xstart= "+xstart+" ksi= "+ksi+" j= "+j+" En[j]= "+En[j])
        j = 2 * i;
        if (j <= Nmax4) {
            xstart = Math.PI * (i - 0.25);
            ksi = Newton(xstart, chet, dchet);
            En[j] = Ej(ksi);
            //console.log("Elevel2  xstart= "+xstart+" ksi= "+ksi+" j= "+j+" En[j]= "+En[j])
        }
        i++;
    }
    while (j < Nmax4);
}
//======================================================================
function Newton(xstart, func, dfunc) {
    var epsilon = 0.001;
    var xcurr, xold, x1, x2;
    var istep;
    xcurr = xstart;
    istep = 1;
    do {
        xold = xcurr;
        x1 = func(xcurr);
        x2 = dfunc(xcurr);
        xcurr = xcurr - func(xcurr) / dfunc(xcurr);
        if (Math.abs(xcurr - xold) < epsilon) {
            return xcurr;
        }
        istep++;
    }
    while (istep < 1000);
    alert("Решение не найдено.");
    return -777;
}
//======================================================================
function prepare_new_data() {
    U = U0 / E0;
    a = d * 1E-9 / a0;
    m_a2 = 1 / (2 * massa * Math.pow(Math.PI * a, 2));
    gamma = Math.sqrt(m_a2 / U);
    N = Math.floor(1 + 2 / gamma / Math.PI);
    if (N < 21) Nmax4 = N;
    else formAlert();
    //console.log("prepare_new_data N= "+N+" Nmax4= "+Nmax4)
    //System.out.println("Неудачная комбинация параметров: слишком велика плотность уровней. Повторите!"	);
}
//======================================================================
function setLevel4() {
    var y;
    for (i = 1; i < Nmax4 + 1; i++)
        if (Math.abs(imY4 + dy4 - hr4 + Math.round(scaleY4 * En[i] / U) + imHeight4 / 2) < 2) {
            nlevel4 = i;
            isGraph = true;
            if (nlevelmax < nlevel4) nlevelmax = nlevel4;
            ClearGraph5();
            for (x = -0.5; x < 1.5; x += 0.01) {
                y = psi_2(nlevel4, x);
                drawPoint5(x, y);
                paint5();
            } //for
            //console.log("setLevel4 nlevel4= "+nlevel4)
            if (nlevel4 < 11) {
                setValueTable(2 * (nlevel4 - 1), nlevel4);
                setValueTable(2 * nlevel4 - 1, En[nlevel4] / U);
            }
            drawPointXY(nlevel4 * nlevel4, En[nlevel4] / U);
            //			paintGrf();
            isLevel4 = true;
            isGraphClear = true;
            return;
        } // if
    isLevel4 = false;
    isGraph = false;
    if (isGraphClear) {
        ClearGraph5();
        isGraphClear = false;
    }
}
// ============================================	
function mousePressed(e) {
    Canvas4 = refObj('Canvas4');
    var mouse = {
        x: e.clientX - Math.round(Canvas4.getBoundingClientRect().left),
        y: e.clientY - Math.round(Canvas4.getBoundingClientRect().top)
    }
    if (mouse.x > imX04 && mouse.x < imX04 + imWidth4 && mouse.y > imY4 + dy4 && mouse.y < imY4 + dy4 + imHeight4) {
        bBeginDrag4 = true;
        dy4 = imY4 - mouse.y + dy4;
    } else bBeginDrag4 = false;
    //console.log("mousePressed mouse.y= "+mouse.y+" imY4= "+imY4+" mouse.x= "+mouse.x+" imX04= "+imX04+" dy4= "+dy4+" mouse.y>imY4+dy4= "+(mouse.y>imY4+dy4)+" mouse.y<imY4+dy4+imHeight4= "+(mouse.y<imY4+dy4+imHeight4)+" bBeginDrag4= "+bBeginDrag4)
} //mouseDown
//** ============================================  
function mouseDragged(e) {
    var newY = e.clientY - Math.round(Canvas4.getBoundingClientRect().top);
    if (bBeginDrag4) {
        if (newY < ymin4 - dy4) imY4 = ymin4;
        else
        if ((newY + imHeight4 / 2 + dy4) > hr4)
            imY4 = hr4 - imHeight4 / 2;
        else imY4 = newY + dy4;
        setLevel4();
        paint4();
    }
}

function mouseReleased() {
    bBeginDrag4 = false;
    dy4 = 0;
}
//======================================================================
function setWidth(a) {
    d = a; //new Double(a).doubleValue();
}
//======================================================================
function getN() {
    return nlevel4;
}
//======================================================================
function setU0(u) {
    U0 = u; //new Double(u).doubleValue();
}
//======================================================================
function setP(k) {
    switch (k) {
        case 0:
            massa = 1;
            break;
        case 1:
            massa = 207;
            break;
        case 2:
            massa = 1836;
            break;
        default:
            massa = 1;
    }
}
//======================================================================
function newStart4() {
    nlevelmax = nlevel4 = 0;
    imY4 = imY04;
    dy4 = 0;
    paint4();
    prepare_new_data();
    Elevel();
    setStop();
    ClearGraph5();
    /*	appG1 = (graphSqwall)ac.getApplet("Graph1");
    	if (appG1!=null) {appG1.ClearGraph5();
    		appG1.setStop();
    	}
    	appG2 = (graphW)ac.getApplet("Graph2");*/
    nColor++;
    nColor %= 4;
    //	ClearTable();
}
//======================================================================
function getAnswer(n) {
    if (nlevel4 == 0) return "???";
    var k = 0;
    var r = [0, 0];
    var tmp = -1;
    var s = "";
    switch (n) {
        case 2:
            tmp = U0 - En[1] * E0;
            s = " " + eVname;
            break;
        case 3:
            tmp = 4 * n_answ * n_answ;
            s = " " + eVname;
            break;
        case 4:
            tmp = integralPsi(n2_answ, -x1_answ / 10, x2_answ / 10);
            break;
    }
    tmp = round_double(tmp);
    return String(tmp) + s;

}
// ============================================  
// keyPressed
// ============================================
function keyPressed(ke) {
    var code = ke.keyCode;
    //  if(isProgram) return;
    switch (code) {
        case 38:
            if ((imY4) > ymin4) {
                imY4--;
            }
            break;
        case 40:
            if ((imY4 + imHeight4 / 2) < hr4) {
                imY4++;
            }
            break;
    }
    setLevel4();
    paint4();
}

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