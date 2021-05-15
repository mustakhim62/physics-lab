    var widthS = 570; // Данные переменные хранят ширину и
    var heightS = 40; //  высоту апплета
    //	VectorLib vlib = new VectorLib();
    //	levels appL = null;
    //	String nameF=showLambda;
    var nmax = 7;
    var imax = nmax * (nmax - 1) / 2;
    var lambda = new Array(imax);
    var scale = [10, 1, 0.1];
    var xshift = [900, 90, 0];
    var xshift_current, nscaleold;
    var dir = 0;
    var xl = 3;
    var nscale = 2;
    var x0;
    var isMove = false;
    var isActiv = false;
    var n1, n2;
    var Dimension = {
        x: 0,
        y: 0
    }
    var context4;
    var sl = 0;
    var Btimer;

    function initS() {
        Canvas4 = document.getElementById('Canvas4');
        //alert("Canvas1= "+Canvas1)
        context4 = Canvas4.getContext('2d');
        spectr_Hg = new Image();
        spectr_Hg.src = './images/spectr_Hg.jpg';
        x0 = widthS / 2 + 38;
        calculate_lambda();
        xshift_current = xshift[nscale];
        spectr_Hg.onload = function() {
            paintS();
        }
    }

    //==========================================================================
    function paintS() {
        context4.fillStyle = "black";
        context4.fillRect(0, 0, widthS, heightS);
        /*	if(isActiv){
        		draw_lines();
        		showLambda();
        	}*/
        context4.drawImage(spectr_Hg, xshift_current, 0);
        drawPointer();
    }
    //==========================================================================
    function calculate_lambda() {
        var c_R = 91.2; //{ длины волн в нм }
        var i2 = 1;
        var k = 0;
        while (i2 < nmax) {
            for (i = nmax; i > i2; i--) {
                lambda[k] = c_R / (1 / i2 / i2 - 1 / i / i);
                //System.out.println("calculate_lambda k= "+k+" "+String.valueOf( lambda[k]));			
                k++;
            }
            i2++;
        }
    }
    //==========================================================================
    function find_lambda(n1, n2) // n1>n2	
    {
        return lambda[n2 * (2 * nmax + 1 - n2) / 2 - n1];
    }
    //==========================================================================
    function set_lambda(n1, n2) // n1>n2	
    {
        xshift_current = Math.round(lambda[n2 * (2 * nmax + 1 - n2) / 2 - n1] * scale[nscale]) - x0;
        paintS();
    }
    //==========================================================================
    function find_n1_n2(k) //  !!
    {
        var n1;
        var n2 = 1;
        var i = 0;
        while (n2 < nmax) {
            for (n1 = nmax; n1 > n2; n1--) {
                i = n2 * (2 * nmax + 1 - n2) / 2 - n1;
                Dimension.x = n1;
                Dimension.y = n2;
                if (i == k) return Dimension;
            }
            n2++;
        }
        Dimension.x = 0;
        Dimension.y = 0;
        return Dimension;
    }
    //==========================================================================
    function x_lines(i) {
        return Math.round(lambda[i] * scale[nscale]) - xshift_current;
    }
    //==========================================================================
    function draw_lines() {
        var xi;
        for (i = 0; i < imax; i++) {
            xi = x_lines(i);
            if ((xi > xl) && (xi < widthS - xl)) {
                context4.strokeStyle = choice_Color(i);
                //ole.log("draw_lines context4.strokeStyle = "+context4.strokeStyle)	  
                for (j = 0; j < 2; j++) {
                    if ((i > 5) && (i < 11)) {
                        context4.beginPath();
                        context4.moveTo(xi + j, 5);
                        context4.lineTo(xi + j, 36);
                        context4.stroke();
                    } else {
                        var dashList = [4, 2]; // Create a dot/dash sequence    
                        context4.lineWidth = 1;
                        context4.setLineDash(dashList);
                        context4.beginPath();
                        context4.moveTo(xi + j, 5);
                        context4.lineTo(xi + j, 36);
                        context4.stroke();
                        //		  	 vlib.DrawDashedLineV( g,xi+j,36,5,choice_Color(i));
                    }
                    context4.setLineDash([]);
                }
            }
            //System.out.println("end draw_lines x_lines( 0 )= "+x_lines( 0 ));			
        }
    }
    //==========================================================================
    function drawPointer() {
        var xpoints = [x0, x0 + 4, x0 - 4];
        var ypoints = [32, 40, 40];
        context4.fillStyle = "white";
        context4.beginPath();
        context4.moveTo(xpoints[0], ypoints[0]);
        for (var i = 0; i < xpoints.length - 1; i++) {
            context4.lineTo(xpoints[i + 1], ypoints[i + 1]);
        }
        context4.closePath();
        context4.fill();
        //		gc.fillPolygon(xpoints ,ypoints,3);
    }

    function changeScaleS() {
        //System.out.println("begin changeScale nscale= "+nscale);			
        var ntmp = nscale;
        //nscaleold = nscale;
        if (nscale < 2) ntmp++;
        else ntmp = 0;
        setScale(ntmp);
    }

    function setScale(n) {
        console.log("begin setScale xshift_current= " + xshift_current + " n= " + n);
        nscaleold = nscale;
        nscale = n;
        xshift_current = xshift_current + Math.round((scale[nscale] - scale[nscaleold]) *
            (x0 + xshift_current) / (scale[nscaleold]));
        paintS();
        //System.out.println("end setScale xshift_current= "+xshift_current+" nscale= "+nscale);			
    }
    //========================================================
    function setActiv0(b) //boolean b)
    {
        //System.out.println("begin setActiv0 isActiv= "+isActiv);			
        isActiv = b;
        paintS();
        //System.out.println("end setActiv0 isActiv= "+isActiv);			
    }
    //==========================================================================
    function getLambdaD() {
        return Math.round((x0 + xshift_current) / scale[nscale] * 10) / 10;
    }
    //==========================================================================
    function getLambda() {
        //double d = (double)Math.round((double)(x0+xshift_current)/scale[nscale]*10)/10;
        return String(getLambdaD());
    }
    //==========================================================================
    function spectr_move(dir) {
        xshift_current += 2 * dir; // 2*
        refObj("text1").value = xshift_current + 200;
        console.log("spectr_move xshift_current= " + xshift_current)
            /*	if(checkLambda()){
            //alert("spectr_move spectr_stop")
            		spectr_stop();
            		return;
            	}*/
        paintS();
    }
    //==========================================================================
    function check_transition() {
        var xi;
        //	Dimension d;
        //	appL = (levels)ac.getApplet("LV");
        //System.out.println("check_transition appL= "+appL);			
        hideTransition();
        for (i = 0; i < imax; i++) {
            xi = x_lines(i);
            if (Math.abs(xi - x0) < 2) {
                d = find_n1_n2(i);
                setTransition(d.x, d.y, 1); //, choice_Color(i) );
                return;
            }
        }
    }
    //==========================================================================
    function choice_Color(i) {
        //console.log("spectr choice_Color i= "+i)
        switch (i) {
            case 7:
                return "rgb(189,57,173)";
            case 8:
                return "rgb(27,108,225)";
            case 9:
                return "rgb(99,225,211)";
            default:
                if (i < 7) return "rgb(156,66,148)";
                else return "rgb(222,51,20)";
        }
    }
    //==========================================================================
    function checkLambda() {
        return (dir > 0 && getLambdaD() > 4950) || (dir < 0 && getLambdaD() < 89);
    }
    //==========================================================================
    function startMS(dir) {
        this.dir = dir;
        //	if(checkLambda())return;
        Btimer = setInterval(runS, 100);
    }

    function spectr_stop() {
        isMove = false;
        clearInterval(Btimer);
    }
    //==========================================================================
    function runS() {
        if (sl > 10) sl -= 2;
        spectr_move(dir);
        if (sl == 10) spectr_stop();
    }
    //========================================================
    function newLambda() {
        var i = rand(16);
        d = find_n1_n2(i);
        n1 = d.x;
        n2 = d.y;
        return round_double(lambda[i]);
    }
    //========================================================
    function getN1() {
        return n1;
    }
    //========================================================
    function getN2() {
        return n2;
    }
    //==========================================================================
    function setLambda(d) {
        xshift_current = -x0 + Math.round(d * scale[nscale]);
        paintS();
        //	mlib.callJS(this,nameF);
    }
    //======================================================
    function rand(n) {
        return Math.round(n * Math.random());
    }