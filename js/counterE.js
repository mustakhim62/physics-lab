    var widthC=100; // Данные переменные хранят ширину и
    var heightC=40; //  высоту апплета
var d=[0,0,10,0];
	var ndigit = 4;
	var digits_green;
	
function initC()
{
  Canvas3 = document.getElementById('CanvasC');
  context3 = Canvas3.getContext('2d');
  digits_green = new Image();
  digits_green.src = "images/digits.gif";
  digits_green.onload =function() {
	  paintC();
  }
}
//==========================================================================
function paintC()
	{
  	  context3.fillStyle="#C8C0B0";
	  context3.fillRect(0,0,widthC,heightC);
	  var i2;
	  for( i=0;i<3;i=i+2){
		i2 = 2*i;
		context3.fillStyle='rgb('+(30+i*20)+','+(30+i*20)+','+(30+i*20)+')';
		context3.fillRect(i,i,widthC-i2,2);
//console.log("paintC i= "+i+" context3.fillStyle= "+(context3.fillStyle));
		context3.fillRect(i,i,2,heightC-i2);
		context3.fillStyle='rgb('+(255-i*15)+','+(255-i*15)+','+(255-i*15)+')';
		context3.fillRect(i,heightC-i-2,widthC-i2,2);
		context3.fillRect(widthC-i-2,i,2,heightC-i2);
	 }
  	 for (  i=0;i<ndigit;i++)
		context3.drawImage(digits_green,d[i]*16,0,16,21,widthC/2-32+i*16, heightC/2-10,16,21);
	}
//======================================================
function set_digits( t)
{
	var k;
	var tmp;
	k = 1;
	for( i=0;i<3;i++)
	{
		tmp = ((i<1)?3-i:2-i);
		d[tmp]=Math.floor(t*k)%10;
		k = k/10;
	}
	paintC();
}
//======================================================
