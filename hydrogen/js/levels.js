    var widthL = 150;
    var heightL = 356;
    //    ShowTextsH appS;
    var ylevel = new Array();
    var ynotice = new Array();
    var Z;
    var x0L = 30;
    var n1L;
    var n2L;
    var isShow;
    var currentColor;
    //    Image imPointer;
    var imHeightL;
    var imWidthL;
    //Rectangle rcImage;
    var bBeginDrag;
    var isPointer;
    var isNotice;
    var isColor;
    var nColor;
    var imX0;
    var imY0;
    var imY;
    var dyL;
    var isLevel;
    //    String nameF;
    var nameEV = "эВ";
    var contextL;
    var Canvas3;

    function setTransition(i, j, k) {
        Z = k;
        setTransitionL(i, j);
    }

    function setTransitionL(i, j) {
        //console.log("setTransitionL Z= "+Z)
        n1L = i;
        n2L = j;
        currentColor = Z != 1 ? "lightGray" : choice_ColorL(i, j);
        isColor = false;
        isShow = true;
        paintL();
    }

    function ShowTransition(i, color) {
        var d = 1.5707963267948966;
        if (n2L < n1L)
            d = 3 * d;
        contextL.strokeStyle = color;
        contextL.lineWidth = 1;
        if (n2L == 2) {
            contextL.beginPath();
            contextL.moveTo(i, ylevel[n1L - 1]);
            contextL.lineTo(i, ylevel[n2L - 1]);
            contextL.stroke();
        } else {
            var dashList = [4, 2]; // Create a dot/dash sequence    
            contextL.lineWidth = 1;
            contextL.setLineDash(dashList);
            contextL.beginPath();
            contextL.moveTo(i, ylevel[n1L - 1]);
            contextL.lineTo(i, ylevel[n2L - 1]);
            contextL.stroke();
            contextL.setLineDash([]);
            //            vlib.DrawDashedLineV(g, i, ylevel[n1 - 1], ylevel[n2 - 1], color);
        }
        tt = PrepareArrow(i, ylevel[n2L - 1], d);
        drawPoly(contextL, tt, color);
        //        g.fillPolygon(vlib.PrepareArrow(i, ylevel[n2 - 1], d));
    }

    function hideTransition() {
        isShow = false;
        paintL();
    }

    function CalculateYlevel() {
        var d = 0.02;
        var byte0 = 20;
        var byte1 = 10;
        ylevel[0] = (byte0 + heightL) - 29;
        var i = 1;
        do {
            ylevel[i] = byte0 + Math.round(13.6 / (i + 1) / (i + 1) / d);
        }
        while (++i < 9);
        ynotice[8] = ylevel[8];
        ynotice[0] = ylevel[0] - 3;
        i = 7;
        do
            if (ynotice[i + 1] + byte1 < ylevel[i])
                ynotice[i] = ylevel[i];
            else
                ynotice[i] = ynotice[i + 1] + byte1;
        while (--i > 0);
    }

    function keyPressed(e) {
        var code = e.keyCode;
        switch (code) {
            case 38: //
                if (imY + dyL > ylevel[8])
                    imY--;
                if (imY + dyL == height - 64)
                    imY -= 18;
                break;

            case 40: // '('
                if (imY + imHeightL / 2 + dyL < ylevel[0])
                    imY++;
                if (imY + dyL == height - 82)
                    imY += 18;
                break;
        }
        showE();
        //        mlib.callJS(this, nameF);
        paintL();
    }

    function paintL() {
        var tr = [
            [30, 5],
            [34, 17],
            [26, 17]
        ];
        contextL.fillStyle = "black";
        contextL.fillRect(0, 0, widthL, heightL);
        ShowEnergy();
        drawPoly(contextL, tr, "yellow");
        if (isNotice) {
            var i = 0;
            contextL.strokeStyle = "yellow";
            contextL.lineWidth = 1;
            do {
                if (ynotice[i] > ylevel[i]) {
                    contextL.beginPath();
                    contextL.moveTo(widthL - 55, ylevel[i]);
                    contextL.lineTo(widthL - 44, ynotice[i]);
                    contextL.stroke();
                }
                //                    OS.offscreenGC.drawLine(width - 55, ylevel[i], width - 44, ynotice[i]);
                contextL.fillStyle = "yellow";
                if (i < 8)
                    contextL.fillText(nameLevel(i), widthL - 37, ynotice[i] + 3);
            } while (++i < 9);
        }
        if (isPointer) {
            contextL.drawImage(pointer1, imX0, imY + dyL);
            //            rcImage = new Rectangle(imX0, imY + dy, imHeight, imWidth);
        }
        if (isShow)
            ShowTransition(x0L + 20, currentColor);
    }

    function choice_ColorL(i, j) {
        //console.log("levels choice_ColorL n1= "+i+" n2= "+j)
        switch (j) {
            case 1: // '\001'
                return "rgb(156, 66, 148)";

            case 2: // '\002'
                switch (i) {
                    case 7: // '\007'
                        return "rgb(156, 66, 148)";

                    case 6: // '\006'
                        return "rgb(189, 57, 173)";

                    case 5: // '\005'
                        return "rgb(27, 108, 225)";

                    case 4: // '\004'
                        return "rgb(99, 225, 211)";
                }
                break;
        }
        return "rgb(222, 51, 20)";
    }

    function nameLevel(i) {
        if (ntext == 9) Z = Zh9;
        return String(round_double((-13.6 * Z * Z) / (i + 1) / (i + 1))); //(double)
    }

    function changeColor(i) {
        nColor = i - 1;
        isColor = true;
        paintL();
    }

    function setNotice(flag) {
        isNotice = flag;
        isPointer = !flag;
        //        if(isPointer) showE();
        paintL();
    }

    function init() {
        eV = new Image();
        eV.src = './images/eV.gif'; //Image1
        pointer1 = new Image();
        pointer1.src = './images/pointer1.gif'; // Image2
        imHeightL = pointer1.height;
        imWidthL = pointer1.width;
        imX0 = x0L - imWidthL - 1;
        imY0 = heightL / 6;
        imY = imY0;
        ylevel = new Array(9);
        ynotice = new Array(9);
        Z = 1;
        x0L = 30;
        n1L = 4;
        n2L = 2;
        isShow = false;
        bBeginDrag = false;
        isPointer = true; //false; для отладки
        isNotice = true;
        isColor = false;
        dyL = 0;
        isLevel = false;
        CalculateYlevel();
        //        rcImage = new Rectangle(imX0, imY0, imWidthL, imHeightL);
        Canvas3 = document.getElementById('Canvas3');
        //alert("Canvas1= "+Canvas1)
        contextL = Canvas3.getContext('2d');
        Canvas3.tabIndex = 1000;
        refObj("levels").addEventListener("keyup", keyPressed, false);
        LS = refObj("levels");
        LS.addEventListener("mousedown", function(e) {
            var mouse = {
                x: e.clientX - Math.round(LS.getBoundingClientRect().left),
                y: e.clientY - Math.round(LS.getBoundingClientRect().top)
            }
            if (mouse.x > imX0 && mouse.x < imX0 + imWidthL && mouse.y > imY + dyL && mouse.y < imY + dyL + imHeightL) {
                bBeginDrag = true;
                dyL = +imY - mouse.y + dyL;
            } else bBeginDrag1 = false;
        }, false);
        LS.addEventListener("mousemove", function(e) {
            var newY = e.clientY - Math.round(LS.getBoundingClientRect().top);
            //====================
            if (bBeginDrag && newY > 20 /*ylevel[8]*/ && imY < heightL) {
                if (newY < 20 /*ylevel[8] - dyL*/ )
                    imY = 20 /*ylevel[8] - dyL*/ ;
                else
                if (newY + imHeightL / 2 + dyL > ylevel[0])
                    imY = ylevel[0] - imHeightL / 2 - dyL;
                else
                    imY = newY;
                // showLambda            mlib.callJS(this, nameF);
                showE();
                paintL();
            }
            //======================
        }, false);
        LS.addEventListener("mouseup", function(e) {
            bBeginDrag = false
        }, false);
    }

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
        // Задаем цвет 
        //context.fillStyle = "darkGray";
        //context.lineWidth=1;
        //context.stroke();
    }

    function getE() {
        var s = "E = ";
        var i = 0;
        do {
            //console.log("getE() i= "+i+" imY + dyL + imHeightL / 2= "+(imY + dyL + imHeightL / 2)+" ylevel[i]= "+ylevel[i]);
            if (Math.round(imY + dyL + imHeightL / 2) == ylevel[i])
                s += nameLevel(i) + " " + nameEV;
        }
        while (++i < 9);
        return s;
    }

    function ShowEnergy() {
        //alert("ShowEnergy x0L= "+x0L)
        var byte0 = 56;
        var byte1 = 20;
        contextL.strokeStyle = "yellow";
        contextL.beginPath();
        contextL.moveTo(x0L, 10);
        contextL.lineTo(x0L, heightL - 75);
        //		contextL.moveTo(x0L, heightL - 75);
        contextL.lineTo(x0L - 4, heightL - 69);
        //		contextL.moveTo(x0L - 4, heightL - 69);
        contextL.lineTo(x0L + 8, heightL - 63);
        //		contextL.moveTo(x0L + 8, heightL - 63);
        contextL.lineTo(x0L, heightL - 57);
        //		contextL.moveTo(x0L, heightL - 57);
        contextL.lineTo(x0L, heightL - 5);
        contextL.stroke();
        //        g.drawLine(x0, 10, x0, heightL - 75);
        //        g.drawLine(x0, heightL - 75, x0 - 4, heightL - 69);
        //        g.drawLine(x0 - 4, heightL - 69, x0 + 8, heightL - 63);
        //        g.drawLine(x0 + 8, heightL - 63, x0, heightL - 57);
        //        g.drawLine(x0, heightL - 57, x0, heightL - 5);
        //        contextL.fillPolygon(vlib.PrepareArrow(x0, 10, 1.5707963267948966D));
        contextL.drawImage(eV, 5, 100);
        contextL.fillStyle = "lightGray";
        contextL.fillRect(x0L + 6, byte1 - 10, widthL - byte0 - 28, 10);
        contextL.strokeStyle = "white";
        var i = 0;
        do {
            contextL.beginPath();
            contextL.moveTo(x0L + 8, ylevel[i]);
            contextL.lineTo(widthL - byte0, ylevel[i]);
            contextL.stroke();
            //            g.drawLine(x0 + 8, ylevel[i], widthL - byte0, ylevel[i]);
        } while (++i < 9);
        contextL.fillStyle = "white";
        contextL.fillText("0.0", widthL - 37, byte1 + 2);
        if (isColor) {
            contextL.strokeStyle = "red";
            contextL.beginPath();
            contextL.moveTo(x0L + 8, ylevel[nColor]);
            contextL.lineTo(widthL - byte0, ylevel[nColor]);
            contextL.stroke();
            //            g.drawLine(x0 + 8, ylevel[nColor], widthL - byte0, ylevel[nColor]);
        }
    }
    //==========================================================================
    function round_double(x) {
        var tmp;
        if (Math.abs(x) < 0.1) tmp = 1000;
        else
        if (Math.abs(x) < 10.0) tmp = 100;
        else if (Math.abs(x) < 99.99) tmp = 10;
        else tmp = 1;
        return Math.round(x * tmp) / tmp;
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