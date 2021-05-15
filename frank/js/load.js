var httpRequest;
var nstr = [5, 6, 6, 9, 7, 6];
var nstart = 0;
var nend;
var text_load = new Array();
var text_array = new Array();
//alert(window.location);
//var current_gaz=3;
function OnLoad() {
    httpRequest = new XMLHttpRequest();
    //alert("OnLoad httpRequest= "+httpRequest)
    httpRequest.open("GET", "./data/energy1.dat", true);
    //httpRequest.open("GET", "http://localhost/teachmen/work/atomic_new/frank/data/energy1.dat", true);
    httpRequest.onreadystatechange = OnRequestStateChange;
    httpRequest.send(null);
}

function OnRequestStateChange() {
    if (httpRequest.readyState != 4)
        return;
    if (httpRequest.status != 200)
        return;
    text_load = httpRequest.responseText;
    text_array = text_load.split("\n");
    //alert(text_array);
    //document.getElementById("textPlace").innerHTML = text_load;
}

function load(current_gaz) {
    nstart = 0;
    //console.log("load text_array.length= "+text_array.length);
    //	text_array=text_load.split("\n");
    for (i = 0; i < current_gaz; i++) nstart += parseInt(nstr[i]);
    nend = nstart + parseInt(nstr[current_gaz]);
    //alert("load current_gaz= "+current_gaz+" nstart= "+nstart+" nend= "+nend)
    for (i = nstart; i < nend; i++) {
        tt = text_array[i].split(" ");
        energys[i].energy = tt[0];
        //alert("i= "+i+" tt[0]= "+tt[0]+' energys[i].energy'+energys[i].energy )
        energys[i].ntransition = tt[1];
        energys[i].nt[0] = tt[2];
        energys[i].nt[1] = tt[3];
        energys[i].nt[2] = tt[4];
        energys[i].c[0] = tt[5];
        energys[i].c[1] = tt[6];
        energys[i].c[2] = tt[7];
        //alert(energys[i].valueOf())	
    }
    //alert("load current_gaz= "+current_gaz+" "+JSON.stringify(energys[nend-1], null, 3));	
    //console.log("load current_gaz= "+current_gaz+" nend= "+nend+" energys[nend-1].energy= "+energys[nend-1].energy)
}