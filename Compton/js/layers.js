// Set browser-determined global variables
var NN = ((document.layers) ? true : false);
var hideName = 'hidden';
var showName = 'visible';
var zIdx = -1;
// Define a function to generate layers from dhtml.js
function genLayer(sName, sLeft, sTop, sWdh, sHgt, sVis, copy) {
    document.writeln('<DIV ID="' + sName + '" STYLE="position:absolute; overflow: auto; left:' +
        sLeft + 'px; top:' + sTop + 'px; width:' + sWdh + 'px; height:' + sHgt + 'px;' +
        ' visibility: ' + sVis + '; z-index=' + (++zIdx) + '">' +
        copy + '</DIV>'
    );
}
// Define a function to hide layers
function hideSlide(name) {
    refSlide(name).visibility = hideName;
}
// Define a function to reveal layers
function showSlide(name) {
    refSlide(name).visibility = showName;
}

// Define a central function to reference layers
function refSlide(name) {
    if (NN) { return document.layers[name]; } else { return eval('document.all.' + name + '.style'); }
}
// Define a central function to reference object
/*function refObject(name) {
	if (NN) { return ('document.' + name ); }
	else { return eval(name); }
	}*/
function hideDiv(j) {
    hideSlide("md" + j)
}

function showDiv(j) {
    showSlide("md" + j)
}