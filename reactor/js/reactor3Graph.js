	var width3 = 300;
	var height3 = 250;
	var n = new Array(120);
	var d1 = [];


	function init2() {
	    Canvas3 = refObj('Graph3');
	    cont = Canvas3.getContext('2d');
	}
	//==========================================================================
	function paint2() {
	    /*  var elem = document.getElementById('Graph3');
	      	cont = elem.getContext('2d');
	    	cont.fillStyle="black";
	    	cont.clearRect(0, 0, elem.width, elem.height);
	    	cont.fillRect(0,0,context.width,context.height); 
	    	cont.drawImage(graf2,0,0);
	    	cont.drawImage(ai,117,248);
	    	cont.drawImage(chi,10,36);
	    	var yy,dy;
	      for( i=0;i<n.length;i++){
	    	cont.fillStyle="rgb(0,200,0)";
	    	yy=((y0-2*n[i]>13)?y0-2*n[i]:13);
	    	dy=((y0-2*n[i]>13)?2*n[i]:y0-13);
	    	  cont.fillRect(xmin+i*w,yy,w,dy);
	    	cont.strokeStyle="rgb(50,100,40)";
	    	cont.beginPath();
	        cont.lineWidth=1;
	    	cont.moveTo(xmin+i*w+w-1,yy);
	    	cont.lineTo(xmin+i*w+w-1,y0);
	        cont.stroke();
	      }
	      if(isCross){
	    	drawCross(imX, imY0);
	    //	rcImage = new Rectangle(imX-imWidth+dx, imY0, 2*imWidth, 2*imHeight);
	    //	cont.strokeStyle="black";
	    	cont.fillStyle="white";
	    	cont.font = '16px bold Serif';
	    	xreal0=round_double(76.8+0.08*(imX+dx));
	    	cont.fillText("A = "+xreal0,xs0,ys);
	      }
	    */
	}
	/*/=============================================
	function drawCross( x, y)
	{
		cont.strokeStyle="white";
		cont.beginPath();
	    cont.lineWidth=1;
		cont.moveTo(x,y);
		cont.lineTo(x,y+2*imHeight2);
	    cont.stroke();
		cont.beginPath();
		cont.moveTo(x-imWidth2,y+imHeight2);
		cont.lineTo(x+imWidth2,y+imHeight2);
	    cont.stroke();
	}*/