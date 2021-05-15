var width1 = 400;
var w_2 = width1 / 2; // Данные переменные хранят ширину и
var height1 = 246; //  высоту апплета
//	movCl appC1 = null;
//	math1 appM1 = null;
//	MyVector vs = new MyVector(0,-50,Math.PI/2,Color.black);
var imX01 = 1;
var imY01, imY1, dy1;
var ymin = 36;
var hr = 229;
//	Image imPointer,pi;
//	Rectangle[] rcImage = new Rectangle[2];
var bBeginDrag = false;
var imHeight1;
var imWidth1;
var isLevel = false;
var nlevel = 0;

function init1() {
    pointer1 = new Image();
    pointer1.src = './images/pointer1.gif';
    pi = new Image();
    pi.src = './images/pi.gif';
    imHeight1 = 13;
    imWidth1 = 18;
    imY01 = 223;
    imY1 = imY01;
    dy1 = 0;
    Canvas1 = refObj('Canvas1');
    context1 = Canvas1.getContext('2d');
    Canvas1.onmouseup = mouseReleased;
    Canvas1.onmousedown = mousePressed;
    Canvas1.onmousemove = mouseDragged;
    Canvas1.tabIndex = 1000;
    refObj("Canvas1").addEventListener("keyup", keyPressed, false);
    setTimeout("paint1()", 200)
}

//==========================================================================
function paint1() {
    context1.fillStyle = "#FFFFF8";
    context1.fillRect(0, 0, width1, height1);
    for (i = 0; i < 2; i++) {
        //	  OS.offscreenGC.drawImage(small.offscreenImage, i*width/2, 0, null);
        context1.drawImage(pointer1, imX01 + i * w_2, imY1);
        //      rcImage[i] = new Rectangle(imX0+i*w_2, imY+dy, imWidth, imHeight);
    }
    prepare_screen();
    context1.strokeStyle = "darkGray";
    context1.beginPath();
    context1.lineWidth = 1;
    context1.moveTo(w_2 - 14, 2);
    context1.lineTo(w_2 + 6, 2);
    context1.beginPath();
    context1.moveTo(w_2 - 4, 2, w_2 - 4);
    context1.lineTo(w_2 - 4, height1 - 1);
    context1.stroke();
    context1.strokeStyle = "blue";
    context1.lineWidth = 2;
    context1.beginPath();
    context1.moveTo(21 + w_2, hr - 80);
    context1.lineTo(165 + w_2, hr - 80);
    context1.stroke();
    context1.strokeStyle = "red";
    context1.beginPath();
    context1.moveTo(21 + w_2, imY1 + imHeight1 / 2);
    context1.lineTo(165 + w_2, imY1 + imHeight1 / 2);
    context1.stroke();
    if (isLevel) {
        var yn = hr - 6 * nlevel * nlevel - 1;
        context1.beginPath();
        context1.moveTo(21, yn);
        context1.lineTo(165, yn);
        context1.stroke();
        //	  for( i=0;i<2;i++)OS.offscreenGC.drawLine(21,yn-i,165,yn-i);
        context1.strokeStyle = "blue";
        for (i = 21; i < 165; i++) {
            yn = hr - 3 - Math.round(160 * Math.pow(Math.sin(Math.PI * nlevel * (i - 21) / 143), 2));
            context1.drawImage(pi, i, yn);
        }
    }
}
//==========================================================================
function prepare_screen() {
    var s = ["P", "E"];
    var s1 = ["a", "x"];
    var c = ["blue", "red"];
    context1.font = '16px bold Serif';
    context1.strokeStyle = "black";
    for (i = 0; i < 2; i++) {
        context1.lineWidth = 2;
        context1.beginPath();
        context1.moveTo(166 + i * 200, 30);
        context1.lineTo(166 + i * 200, 230);
        context1.moveTo(20 + i * 200, 229);
        context1.lineTo(170 + i * 200, 229);
        context1.stroke();
        tt = PrepareArrow(180 + i * 200, 229, 0); //(1-i)*164   i*
        drawPoly(context1, tt, "black");
        context1.fillStyle = c[i];
        context1.fillText(s[i], 8 + i * 16, 19);
        context1.strokeStyle = "black";
        context1.beginPath();
        context1.moveTo(20 + i * 200, 20);
        context1.lineTo(20 + i * 200, 228);
        context1.stroke();
        tt = PrepareArrow(20 + i * 200, 20, Math.PI / 2); //(1-i)*164   i*
        drawPoly(context1, tt, "black");
        /*		vs.alfa =i*Math.PI/2;
        		vs.Vx =(1-i)*164;
        		vs.Vy =i*200;
        		vlib.DrawVector( g,19,228, vs );
        		vlib.DrawVector( g,20,228, vs );
        		vlib.DrawVector( g,19,229, vs );*/
        context1.font = '14px bold Courier';
        context1.fillStyle = "black";
        context1.fillText(s1[i], 162 + i * 21, 242);
    }
    context1.fillText("0", 8, 242);
}
//======================================================================
function setLevel() {
    //console.log("setLevel imY1= "+imY1+" imY01= "+imY01+" Btimer= "+Btimer)
    if (Math.abs(parseInt(imY1) - imY01) < 2) {
        stop3();
        //			setSleep(100);
        //			stop3();
    } else {
        clearInterval(Btimer);
        //console.log("setLevel2 Btimer= "+Btimer+" sleeptime= "+sleeptime+" (imY01-imY1)/3= "+(imY01-imY1)/3)
        setSleep(140 - (imY01 - imY1) / 2);
        startM3();
    }
    for (i = 1; i < 6; i++)
        if (Math.abs(imY1 - hr + 6 * i * i + imHeight1 / 2) < 1) {
            nlevel = i;
            setNlevel(nlevel);
            isLevel = true;
            return;
        }
    isLevel = false;
    stopM2();
}
// ============================================	
function mousePressed(e) {
    Canvas1 = refObj('Canvas1');
    var mouse = {
        x: e.clientX - Math.round(Canvas1.getBoundingClientRect().left),
        y: e.clientY - Math.round(Canvas1.getBoundingClientRect().top)
    }
    if (mouse.x > imX01 && mouse.x < imX01 + imWidth1 && mouse.y > imY1 + dy1 && mouse.y < imY1 + dy1 + imHeight1) {
        bBeginDrag = true;
        dy1 = imY1 - mouse.y + dy1;
    } else bBeginDrag = false;
    //console.log("mousePressed mouse.y= "+mouse.y+" imY2= "+imY1+" mouse.x= "+mouse.x+" imX02= "+imX01+" dy1= "+dy1+" mouse.y>imY1+dy1= "+(mouse.y>imY1+dy1)+" mouse.y<imY1+dy1+imHeight1= "+(mouse.y<imY1+dy1+imHeight1)+" bBeginDrag= "+bBeginDrag)
} //mouseDown
//** ============================================  
function mouseDragged(e) {
    var newY = e.clientY - Math.round(Canvas1.getBoundingClientRect().top);
    if (bBeginDrag) {
        if (newY < ymin - dy1) imY1 = ymin;
        else
        if ((newY + imHeight1 / 2 + dy1) > hr)
            imY1 = hr - imHeight1 / 2;
        else imY1 = newY + dy1;
        setLevel();
        paint1();
    }
}

function mouseReleased(e) {
    bBeginDrag = false;
    dy1 = 0;
}
// ============================================  
// keyPressed
// ============================================
function keyPressed(ke) {
    var code = ke.keyCode;
    //  if(isProgram) return;
    switch (code) {
        case 38:
            if ((imY1) > ymin) {
                imY1--;
            }
            break;
        case 40:
            if ((imY1 + imHeight1 / 2) < hr) {
                imY1++;
            }
            break;
    }
    setLevel();
    paint1();
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