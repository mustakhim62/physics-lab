var widthI = 125; // Данные переменные хранят ширину и
var heightI = 30; //  высоту 
var d = [0, 0, 10, 0, 0, 0, 0];
var digits;
var elem;
var n = 0;

function initI() {
    digits_green = new Image();
    digits_green.src = './images/digits_green.gif';
    //  	elem = document.getElementById('CanvasI');
    digits_red = new Image();
    digits_red.src = './images/digits_red.gif';
    //  	elem = document.getElementById('CanvasI');
    digits = [digits_red, digits_green];
}

//==========================================================================
function paintI() {
    //  	elem = document.getElementById('CanvasI'+String(n));
    //  	contextI = elem.getContext('2d'); 
    contextI.clearRect(0, 0, elem.width, elem.height);
    contextI.fillStyle = "#000000";
    contextI.fillRect(0, 0, elem.width, heightI);
    contextI.fillStyle = "lightGray";
    contextI.fillRect(1, 1, elem.width - 2, heightI - 2);
    contextI.fillStyle = "black";
    contextI.fillRect(4, 4, elem.width - 8, heightI - 8);
    for (i = 0; i < 7; i++) contextI.drawImage(digits[n], 16 * d[i], 0, 16, 21, elem.width / 2 - 56 + i * 16, heightI / 2 - 10, 16, 21);
}
//======================================================
function set_digits(n, t) {
    this.n = n;
    //console.log("set_digits n= "+n+" t= "+t)
    elem = document.getElementById('CanvasI' + String(n));
    contextI = elem.getContext('2d');
    var k;
    var tmp, iend, imid;
    if (t < 0) {
        d[0] = 11;
        t = Math.abs(t);
    } else d[0] = 0;
    if (t > 0.01) {
        k = 1000;
        d[3] = 10;
        if (d[0] == 11) iend = 5;
        else iend = 6; // a<0 => показывает |a|<100
        imid = 3; //2
    } else {
        k = 10000;
        d[1] = 0;
        d[2] = 10;
        iend = 4;
        imid = 6;
    }
    for (i = 0; i < iend; i++) {
        tmp = ((i < imid) ? 6 - i : 5 - i);
        d[tmp] = Math.floor(t * k) % 10;
        k = k / 10;
    }
    paintI();
}