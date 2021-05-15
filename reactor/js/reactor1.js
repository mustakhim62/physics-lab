	var height = 230;
	var width = 290;
	var imHeight = 21;
	var imWidth = 44;
	var xcup = 29;
	var ybeam = 28;
	var nbeam = 1; // 0 1 2
	var nbeams_true;
	var nnuclears = 0; // 0 1
	var r_a = 0; // 0 1	стабильно р/активно
	var isLeft = 3; // 0 2 22.11.2004
	var isShow = false;
	var xi = new Array(2);
	var yi = new Array(2);
	var itime = 0;

	function init1() {
	    weight0 = new Image();
	    weight0.src = './images/weight0.gif';
	    weight1 = new Image();
	    weight1.src = './images/weight1.gif';
	    weight2 = new Image();
	    weight2.src = './images/weight2.gif';
	    weight3 = new Image();
	    weight3.src = './images/weight3.gif'; // ядра
	    nbeam = 1;
	    nnuclears = 1;
	    r_a = 1;
	    nbeams_true = 0;
	    Canvas1 = refObj('Canvas1');
	    context1 = Canvas1.getContext('2d');
	    Canvas1.onmouseup = mouseReleased;
	    Canvas1.onmousedown = mousePressed;
	    Canvas1.onmousemove = mouseDragged;
	}
	//==========================================================================
	function paint1() {
	    var x, y;
	    var dy = 3;
	    var elem = document.getElementById('Canvas1');
	    context1 = elem.getContext('2d');
	    context1.clearRect(0, 0, elem.width, elem.height);
	    context1.fillStyle = "#FFFFE0";
	    context1.fillRect(0, 0, context1.width, context1.height);
	    context1.drawImage(weight0, 30, 54);
	    if (isShow) {
	        nbeam = nbeams_true;
	        dy = 0;
	    }
	    context1.drawImage(weight1, nbeam * 225, 0, 225, 156, 37, ybeam + dy, 225, 156);
	    for (i = 0; i < 2; i++) {
	        x = xcup + i * 176 + 1 - nbeam;
	        y = ybeam + 34 + (1 - nbeam) * (7 - 14 * i) + dy;
	        context1.drawImage(weight2, x, y);
	        asv = Math.abs(1 - nnuclears - i);
	        context1.drawImage(weight3, imWidth * asv, 0, imWidth, imHeight, x + 10, y + 94, imWidth, imHeight);
	        xi[i] = x + 10;
	        yi[i] = y + 94;
	    }
	}
	//==========================================================================
	function prepare_data1() {
	    isShow = false;
	    nbeam = 1;
	    nnuclears = Math.round(Math.random()); // 0 1
	    r_a = Math.round(Math.random()); // 0 1
	    nbeams_true = 2 * Math.abs(nnuclears - r_a); // 0 2
	}

	function getRight() {
	    return (isLeft == nbeams_true);
	}
	//======================================================
	function startM() {
	    itime = 0;
	    isShow = true;
	    Atimer = setInterval(run, 800);
	}

	function run() {
	    paint1();
	    itime++;
	    if (itime == 2) {
	        clearInterval(Atimer);
	        formInit();
	    }
	}

	function mousePressed(e) {
	    Canvas1 = refObj('Canvas1');
	    var mouse = {
	        x: e.clientX - Math.round(Canvas1.getBoundingClientRect().left),
	        y: e.clientY - Math.round(Canvas1.getBoundingClientRect().top)
	    }
	    if (mouse.x > xi[0] && mouse.x < xi[0] + imWidth && mouse.y > yi[0] && mouse.y < yi[0] + imHeight) {
	        isLeft = 0;
	    } else if (mouse.x > xi[1] && mouse.x < xi[1] + imWidth && mouse.y > yi[1] && mouse.y < yi[1] + imHeight) {
	        isLeft = 2;
	    } else return;
	    startM();
	    formOk();
	}

	function mouseDragged(e) {}

	function mouseReleased(e) {

	}