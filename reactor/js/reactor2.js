	var height2 = 460;
	var width2 = 240;
	var Nstab = 388;
	//	var NZ = new Array(96);
	var Z, N, isEq, Npart, Zpart; //, yZpart, xNpart;
	var dZ = 111;
	var pointers;
	var imHeight2 = 13;
	var imWidth2 = 13;
	var bBeginDrag2 = false;
	var isArrow = false;
	var isBegin = false; // = true;
	var imX0, imX;
	var imY0, imY;
	var dx = 0;
	var dy = 0;
	var xx = [];
	var yy = [];
	var s = "в отношении 3:2.";
	var nline_pos = [12, 39];
	var S_for_replace;
	var x02 = 50;
	var wg2 = 400;
	var hg2 = 200;
	var yg2 = 9; //12;
	var d;
	var np2 = 400;
	var index = 0; // для наполнения
	var data = new Array(2 * np2);
	var Z = 1;
	var N = 1;
	var isFirst = true;
	var context2;
	var elem;

	function init2() {
	    pointers = new Image();
	    pointers.src = './images/pointers.gif';
	    elem = document.getElementById('cnt');
	    elem.onmouseup = mouseReleased;
	    elem.onmousedown = mousePressed;
	    elem.onmousemove = mouseDragged;
	    elem.ondblclick = dblClick;
	    refObj("Canvas2").tabIndex = 1000;
	    refObj("Canvas2").addEventListener("keyup", checkPressed, false);

	    isFirst = true;
	    isArrow = false;
	    dx = 0;
	    dy = 0;
	    dZ = 111;
	    if (Math.round(Math.random()) > 0) isEq = 1;
	    else isEq = 0;
	    //	loadData();
	    //console.log("init2 isEq= "+isEq)
	    initZN();
	    showZN(Z, N);
	    isFirst = true;
	    isArrow = false;
	    dx = 0;
	    dy = 0;
	    dZ = 111;
	    setPointZN();
	} //init
	//======================================================
	function start() {
	    setTimeout("prepare_data2()", 200);
	}
	//--------------------------------
	function prepare_data2() {
	    if (Math.round(Math.random()) > 0) isEq = 1;
	    else isEq = 0;
	    //	initZN();
	    //	showZN(Z, N);
	    isFirst = true;
	    isArrow = false;
	    dx = 0;
	    dy = 0;
	    dZ = 111;
	    //	setPointZN();
	    //alert("prepare_data2 ")
	    /*	for(i=1;i<96;i++){
	    		k=NZ[i].length;
	    		for(j=0;j<k ;j++){
	    			ntt=NZ[i][j]
	    			drawPoint(ntt,i);
	    		}
	    	}*/
	}

	function newStart() {
	    if (Math.round(Math.random()) > 0) isEq = 1;
	    else isEq = 0;
	    isFirst = true;
	    isArrow = false;
	    dx = 0;
	    dy = 0;
	    dZ = 111;
	    //	prepare_data2();
	    paint2();
	}
	//=============================================
	function paint2() {
	    var elem = document.getElementById('Canvas2');
	    context2 = elem.getContext('2d');
	    //  context2.clearRect(0, 0, elem.width, elem.height);
	    // alert("paint2 index= "+index)
	    fillFrame(x02, yg2, wg2, hg2);
	    context2.strokeStyle = "black";
	    if (isBegin)
	        for (i = 0; i < index - 1; i++) {
	            //console.log("paint2 i= "+i+" xx= "+xx[i]+" yy= "+yy[i]);
	            context2.beginPath();
	            context2.moveTo(xx[i], yy[i]);
	            context2.lineTo(xx[i] + 1, yy[i] + 1);
	            context2.stroke();
	        }
	    if (isFirst) {
	        isFirst = false;
	        imX0 = getCoordinateX(N) - 6;
	        imX = imX0;
	        imY0 = getCoordinateY(Z) - 6;
	        imY = imY0;
	    }
	    context2.drawImage(pointers, 13, 0, 13, 13, imX0, imY0, 13, 13);
	    context2.drawImage(pointers, 13, 0, 13, 13, imX + dx, imY + dy, 13, 13);
	    if (isArrow) {
	        //console.log("paint2 imX= "+imX+" dx= "+dx+" imY= "+imY+" dy= "+dy);
	        canvas_arrow(context2, imX + dx + 6, imY + dy + 6, imX + dx - 6, imY + dy + 6 - dZ) //find_text(3);
	    }
	}
	// ============================================
	function fillFrame(x, y, width, h) {
	    // alert("fillFrame x= "+x+" y= "+y+" width= "+width+" h= "+h+" height2= "+height2+" context2= "+context2)
	    var y0 = y;
	    context2.fillStyle = "cyan";
	    context2.fillRect(x, y0, width, h);
	    context2.strokeStyle = "black";
	    context2.strokeRect(x, y0, width, h);
	    context2.font = '14px plane Serif';
	    context2.lineWidth = 2;
	    for (i = 0; i < 6; i++) {
	        context2.beginPath();
	        context2.moveTo(x02 + Math.round(62.5 * i), y0 + h - 5);
	        context2.lineTo(x02 + Math.round(62.5 * i), y0 + h);
	        context2.stroke();
	    }
	    context2.fillStyle = "black";
	    for (i = 0; i < 4; i++) {
	        context2.fillText(String(i * 50), x02 + i * 125 - 8, 230);
	        context2.beginPath();
	        context2.moveTo(x02 + i * 125, y0 + h - 8);
	        context2.lineTo(x02 + i * 125, y0 + h);
	        context2.moveTo(x02, y0 + h - i * 50);
	        context2.lineTo(x02 + 5, y0 + h - i * 50);
	        context2.stroke();
	    }
	    context2.beginPath();
	    context2.moveTo(x02, y0 + h - 100);
	    context2.lineTo(x02 + 10, y0 + h - 100);
	    for (i = 1; i < 3; i++) {
	        context2.fillText(String(i * 50), x - 27, 215 - i * 100);
	    }
	    context2.fillText(String(i * 50), x - 27, 215 - i * 100);
	    context2.font = '20px plane Serif';
	    context2.fillStyle = "blue";
	    context2.fillText("N", 240, 240);
	    context2.fillText("Z", 14, y0 + 85);
	    context2.stroke();
	    // alert("fillFrame end")
	}
	//=============================================
	function setPointZN() {
	    //	console.log("setPointZN NZ[92].length= "+NZ[91].length)
	    for (i = 1; i < 96; i++) {
	        k = NZ[i].length;
	        for (j = 0; j < k; j++) {
	            if (NZ[i][j] == 0) continue;
	            ntt = NZ[i][j] - i;
	            drawPoint(ntt, i);
	        }
	    }
	}
	/*/=============================================
	function loadData()
	{
	//	console.log("loadData adat.length= "+adat.length)
		for(i=0;i<adat.length;i++)NZ[i+1]=adat[i].split(" ");
	//	console.log("loadData NZ[92]= "+NZ[92])
	}*/
	//** ============================================
	function canvas_arrow(cont, fromx, fromy, tox, toy) {
	    //console.log("paint2 fromx= "+fromx+" fromy= "+fromy+" tox= "+tox+" toy= "+toy);
	    var headlen = 8; // length of head in pixels
	    var angle = Math.atan2(toy - fromy, tox - fromx);
	    cont.strokeStyle = "red";
	    cont.beginPath();
	    cont.moveTo(fromx, fromy);
	    cont.lineTo(tox, toy);
	    cont.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
	    cont.moveTo(tox, toy);
	    cont.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
	    cont.stroke();
	}
	// ============================================  
	function showZN(Z, N) {
	    //console.log("showZN Z="+Z+" N="+N)
	    refObj("tablo1").value = "Z = " + String(Z);
	    refObj("tablo2").value = "N = " + String(N);
	}

	function getNZ() {
	    N = getN(imX + dx + 6);
	    Z = getZ(imY + dy + 6);
	}

	function ifEnter() {
	    dZ = 6 * rand(2); //**
	    //			arrow = new MyVector(-30,dZ,0,Color.red);
	    //			canvas_arrow(context2, 50, 40, 35, 35)			//find_text(3);
	    setText(3, "cc");
	    isArrow = true;
	    paint2();
	}
	// ============================================
	function mousePressed(e) {
	    Canvas2 = refObj('Canvas2');
	    var mouse = {
	        x: e.clientX - Math.round(Canvas2.getBoundingClientRect().left),
	        y: e.clientY - Math.round(Canvas2.getBoundingClientRect().top)
	    }
	    if (mouse.x > imX + dx && mouse.x < imX + dx + imWidth2 && mouse.y > imY && mouse.y < imY + imHeight2) {
	        bBeginDrag2 = true;
	        dx = imX - mouse.x + dx;
	    } else bBeginDrag2 = false;
	    //console.log("mousePressed bBeginDrag2= "+bBeginDrag2)
	}

	function mouseReleased(e) {
	    bBeginDrag2 = false;
	}

	function mouseDragged(e) {
	    Canvas2 = refObj('Canvas2');
	    var mouse = {
	        x: e.clientX - Math.round(Canvas2.getBoundingClientRect().left),
	        y: e.clientY - Math.round(Canvas2.getBoundingClientRect().top)
	    }
	    if (bBeginDrag2 && (mouse.x > x02) && (imX < (wg2 + x02))) {
	        if (mouse.x < x02 - dx) imX = x02 - dx;
	        else
	        if ((mouse.x + imWidth2 + dx) > (wg2 + x02))
	            imX = wg2 - imWidth2 / 2 - dx;
	        else imX = mouse.x; //+dx2;	      
	        if (mouse.y < yg2 - dy) imY = yg2 - dy;
	        else
	        if ((mouse.y + imHeight2 + dy) > yg2 + hg2)
	            imY = yg2 + hg2 - imHeight - dy;
	        else imY = mouse.y;
	        paint2();
	        getNZ();
	        showZN(Z, N);
	    }
	}

	function dblClick(e) {
	    Canvas2 = refObj('Canvas2');
	    var mouse = {
	        x: e.clientX - Math.round(Canvas2.getBoundingClientRect().left),
	        y: e.clientY - Math.round(Canvas2.getBoundingClientRect().top)
	    }
	    if (mouse.x > imX + dx && mouse.x < imX + dx + imWidth2 && mouse.y > imY && mouse.y < imY + imHeight2) {
	        //console.log("dblClick Z= "+Z+" Zpart= "+Zpart+" N= "+N+" Npart= "+Npart)
	        if ((Z == Zpart) && (N == Npart)) ifEnter();
	    }
	}

	function checkPressed(e) {
	    var code = e.keyCode;
	    //console.log("checkPressed code2= "+code)
	    switch (code) {
	        case 37:
	            if ((imX) > (x02)) {
	                //	  if ((imX) > xr) {
	                imX--;
	            }
	            break;
	        case 39:
	            if ((imX + imWidth2 / 2) < (wg2 + x02)) {
	                imX++;
	            }
	            break;
	        case 40:
	            if ((imY) < (hg2)) {
	                //	  if ((imX) > xr) {
	                imY++;
	            }
	            break;
	        case 38:
	            if ((imY) > yg2) {
	                imY--;
	            }
	            break;
	    }
	    e.stopPropagation();
	    paint2();
	    getNZ();
	    showZN(Z, N);
	}
	//** ============================================  
	function initZN() {
	    var izotops = [3, 1, 4, 2];
	    var count = 1;
	    Z = 91 + rand(3);
	    Z += Z % 2;
	    //console.log("initZN Z= "+Z+" NZ[92][0]= "+NZ[92][0])
	    //	Z=Math.round(Z);
	    count = NZ[Z].length;
	    /*	for ( i=1;i<Z;i++){
	        do
	              count++;
	        while (NZ[count-1]!=0);
	    	}*/
	    var tmp = rand(count - 1);
	    //console.log("initZN Z= "+Z+" count= "+count+" NZ[Z]= "+NZ[Z]+" tmp= "+tmp)
	    N = NZ[Z][tmp] - Z;
	    N += N % 2;
	    Zpart = Math.round(divZN(Z));
	    Npart = Math.round(divZN(N));
	    //	refObj("tablo1").value="Z = "+String(Z);
	    //	refObj("tablo2").value="N = "+String(N);
	    //console.log("initZN Z= "+Z+" N= "+N+" Zpart= "+Zpart+" Npart= "+Npart)	
	}
	//** ============================================  
	function divZN(k) {
	    var div;
	    switch (isEq) {
	        case 1:
	            div = k / 2;
	            break;
	        case 0:
	            div = Math.round(k * 3 / 5);
	            break;
	        default:
	            div = 0;
	    }
	    return div;
	}

	function get_dZ() {
	    return dZ;
	}

	function drawPoint(x, y) {
	    //            if( index < 0 || i > 2*np-2 ) return;
	    xx[index] = x02 + Math.round(x * wg2 / 160);
	    yy[index] = yg2 + hg2 - y * 2;
	    index++;
	    //console.log("index= "+index+" x= "+x+" xx= "+xx[index-1]+" y= "+y+" yy= "+yy[index-1]);
	    //	paint2();
	}

	function getN(x) {
	    return Math.round(0.4 * (x - x02));
	}

	function getZ(x) {
	    return Math.round(0.5 * (yg2 + hg2 - x));
	}

	function getCoordinateX(x) {
	    return x02 + Math.round(2.5 * x);
	}

	function getCoordinateY(x) {
	    return yg2 + hg2 - 2 * x;
	}