    var width = 290; // Данные переменные хранят ширину и
    var height = 200; //  высоту апплета
    var sleeptime = 100;
    var isFoton = false;
    var isExcit = false;
    var isNucl = false;
    var isMove = true;
    var isNeutron = true;
    var isNotEnd = true;
    var process = [0.12, 0.55, 0.96, 1.0];
    var number_process = 1;
    var ncase = [0, 0, 0, 0];
    var faza = 0;
    var dirF = 0;
    var n = 8;
    var nx = 12;
    var m = 12;
    var rad = 4;
    var delx;
    var xn, yn, nshag, count; //,countold;
    var xa = 0;
    var ya = 0;
    var xatom = [];
    var yatom = [];
    var isMoveN = false;
    var xf = 100;
    var yf = 100;
    var elem;
    var context4;
    var ii = 0;
    var dxn, dyn, nstep, delta;
    var dxAtom = [6, 2, 3, 4];
    var dyAtom = [2, 1, 3, 2];
    var nstep_nucl = 5;
    var n, dxa, dya;
    var jatom = 0;
    var Btimer;
    var Ctimer;
    var dxF, dyF;
    var w1 = 30;
    var tr = [];
    var number = 0;
    var colorG = "rgb(210,240,255)";

    function init4() {
        elem = document.getElementById('Canvas4');
        context4 = elem.getContext('2d');
        part_n2 = new Image();
        part_n2.src = './images/part_n2.gif';
        context4.clearRect(0, 0, elem.width, elem.height);
        context4.fillStyle = "#00000";
        context4.fillRect(0, 0, width, height);
    }

    function start() {
        count = 5;
        Atimer = setInterval(paint, 200)
            //	Ctimer=setInterval(run,200);
        run();
        isMoveN = true;
    }
    //==========================================================================
    function paint() {
        context4.clearRect(0, 0, elem.width, elem.height);
        context4.fillStyle = "#000000";
        context4.fillRect(0, 0, width, height);
        drawCrystal();
        //console.log("paint isExcit= "+isExcit+" xa= "+xa+" ya= "+ya)		
        if (isExcit) {
            context4.beginPath();
            context4.strokeStyle = "white";
            context4.arc(xn, yn, 4, 0, 2 * Math.PI, true);
            context4.stroke();
            isMoveN = false;
            //		OS.offscreenGC.fillOval(xa,ya,13,13);
            isExcit = false;
        }
        if (isMoveN) {
            context4.beginPath();
            context4.fillStyle = "yellow";
            context4.strokeStyle = "yellow";
            context4.arc(xn, yn, 2, 0, 2 * Math.PI, true);
            context4.fill();
            context4.stroke();
        }
        //console.log("paint isNucl= "+isNucl)
        if (isNucl)
            for (i = 0; i < 2; i++) {
                context4.drawImage(part_n2, 5 * i, 0, 5, 11, xatom[i], yatom[i], 5, 11);

            }
        if (isFoton) {
            console.log("paint yf= " + yf)
            imageGamma(number, xf, yf, faza, colorG)
            faza = (faza++) % 2;
        }
    }
    //======================================================================
    function drawCrystal() {
        var c = ["rgb(0,0,150)", "blue"];
        delx = width / nx;
        var dx, dy;
        for (i = 0; i < nx; i++)
            for (j = 0; j < nx * 2; j++) {
                dx = 1 * (rand(3) - 1);
                dy = 1 * (rand(3) - 1);
                context4.beginPath();
                context4.fillStyle = c[(i + j) % 2];
                context4.arc(delx / 2 + i * delx + dx, delx / 2 + j * delx + dy, 4, 0, 2 * Math.PI, true);
                context4.fill()
                context4.strokeStyle = "gray";
                context4.arc(delx / 2 + i * delx + dx, delx / 2 + j * delx + dy, 4, 0, 2 * Math.PI, true);
                context4.stroke();
            }
    }
    //======================================================
    function startM() {
        for (i = 0; i < 4; i++) ncase[i] = 0;
        isMove = true;
        isNotEnd = true;
    }

    function stop() {
        //System.out.println("Stop");
        isNotEnd = false;
        isNucl = false;
        isFoton = false;
        isExcit = false;
        //	paint();
    }

    //=====================================================================
    function CheckRange(x, xmin, xmax) {
        if ((x < xmin) || (x > xmax)) return true;
        else return false;
    }

    function init_process() {
        var p;
        p = Math.random();
        number_process = 0;
        do
            number_process++;
        while (p > process[number_process - 1]);
        //alert("init_process number_process=" +number_process)  
        //  number_process=1; // для отладки
    }

    function dir() {
        return 1 - 2 * rand(2);
    }

    function imageGamma(number, x0, y0, faza, colorGamma) {
        var a = 30; // number = 1 ... 4
        var x00 = 0; // faza = 0, 1
        var y00 = 0;
        var h = 3;
        var sinfi, cosfi;
        var tmp = Math.sqrt(2);
        var xfi = 0;
        var yfi = 0;
        var y = 0;
        var k = Math.PI / 4;
        var fi = k * (2 * number - 1);
        sinfi = Math.sin(fi);
        if (sinfi > 0) y00 = a;
        cosfi = Math.cos(fi);
        if (cosfi < 0) x00 = a;
        context4.strokeStyle = colorGamma; //"rgb(210,240,255)";
        console.log("imageGamma x0= " + x0 + " y00= " + y00)
        context4.beginPath();
        for (i = 0; i < a + 8; i++) {
            y = Math.round(h * Math.sin(k * i + Math.PI * faza));
            xfi = x0 + x00 + Math.round(i * cosfi + y * sinfi);
            yfi = y0 + y00 - Math.round((i) * sinfi - y * cosfi);
            context4.moveTo(xfi, yfi);
            context4.lineTo(xfi + 1, yfi);
        }
        context4.stroke();
        PrepareArrow(x0 + x00 + Math.round((a + 9) * cosfi), y0 + y00 - Math.round((a + 9) * sinfi), fi, colorGamma)
            //	  PrepareArrow( xfi-5, yfi+5, fi, "white" )
            //    g.fillPolygon(vlib.PrepareArrow( x0+x00+Math.round((a+9)*cosfi),y00-Math.round((a+9)*sinfi),fi ));
    }
    //========================================================
    function PrepareArrow(x0, y0, alfa, clor) {
        var cosa, sina;
        var acos, asin, bsin, bcos;
        var a = 12;
        var b = 4;

        cosa = Math.cos(alfa);
        sina = Math.sin(alfa);

        acos = Math.round(a * cosa);
        asin = Math.round(a * sina);
        bcos = Math.round(b * cosa);
        bsin = Math.round(b * sina);
        tr = [];
        tr.push([x0, y0]);
        tr.push([x0 - bsin - acos, y0 - bcos + asin]);
        tr.push([x0 + bsin - acos, y0 + bcos + asin]);
        context4.fillStyle = clor;
        context4.beginPath();
        //alert("tr= "+tr)    
        context4.moveTo(tr[0][0], tr[0][1]);
        context4.lineTo(tr[1][0], tr[1][1]);
        context4.lineTo(tr[2][0], tr[2][1]);
        context4.fill();
    }
    ///*********************************

    function stopNeutron() {
        //alert("stopNeutron")
        //	isMove = false;
        isNotEnd = true;
        isNucl = false;
        isFoton = false;
        isExcit = false;
        clearInterval(Btimer)
        isMoveN = false;
        /*	if(workThr != null){	//30.06
        		workThr = null;
        	}*/
    }

    function MoveOnOff(b) {
        isMoveN = b;
    }

    function MoveNuclearOnOff(b) {
        isNucl = b;
        //console.log("MoveNuclearOnOff isNucl= "+isNucl)
    }

    function MoveFotonOnOff(b) {
        isFoton = b;
    }

    function FotonFaza(f) {
        dirF = f;
    }
    /*function ncaseI(int i){
       return ncase[i];
    }*/
    function answer(ntask) {
        var answ = 0;
        //alert("answer ntask= "+ntask)
        if (ncase[0] > 0) {
            switch (ntask - 3) {
                case 1:
                    answ = (ncase[1] + ncase[2]) / ncase[0];;
                    break;
                case 2:
                    answ = (ncase[2]) / ncase[0];
                    break;
                case 3:
                    answ = 2;
                    break;
                case 4:
                    answ = (ncase[3] * 100) / (ncase[0] + ncase[1] + ncase[2] + ncase[3]);
            } // switch
        } // if
        else return "";
        //alert("answer answ= "+round_double(answ))
        return round_double(answ);
    }

    //========================================================
    function initXY_neutron() {
        delta = delx;
        xn = 150;
        yn = 100 + 4 * rand(4);
        //  InitDir_and_Length();
        MoveOnOff(true);
        nstep = 2;
        dxn = 8;
        ii = 0;
    }

    function InitDir_and_Length() {
        do {
            dxn = 4 * rand(3) * dir();
            dyn = 2 * rand(3) * dir();
        }
        while ((dxn == 0) && (dyn == 0));
        nstep = 3 + rand(4);
        //  alert("InitDir_and_Length nstep= "+nstep)
    }

    function defineNuclear(x) {
        var i = (x - delta / 2) / delta;
        var dx = (x - delta / 2) % delta;
        if (dx > delta / 2) i++;
        return delta / 2 + i * delta;
    }

    function move_n() {
        //console.log("move_n nstep= "+nstep+" isMoveN= "+isMoveN+" n= "+n+" count= "+count+" xn= "+xn+" yn= "+yn)
        xn += dxn;
        yn += dyn;
        n++;
        if (n == count) {
            clearInterval(Btimer);
            xf = xn;
            yf = yn;
            init_process();
            dispatcher()
        }
        if (CheckRange(xn, 1, width - 8)) {
            if (number_process < 4) {
                dxn = -dxn;
                xn += dxn;
            } else {
                n = count;
                return;
            }
        }
        if (CheckRange(yn, 1, height - 8)) {
            if (number_process < 4) {
                dyn = -dyn;
                yn += dyn;
            } else {
                n = count;
                return;
            }
        }
        /*   try {Thread.sleep(appR.sleeptime);}//**
           catch (InterruptedException e) {
        		System.out.println(e.toString());
        		stop();   }*/
        //}
    }

    function run_n() {
        n = 0;
        initXY_neutron();
        InitDir_and_Length();
        //    	clearInterval(Btimer);
        Btimer = setInterval(move_n, 200);
        //console.log("run_n nstep= "+nstep+" n= "+n+" count= "+count+" isMoveN= "+isMoveN+" Btimer= "+Btimer+" xn= "+xn+" yn= "+yn)
    }

    function run() {
        //    n = 0;
        //    initXY_neutron();
        init_process();
        console.log("run number_process= " + number_process)
        run_n();
        //    do{
        //    	InitDir_and_Length();
        //    	Btimer=setInterval(move_n,200);
        //    	n++;
        console.log("run n= " + n)
            //    }
            //    while (n <= count);
    }

    function dispatcher() {
        if (!isMove) return;
        xa = defineNuclear(xn);
        ya = defineNuclear(yn);
        //initXY();
        if (number_process < 4) {
            isExcit = true;
            paint();
        }
        //  console.log("dispatcher isExcit= "+isExcit)

        switch (number_process) {
            case 1:
                setN(0);
                colorG = "rgb(210,240,255)";
                console.log("dispatcher xn= " + xn + " yn= " + yn)
                initFoton();
                break;
            case 2:
                setN(1);
                colorG = "rgb(135, 206, 250)";
                initFoton();
                break;
            case 3:
                setN(2);
                run_nucl(); //  alert("dispatcher");
                break;
            case 4:
                isNeutron = true;
                setN(3);
                setTimeout(run_n, 200);
                break;
            default:
        }
    }
    //========================================================
    function initXY_nuclear() {
        MoveOnOff(false);
        for (i = 0; i < 2; i++) {
            xatom[i] = xn;
            yatom[i] = yn;
        }
        var n = rand(3);
        dxa = dxAtom[n];
        dya = dyAtom[n];
        console.log("initXY_nuclear n= " + n + " dxa= " + dxa + " dya= " + dya);
        jatom = 0;
        nstep_nucl = 5;
    }

    function move_nucl() {
        for (i = 0; i < 2; i++) {
            xatom[i] += (2 * i - 1) * dxa;
            yatom[i] += (2 * i - 1) * dya;
        }
        jatom++;
        //console.log("move_nucl jatom= "+jatom+" isNucl= "+isNucl+" nstep_nucl= "+nstep_nucl+" xatom[1]= "+xatom[1]+" yatom[1]= "+yatom[1])
        if (jatom > nstep_nucl) {
            clearInterval(Ctimer)
            MoveNuclearOnOff(false);
            MoveOnOff(true);
            isNeutron = true;
            run_n();
        }
    }

    function run_nucl() {
        initXY_nuclear();
        MoveNuclearOnOff(true);
        console.log("run_nucl isNucl= " + isNucl)
        Ctimer = setInterval(move_nucl, 200);
    }
    //========================================================
    function initFoton() {
        var dx0 = 6;
        var dy0 = 6;
        dirF = rand(3); // для отладки
        FotonFaza(dirF);
        switch (dirF) {
            case 0:
                dxF = dx0;
                dyF = -dy0;
                number = 5;
                break;
            case 1:
                dxF = -dx0;
                dyF = -dy0;
                number = 2;
                break;
            case 2:
                dxF = -dx0;
                dyF = dy0;
                number = 3;
                break;
            case 3:
                dxF = dx0;
                dyF = dy0;
                number = 4;
                break;
            default:
                dxF = 0;
                dyF = 0;
        }
        xf = xn - ((dxF > 0) ? 0 : 30);
        yf = yn - ((dyF > 0) ? 0 : 30);
        console.log("initFoton dirF= " + dirF + " xf= " + xf + " yf= " + yf)
        MoveFotonOnOff(true);
        Dtimer = setInterval(runF, 200);
    }

    function runF() {
        xf += dxF;
        yf += dyF;

        if ((xf > width) || (xf < -24) || (yf < -24) || (yf > height)) {
            clearInterval(Dtimer);
            MoveFotonOnOff(false);
            setTimeout(run_n, 200);
            isNeutron = true;
        }
    }
    //========================================================