var gliset = true;
var glgset = 0;

function gammln(xx) {
    var stp = 2.50662827465;
    var half = 0.5;
    var one = 1.0;
    var fpf = 5.5;
    var cof = [76.18009173, -86.50532033, 24.01409822, -1.231739516, 0.120858003E-2, -0.536382E-5];
    var x, tmp, ser;
    x = xx - one;
    tmp = x + fpf;
    tmp = (x + half) * Math.log(tmp) - tmp;
    ser = one;
    for (j = 0; j < 6; j++) {
        x += one;
        ser += cof[j] / x;
    }
    return tmp + Math.log(stp * ser);
}
//==========================================================================
function poidev(xm) {
    var gloldm = -1.0;
    var glsq = 0;
    var glalxm = 0;
    var glg = 0;
    var em, t, y, ytmp;
    if (xm < 12.0) {
        if (xm != gloldm) {
            gloldm = xm;
            glg = Math.exp(-xm);
        }
        em = -1;
        t = 1.0;
        do {
            em += 1.0;
            t = t * Math.random();
        }
        while (t > glg);
    } //if (xm<12.0)
    else {
        if (xm != gloldm) {
            gloldm = xm;
            glsq = Math.sqrt(2.0 * xm);
            glalxm = Math.log(xm);
            glg = xm * glalxm - gammln(xm + 1);
        }
        do {
            do {
                y = Math.PI * Math.random();
                ytmp = Math.abs(y - Math.PI / 2);
                if (ytmp > 1E-10) y = Math.sin(y) / Math.cos(y);
                else y = 1E10;
                em = glsq * y + xm;
            }
            while (em < 0);
            em = Math.floor(em);
            ytmp = em * glalxm - gammln(em + 1) - glg;
            if (Math.abs(ytmp) < 30) ytmp = Math.exp(ytmp);
            else ytmp = 0;
            t = 0.9 * (1.0 + Math.pow(y, 2)) * ytmp;
        }
        while (Math.random() > t);
    }
    return em;
} //poidev
//======================================================
function rand(n) {
    return (n * Math.random());
}
//------------------------------------------------------
function SetNewSource(k) {
    var n;
    var cstmp = new Array();
    n = 1 + mlib.rand(k);
    cstmp[0] = n;
    for (i = 1; i < 4; i++) {
        n += i;
        if (n > k) n -= 7;
        cstmp[i] = n;
    }
    return cstmp;

}
//==========================================================================
function Gauss() {
    var ready = false;
    var second = 0.0;

    this.next = function(mean, dev) {
        mean = mean == undefined ? 0.0 : mean;
        dev = dev == undefined ? 1.0 : dev;

        if (this.ready) {
            this.ready = false;
            return this.second * dev + mean;
        } else {
            var u, v, s;
            do {
                u = 2.0 * Math.random() - 1.0;
                v = 2.0 * Math.random() - 1.0;
                s = u * u + v * v;
            } while (s > 1.0 || s == 0.0);

            var r = Math.sqrt(-2.0 * Math.log(s) / s);
            this.second = r * u;
            this.ready = true;
            return r * v * dev + mean;
        }
    };
}
//======================================================
function Gasdev() {
    var fac, r, v1, v2, gasdev;
    if (gliset) {
        do {
            v1 = 2.0 * Math.random() - 1.0;
            v2 = 2.0 * Math.random() - 1.0;
            r = Math.pow(v1, 2) + Math.pow(v2, 2);
        }
        while (r > 1.0);
        fac = Math.sqrt(-2.0 * Math.log(r) / r);
        glgset = fac * v1;
        gasdev = fac * v2;
    } else gasdev = glgset;
    gliset = !gliset;
    return gasdev;
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