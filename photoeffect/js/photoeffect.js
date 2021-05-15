	var imHeight;
	var imWidth;
	var bBeginDrag = false;
	var bDragCrawl = false;
	var imX0, imX;
	var imY0 = 209;
	var dx = 0;
	var dxC = 0;
	var xr = 102;
	var wr = 119;
	var subst = 0;
	var Ia = 0;
	var U = 0;
	var lambda = 100; //lambda = 1241/ нм
	var dlambda = 5;
	var dxL = 4;
	var Ukr;
	//	var AeV = [2.4,4.3,3.0,4.8,2.3,4.0,4.5,1.8,1.3];
	var AeV = [2.3, 4.3, 3.0, 2.15, 1.8, 3.7];
	// A эВ: Ba Ag Ca K Cs Zn
	//	double[] AeV = {1.8,3.7,4.7,4.3,2.25,3.0};// A эВ 1.8 - Cs
	var OnOff = false;
	var isProgram = true;
	var rgb = [0, 0, 0];
	var nInt = 0; //для отладки
	var nIntold = -1;
	var ntext = 1;
	//	int ng = 0;
	var engl = 0;
	var nameL = "нм";
	var nameV = "В";
	var nameI = "мкА";
	var notGraph3 = true;
	var Canvas1;

	function init() {
	    phototube0 = new Image();
	    phototube0.src = './images/phototube.gif';
	    creep = new Image();
	    creep.src = './images/creep.gif';
	    imHeight = creep.height;
	    imWidth = creep.width;
	    imX0 = xr + wr - imWidth / 2 - 28;
	    imX = imX0;
	    left_right0m = new Image();
	    left_right0m.src = './images/left_right0m.gif';
	    left_right2m = new Image();
	    left_right2m.src = './images/left_right2m.gif';
	    crawl = new Image();
	    crawl.src = './images/crawl.gif';
	    imX1 = imX10 = 47;
	    imX2 = imX20 = 302;
	    Canvas1 = refObj('Canvas1');
	    context = Canvas1.getContext('2d');
	    Canvas1.onmousedown = mousePressed;
	    Canvas1.onmousemove = mouseDragged;
	    refObj("Canvas1").addEventListener("mouseup", mouseReleased, false);
	    Canvas1.tabIndex = 1000;
	    refObj("Canvas1").addEventListener("keyup", checkPressed, false);
	}

	function mousePressed(e) {
	    Canvas1 = refObj('Canvas1'); //document.getElementById('Q_U');
	    var mouse = {
	        x: e.clientX - Math.round(Canvas1.getBoundingClientRect().left),
	        y: e.clientY - Math.round(Canvas1.getBoundingClientRect().top)
	    }
	    if (mouse.x > imX + dx && mouse.x < imX + dx + imWidth && mouse.y > imY0 && mouse.y < imY0 + imHeight) {
	        bBeginDrag = true;
	        dx = imX - mouse.x + dx;
	    } else bBeginDrag = false;
	    if (mouse.x > imX1 + dxC && mouse.x < imX1 + dxC + 25 && mouse.y > 4 && mouse.y < 4 + 15) {
	        bDragCrawl = true;
	        dxC = imX1 - mouse.x + dxC;
	    } else bDragCrawl = false;
	} //mouseDown
	// ============================================
	function mouseDragged(e) {
	    var newX = e.clientX - Math.round(Canvas1.getBoundingClientRect().left);
	    if ((bBeginDrag) && (newX > xr) && (imX < xr + wr)) {
	        if (newX < 113) imX = 113;
	        //		if(newX  < xr-dx) imX = xr;	
	        else
	        if ((newX + imWidth / 2 + dx) > xr + wr)
	            imX = xr + wr - imWidth / 2;
	        else imX = newX + dx;
	        showVA();
	        paint();
	    }
	    if ((bDragCrawl) && (newX > 47)) {
	        imX1 = newX + dxC;
	        if (imX1 < 47) imX1 = 47;
	        if (imX1 > 79) imX1 = 79;

	        lambda = (imX1 - imX10) * 20 + 100;
	        showVA();
	        paint();
	    }
	}

	function mouseReleased(e) {
	    bBeginDrag = false;
	    bDragCrawl = false;
	    dx = 0;
	    dxC = 0;
	}
	// ============================================  
	// keyPressed
	// ============================================
	function checkPressed(e) {
	    var code = e.keyCode;
	    //  if(isProgram) return;
	    switch (code) {
	        case 37:
	            if ((imX) > 113) {
	                //	  if ((imX) > xr) {
	                imX--;
	            }
	            break;
	        case 39:
	            if ((imX + imWidth / 2) < xr + wr) {
	                imX++;
	            }
	            break;
	    }
	    showVA();
	    paint();
	}

	function opp(a) {
	    switch (a) {
	        case 1:
	            dxL = dxL % 4;
	            dxL++;
	            if (imX1 < 79)
	                if (dxL == 1) imX1 += 1;
	            lambda += dlambda;
	            findColor();
	            showVA();
	            break;
	        case 2:
	            if (imX2 < 333) imX2 += 6;
	            nInt = (imX2 - imX20) / 6;
	            showVA();
	            break;
	            //		case 2:if(imX2<339)imX2+=6;nInt =(imX2-imX20)/6;showVA();break;
	        case 3:
	            dxL = dxL % 4;
	            dxL++;
	            if (imX1 > imX10)
	                if (dxL == 1) imX1 -= 1;
	            lambda -= dlambda;
	            findColor();
	            showVA();
	            break;
	            //		case 3:if(imX1>imX10)imX1-=0.2; lambda=100+(imX1-imX10)*20; findColor();showVA();break;
	        case 4:
	            if (imX2 > imX20) imX2 -= 6;
	            nInt = (imX2 - imX20) / 6;
	            showVA();
	            break;
	    }
	    paint();
	}

	function rect(x, y, width, height, op) {
	    this.x = x;
	    this.y = y;
	    this.width = width;
	    this.height = height;
	    this.handleClick = function(mouse) {

	        // выполнение проверки попадания 
	        // координат мыши внутрь контура

	        if (this.x < mouse.xm &&
	            this.x + this.width > mouse.xm &&
	            this.y < mouse.ym &&
	            this.y + this.height > mouse.ym) {

	            // Проверка прошла успешно, обработать событие click!
	            opp(op);
	            return true;
	        }

	        // Проверка попадания не удалась
	        return false;
	    }
	}

	function red() {
	    elem = document.getElementById('Canvas1');
	    elem.onmouseup = function(e) {
	        var mouse = {
	            xm: e.clientX - Math.round(elem.getBoundingClientRect().left),
	            ym: e.clientY - Math.round(elem.getBoundingClientRect().top)
	        }

	        // перебор всех игровых объектов с вызовом 
	        // обработчика onclick для каждого из них

	        for (var i = 0; i < ObjectArray.length; i++) {
	            ObjectArray[i].handleClick(mouse);
	        }
	    };
	}
	var ObjectArray = [
	    new rect(104, 2, 22, 18, 1),
	    new rect(364, 2, 22, 18, 2),
	    new rect(25, 2, 22, 18, 3),
	    new rect(280, 2, 22, 18, 4)
	];
	// ============================================
	function paint() {
	    var elem = document.getElementById('Canvas1');
	    context = elem.getContext('2d');
	    context.fillStyle = "rgb(222,214,198)";
	    context.fillRect(0, 0, context.width, context.height);
	    context.drawImage(phototube0, 20, 0);
	    context.fillStyle = "rgb(180,180,160)";
	    context.fillRect(25, 3, 80, 16);
	    context.strokeStyle = "rgb(115,115,115)";
	    context.lineWidth = 3;
	    context.beginPath();
	    context.moveTo(25, 2);
	    context.lineTo(104, 2);
	    context.moveTo(25, 20);
	    context.lineTo(104, 20);
	    context.stroke();
	    context.drawImage(left_right0m, 25, 2);
	    context.drawImage(crawl, imX1, 4);
	    context.drawImage(left_right2m, 104, 2);
	    context.beginPath();
	    context.moveTo(282, 2);
	    context.lineTo(384, 2);
	    context.drawImage(left_right0m, 280, 2);
	    context.moveTo(282, 20);
	    context.lineTo(384, 20);
	    context.stroke();
	    context.fillRect(300, 3, 80, 16);
	    context.drawImage(left_right2m, 364, 2);
	    context.drawImage(crawl, imX2, 4);

	    context.strokeStyle = "rgb(115,115,115)";
	    context.lineWidth = 3;
	    context.beginPath();
	    context.moveTo(235, 60);
	    context.lineTo(246, 50);
	    context.stroke();
	    findColor();
	    for (i = 0; i < 6; i++) {
	        var r = p(rgb[0], 2 * i * i);
	        g = p(rgb[1], 2 * i * i);
	        b = p(rgb[2], 2 * i * i);
	        context.strokeStyle = "rgb(" + r + "," + g + "," + b + ")";
	        for (j = 0; j < 2; j++) {
	            context.beginPath();
	            context.moveTo(4 + i + j + 207, 5 - i + 21);
	            context.lineTo(238 + j + i, 53 - i);
	            context.moveTo(4 - i + j + 207, 5 + i + 21);
	            context.lineTo(238 + j - i, 53 + i);
	            context.stroke();
	            if (i < nInt) {
	                context.beginPath();
	                context.moveTo(238 + j - i, 53 + i);
	                context.lineTo(80 + 207, 81 + i * 2 - j + 21);
	                context.moveTo(238 + j + i, 53 - i);
	                context.lineTo(80 + 207, 81 - i * 2 - j + 21);
	                context.stroke();
	            }
	        }
	    }
	    if (OnOff) {
	        context.fillStyle = "rgb(222,214,198)";
	        context.fillRect(92, 273, 20, 14);
	        context.strokeStyle = "rgb(74,82,82)";
	        context.beginPath();
	        context.lineWidth = 2;
	        context.moveTo(92, 274);
	        context.lineTo(113, 274);
	        context.stroke();
	    }
	    context.fillStyle = "rgb(74,82,82)";
	    context.font = '16px bold Serif';
	    context.fillText(Math.round(lambda) + " " + nameL, 54, 60);
	    context.fillStyle = "white";
	    context.fillText("U = " + Math.round(U * 100) / 100 + " " + nameV, 179, 165);
	    context.fillText("I = " + Math.round(Ia * 10) / 10 + " " + nameI, 315, 191);
	    //console.log("imX= "+imX)
	    context.drawImage(creep, imX, imY0);
	}
	//==========================================================================
	function p(k, l) {
	    return ((k - l) > 0 ? k - l : k);
	}
	// ============================================	
	function findC(n, l) {
	    var r = [0, 60, 95, 130, 180, 350];
	    var A = [255, 157, 239];
	    var mu = [680, 549, 441];
	    var s = [40, 35, 24];
	    if (l < 430 || l > 680) return Math.round(A[n] * Math.exp(-Math.pow((l - mu[n]) / s[n] / 2, 2)));
	    var i = 0;
	    while ((l - 400) > r[i + 1]) i++;
	    var k = [
	        [0, 0, 0, 1, 2, 2],
	        [0, 1, 2, 2, -1, 0],
	        [2, 2, -1, 0, 0, 0]
	    ];
	    var Amax = [255, 200, 255];
	    var Amin = 0;
	    switch (k[n][i]) {
	        case 2:
	            return Amax[n];
	        case 1:
	        case -1:
	            return (Amax[n] + Amin + k[n][i] * (Amin - Amax[n])) / 2 + k[n][i] * Math.round((l - 400 - r[i]) * (Amax[n] - Amin) / (r[i + 1] - r[i]));
	        default:
	            return Amin;
	    }
	}
	// ============================================
	function findColor() {
	    for (n = 0; n < 3; n++) rgb[n] = findC(n, lambda);
	}
	// ============================================  
	function fU(u, b) {
	    return 1 / (1 + Math.exp(-u / b));
	}
	// ============================================  
	function getIa(U) {
	    return 25.5 * (1 + 1.95 / AeV[subst]) * nInt * (0.01 + 1 / lambda) * (fU(U, 2) - fU(-Ukr, 2));
	}
	// ============================================  
	function showVA() {
	    if (OnOff) U = 0.2 * (imX0 - imX);
	    else U = 0;
	    Ukr = 1241 / lambda - AeV[subst];
	    if (Ukr > 0 && U > -Ukr) Ia = getIa(U);
	    else Ia = 0;
	    d1.push([U, Ia]);
	    $.plot("#Graph1", [d1], plotParams1);
	    d2.push([16.0 * nInt, Ia]);
	    $.plot("#Graph2", [d2], plotParams2);
	}
	// ============================================	
	function setSubst(n) {
	    if (n < AeV.length) subst = n;
	    showVA();
	}
	// ============================================	
	function setNtext(n) {
	    ntext = n;
	}
	//===========================================
	function getAnsw() {
	    if (ntext < 4 || ntext > 7) return " ";
	    var s = [" мкА", " В", " км/с", " нм"];
	    var answer = 0;
	    switch (ntext) {
	        case 4:
	            answer = getIa(0);
	            break;
	        case 5:
	            answer = -Ukr;
	            break;
	        case 6:
	            if (Ukr > 0) answer = 593 * Math.sqrt(Ukr);
	            break;
	        case 7:
	            answer = 1241 / AeV[subst];
	    }
	    return round_double(answer) + s[ntext - 4];
	}
	// ============================================	
	function setLumen(n) {
	    if (n < 7) nInt = n;
	    scr[1].setValue(nInt * 17);
	    showVA();
	}
	// ============================================	
	function setLambda(n) {
	    if (n < 700) lambda = n;
	    findColor();
	    scr[0].setValue(Math.round((lambda - 100) / 6));
	}
	// ============================================	
	function setU(x) {
	    imX = imX0 - Math.round(x / 0.2);
	    showVA();
	}
	//=====================================================================
	function setProgram(b) {
	    isProgram = b;
	}
	//=====================================================================
	function setNotGraph3(b) {
	    notGraph3 = b;
	}
	//=====================================================================
	function stopT_f_nu() {
	    notGraph3 = true;
	    if (T_f_nuThr != null) {
	        T_f_nuThr = null;
	    }
	}
	//=====================================================================
	function showGr3(ll, y) {
	    var x = 1000.0 / ll;
	}
	//========================================================
	function run() {
	    for (j = 0; j < 8; j++) {
	        setLambda(lambda);
	        U = 0;
	        for (i = 0; i < 25; i++) {
	            setU(U);
	            if (Ia == 0) { showGr3(lambda, Math.abs(U)); break; }
	            U -= 0.2;
	        } // end i
	        lambda += 50;
	    } // end j
	}
	//========================================================
	function round_double(x) {
	    var tmp;
	    if (Math.abs(x) < 0.1) tmp = 1000;
	    else
	    if (Math.abs(x) < 10.0) tmp = 100;
	    else if (Math.abs(x) < 99.99) tmp = 10;
	    else tmp = 1;
	    return Math.round(x * tmp) / tmp;
	}