var width5 = 250;
var height5 = 250;
var imY05 = 1;
var imX05, imX5, dx5;
var xmin5 = 36 + 2; //+12;
var wr5 = 229 + 18;
//	Rectangle rcImage;
var bBeginDrag5 = false;
var imHeight5 = 5;
var imWidth5 = 5;
var isStart5 = false;
var isCross5 = false;
var xstart5, xend5, y05, yend5;
var n05 = 1;
var xs5, xs05;
var ys5;
var x05 = 40;
var wg5 = 200;
var hg5 = 186;
var yg5 = 15;
var np5 = 200;
var index5 = 0; // для наполнения
var data5 = new Array(2 * np5);
var xreal05, xreal15, S5;
var nameX5, nameY5;
var context5;
var Canvas5;

function init5() {
    //		setBackground(Color.white);
    nameX5 = "x/a";
    nameY5 = "P";
    Canvas5 = refObj('Canvas5');
    context5 = Canvas5.getContext('2d');
    Canvas5.onmouseup = mouseReleased5;
    Canvas5.onmousedown = mousePressed5;
    Canvas5.onmousemove = mouseDragged5;
    Canvas5.tabIndex = 1000;
    refObj("Canvas5").addEventListener("keyup", keyPressed5, false);
    imX05 = imX5 = 95; //100;
    imY05 = height5 - 13 * imHeight5;
    dx5 = 0;
    ys5 = height5 - 8;
    xs5 = xs05 = 10;
    S5 = 0;
    //	rcImage = new Rectangle(imX0-imWidth, imY0, 2*imWidth, 2*imHeight);
    setTimeout("paint5()", 200)
} //init
//=============================================
function paint5() {
    var dir = 0;
    context5.fillStyle = "#FFFFFF";
    context5.fillRect(0, 0, width5, height5);
    fillFrame5(x05, yg5, wg5, hg5);
    context5.strokeStyle = "black";
    for (i = 0; i < index5 - 1; i++) {
        dir = ((data5[2 * i + 1] <= data5[2 * (i + 1) + 1]) ? 1 : -1);
        context5.beginPath();
        context5.lineWidth = 1;
        context5.moveTo(data5[2 * i], data5[2 * i + 1]);
        context5.lineTo(data5[2 * i], data5[2 * (i + 1) + 1] + dir);
        context5.stroke();
    }
    if (isCross5) {
        xreal15 = round_double(-0.5 + 2.0 * (imX5 + dx5 - x05) / wg5);
        if (isStart5) treatment();
        context5.strokeStyle = "black";
        context5.beginPath();
        context5.lineWidth = 1;
        context5.moveTo(imX5 + dx5, imY05);
        context5.lineTo(imX5 + dx5, imY05 + 2 * imHeight5);
        context5.moveTo(imX5 - imWidth5 + dx5, imY05 + imHeight5);
        context5.lineTo(imX5 + imWidth5 + dx5, imY05 + imHeight5);
        context5.stroke();
        /*	OS.offscreenGC.drawLine(imX+dx,imY0,imX+dx,imY0+2*imHeight);	
        	OS.offscreenGC.drawLine(imX-imWidth+dx,imY0+imHeight,imX+imWidth+dx,imY0+imHeight);	
        	rcImage = new Rectangle(imX-imWidth+dx, imY0, 2*imWidth, 2*imHeight);
        	OS.offscreenGC.setPaintMode();*/
        context5.fillStyle = "black";
        context5.font = '14px bold Serif';
        context5.fillText("x = " + String(xreal15), xs5, ys5);
        if (isStart5) {
            //console.log("paint5 isStart5 xs05= "+xs05+" ys5= "+ys5)
            context5.fillText("x", xs05, ys5);
            context5.fillText("o ", xs05 + 8, ys5 + 3);
            context5.fillText("= " + String(xreal05), xs05 + 16, ys5);
            context5.fillText("S = " + String(S5), width5 - xs5, ys5);
        }
    }
}

function fillFrame5(x, y, width, h) {
    var y0 = y;
    context5.fillStyle = "cyan";
    context5.fillRect(x, y0, width, h);
    context5.strokeStyle = "black";
    context5.fillStyle = "black";
    context5.strokeRect(x, y0, width, h);
    context5.beginPath();
    context5.lineWidth = 1;
    context5.moveTo(x05 + width / 4, y0);
    context5.lineTo(x05 + width / 4, y0 + h);
    context5.stroke();
    context5.font = '14px PLAIN Serif';
    for (i = 0; i < 5; i++) {
        context5.fillText(String(i * 0.5), x05 + (i + 1) * width / 4 - 8, 215);
        context5.beginPath();
        context5.lineWidth = 1;
        context5.moveTo(x05 + (i + 1) * width / 4, y0 + h - 5);
        context5.lineTo(x05 + (i + 1) * width / 4, y0 + h);
    }
    context5.stroke();
    context5.fillText("-0.5", x - 10, 215);
    context5.fillStyle = "blue";
    context5.font = '20px PLAIN Serif';
    context5.fillText(nameX5, 120, 235);
    context5.fillText(nameY5, 12, y0 + 101);
}
//=============================================
function treatment() {
    var xreal, yreal;
    if (!isGraph) return;
    //console.log("treatment isStart5= "+ isStart5+ " xstart5= "+xstart5+ " xend5= "+xend5+ " n05= "+n05+ " xreal05= "+xreal05+" xreal15= "+xreal15)
    S5 = round_double(integralPsi(n05, xreal05, xreal15));
    y05 = yg5 + hg5 - 1;
    n05 = getN();
    context5.strokeStyle = "yellow";
    context5.lineWidth = 1;
    for (x = xstart5; x < xend5; x++) {
        xreal = getDouble(x);
        //		xreal = x;
        yreal = psi_2(n05, xreal);
        //		else yreal =0;
        yend5 = yg5 + hg5 - 1 - Math.round(yreal * hg5 / 2);
        //console.log("treatment  xstart5= "+xstart5+ " xend5= "+xend5+ " xreal= "+xreal+ " yreal= "+yreal+" yend5= "+yend5+" y05= "+y05)
        context5.beginPath();
        context5.moveTo(x, y05);
        context5.lineTo(x, yend5);
        context5.stroke();
    }
}
// ============================================	
function mousePressed5(e) {
    Canvas5 = refObj('Canvas5');
    var mouse = {
        x: e.clientX - Math.round(Canvas5.getBoundingClientRect().left),
        y: e.clientY - Math.round(Canvas5.getBoundingClientRect().top)
    }
    if (mouse.x > imX5 + dx5 - imWidth5 && mouse.x < imX5 + imWidth5 + dx5 && mouse.y > imY05 && mouse.y < imY05 + 2 * imHeight5) {
        bBeginDrag5 = true;
        dx5 = imX5 - mouse.x + dx5;
    } else bBeginDrag5 = false;
    //console.log("mousePressed mouse.y= "+mouse.y+" imY05= "+imY05+" mouse.x= "+mouse.x+" imX5= "+imX5+" dx5= "+dx5+" mouse.x>imX5= "+(mouse.x>imX5)+" mouse.x<imX5+imWidth5+dx5= "+(mouse.x<imX5+imWidth5+dx5)+" bBeginDrag5= "+bBeginDrag5)
} //mouseDown
//** ============================================  
function mouseDragged5(e) {
    var newX = e.clientX - Math.round(Canvas5.getBoundingClientRect().left);
    if (bBeginDrag5) {
        //console.log("mouseDragged5 mouse.y= "+mouse.y+" imY05= "+imY05+" mouse.x= "+mouse.x+" imX5= "+imX5+" dx5= "+dx5+" mouse.x>imX5= "+(mouse.x>imX5)+" mouse.x<imX5+imWidth5+dx5= "+(mouse.x<imX5+imWidth5+dx5)+" bBeginDrag5= "+bBeginDrag5)
        if (newX < xmin5 - dx5) imX5 = xmin5;
        else
        if ((newX + imWidth5 + dx5) > wg5 + xmin5)
            imX5 = wg5 + xmin5; // - imWidth5;	      
        else imX5 = newX + dx5;
    }
    xend5 = imX5;
    paint5();
}

function mouseReleased5(e) {
    bBeginDrag5 = false;
    dx5 = 0;
}
// ============================================  
// keyPressed
// ============================================
function keyPressed5(ke) {
    var code = ke.keyCode;
    //console.log("keyPressed5 code= "+code+" imX5= "+imX5+" dx5= "+dx5+" imHeight5= "+imHeight5+" imX5 > xmin5-dx5= "+(imX5 > xmin5-dx5)+" ((imX5 + dx5 + imHeight5) < wr5)= "+((imX5 + dx5 + imHeight5) < wr5))
    //  if(!isCross)return;
    switch (code) {
        case 13:
            isStart5 = !isStart5;
            if (isStart5) {
                xstart5 = xend5 = imX5;
                S5 = 0;
                xreal5 = xreal05 = round_double(getDouble(imX5 + dx5));
                xs5 = 80;
            } else xs5 = xs05;
            break;
        case 37:
            if (imX5 > xmin5 - dx5) {
                imX5--;
            }
            break;
        case 39:
            if ((imX5 + dx5 + imHeight5) < wr5) {
                imX5++;
            }
            break;
    }
    xend5 = imX5;
    paint5();
}
// ============================================
function setN(n) {
    n05 = n;
}
// ============================================
function setCross5(b) {
    isCross5 = b;
    paint5();
}
// ============================================
function setStop() {
    isStart5 = false;
    xs5 = xs05;
}
/*/ ============================================
public void setFocus()  {
	this.requestFocus();
  }*/
// ============================================
function ClearGraph5() {
    index5 = 0;
    paint5();
}
// ============================================
function drawPoint5(x, y) {
    var i = index5 * 2;
    if (index5 < 0 || i > 2 * np5 - 2) return;
    data5[i] = x05 + Math.round((x + 0.5) * wg5 / 2);
    data5[i + 1] = yg5 + hg5 - Math.round(y * hg5 / 2);
    //System.out.println("index= "+index+" x= "+data[i]+" y= "+data[i+1]);
    index5++;
    paint5();
}

function getDouble(x) {
    return -0.5 + 2.0 * (x - x05) / wg5;
}