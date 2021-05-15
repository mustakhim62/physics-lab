var width5 = 650; // Данные переменные хранят ширину и
var height5 = 70; //  высоту апплета
//AppletContext ac = null;
/*    MyLib mlib = new MyLib();
	VectorLib vlib = new VectorLib();
	frankLib fLib = new frankLib(2);
	Font font;
	offscreenType OS = new offscreenType();
	private Image fon = null;*/
var colorName = "#0E5E9E";
var fonWidth;
var nline = 0;
var colr = new Array(10);
var xline = new Array(10);
var isVisibleF = new Array(10);
var Lleft = [300, 200, 300, 300, 130, 90];
var current_gaz = 0;
var Name = ["УФ область", "ИК", ", нм"];
var context5;

function init5() {
    wb00m = new Image();
    wb00m.src = './images/wb00m.jpg';
    fonWidth = wb00m.width;
    Canvas5 = document.getElementById("Canvas5"); //refObj('Canvas5');
    context5 = Canvas5.getContext('2d');
    //console.log("init5 context5= "+context5)
    setTimeout(paint5(), 500);
}
//==========================================================================
function paint5() {
    //console.log("paint5 context5= "+context5)
    if (context5) {
        context5.fillStyle = "black";
        context5.fillRect(0, 0, width5, height5);
        draw_spectr();

    }
}
//==========================================================================
function draw_spectr() {
    var dashList = [4, 2]; // Create a dot/dash sequence    
    var x400 = 400 - Lleft[current_gaz];
    var x800 = x400 + 400;
    var xi;
    context5.fillStyle = "rgb(156,163,156)";
    context5.fillRect(0, 36, width5, 4);
    context5.drawImage(wb00m, 0, 40);
    for (i = 1; i < 5; i++)
        context5.drawImage(wb00m, i * fonWidth, 40); //		g.copyArea(0,40,fonWidth,30,i*fonWidth,0);
    if (x400 > 84) {
        context5.fillStyle = "rgb(156,66,148)";
        context5.font = '14px bold TimesRoman';
        context5.fillText(Name[0] /*"УФ область"*/ , x400 / 5, 66);
    }
    if (x800 < width - 84) {
        context5.fillStyle = "red";
        context5.fillText(Name[1] /*"ИК"*/ , (width + x800) / 2, 66);
    }
    context5.fillStyle = colorName;
    context5.strokeStyle = colorName;
    for (i = 0; i < 5; i++) {
        xi = x400 + 100 * i;
        context5.beginPath();
        context5.moveTo(xi, 40);
        context5.lineTo(xi, 48);
        context5.stroke();
        context5.fillText(String(400 + 100 * i), xi + 3, 55);
    }
    context5.fillText('\u03bb' + Name[2] /*",нм"*/ , 530, 65);
    for (i = 0; i < nline; i++) {
        //console.log("draw_spectr nline= "+nline+" i= "+i+" colr[i]= "+colr[i]+" isVisibleF[i]= "+isVisibleF[i])
        context5.strokeStyle = colr[i];
        context5.lineWidth = 2;
        if (isVisibleF[i]) {
            context5.beginPath();
            context5.moveTo(xline[i], 3);
            context5.lineTo(xline[i], 33);
            context5.stroke();
        } else {
            context5.setLineDash(dashList);
            context5.beginPath();
            context5.moveTo(xline[i], 3);
            context5.lineTo(xline[i], 33);
            context5.stroke();
            context5.setLineDash([]);
        }
    }
}
//==========================================================================
function setLine(current_gaz, number_line, lambda, cc) {
    this.current_gaz = current_gaz;
    if (lambda > 0) nline = number_line + 1;
    else nline = 0;
    xline[number_line] = lambda - Lleft[current_gaz];
    colr[number_line] = cc;
    //console.log("setLine number_line= "+number_line+" lambda= "+lambda+" cc= "+cc+" colr[number_line]= "+colr[number_line])
    if ((lambda > 400) && (lambda < 800)) isVisibleF[number_line] = true;
    else isVisibleF[number_line] = false;
    paint5();
}