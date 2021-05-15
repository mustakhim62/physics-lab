img00 = new Image();
img00.src = "images/no.gif";
img01 = new Image();
img01.src = "images/smile1.gif";
img02 = new Image();
img02.src = "images/empty.gif";
var d = 1;

function refObj(s) {
    if (document.getElementById) return document.getElementById(s);
    else return eval('document.all.' + s);
}

function Restory() {
    refObj("pic").src = img02.src;
}
var im = '';
var act = '';
var tp = 'ol';
fm = '<form ID="form1" action="./">';
fmend = '<\/form>';
//var fm='';
//var fmend='';
function formSort(S, n) {
    if (S.length < 6) {
        d = 0;
        im = '<img src="images/empty.gif" ID="pic" style="position:absolute;top:32;left:330" WIDTH="63" HEIGHT="49" border="0" alt="sign">';
        act = ' STYLE="margin-left:-4" onClick="formOk()"';
        tp = 'ul';
        //fm='<form ID="form1" action="./">';
        //fmend='<\/form>';
    }
    shuffle(S, n);
    refObj("td_ol").innerHTML = buildol(S.length);
}

function buildol(k) {
    var s = fm + '<' + tp + ' COMPACT type="1"' + act + '>' + im;
    //var s='<form ID="form1" action="./"><'+tp+' COMPACT type="1"'+act+'>'+im;
    var t;
    for (j = 0; j < k; j++) {
        t = ((d == 0) ? 1 : j);
        s += '<li>' + '<input type="radio" style="border-style:none;font-size:14;text-align:left;padding-top:0;padding-bottom:0;background-color:#FFFFF8" name="choice' + t + '" ID="choice' + t + '" value="1">' + S[j] + '<\/li>'
    }
    s += '<\/' + tp + '>' + fmend; //<\/form>
    //  style="text-align:left;font-weight:bold;color:#0E5E9E"
    // onClick="formOk(pic)"
    return s;
}

function formOk() { // (imgname)
    var k = 0;
    var j = 0;
    for (i = 0; i < (S.length); i++) {
        if (n[i] == 1) k += 1 << i;
        if (document.forms[0].elements[i].checked == true) j += 1 << i; // +d
        //alert("k= "+k+" j= "+j);
    }
    if (k == j) {
        refObj("pic").src = img01.src;
    } else {
        refObj("pic").src = img00.src;
    }
    setTimeout("Restory()", 2000);
}