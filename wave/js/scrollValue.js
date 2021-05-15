var minSc = 0;
var maxSc = 100;
var dxSc = 10;
var widthSc = 135;
var heightSc = 20;
var contextSc;
var imX0Sc;
var imXSc;

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
var ObjectArray = [
    new rect(2, 2, 22, 18, 1),
    new rect(widthSc - 23, 2, 22, 18, 2)
];

function red() {
    elemSc = document.getElementById('CanvasSc');
    elemSc.onmouseup = function(e) {
        var mouse = {
            xm: e.clientX - Math.round(elemSc.getBoundingClientRect().left),
            ym: e.clientY - Math.round(elemSc.getBoundingClientRect().top)
        }

        // перебор всех игровых объектов с вызовом 
        // обработчика onclick для каждого из них

        for (var i = 0; i < ObjectArray.length; i++) {
            ObjectArray[i].handleClick(mouse);
        }
    };
}

function opp(a) {
    var nValue; // для отладки
    switch (a) {
        case 2:
            if (imXSc < widthSc - 56) imXSc += 5;
            nValue = Math.round(50 + 0.5 * (imXSc - imX0Sc));
            change_U(nValue);
            break;
        case 1:
            if (imXSc > imX0Sc) imXSc -= 5;
            nValue = Math.round(50 + 0.5 * (imXSc - imX0Sc));
            change_U(nValue);
            break;
    }
    //	if(a==1)imX++;
    paintSc();
}

function initSc() {
    crawl = new Image();
    crawl.src = './images/crawl.gif';
    imHeight = crawl.height;
    imWidth = crawl.width;
    imX0Sc = imWidth - 1;
    imXSc = imX0Sc;
    left_right0m = new Image();
    left_right0m.src = './images/left_right0m.gif';
    left_right2m = new Image();
    left_right2m.src = './images/left_right2m.gif';
    var elem = document.getElementById('CanvasSc');
    contextSc = elem.getContext('2d');
    setTimeout("paintSc()", 100)
}

function paintSc() {
    contextSc.fillStyle = "rgb(222,214,198)";
    //	context.fill(); 
    contextSc.fillRect(0, 0, widthSc, heightSc);
    contextSc.drawImage(left_right0m, 2, 2);
    contextSc.drawImage(crawl, imXSc, 4);
    contextSc.drawImage(left_right2m, widthSc - 23, 2);
    contextSc.strokeStyle = "rgb(115,115,115)";
    contextSc.lineWidth = 3;
    contextSc.beginPath();
    contextSc.moveTo(23, 2);
    contextSc.lineTo(widthSc - 23, 2);
    contextSc.moveTo(23, 19);
    contextSc.lineTo(widthSc - 23, 19);
    contextSc.stroke();

}
// ============================================  
// adjustmentValueChanged
// ============================================
function ValueChanged() {
    /*	int nValue;        
    	if(e.getSource() instanceof Scrollbar)
        {           
    	  nValue = e.getValue();
    	mlib.callJScript(this,nameF,String.valueOf(nValue),"");
    	} */
}