var width = 324;
var height = 269;
var n = new Array(120);
var w = 2;
var y0 = 231;
var isCross = true;
var imY0 = 1;
var imX0, imX, ys;
var dx2 = 0;
var xmin = 39;
var wr = 295;
var bBeginDrag2 = false;
var imHeight2 = 5;
var imWidth2 = 5;
var w = 2;
var y0 = 231;
var tmp = 0;
var nt2 = 1;
var xs0 = 30;

function init2() {
    /*  		graf2 = new Image();
    			graf2.src = './images/graf2.jpg';
    			ai = new Image();
    			ai.src = './images/ai.gif';
    			chi = new Image();
    			chi.src = './images/chi.gif';*/
    Canvas3 = refObj('comptonGraph');
    cont = Canvas3.getContext('2d');
    imX0 = imX = 100;
    imY0 = height - 50; //12*imHeight;
    dx = 0;
    ys = height - 8;
    for (i = 0; i < n.length; i++) n[i] = 0;
    setTimeout("paint2()", 300)
    Canvas3.onmousedown = mousePressed;
    Canvas3.onmousemove = mouseDragged;
    Canvas3.onmouseup = mouseReleased;
    //  	ccc = refObj('poleGraph');
    //  	ccc.onkeyup = keyPressed;
    //ccc.tabIndex = 1000;
    Canvas3.tabIndex = 1000;
    refObj("comptonGraph").addEventListener("keyup", keyPressed, false);
    /*	refObj('poleGraph').addEventListener("keyup",function(e) {
    		var code = e.keyCode;
    //alert("code = "+code)
    			switch(code) {
    		case 37:
    			if ((imX) > xmin)imX--;
    	  break;
    	case 39:
    	  if ((imX + imWidth/2) < wr) imX++;
    	  break;
    	case 13:
    		var tt=Math.abs(getTeta());
    		setValueTable(nt2,tt);
    		var ytt=round_double(76.8+0.08*(imX+dx2));
    		setValueTable(nt2+1,ytt);
    //		d1.push([tt,ytt]);
    //		$.plot("#Graph2", [ d1],plotParams1);
    		nt2+=3;if(nt2>15)nt2=1;
    	  break;
      }
      paint2();
    		 },false);*/
}
//==========================================================================
function paint2() {
    var elem = document.getElementById('comptonGraph');
    cont = elem.getContext('2d');
    cont.fillStyle = "black";
    cont.clearRect(0, 0, elem.width, elem.height);
    cont.fillRect(0, 0, context.width, context.height);
    cont.drawImage(graf2, 0, 0);
    cont.drawImage(ai, 100, 248);
    cont.drawImage(chi, 10, 36);
    var yy, dy;
    for (i = 0; i < n.length; i++) {
        cont.fillStyle = "rgb(0,200,0)";
        yy = ((y0 - 2 * n[i] > 13) ? y0 - 2 * n[i] : 13);
        dy = ((y0 - 2 * n[i] > 13) ? 2 * n[i] : y0 - 13);
        cont.fillRect(xmin + i * w, yy, w, dy);
        cont.strokeStyle = "rgb(50,100,40)";
        cont.beginPath();
        cont.lineWidth = 1;
        cont.moveTo(xmin + i * w + w - 1, yy);
        cont.lineTo(xmin + i * w + w - 1, y0);
        cont.stroke();
    }
    if (isCross) {
        drawCross(imX, imY0);
        //	rcImage = new Rectangle(imX-imWidth+dx, imY0, 2*imWidth, 2*imHeight);
        //	cont.strokeStyle="black";
        cont.fillStyle = "white";
        cont.font = '16px bold Serif';
        xreal0 = round_double(76.8 + 0.08 * (imX + dx));
        cont.fillText("A = " + xreal0, xs0, ys);
    }

}
//=============================================
function drawCross(x, y) {
    cont.strokeStyle = "white";
    cont.beginPath();
    cont.lineWidth = 1;
    cont.moveTo(x, y);
    cont.lineTo(x, y + 2 * imHeight2);
    cont.stroke();
    cont.beginPath();
    cont.moveTo(x - imWidth2, y + imHeight2);
    cont.lineTo(x + imWidth2, y + imHeight2);
    cont.stroke();
}
// ============================================
function setN(i) {
    if (i >= 0 && i < n.length) n[i]++;
}
// ============================================
function clearData() {
    for (i = 0; i < n.length; i++) n[i] = 0;
}
// ============================================
function setCross(b) {
    isCross = b;
    paint2(); //repaint();
}
//========================================================// ============================================
function mousePressed(e) {
    Canvas3 = refObj('comptonGraph'); //document.getElementById('Q_U');
    var mouse = {
        x: e.clientX - Math.round(Canvas3.getBoundingClientRect().left),
        y: e.clientY - Math.round(Canvas3.getBoundingClientRect().top)
    }
    if (mouse.x > imX - imWidth2 + dx2 && mouse.x < imX + dx2 + imWidth2 && mouse.y > imY0 && mouse.y < imY0 + 2 * imHeight2) {
        bBeginDrag2 = true;
        dx2 = imX - mouse.x + dx2;
    } else bBeginDrag2 = false;
    //console.log("mousePressed mouse.x ="+mouse.x+" dx2 ="+dx2+" mouse.y ="+mouse.y+" imX ="+imX+" imY0 ="+imY0+" bBeginDrag2 ="+bBeginDrag2)
}
// ============================================
function mouseReleased(e) {
    bBeginDrag2 = false;
    dx2 = 0;
}
// ============================================
function mouseDragged(e) {
    var newX = e.clientX - Math.round(Canvas3.getBoundingClientRect().left);
    //console.log("mouseDragged newX ="+newX+" newX>xmin ="+(newX>xmin)+" imX<wr ="+(imX<wr)+" bBeginDrag2 ="+bBeginDrag2)
    if ((bBeginDrag2) && (newX > xmin) && (imX < wr)) {
        if (newX < xmin - dx2) imX = xmin - dx2;
        else
        if ((newX + imWidth2 + dx2) > wr)
            imX = wr - imWidth2 / 2 - dx2;
        else imX = newX; //+dx2;	      
        //	xend=imX;
        paint2();
    }
}
//=============================================
function keyPressed(e) {
    var code = e.keyCode;
    //alert("code = "+code)
    switch (code) {
        case 37:
            if ((imX) > xmin) imX--;
            break;
        case 39:
            if ((imX + imWidth / 2) < wr) imX++;
            break;
        case 13:
            var tt = Math.abs(getTeta());
            setValueTable(nt2, tt);
            var ytt = round_double(76.8 + 0.08 * (imX + dx2));
            setValueTable(nt2 + 1, ytt);
            //		d1.push([tt,ytt]);
            //		$.plot("#Graph2", [ d1],plotParams1);
            nt2 += 3;
            if (nt2 > 15) nt2 = 1;
            break;
    }
    paint2();
}