    var width = 570; // Данные переменные хранят ширину и
    var height = 200; //  высоту апплета
    var isStart = false;
    var isFlash = false;
    var isShowTab = false;
    var isActive = false;
    var sleeptime = 50;
    var htab = 122;
    var d = 0;
    var rcCell = new Array(11);
    var ncell = 1;
    var nold = 1;
    var ytitle = 0;
    var title = ["Периодическая система", "химических элементов"];
    var context;
    var Atimer;

    function init() {
        //  atomH = new Image();
        //  atomH.src = './images/atomH.gif';
        rrr1 = new Image();
        rrr1.src = './images/rrr1.gif';
        tubenH = new Image();
        tubenH.src = './images/tubenH.gif';
        galo = new Image();
        galo.src = './images/galo.gif';
        Canvas1 = document.getElementById('Canvas1');
        //alert("Canvas1= "+Canvas1)
        context = Canvas1.getContext('2d');
        rr = new MyRect()
        HD = refObj("hyd");
        HD.addEventListener("mousedown", function(e) {
            var mouse = {
                    x: e.clientX - Math.round(HD.getBoundingClientRect().left),
                    y: e.clientY - Math.round(HD.getBoundingClientRect().top)
                }
                // alert("init mouse.x= "+mouse.x+" mouse.y= "+mouse.y);	
            if (isShowTab) {
                for (i = 0; i < 11; i++)
                    if (rcCell[i].contains(mouse.x, mouse.y)) {
                        if (i < 9) StrZ = String(i + 1);
                        else StrZ = String(i);
                        formOk();
                        console.log("up StrZ= " + StrZ);
                        return;
                    }
            }
        }, false);
        HD.addEventListener("mousemove", function(e) {
            var mouse = {
                x: e.clientX - Math.round(HD.getBoundingClientRect().left),
                y: e.clientY - Math.round(HD.getBoundingClientRect().top)
            }
            if (isShowTab) {
                for (i = 0; i < 11; i++)
                    if (rcCell[i].contains(mouse.x, mouse.y)) {
                        //console.log("init mousemove mouse.x= "+mouse.x+" mouse.y= "+mouse.y+" i= "+i+" ncell= "+ncell);	
                        ncell = i + 1;
                        if (ncell == nold) return;
                        //console.log("ncell = "+ncell+" nold = "+nold);
                        nold = ncell;
                        paint();
                    }
            }
        }, false);
        atomH.onload = function() {
                paint();
            }
            //		CreateTab();
    }

    //==========================================================================
    function paint() {
        context.drawImage(atomH, 0, 0);
        if (isStart) context.drawImage(galo, 411, 11);
        if (isFlash) {
            context.drawImage(tubenH, 451, 20);
            context.drawImage(rrr1, 113, 51);
        }
        if (isStart) {
            context.fillStyle = "black";
            context.fillRect(114, 49, 15, 7);
            context.strokeStyle = "rgb(0,173,173)";
            context.lineWidth = 1;
            context.beginPath();
            context.moveTo(114, 55);
            context.lineTo(128, 55);
            context.stroke();
            drawLight();
        }
        if (isShowTab) {
            CreateTab();
            CreateCell(ncell, height - htab, true);
            //		OS.offscreenGC.drawImage(OS_tab.offscreenImage, 0, height-htab, null);
            //		CreateCell(OS.offscreenGC, ncell, height-htab, true);
        }
    }
    //==========================================================================
    function drawLight() {
        context.strokeStyle = "lightGray";
        var dashList = [8, 8]; // Create a dot/dash sequence    
        context.lineWidth = 2;
        context.setLineDash(dashList);
        context.lineDashOffset = d; // Animate the lines
        context.beginPath();
        context.moveTo(365 - d, 86);
        context.lineTo(425 + d, 86);
        //	vlib.DrawDashedLineH( g,365-d,425+d,86,Color.lightGray );
        context.beginPath();
        context.moveTo(313, d);
        context.lineTo(313, 37 - d);
        context.setLineDash([]);
        //	vlib.DrawDashedLineV( g,313,d,37-d,Color.lightGray );
        context.beginPath();
        context.moveTo(365, 86);
        context.lineTo(311, 83);
        context.moveTo(311, 83);
        context.lineTo(313, 37);
        context.stroke();
        //d++;
        d = (d + 1) % 4;
    }
    //==========================================================================
    function startM() {
        isStart = true;
        Atimer = setInterval(run, 50);
        /*	if (workThread == null)
        	{
        		workThread = new Thread(this);
        		workThread.start();
        	}*/
        //repaint();
    }
    //==========================================================================
    function stopM() {
        isStart = false;
        isFlash = false;
        clearInterval(Atimer);
        paint();
    }
    //==========================================================================
    function run() {
        isFlash = !isFlash;
        paint();
    }
    //========================================================
    function stop() {
        //	stopM();
    }
    //========================================================
    function CreateCell(number, y0, isActiv) {
        var signZ = [" H", "He", "Li", "Be", " B", " C", " N", " O", " F", "  ", "Ne",
            "Na", "Mg", "Al", "Si", " P", " S", "Cl", "  ", "Ar"
        ];
        var signA = ["1.01", "4.00", "6.94", "9.01", "10.8", "12.0", "14.0",
            "16.0", "19.0", "    ", "20.2", "23.0", "24.3", "27.0",
            "28.1", "31.0", "32.1", "35.4", "    ", "40.0"
        ];
        var w = width / 9;
        var h = htab / 3;
        var BkColor;
        switch (number) {
            case 10:
            case 19:
                BkColor = "rgb(152,234,218)";
                break;
            default:
                if (isActiv) BkColor = "rgb(255,80,90)";
                else BkColor = "rgb(80,80,255)";
        }
        var delta1 = 0;
        var xc1, yc1;
        var StrZ = "";
        if (number < 10) StrZ = String(number);
        else if ((number > 10) && (number < 19)) StrZ = String(number - 1);
        if (number == 20) StrZ = String(number - 2);
        if (number > 2) {
            xc1 = w * ((number - 3) % 9);
            yc1 = y0 + h / 2 + h * Math.floor((1 + (number - 3) / 9)) + 4;
        } else {
            xc1 = (number - 1) * 8 * w;
            yc1 = y0 + h / 2 + 4;
        }
        context.fillStyle = BkColor;
        context.fillRect(xc1, yc1, w - 1, h - 1);
        if ((number < 12) && (!isActiv)) rcCell[number - 1] = new MyRect(xc1, height - htab + yc1, w - 1, h - 1);
        context.strokeStyle = "white";
        context.strokeRect(xc1 + 1, yc1 + 1, w - 2, h - 2);
        context.strokeRect(xc1 + 4, yc1 + 4, w - 8, h - 8);
        context.stroke();
        context.fillStyle = "yellow";
        context.font = '12px bold Courier';
        context.fillText(signZ[number - 1], xc1 + w - 24, yc1 + h / 2 + 4);
        context.fillText(StrZ, xc1 + 9, yc1 + 14);
        context.font = '8px bold Courier';
        context.fillText(signA[number - 1], xc1 + 9, yc1 + h - 7);
    }
    //==========================================================================
    function CreateTab() {
        var num = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];
        var w1 = width / 9;
        var h1 = htab / 6;
        var fontsize = 15;
        context.font = '15px bold Courier';
        //	  Font font = new Font("Courier",Font.BOLD,fontsize);
        //	  OS_tab.offscreenGC.setFont(font);
        //	  FontMetrics fm = OS_tab.offscreenGC.getFontMetrics(font);
        context.fillStyle = "rgb(152,234,218)";
        context.fillRect(0, height - htab, width, htab);
        context.strokeStyle = "white";
        for (i = 0; i < 9; i++) context.strokeRect(i * w1 + 1, height - htab - 1, w1 - 1, h1);
        context.fillStyle = "black";
        for (i = 0; i < 9; i++)
            context.fillText(num[i], (w1 - context.measureText(String(num[i])).width) / 2 + i * w1, height - htab + 16); // String(num[i])
        fontsize = 17;
        context.font = '17px bold Courier';
        for (i = 0; i < 2; i++)
            context.fillText(title[i], (width - context.measureText(String(title[i])).width) / 2, height - htab + 16 + h1 * (i + 1) + ytitle);
        for (i = 1; i < 21; i++) {
            //	  	 if(i==1)isActive = true;else isActive = false;
            CreateCell(i, height - htab, isActive);
        }
    }
    // ============================================
    function setShowTab(b) {
        isShowTab = b;
        paint();
    }
    // ============================================
    MyRect = function(x, y, w, h) {
            this.x = x,
                this.y = y - height + htab,
                this.w = w,
                this.h = h,
                this.contains = function(newX, newY) {
                    //console.log("MyRect x= "+x+" this.y= "+this.y+" newX= "+newX+" newY= "+newY);	
                    return newX > x && newX < x + w && newY > this.y && newY < this.y + h;
                }
        } // end MyRect	
        // ============================================
    function mousePressed(e) {}
    /*/** ============================================  
    public void mouseClicked(MouseEvent e)
    {
    	if(isShowTab){
    		for(int i=0;i<11;i++)
    				if(rcCell[i].contains(e.getX(), e.getY())){	
    formOk				mlib.callJS(this,nameF);
    				return;
    			}
    	}
    }
    public void mouseMoved(MouseEvent e)
    {
    	if(isShowTab){
    		for(int i=0;i<11;i++)
    			if(rcCell[i].contains(e.getX(), e.getY())){
    				ncell = i+1;
    				if(ncell == nold)return;
    //System.out.println("ncell = "+ncell+" nold = "+nold);
    				nold = ncell;
    				repaint();
    			}
    	}
    }*/