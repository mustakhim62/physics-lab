var widthCl, heightCl;
var d=[0,0,10,0,0];
var contextCl;

function initCl()
{
  	elemC = document.getElementById('CanvasCl');
  	contextCl = elemC.getContext('2d'); 
	widthCl=elemC.width;
	heightCl=elemC.height;
    digits = new Image();
    digits.src = './images/digits.gif';
	digits.onload = function() {
	  paintCl();
	}
}			 
		 
//=====================================================================
function paintCl ()
 { 
console.log("paintCl contextCl= "+contextCl)
  	for ( i=0;i<5;i++)
		contextCl.drawImage(digits,d[i]*16,0,16,21,widthCl/2-40+i*16, heightCl/2-10,16,21);
 }
//======================================================
function set_digits( t)
{
	var k;
	var tmp;
	k = 100;
	for( i=0;i<4;i++)
	{
		tmp = ((i<2)?4-i:3-i);
		d[tmp]=Math.floor(t*k)%10;
		k = k/10;
	}
	paintCl();
}
