var experiment=1;
var n_digits=6;
var jc=1;
var np=250;
var d=[0,0,0,0,0,0];
function change_count()
{
   refObj("countOffOn").src=pics_count[jc].src;
   jc = 1 - jc;
   if(jc==0&&experiment==1){ refObj("subst").disabled=false;}
}
var isCount = true;
var d1=[0,0,0,0];
  img_digitA = new Image();
  img_digitA.src = './images/digits_green.gif';
  var elem = document.getElementById('Canvas2');
  if(!elem)experiment=2;
//  cont2 = elem.getContext('2d');
var Nx;  
function init_count_angle(n){
  experiment=n;
//  if(experiment!=1)return;    
//alert("init_count_angle")
  var elem = document.getElementById('Canvas2');
if(!elem) return; 
  cont2 = elem.getContext('2d');
  cwidth=100;
  cheight=35;
	cont2.fillStyle = "#aaaaaa";
    cont2.fillRect(0,0,cwidth,cheight);
for(i=0;i<5;i=i+2){
		i2 = 2*i;
cont2.fillStyle = 'rgb('+(30+i*20)+','+(30+i*20)+','+(30+i*20)+')';
cont2.fillRect(i,i,cwidth-i2,2);
cont2.fillRect(i,i,2,cheight-i2);
cont2.fillStyle = 'rgb('+(255-i*15)+','+(255-i*15)+','+(255-i*15)+')';
cont2.fillRect(i,cheight-i-2,cwidth-i2,2);
cont2.fillRect(cwidth-i-2,i,2,cheight-i2);
	   }
//set_digitsA(0);
}	   
function drawA(){
init_count_angle(experiment);
  if(!cont2)return;    
for(i=0;i<4;i++){
	cont2.drawImage(img_digitA, d1[i]*16, 0, 16, 21, cwidth/2-36+i*18, cheight/2-10, 16, 21);
}
}
function set_digitsA(t)
{  
if(experiment!=1)return;    
	var ti=t;
	for(i=0;i<4;i++)
	{
		d1[3-i] = parseInt(ti%10);
		ti = ti/10;
	}
	drawA();
}
//init_count_angle();
if(experiment==1)set_digitsA(0);
  img_digit = new Image();
  img_digit.src = './images/digits_red.gif';
//  var elem = document.getElementById('myCanvas');
//  cont = elem.getContext('2d');
function init_count(){    
//alert("init_count experiment= "+experiment)
  if(experiment!=1)n_digits=4;
  var elem = document.getElementById('myCanvas');
  cont = elem.getContext('2d');
  cwidth=120;
  cheight=35;
	cont.fillStyle = "#aaaaaa";
    cont.fillRect(0,0,cwidth,cheight);
for(i=0;i<5;i=i+2){
		i2 = 2*i;
cont.fillStyle = 'rgb('+(30+i*20)+','+(30+i*20)+','+(30+i*20)+')';
cont.fillRect(i,i,cwidth-i2,2);
cont.fillRect(i,i,2,cheight-i2);
cont.fillStyle = 'rgb('+(255-i*15)+','+(255-i*15)+','+(255-i*15)+')';
cont.fillRect(i,cheight-i-2,cwidth-i2,2);
cont.fillRect(cwidth-i-2,i,2,cheight-i2);
	   }
}	   
function draw(){
init_count(experiment);
for(i=0;i<n_digits;i++){
	cont.drawImage(img_digit, d[i]*16, 0, 16, 21, 18*(experiment-1)+7+i*18, cheight/2-10, 16, 21);
}
}
function set_digits(t)
{
	var ti=t;
	for(i=0;i<n_digits;i++)
	{
		d[n_digits-1-i] = parseInt(ti%10);
		ti = ti/10;
	}
	draw();
}
//init_count(experiment);
//set_digits(0);
//========================================================
function count(){
//alert("isCount= "+isCount+" Nx= "+Nx+" experiment= "+experiment)
//Nx=CalculateNx( cur_source, number_subst, t, deltaX )
if (!isCount)return;
//  refObj("subst").disabled=true;
  change_count();
 isCount = false;
 isStop=false;
  var Npart=Nx/np;
   var N=0;
   itime=0;
   timer1= setInterval(function() { 
   itime++;
   k = poidev( Npart );
   N = N+Math.round(k);
//alert("k= "+k+" N= "+N)   
   set_digits(N);
// вывод на график
  if(itime==np){ 
  	clearInterval(timer1);change_count();isCount = true;isStop=true;if(experiment==1)refObj("subst").disabled=false;
  if(experiment==1) Ngraph=Math.log( N );else  Ngraph= N;
drawPointXY(angle, Ngraph);
//if(angle==5)alert("angle= "+angle+" N= "+N)
  	}	
},50);
}
function StartCount()
	{
	var sinfi4;
	var constantT_dOmega = 7.81;
	var A0=0.1;
	if(ex1){
    Nx = calc_N(angle,t,nsubst);
//alert("Nx="+Nx+" angle="+angle+" t="+t+" nsubst="+nsubst+" isCount="+isCount)
	count();
	}
}
//========================================================
function calc_N( f, t, nsubst)
{
	this.t = t;
	this.nsubst = nsubst;
	var sinfi4;
	var constantT_dOmega = 7.81;
	var A0=0.15;
	var fi_rad;
	if (f==0) fi_rad=0.02;
	else fi_rad = Math.PI/360*f; // fi/2
	sinfi4 = Math.pow(Math.sin(fi_rad),4);
    return Math.round(constantT_dOmega*A0*Z[nsubst]*Z[nsubst]*ro[nsubst]/A[nsubst]*((f==0)?1:t)*1E-6/sinfi4);
}
//========================================================
function calc_Ne( fi)
{
var ka = 5.43*Math.sin(Math.PI*fi/360);
var ka2 = ka*ka;
return  500*Math.pow(8+ka2,2)/Math.pow(4+ka2,4);
}
//========================================================
function StartCount3()
	{
	setExperiment(2);
	np=150;
	fi_rad = Math.PI/180*angle;
	var sinfi4;
	var constantT_dOmega = 7.81;
	var A0=0.1;
	sinfi4 = Math.pow(Math.sin(fi_rad),4);
	//System.out.println("begin StartCount Nx = "+Nx);
    Nx = calc_Ne(angle);
//alert("begin StartCount Nx = "+Nx)    
	/*(int)Math.round(constantT_dOmega*A0*Z[nsubst]*Z[nsubst]*
            ro[nsubst]/A[nsubst]*t*1E-6/sinfi4);*/
	if(isFirst){
//		startTime();// Запуск потока
		isFirst = false;
	}
	count();
	}
//========================================================
function setExperiment(n)
{
	experiment=n;
//	alert("setExperiment experiment= "+experiment)
}