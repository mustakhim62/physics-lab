var width4 = 420; // Данные переменные хранят ширину и
var height4 = 121; //  высоту апплета
var itank = 1;
var xt0 = 5;
var xtF = xt0;
var dx4 = 0;
var yt = 75;
var x04 = 290;
var y04 = 10;
var isStar = false; //true;//
var isExcit = false;
var Utmp4;
var jt = 0;
var context4;
var Ftimer;
var ct = 0;
var imageData, imageData2;
var count = 0;

function init4() {
    atom = new Image();
    atom.src = './images/atom.gif';
    imWidth = atom.width;
    imHeight = atom.height;
    fire_m = new Image();
    fire_m.src = './images/fire_m.gif';
    tank2 = new Image();
    tank2.src = './images/tank2.gif';
    var canvas2 = document.createElement("canvas");
    Canvas4 = refObj('Canvas4');
    context4 = Canvas4.getContext('2d');
    xtF = xt0;
    tank2.onload = function() {
        startF();
    }
}

//==========================================================================
function paint4() {
    context4.fillStyle = "black";
    context4.fillRect(0, 0, width4, height4);
    context4.drawImage(tank2, itank * 87, 0, 87, 40, xtF, yt, 87, 40);
    if (jt == 3) paintAtom();
    else context4.drawImage(atom, x04, y04);
    if (isStar) {
        var xstar = Math.round(40 * Utmp4) + Math.round(Math.random() * 10);
        var rnd = -1 + 2 * Math.round(Math.random());
        xstar = x04 + 60 + rnd * xstar;
        rnd = -1 + 2 * Math.round(Math.random());
        var ystar = Math.round(30 * Utmp4) + Math.round(Math.random() * 6);
        ystar = 60 + rnd * ystar;
        context4.fillStyle = "white";
        context4.font = '15px bold Serif';
        context4.fillText("*", xstar, ystar);
        pause(100);
        xtF = 259 - dx4;
        if (xtF > 140) xtF = 140;
        else itank = 1 - itank;
        context4.drawImage(fire_m, xtF + 87, yt + 7); // fire
        isStar = false;
    }
}
//==========================================================================
function paintAtom() {
    context4.drawImage(atom, x04, y04);
    imageData = context4.getImageData(x04, y04, imWidth, imHeight);
    imageData2 = imageData;
    var pixels = imageData2.data;
    var numPixels = imageData2.width * imageData2.height;
    for (var i = 0; i < numPixels; i++) {
        if (pixels[i * 4 + 1] == 85) pixels[i * 4 + 1] = 255; // Green
        if (pixels[i * 4 + 2] == 85) pixels[i * 4 + 2] = 255;
    };
    context4.clearRect(x04, y04, imWidth, imHeight);
    context4.putImageData(imageData2, x04, y04);
}
//==========================================================================
function setStar(U, dy) {
    Utmp4 = U;
    dx4 = dy;
    isStar = true;
}
//==========================================================================
function onStart() {
    xtF = xt0;
}
//==========================================================================
function startF() {
    ct = 0;
    Ftimer = setInterval("runF()", 50);
}
//==========================================================================
function runF() {
    ct = (ct + 1) % 4;
    if ((jt == 3) && (ct == 0)) jt = 0;
    paint4();
}
//==========================================================================
function setFair() {
    jt = 3;
}

function pause(ms) {
    var date = new Date();
    var curDate = null;
    do { curDate = new Date(); }
    while (curDate - date < ms);
}