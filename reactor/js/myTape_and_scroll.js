var foreColor = "rgb(255, 32, 32)";
var backColor = "rgb(20, 20, 20)";
var xint = 0;
var yint = 0;
var orientation;
var editable = true;
var contextT;
var contextV;
var elem;
var widthT;
var heightT;
var horiz = 0;
var vert = 1;
var orientation = 0;
var ybutton = 67;
var wbutton = 14;
var hbutton = 18;
var xleft = 8;
var bBeginDrag = false;
var dyV = 0;

function initT(orientation) {
    this.orientation = orientation;
    elem = document.getElementById('CanvasT');
    contextT = elem.getContext('2d');
    widthT = elem.width;
    heightT = elem.height;
    //	prepareImage();
}

function initV() {
    elem = document.getElementById('CanvasV');
    elem.onmousedown = mousePressed;
    elem.onmousemove = mouseDragged;
    elem.onmouseup = mouseReleased;
    elem.tabIndex = 1000;
    //	elem.addEventListener("keyup",checkPressed,false);
    contextV = elem.getContext('2d');
}

function paintV() {
    //    buttonV = new Image();
    //    buttonV.src = './images/buttonV.gif';
    //alert("elem.width/2-7= "+(elem.width/2-7))
    contextV.fillStyle = "#DFCFC0";
    contextV.fillRect(0, 0, elem.width, elem.height);
    contextV.lineWidth = 10;
    contextV.strokeStyle = "rgb(57,82,148)";
    //console.log("paintV elem.height= "+elem.height)
    contextV.lineCap = "round";
    contextV.beginPath();
    contextV.moveTo(elem.width / 2, 5);
    contextV.lineTo(elem.width / 2, elem.height - 6);
    contextV.stroke();
    contextV.fillStyle = "#A52AFF"; //rgb(110,110,148)";
    contextV.fillRect(elem.width / 2 - 7, ybutton, wbutton, hbutton);
    //	contextV.drawImage(buttonV,elem.width/2-10,elem.height-26)
}

function paintT() {

    var x2 = 0;
    var y1 = 0;
    var y2 = 0;
    switch (orientation) {
        case horiz:
            x2 = xint;
            y1 = 0;
            y2 = heightT - 1;
            contextT.fillStyle = backColor;
            contextT.fillRect(x2, y1, widthT - 1 - x2, y2);
            //	   g.setColor(this.getBackground());
            //	   g.fillRect(x2, y1,d.width - 1- x2, y2); //только для гориз!
            break;
        case vert:
            x2 = widthT; //** - 1;
            y1 = yint;
            y2 = heightT - yint;
            break;
        default:
            x2 = xint;
            y1 = 0;
            y2 = heightT - 1;
    }
    contextT.fillStyle = foreColor;
    contextT.fillRect(0, y1, x2, y2);
    //	   g.setColor(this.getForeground());
    //	   g.fillRect(0, y1, x2, y2);
    //только для гориз!
    contextT.strokeStyle = "black";
    contextT.beginPath();
    contextT.moveTo(0, y1);
    contextT.lineTo(x2, y1);
    contextT.stroke();
}

function mouseReleased(e) {
    bBeginDrag = false;
    dyV = 0;
}

function mousePressed(e) {
    CanvasV = document.getElementById('CanvasV');
    var mouse = {
        x: e.clientX - Math.round(CanvasV.getBoundingClientRect().left),
        y: e.clientY - Math.round(CanvasV.getBoundingClientRect().top)
    }
    if (mouse.x > xleft && mouse.x < xleft + wbutton && mouse.y > ybutton && mouse.y < ybutton + hbutton) {
        bBeginDrag = true;
        dyV = ybutton - mouse.y + dyV;
    } else bBeginDrag = false;
    //console.log("mouse.x>xleft= "+(mouse.x>xleft)+" mouse.x<xleft+wbutton= "+(mouse.x<xleft+wbutton)+" mouse.y>ybutton= "+(mouse.y>ybutton)+" mouse.y<ybutton+hbutton= "+(mouse.y<ybutton+hbutton)+" mouse.y= "+mouse.y+" bBeginDrag= "+bBeginDrag)
} //mouseDown
function mouseDragged(e) {
    CanvasV = document.getElementById('CanvasV');
    var newY = e.clientY - Math.round(CanvasV.getBoundingClientRect().top);
    if ((bBeginDrag) && (newY + dyV > 7) && (ybutton < 68)) {
        //console.log("newY= "+newY+" ybutton= "+ybutton+" dyV= "+dyV+" bBeginDrag= "+bBeginDrag)
        if (newY + dyV < 7) ybutton = 7;
        //		if(newX  < xr-dx) imX = xr;	
        else
        if ((newY + dyV) > 67)
            ybutton = 67;
        else ybutton = newY + dyV;
        elem = document.getElementById('CanvasV');
        paintV();
        set_V((67 - ybutton) / 2);
        set_V5((67 - ybutton) / 2);
        //console.log("mouseDragged (67 -ybutton)/2= "+(67 -ybutton)/2)	
    }
}
// ============================================  
// keyPressed
// ============================================
/*function checkPressed(e)  {
    var code = e.keyCode;
  	elem = document.getElementById('CanvasV');
//  if(isProgram) return;
  switch(code) {
    case 37:
	  if ((ybutton) > 5) {
//	  if ((imX) > xr) {
		  ybutton--;
	  }
	  break;
    case 39:
	  if ((ybutton) < 68) {
		  ybutton++;
	  }
	  break;
  }
  paintV();
}

  function mouseDown(Event e, int x, int y)
  {
      if (editable)
	  {
		xint = x;
		yint = y;
		repaint();
		par.action(e,this);
		return true;
	  }
	  else 
		return false;
  }

  function mouseDrag(Event e, int x, int y)
  {
      if (editable)
	  {
		xint = x;
		yint = y;
		repaint();
		par.action(e,this);
		return true;
	  }
	  else 
		return false;
  }
*/
function outValueT() {
    return orientation == horiz ? xint : yint;
}

function setValueT(tmp) {
    //console.log("setValueT orientation= "+orientation+" tmp= "+tmp)
    if (orientation == horiz) xint = tmp;
    else yint = tmp;
    paintT();
}

function setForeColor(tmp) {
    foreColor = tmp;
}

function setBackColor(tmp) {
    backColor = tmp;
}
/*function roundedRect(ctx,x,y,width,height,radius){
  ctx.beginPath();
  ctx.moveTo(x,y+radius);
  ctx.lineTo(x,y+height-radius);
  ctx.quadraticCurveTo(x,y+height,x+radius,y+height);
  ctx.lineTo(x+width-radius,y+height);
  ctx.quadraticCurveTo(x+width,y+height,x+width,y+height-radius);
  ctx.lineTo(x+width,y+radius);
  ctx.quadraticCurveTo(x+width,y,x+width-radius,y);
  ctx.lineTo(x+radius,y);
  ctx.quadraticCurveTo(x,y,x,y+radius);
  ctx.stroke();
}*/