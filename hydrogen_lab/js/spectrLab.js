    var widthS = 570; // Данные переменные хранят ширину и
    var heightS = 40; //  высоту апплета
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
    var sl = 80;
    var Btimer;
    var spectr;

    function initS() {
        Canvas4 = document.getElementById('Canvas4');
        //alert("Canvas1= "+Canvas1)
        context4 = Canvas4.getContext('2d');
        spectrH2 = new Image();
        spectrH2.src = './images/spectrH2.gif';
        spectrHg2 = new Image();
        spectrHg2.src = './images/spectrHg2.gif';
        spectr = [spectrHg2, spectrH2];
        x0 = widthS / 2 + 38;
        //		calculate_lambda();
        xshift_current = xshift[nscale];
        spectrHg2.onload = function() {
            paintS();
        }
    }

    //==========================================================================
    function paintS() {
        context4.fillStyle = "black";
        context4.fillRect(0, 0, widthS, heightS);
        if (isActiv) context4.drawImage(spectr[i_tube], xshift_current, 0);
        drawPointer();
    }
    //==========================================================================
    function x_lines(i) {
        return Math.round(lambda[i] * scale[nscale]) - xshift_current;
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
        refObj("text1").value = xshift_current + 450;
        //console.log("spectr_move xshift_current= "+xshift_current)
        paintS();
    }

    //==========================================================================
    function startMS(dir) {
        this.dir = dir;
        sl = 80;
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
        if (Math.abs(sl - 10) < 3) spectr_stop();
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