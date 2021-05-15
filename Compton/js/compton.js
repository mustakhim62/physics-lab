var width = 400;
var height = 269;
var dir = 1;
//	private Image[] im = new Image[6];
//	private Image[] images = new Image[2];
var graf2, ai, chi, rentg_plant1, detect, dark_tube;
var imHeight, imWidth;
var imX0, imY0;
var teta = 0;
var R;
var R0 = 120;
var xd, yd;
var olddata;
var trad;
var sinT = 0;
var cosT = 1; //	rotate rI=null;
var hnu0, hnu1; //энергии квантов в кэВ
var mc2 = 511; //энергии покоя e в кэВ
var n = new Array(120);
var scaleX = 5; // 5 точек на 0.5 кэВ
var isCount = false;
var isOnOff = false;
var bImagesCreated = false;
var subst = 1;
var ro = [2.7, 8.9, 11.3];
var N0 = N = 0;
var iCount = 0;
var hnu = 100;
var d1 = [];

function init() {
    graf2 = new Image();
    graf2.src = './images/graf2.jpg';
    ai = new Image();
    ai.src = './images/ai.gif';
    chi = new Image();
    chi.src = './images/chi.gif';
    /*		setBackground(Color.black );
    		OS.offscreenGC.setFont(new Font("TimesRoman",Font.BOLD,13));
    		OS.offscreenGC.setColor(Color.gray  );*/
    rentg_plant1 = new Image();
    rentg_plant1.src = './images/rentg_plant1.gif';
    detect = new Image();
    detect.src = './images/detect.gif';
    dark_tube = new Image();
    dark_tube.src = './images/dark_tube.gif';
    imHeight = detect.height;
    imWidth = detect.width;
    //		cropImage();
    //		rI = new rotate(this, detect);
    //		newimage = rI.rotateI( 0 );
    hnu0 = hnu1 = 100;
    R = Math.round(Math.sqrt(Math.pow(imWidth, 2) + Math.pow(imHeight, 2)));
    SetAngleR(0);
    //  imX0 = 200+Math.round( R0*cosT)-R/2;
    //  imY0 = 160-Math.round(R0*sinT)-R/2;
    //  alert("teta= "+teta+" imX0= "+imX0+" imY0= "+imY0)
    //	imX0 = 197+R0;
    //	imY0 = 160-R/2+8;
    Canvas1 = refObj('Canvas1');
    //alert("Canvas1= "+Canvas1)
    context = Canvas1.getContext('2d');
}
/*/==========================================================================
function cropImage()
{
	var x=[0,70,70,70,70,0];
	var y=[0,0,138,159,180,269];
	var w=[70,7,5,5,5,35];
	var h=[269,138,21,21,21,23];
}*/
function paint() {
    var elem = document.getElementById('Canvas1');
    context = elem.getContext('2d');
    context.fillStyle = "black";
    context.clearRect(0, 0, elem.width, elem.height);
    context.fillRect(0, 0, context.width, context.height);
    context.drawImage(rentg_plant1, 0, 0, 70, 269, 11, 0, 70, 269);
    context.drawImage(rentg_plant1, 70, 138 + subst * 21, 5, 21, 197, 120, 5, 21);
    for (i = 0; i < 2; i++) context.drawImage(rentg_plant1, 70, 0, 7, 138, 118 + i * 44, 65, 7, 138);
    drawRotatedImage(detect, xd, yd, -teta);
    if (isOnOff) { context.drawImage(rentg_plant1, 0, 269, 35, 23, width - 40, height - 30, 35, 23); return; } else {
        var x = [80, 142, 202, 322];
        var y = [43, 43, 97, 97];
        context.drawImage(dark_tube, 10, 45);
        context.fillStyle = "white";
        context.font = '16px bold Serif';
        for (i = 0; i < 4; i++) context.fillText(String(i + 1), x[i], y[i]);
    }
}
//==========================================================================
function drawRotatedImage(image, x, y, angle) {
    var TO_RADIANS = Math.PI / 180;
    // save the current co-ordinate system 
    // before we screw with it
    context.save();

    // move to the middle of where we want to draw our image
    context.translate(x, y);

    // rotate around that point, converting our 
    // angle from degrees to radians 
    context.rotate(angle * TO_RADIANS);

    // draw it up and to the left by half the width
    // and height of the image 
    context.drawImage(image, -(image.width / 2), -(image.height / 2));

    // and restore the co-ords to how they were when we began
    context.restore();
}
//========================================================
function SetAngleR(f) // int
{
    teta = f;
    var fi = Math.PI / 180 * teta;
    var sinfi = Math.sin(fi);
    var cosfi = Math.cos(fi);
    xd = 197 + Math.round(cosfi * R0);
    yd = 165 - Math.round(sinfi * R0) - R / 2 + 8 * (1 + sinfi); //*(1-cosfi);
    //	paint();
}
//========================================================// ============================================
function addTeta(dir) {
    if (Math.abs(teta + 2 * dir) < 91) {
        teta += 2 * dir;
        //alert("addTeta teta="+teta)
        trad = Math.PI * teta / 180;
        sinT = Math.sin(trad);
        cosT = Math.cos(trad);
        set_digitsA(teta);
        SetAngleR(teta)
            //		newimage = rI.rotateI( teta );
        paint();
        hnu1 = hnu0 / (1 + hnu0 / mc2 * (1 - cosT));
    }
}
// ============================================
function getTeta() {
    return teta;
}
// ============================================
function getCount() {
    return isCount;
}
// ============================================	
function setSubst(n) {
    if (n < 3) subst = n;
    paint();
}
// ============================================	
function setOnOff() {
    isOnOff = !isOnOff;
    paint();
}
// ============================================	
function run() {
    var x;
    var tmp;
    var sigma = 0.5; // 0.5%
    x = (hnu1 - 80) + Gasdev() * sigma;

    tmp = Math.round(5 * x);
    setN(Math.round(5 * x));
    paint2();
    set_digitsA(icount);
    if (tmp < n.length) n[tmp]++;
    icount++;
    if (icount == N0) {
        clearInterval(Atimer);
        refObj("sel").disabled = false;
        set_digitsA(0);
        refObj("ctext").innerHTML = ctext[0];
        isCount = false;
    }
    //	}
    //showSlide	mlib.callJS(this,nameF); 
    //	  }
}
//========================================================
function startCount2() {
    //alert("startCount2 isCount= "+isCount)
    if (!isCount) return;
    clearData();
    var dr = ro[subst] / ro[1];
    if (teta == 0) dr = 1.5 / dr;
    var sleeptime = Math.round(50 / dr);
    N0 = Math.round((250 + Math.round(Math.random() * 50)) * dr * (1 + Math.pow(cosT, 2)));
    //alert("cosT= "+cosT+" subst= "+subst+" N0= "+N0+" sleeptime= "+sleeptime)
    icount = 0;
    //	g = new Gauss(); // создаём объект
    N = 0;

    Atimer = setInterval(run, sleeptime)
}
//========================================================
function getAnswer(n) {
    //alert("getAnswer n="+n+" hnu="+hnu+" teta_ask="+teta_ask);
    switch (n) {
        case 3:
            answer = hnu / (1 + hnu / 511 * (1 - Math.cos(Math.PI * (teta_ask) / 180)));
            break;
        case 4:
            answer = hnu - hnu / (1 + hnu / 511 * (1 - Math.cos(Math.PI * (teta_ask) / 180)));
            break;
        case 5:
            Tkin = hnu - hnu / (1 + hnu / 511 * (1 - Math.cos(Math.PI * (teta_ask) / 180)));
            answer = Math.sqrt(1 - Math.pow(511 / (Tkin + 511), 2));
            break;
        case 6:
            var fi = Math.atan(1 / (Math.tan(Math.PI * teta_ask / 360) * (1 + hnu / 511)));
            answer = 180 * fi / Math.PI;
            break;
        case 7:
            answer = 1.241 / hnu;
            break;
        case 8:
            answer = 2.426 * (1 - Math.cos(Math.PI * teta_ask / 180));
    }
    //alert("getAnswer answer="+answer);
    return answer;
}
//=============================================
function setData() {
    var d2 = [];
    var t;
    for (i = 0; i < 20; i++) { // теоретический
        t = hnu / (1 + hnu / 511 * (1 - Math.cos(Math.PI * i * 4 / 180)));
        d2.push([i * 4, t]);
    }
    $.plot("#Graph2", [
        { label: "экспер.", color: 2, data: d1 },
        { label: "теория", color: 1, data: d2, points: { symbol: "circle" } }
    ], {
        series: {

            points: { show: true, symbol: "cross" },
            lines: { show: false }
        },
        grid: { hoverable: true, backgroundColor: { colors: ["#00FFFF", "#00FFFF"] } },
        xaxis: { max: 90, min: 0, axisLabelUseCanvas: false, axisLabel: String.fromCharCode(920) + String.fromCharCode(176) },
        yaxis: { max: 120, min: 40, axisLabel: "h" + String.fromCharCode(957) + ",<br>кэВ", axisLabelUseCanvas: false } //}
    });
    /* 	  },
    	{label:"theory",data: d2},
    	 ],   series:{ 	
    		points: { show: true, symbol: "circle" },
    		  lines:{ show: false}},
    	  grid: { hoverable: true,backgroundColor: { colors: ["#00FFFF", "#00FFFF"] }},
    		xaxis:{max:90,min:0,axisLabelUseCanvas: false,axisLabel :String.fromCharCode(920)+String.fromCharCode(176)},
    		yaxis:{max:100,min:0,axisLabel :"h"+String.fromCharCode(957)+",<br>кэВ",axisLabelUseCanvas: false}//}
    	}
    			);*/
}