var widthG=300;
var heightG=244;
var imY0Gr,imYGr, imYstartGr, imXstartGr;
var imX0Gr, imXGr;
var xminGr = 90;
var wrGr = 250;
//	Rectangle rcImage;
var imHeightGr=5;
var imWidthGr=5;
//	AppletContext ac = null;
var isStartGr=false;
var isWrite=false;
var isCross=true;
var xstart, xend, yend;
var y0G=0;
var n0=1;
var xs, xs0;
var ys;
var x0G=50;
var wg=250;
var hg=210;
var yg=9;
var np=200;
var xmax=1000.0;
var ymax=0.4;
var scaleX, scaleY; // 1/250 MPa/point
var index=0;// для наполнения при рисовании
var indexXY=0;// для наполнения
//var V_P= new Array();
//var V_P0= new Array();
var x_y;// new Array();// при рисовании
var dataX_Y= new Array();
var xreal0, xreal1, yreal1;//, Vstart, Pstart; // , nuR
var nuR=0.2;
var T0n=480; // T0n -температура нагревателя
var Tmin=320; // Tmin -температура холодильника
var nameX="";
var nameY="";
var ctx;
var colorCross="red";
var S1="Резерфорд:";
var S2="Томсон:";
var StT ="N~"+String.fromCharCode(8730)+"d*exp(-"+String.fromCharCode(966)+String.fromCharCode(178)+"/"+String.fromCharCode(963)+String.fromCharCode(178)+")";
var StR="N~d/(sin"+String.fromCharCode(178)+"("+String.fromCharCode(966)+"/2))"+String.fromCharCode(178);
var isNameM=false;
var isName=false;
var model=0;
var signColor=["#000066","#000066","blue"];
var work=1;
var fi;
var N_fi4=0;
//===========================
function Create2DArray(rows) {
  var arr = [];

  for (var i=0;i<rows;i++) {
     arr[i] = [];
  }

  return arr;
}
function init_scatterGraph(xmax,ymax,nameX,nameY,nameY1)
{
    this.xmax = xmax;
    this.ymax = ymax;
    scaleX=xmax/250; // 400/250 sm3/point engine
    scaleY=ymax/250; // 1/250 MPa/point
//	setBackground(Color.white);
	this.nameX = nameX;  //"V, см";
	this.nameY = nameY;  //"P,";
	this.nameY1 = nameY1;  //"МПа";
//	setForeground(Color.black);

	imX0Gr=imXGr=205; // width/2;//100; 180 sm^3
	imY0Gr=imYGr=180; //height/2; 0.3 MPa
	ys=heightG-8;
	xs = xs0 = 10;
	x_y=Create2DArray(np);
    fillFrame( x0G, yg, wg, hg);
//    V_P=[];
}	 //init
//=============================================
function paintGrf()
{
//alert("paintGrf indexXY= "+indexXY+" dataX_Y[0][0]= "+dataX_Y[0][0]+" dataX_Y[0][1]= "+dataX_Y[0][1]+" imHeightGr= "+imHeightGr);
	if(!ctx)return;
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,widthG,heightG);
	fillFrame( x0G, yg, wg, hg);
	j=0;
//    ctx.fillStyle = "white";
//    ctx.fillRect(0,0,engineGraph.clientWidth,engineGraph.clientHeight);
    ctx.fillStyle = "black";
	if(isCross){
//	  xreal1=round_double(scaleX*(imXGr-x0G));
//	  yreal1=Math.round((scaleY*(wg+y0G-imYGr+imHeightGr)*1000))/1000;
  	ctx.beginPath();
//  for(i=0;i<3;i++){
    ctx.strokeStyle = colorCross;
    ctx.lineWidth=1;
    ctx.beginPath();
	ctx.moveTo(imXGr,imYGr);
	ctx.lineTo(imXGr,imYGr+2*imHeightGr);
	ctx.moveTo(imXGr-imWidthGr,imYGr+imHeightGr);
	ctx.lineTo(imXGr+imWidthGr,imYGr+imHeightGr);
    ctx.stroke();
    ctx.fillStyle = "black";
	ctx.font = '14px bold sans-serif';
//    ctx.fillText("V = "+xreal1+"  P = "+yreal1,xs,ys);
//	if((isWrite&&!isRun)||isBegin)ctx.fillText("V = "+xreal1+"  P = "+yreal1,xs,ys);
//	if(isWrite)ctx.fillText("x = "+(imXGr-imXstartGr)+"  y = "+(imYGr-imYstartGr),260,ys+5);
}
/*	if(isWrite){
alert("isWrite")
    	ctx.strokeStyle = "red";
    	ctx.beginPath();
    	ctx.lineWidth=2;
	  for(i=0;i<index-1;i++){
//            j=2*i;
			ctx.moveTo(x_y[i][0],x_y[i][1]+imHeightGr);
			ctx.lineTo(x_y[i][0]+1,x_y[i][1]+imHeightGr);
		    ctx.stroke();
	  }
        }*///   Нажмите \"Старт\"
    	ctx.strokeStyle = "blue";
    	ctx.beginPath();
    	ctx.lineWidth=2;
	for(i=0;i<indexXY;i++){
//            j=2*i;
//			ctx.moveTo(dataX_Y[i][0],dataX_Y[i][1]+imHeightGr);
//			ctx.lineTo(dataX_Y[i][0]+1,dataX_Y[i][1]+imHeightGr);
//		    ctx.stroke();
    	ctx.beginPath();
		ctx.arc(dataX_Y[i][0],dataX_Y[i][1]+imHeightGr,1,0, 2 * Math.PI, true);
		ctx.stroke();
	}

}
function fillFrame( x, y, width, h) {
	if(!ctx)return;
/*    ctx.fillStyle = "white";
    ctx.fillRect(0,0,widthG,heightG);*/
	var y0 = y;
    ctx.fillStyle = "cyan";
    ctx.fillRect(x,y0,width,h);
    ctx.lineWidth=0.8;
    ctx.strokeStyle = "black";
    ctx.strokeRect(x,y0,width,h);
	ctx.font = '14px sans-serif';
    ctx.fillStyle = "black";
	for(i=0;i<2;i++){
	  ctx.fillText(i*xmax/2,x0G+i*width/2-9,235);	
	  ctx.moveTo(x0G+(i+1)*width/2,y0+214);
	  ctx.lineTo(x0G+(i+1)*width/2,y0+210);
	  ctx.moveTo(x,y0+h/2);
	  ctx.lineTo(x+5,y0+h/2);
	  ctx.stroke();
		}
	ctx.fillText(ymax/2,30,y0+110);
	ctx.font = '18px sans-serif';
    ctx.fillStyle = "blue";
	ctx.fillText(nameX,200,238);
	ctx.fillText(nameY,10,y0+90);
	if(nameY1!=="") ctx.fillText(nameY1,9,y0+130);
	ctx.font = '14px sans-serif';
    ctx.lineWidth=1;
    ctx.beginPath();
    ctx.strokeStyle = "lightgrey";
	for(i=1;i<5;i++){
	  ctx.moveTo(x,y+h-i*h/5);
	  ctx.lineTo(x+width,y+h-i*h/5);
	  ctx.moveTo(x+i*width/5,y);
	  ctx.lineTo(x+i*width/5,y+h);
	}
	ctx.stroke();
      }
// ============================================
function setCross(b)  {
	isCross=b;
//        for(i=0;i<5;i++)bList[i].setVisible(true);
//        wtButton.setEnabled(true);
	paintGrf();
  }
// ============================================
function setPosCross(P, V)  {
//	alert("setPosCross P= "+P)
     imXGr = Math.round(V/scaleX+x0G);
     imYGr = Math.round(wg+y0G+imHeightGr-P/scaleY);
     setCross(true);
	paintGrf();
  }
// ============================================
function set_nuR(x)  {
	nuR=x;
  }
// ============================================
function setT(x)  {
	T0=x;
  }
// ============================================
function setModel(n)  {
	model = n;
	fi=2;
	work = 2;
	Ftimer=setInterval(run,100);
  }
// ============================================
function ClearGraphGr()  {
	index=0; indexXY=0;
    dataX_Y=[];
	paintGrf();
  }
 // ============================================
function setStart( b){
	  work = b;
	  fi=4;
	  t=GetThickness();
	  Ftimer=setInterval(run,100);
	  //repaint();
  }
// ============================================
/*function clearVisualData()  {
//    wtButton.setForeground(new Color(0x333333));
    indexXY=0;
    dataX_Y=[];
//	paintGrf();
  }*/
/*/ ============================================
function drawPoint()  {
    var Vtmp, Ptmp;
            var i = index;//*2;
            if( index < 0 || i > np-2 ) return;
            Vtmp= round_double(scaleX*(imXGr-x0G));
            Ptmp= Math.round((scaleY*(wg+y0G-imYGr+imHeightGr)*1000))/1000;            
//=============================
            isStart=true;
            if(isWrite)V_P.push([Vtmp,Ptmp]);
            x_y[i][0] = imXGr;
            x_y[i][1] = imYGr;
              index++;
//          if (appGaz1!=null&&isWrite){
//	      setP_V_T( Ptmp, Vtmp, 0);
//	      newV_P(Vtmp,Ptmp);
  }*/
/*/ ============================================
function seGaz()  {
    var Vtmp, Ptmp;
    Vtmp= round_double(scaleX*(imXGr-x0G));
    Ptmp= Math.round((scaleY*(wg+y0G-imYGr+imHeightGr)*1000))/1000;
//alert("seGaz Vtmp= "+Vtmp+" Ptmp= "+Ptmp)                
//    if (appGaz1!=null&&isWrite){
//	appGaz1.setInitPV(Vtmp, Ptmp);
  }*/
// ============================================
function drawPointXY( V, P)  {
//alert("drawPointXY V= "+V+" P= "+P+" indexXY= "+indexXY);
            var i = indexXY;//*2;
            if( indexXY < 0 /*|| i > 2*np-2*/ ) return;
            imXGr=Math.round(V/scaleX+x0G);
            imYGr=Math.round(hg+y0G+imHeightGr-P/scaleY);
            dataX_Y.push([imXGr,imYGr]);
//            dataX_Y.add((int)Math.round(wg+y0+imHeightGr-P/scaleY));
            if( dataX_Y[i][0] >x0G+wg || dataX_Y[i][1] < yg ) return;
        indexXY++;
paintGrf();
  }
//==========================================================================
function round_double(x)
	{
		var tmp;
		if(Math.abs(x)<0.1) tmp = 1000;
		else
		  if(Math.abs(x)<10.0) tmp = 100;
			else if(Math.abs(x)<99.99) tmp = 10;
				else tmp = 1;
		return Math.round(x*tmp)/tmp;
	}
//======================================================================
// ============================================
function ShowNotice(  x, y, textcolor, S, Name )
{
    ctx.fillStyle = textcolor;
	ctx.font = '14px PLAIN sans-serif';
    ctx.fillText(Name,x+40,y-30);
    if(!isNameM){
      ctx.beginPath();
	  ctx.moveTo(x+38,y-12);
	  ctx.lineTo(x,y);
      ctx.stroke();
	}
	ctx.fillText(S,x+40,y-16);
}
//=============================================
function this_paint()
{
	if(work>0) {
    	ctx.strokeStyle = "black";
      ctx.beginPath();
	  ctx.moveTo(x1,y1R);
	  ctx.lineTo(x1+1,y1R);
	  ctx.moveTo(x1,y1T);
	  ctx.lineTo(x1+1,y1T);
      ctx.stroke();
		if(isName){
			ShowNotice( xN, yN, "red", StR, S1 );
			ShowNotice( 72, 190, "blue", StT, S2 );
		}
		if(isNameM){
			ShowNotice( 160, 180, "#000066", "по орбитам","Движение"  );
			ShowNotice( 80, 100, "blue", "(квантовая механика)", "Сложное движение" );
		}
	}
}
//========================================================
function run()
  {
  var x0, y0, dy;
  var N, ytmp;//, scaleY;
  x0 =0;//Pg.xaxis.getInteger(0);
  y0 =0;//Pg.yaxis.getInteger(0);
 	x1 = x0 + ( fi / scaleX);
//alert("run work="+work+" model= "+model)
	 switch(work){
	 case 1:
		ytmp = calc_N(fi,t,nsubst);
		if(fi==4)N_fi4=ytmp;
		y1R = dy = Math.log(ytmp)/scaleY ;
	 	ytmp = Math.pow(fi/4.5,2);
		N =N_fi4*Math.exp(-ytmp);
		y1T =  Math.log(N)/scaleY ;
		y1T = ((y1T<0)?0:y1T); 
		if(fi==20){
			xN = x1+wg/4;
			yN = y1R+hg/4;
		}
		break;
	 default:
		var E = 7;//Math.sqrt(100);	//E = 100;   { энергия в эВ }
		var ka = 0.543*E*Math.sin(Math.PI*fi/360);
		var ka2 = ka*ka;
		var ka4 = ka2*ka2;
		switch (model){
			case 1: y1R = y0+Math.round(1500*Math.pow(1-Math.sin(ka)/ka,2)/ka4/scaleY);
			  break;
			case 2: y1R = y0+Math.round(calc_Ne(fi)/scaleY);
			  break;
			default: y1R = y0+Math.round(1500*Math.pow(1+3*Math.cos(ka)/ka2-3*Math.sin(ka)/ka2/ka,2)/ka4/scaleY);
		}//switch model 
		y1T = y1R;
	 }//switch	
//	sleep_and_paint();
//  }
if(fi==90){
	clearInterval(Ftimer);
  if(work==1) isName = true;
  if(work==2&&model==2) isNameM = true;
if(work!=1)  ChoiceAbled();
	this_paint();
	}
else fi++;
    	ctx.strokeStyle = signColor[model];
    	ctx.beginPath();
		ctx.arc(x0G+x1,hg+y0G+imHeightGr-y1R,0.2,0, 2 * Math.PI, true);
		ctx.stroke();
    	if(y1T>0){
    		ctx.beginPath();
			ctx.arc(x0G+x1,hg+y0G+imHeightGr-y1T,0.5,0, 2 * Math.PI, true);
			ctx.stroke();
		}
//paintGrf();	
}
// ============================================
//engineGraph
