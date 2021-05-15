var width=278; 
var height=360;
var newimage = null;
var imHeight;  
var imWidth, Ri;  
var ex1 = true;
var sleeptime = 10;
var h0 = 248;
var t = 1;
var nsubst = 0;
var nangle = 0;
var angle = 0;
var xd, yd, R;//, x1, x2, y1, y2;
var countB = 0;
var iback = 0;
var ysT =[0,0,0,0,0];
var ysR =[0,0,0,0,0];
var yendT =[0,0,0,0,0];
var yendR =[0,0,0,0,0];
var dy =[1,3,4,6,8];
var xi =[0,0,0,0,0];
var dx =[0,-70,0,-70,0];
var engl = 0;
var typeModel = ["модель Томсона","модель Резерфорда","Thomson model","Rutherford model"];
var Z=[ 29,47,50,79,82 ];
var A =[ 64,108,119,197,208 ];
var ro =[ 8900,10500,7400,19300,11500 ];
var t = 1;
var nsubst = 0;
var context;
var pics_count;
var d1=[];
//========================================================
function init(){ 
  plant = new Image();
  plant.src = './images/plant.gif';
  detect1 = new Image();
  detect1.src = './images/detect1.gif';
  model = new Image();
  model.src = './images/model.gif';
  scatter1= new Image();
  scatter1.src = './images/scatter1.gif';
  imHeight = detect1.height;    
  imWidth = detect1.width;
  Ri=Math.round(Math.sqrt(Math.pow(imWidth,2)+Math.pow(imHeight,2)));
  xd = 192;
  yd = 89-Ri/2;
  R = 76;
	pics_count=new Array(2);
	pics_count[0]=new Image();
	pics_count[0].src="images/count0.gif";
	pics_count[1]=new Image();
	pics_count[1].src="images/count1.gif";
}
function prepare_screen(){
  var elem = document.getElementById('Canvas1');
//alert("w= "+elem.clientWidth)  
  context = elem.getContext('2d');
	context.fillStyle="black";
	context.fillRect(0,0,width,height); 
	context.drawImage(scatter1,0,0);
	context.fillStyle="black";
	context.fillRect(1,h0,width-2,112);
	context.drawImage(plant,65,h0+28);
	context.strokeStyle="gray";
    context.lineWidth=2;
    context.beginPath();
    context.arc(126, h0+90, 87, -Math.PI/1.1,0 );
	context.moveTo(190,h0+30);
	context.lineTo(width,h0+30);
	context.stroke();
	if(angle==0) context.drawImage(detect1, xd, h0+yd);
}

function paint()
	{
	if(ex1){
		clearInterval(Dtimer);
		var tmp = ((angle>45)?angle:48);
		prepare_screen();
  // center=(50,50) radius=40 angle=0 to 7
		drawRotatedImage(detect1, xd, h0+yd, -angle);
	}
	else{
		context.fillStyle="black";
		context.fillRect(0,0,width,height); 
		context.drawImage(model,20,20);
		context.font = '16px bold Arial';
		var x0;
		for( i=0;i<2;i++){
	  		x0 =(width-context.measureText(typeModel[i+2*engl]).width)/2-8;
			context.fillText(typeModel[i+2*engl],x0,34+i*310);}
		movement_alfa();
	}
}
//==========================================================================
function movement_alfa() { 
var dy0 = 20;
var y0T=56+dy0;
var y0R=198+dy0;
var xs=40;//+dy0;
var xscat=123+dy0;
var xend=248;//+dy0;
var stepY=24;
var itmp,dir,yi,xc,xtmp ;
var rtmp;
		context.fillStyle="black";
		context.fill(); 
		context.drawImage(model,20,20);
  if (countB==0)
	  for ( i=0;i<5;i++){
         ysT[i] = y0T+i*stepY+2-Math.round(rand(5));
		 if (Math.round(Math.random())==0) dir =1;
         else dir =-1;
         yendT[i] = ysT[i]+Math.round(dir*rand(4));
         itmp =4-Math.round(rand(9));
         ysR[i] =y0R+i*stepY+itmp;
         if (itmp>0) dir =1;
         else dir =-1;
         itmp = 5-Math.abs(itmp);
         if (itmp<5) yendR[i] = ysR[i]+dir*dy[itmp];
		 else {
             yendR[i] = ysR[i]+dir*8;
             iback =i;
		}
         itmp =i%2;
         if (itmp==0)itmp =Math.round(rand(5));
         else itmp =rand(5)+40;
         xi[i] = xscat+itmp+dx[i];//**
	  }// for i
	context.strokeStyle="yellow";
    context.lineWidth=2;
    context.beginPath();
    xc =xs+countB;
//alert(" context.fillStyle= "+context.fillStyle+" xc= "+xc+" xi[0]= "+xi[0]+" ysT[0]= "+ysT[0]+" ysR[0]= "+ysR[0])
	for ( i =0;i<5;i++) {
		if (xc<xi[i]){
	context.moveTo(xs,ysT[i]);
	context.lineTo(xc,ysT[i]);
	context.moveTo(xs,ysR[i]);
	context.lineTo(xc,ysR[i]);
		}
		else {
      yi =ysT[i]+Math.round((yendT[i]-ysT[i])/(xend-xi[i])*(xc-xi[i]));
	context.moveTo(xs,ysT[i]);
	context.lineTo(xi[i],ysT[i]);
	context.moveTo(xi[i],ysT[i]);
	context.lineTo(xc,yi);
      yi =ysR[i]+Math.round((yendR[i]-ysR[i])/(xend-xi[i])*(xc-xi[i]));
      if (i==iback)xtmp =2*xi[i]-xc;
	  else xtmp =xc;
	context.moveTo(xs,ysR[i]);
	context.lineTo(xi[i],ysR[i]);
	context.moveTo(xi[i],ysR[i]);
	context.lineTo(xtmp,yi);
			   }
	context.stroke();
	}
    countB++;
	if (countB>xend-xs){
       countB =0;
       iback =0;
	}

}
//==========================================================================
function drawRotatedImage(image, x, y, angle) { 
	var TO_RADIANS = Math.PI/180;  
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
	context.drawImage(image, -(image.width/2), -(image.height/2));
 
	// and restore the co-ords to how they were when we began
	context.restore(); 
}
//========================================================
function SetAngleR( f)  // int
{
	angle = f;
	nangle = angle/5;
	var fi = Math.PI/180*angle;
	var sinfi = Math.sin(fi);
	var cosfi = Math.cos(fi);
	xd = 126+Math.round(cosfi*R);
	yd = 89-Math.round(sinfi*R)-Ri/2+8*(1+sinfi);//*(1-cosfi);
//	newimage = rI.rotateI( angle );
	paint();
}
//========================================================
function getT(){
	return t;
}
function run()
  {
}
//==========================================================================
function startM()
{

Btimer= setInterval(run,sleep);	
}	
//==========================================================================
function stopM()
	{
	   isRun=false;
	   clearInterval(Btimer);
	}
function startTime() // Запуск потока
	{

	}
//==========================================================================
function setExp( b)
{
	ex1 = b;
	if(!ex1) startTime();
	//repaint();
}
//========================================================
function getExp()
{
	return ex1;
}
//========================================================
function getSubst()
{
	return nsubst*10+t;
}
//********************
//========================================================
function GetThickness()
{
	return t;
}
//========================================================
function AddThickness( b)
{
	if(b&&(t<9))t++;
	if(!b&&(t>1))t--;
}
//========================================================
function SetSubst( n)
{
	nsubst = n;
}
//========================================================
