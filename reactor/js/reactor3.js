   var width = 330; // Данные переменные хранят ширину и
   var height = 170; //  высоту апплета
   var tau = 0.05;
   var koef = 1.05;
   var xj, yj;
   var n;
   var h = 8;
   var t = 0;
   var isShow = false;
   var isMove = false;
   var elem;
   var context2;

   function init() {
       elem = document.getElementById('Canvas3');
       context2 = elem.getContext('2d');
   }
   //==========================================================================
   function paint() {
       var y;
       //console.log("paint xj= "+xj+" n= "+n+" isShow= "+isShow)
       if (isShow) {
           context2.clearRect(0, 0, elem.width, elem.height);
           context2.fillStyle = "#00FFFF";
           context2.fillRect(0, 0, width, height);
           for (j = 0; j < n; j++) {
               y = yj = height / 2 - h * (n / 2 - j);
               if (yj < 0) y = 0;
               else if (yj > height - h) y = height - h;
               if (xj < width - 8) {
                   context2.fillStyle = "yellow";
                   context2.arc(xj, y, 4, 0, 2 * Math.PI, true);
                   context2.fill();
                   context2.strokeStyle = "blue";
                   context2.arc(xj, y, 4, 0, 2 * Math.PI, true);
                   context2.stroke();
               }
           }
       } else {
           context2.clearRect(0, 0, elem.width, elem.height);
           context2.fillStyle = "#00FFFF";
           context2.fillRect(0, 0, width, height);
       }
   }
   //}}
   function newStart() {
       isShow = false;
       xj = 0
       n = 1;
       t = 0;
       paint();
       isShow = true;
       context2.beginPath();
       Atimer = setInterval(run, 200);
   }

   function run() {
       var n0 = 1;
       var cn = 0;
       var dt = 0.05;
       var tmp;
       //  xj = 8;
       yj = height / 2;
       tmp = (koef - 1) * t / tau;
       if (tmp < 5) n = Math.round(n0 * Math.exp(tmp));
       d1.push([t, n])
       plot = $.plot("#Graph3", [d1], plotParams1);
       paint();
       xj += 8;
       t += dt;
       cn++;
       cn = cn % 3;
       //  }
       if (((t > 5) && (n > 20)) || (xj > width - 8)) { clearInterval(Atimer); } //
   }
   //==========================================================================
   function setTau(t) {
       if (t != null) { tau = t; }
   }

   function setKoef(k) {
       if (k != null) { koef = k; }
       //koef = k;
   }

   function clearS() {
       //  		elem = document.getElementById('Canvas3');
       context2.clearRect(0, 0, elem.width, elem.height);
       context2.fillStyle = "#00FFFF";
       context2.fillRect(0, 0, width, height);
       d1 = [];
       plot = $.plot("#Graph3", [d1], plotParams1);
   }