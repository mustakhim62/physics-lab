var n_digits = 4;
var jc = 1;
var np = 250;
var d = [0, 0, 0, 0];
//var isCount = true;
var d1 = [0, 0, 0, 0];
var x0 = 5;
img_digitA = new Image();
img_digitA.src = './images/digits_green.gif';
var elem = document.getElementById('Canvas2');
var Nx;
var cont2;

function init_count_angle() {
    //alert("init_count_angle")
    var elem = document.getElementById('Canvas2');
    //  alert("elem= "+elem)
    if (!elem) return;
    cont2 = elem.getContext('2d');
    cwidth = 100;
    cheight = 35;
    cont2.fillStyle = "#aaaaaa";
    cont2.fillRect(x0, 0, cwidth, cheight);
    for (i = 0; i < 5; i = i + 2) {
        i2 = 2 * i;
        cont2.fillStyle = 'rgb(' + (30 + i * 20) + ',' + (30 + i * 20) + ',' + (30 + i * 20) + ')';
        cont2.fillRect(x0 + i, i, cwidth - i2, 2);
        cont2.fillRect(x0 + i, i, 2, cheight - i2);
        cont2.fillStyle = 'rgb(' + (255 - i * 15) + ',' + (255 - i * 15) + ',' + (255 - i * 15) + ')';
        cont2.fillRect(x0 + i, cheight - i - 2, cwidth - i2, 2);
        cont2.fillRect(x0 + cwidth - i - 2, i, 2, cheight - i2);
    }
    //set_digitsA(0);
}

function drawA() {
    init_count_angle();
    if (!cont2) return;
    for (i = 0; i < 4; i++) {
        cont2.drawImage(img_digitA, d1[i] * 16, 0, 16, 21, x0 + cwidth / 2 - 36 + i * 18, cheight / 2 - 10, 16, 21);
    }
}

function set_digitsA(t) {
    //alert("set_digitsA t="+t)
    var ti = Math.abs(t);
    for (i = 0; i < 4; i++) {
        d1[3 - i] = parseInt(ti % 10);
        ti = ti / 10;
    }
    if (t < 0) d1[0] = 11;
    drawA();
}
//init_count_angle();
//set_digitsA(0);
//========================================================
function count() {
    //alert("isCount= "+isCount+" Nx= "+Nx+" experiment= "+experiment)
    //Nx=CalculateNx( cur_source, number_subst, t, deltaX )
    if (!isCount) return;
    //  refObj("subst").disabled=true;
    change_count();
    isCount = false;
    isStop = false;
    var Npart = Nx / np;
    var N = 0;
    itime = 0;
    timer1 = setInterval(function() {
        itime++;
        k = poidev(Npart);
        N = N + Math.round(k);
        //alert("k= "+k+" N= "+N)   
        set_digits(N);
        // вывод на график
        if (itime == np) {
            clearInterval(timer1);
            change_count();
            isCount = true;
            isStop = true;
            refObj("subst").disabled = false;
            Ngraph = Ngraph = N;
            drawPointXY(angle, Ngraph);
            //if(angle==5)alert("angle= "+angle+" N= "+N)
        }
    }, 50);
}

function StartCount() {
    var sinfi4;
    var constantT_dOmega = 7.81;
    var A0 = 0.1;
    if (ex1) {
        Nx = calc_N(angle, t, nsubst);
        //alert("Nx="+Nx+" angle="+angle+" t="+t+" nsubst="+nsubst+" isCount="+isCount)
        count();
    }
}
//========================================================
function calc_N(f, t, nsubst) {
    this.t = t;
    this.nsubst = nsubst;
    var sinfi4;
    var constantT_dOmega = 7.81;
    var A0 = 0.15;
    var fi_rad;
    if (f == 0) fi_rad = 0.02;
    else fi_rad = Math.PI / 360 * f; // fi/2
    sinfi4 = Math.pow(Math.sin(fi_rad), 4);
    return Math.round(constantT_dOmega * A0 * Z[nsubst] * Z[nsubst] * ro[nsubst] / A[nsubst] * ((f == 0) ? 1 : t) * 1E-6 / sinfi4);
}