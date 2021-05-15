  var xc = 0;
  var t = 0;
  var img_digit;
  var cwidth = 135;
  var cheight = 59;
  var di = new Array();
  var cont;

  function init_count() {
      //console.log("begin init_count")
      img_digit = new Image();
      img_digit.src = './images/digits_green.gif';
      var elem = document.getElementById('CanvasC');
      cont = elem.getContext('2d');
      cont.fillStyle = "#aaaaaa";
      cont.fillRect(0, 0, cwidth, cheight);
      for (i = 0; i < 5; i = i + 2) {
          i2 = 2 * i;
          cont.fillStyle = 'rgb(' + (30 + i * 20) + ',' + (30 + i * 20) + ',' + (30 + i * 20) + ')';
          cont.fillRect(i, i, cwidth - i2, 2);
          cont.fillRect(i, i, 2, cheight - i2);
          cont.fillStyle = 'rgb(' + (255 - i * 15) + ',' + (255 - i * 15) + ',' + (255 - i * 15) + ')';
          cont.fillRect(i, cheight - i - 2, cwidth - i2, 2);
          cont.fillRect(cwidth - i - 2, i, 2, cheight - i2);
      }
      img_digit.onload = function() {
          //console.log("init_count img_digit onload")
          set_digits(50);
      }
  }

  function clr() {
      //   if(window.timer1!== undefined){clearInterval(timer1); if(jc==1)change_count();isCount = true;}	
      for (i = 0; i < 4; i++) di[i] = 0;
      set_digits(0);
  }

  function set_digits(t) {
      var ti = t;
      for (i = 0; i < 4; i++) {
          di[3 - i] = parseInt(ti % 10);
          ti = ti / 10;
      }
      draw();
  }

  function draw() {
      //alert("draw di= "+di)
      for (i = 0; i < 4; i++) {
          cont.drawImage(img_digit, di[i] * 16, 0, 16, 21, cwidth / 2 - 36 + i * 18, cheight / 2 - 10, 16, 21);
      }
  }
  //set_digits(0);