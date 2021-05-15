    var widthS = 75; // Данные переменные хранят ширину и
    var heightS = 180; //  высоту апплета
    var colorRGBfore = ["#A0FFFF", "#0000FF", "#FF2020", "#202020"];
    var colorRGBback = "#FFFFE0";
    //	var ncase=[0,0,0,0];
    var nmax = 27;
    var elemS;
    var contx;
    var no = 0;

    function init5(nk) {
        this.no = nk;
        contx = this['context' + no];
        elemS = document.getElementById('Q' + String(no));
        contx = elemS.getContext('2d');
        contx.clearRect(0, 0, elemS.width, elemS.height);
        contx.fillStyle = "#FFFFE0";
        contx.fillRect(0, 0, widthS, heightS);
    }

    //==========================================================================
    function paint5() {
        var h = 18;
        var w = 24;
        contx.fillStyle = colorRGBfore[no];
        for (i = 0; i < ncase[no]; i++) {
            contx.fillRect(Math.floor(i / 9) * (w + 1), heightS - (i % 9 + 1) * (h + 1), w, h);
        }
    }
    //==========================================================================
    function setN(k) {
        this.no = k;
        elemS = document.getElementById('Q' + String(no));
        contx = elemS.getContext('2d');
        //console.log("setN k= "+k+" ncase[k]= "+ncase[k])
        if (ncase[k] < nmax) ncase[k]++; //init_process()}
        else {
            console.log("setN nmax= " + nmax + " k= " + k + " ncase[k]= " + ncase[k] + " ncase= " + ncase)
            stopNeutron();
            isMove = false;
            clearInterval(Ctimer);
            clearInterval(Btimer);
            clearInterval(Atimer);
            clearInterval(Dtimer);
            paint();
            refObj("text1").disabled = false;
            isStop = true;
        }
        //console.log("setN no= "+no+" ncase= "+ncase)
        paint5();
    }
    //==========================================================================
    function clear() {
        ncase[no] = 0;
        paint5();
    }