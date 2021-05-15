var button_no = 0;
var pics = new Array();
var ntask;

function windTasks(n) {
    var w = 850;
    var l = 0;
    ntask = n;
    if (screen.width > 800) {
        w = 800;
        l = 20;
    };
    window.open('../question/question.html?nt=' + ntask, 'Задачи', 'width=' + w + ',height=600,scrollbars=yes,left=' + l + ',top=10')
        //window.open('question.html','Задачи','width=780,height=600,scrollbars=yes,left=0,top=0')
}

function windOpen(s) {
    var w = 780;
    var h = 600;
    if (screen.width <= 800) {
        w = 600;
        h = 400;
    };
    window.open(s, null, 'width=' + w + ',height=' + h + ',left=50,top=80,scrollbars=yes') //530
}

function refObj(s) {
    if (document.getElementById) return document.getElementById(s);
    else return eval('document.all.' + s);
}

function initScroll() {
    //var ff=refObj("frames");
    //alert("f1.toString() "+f1.toString())
    //var ff=document.all.tags("frame");
    var s = "no";
    if (screen.width < 800) s = "yes";
    refObj("f1").setAttribute("scrolling", s);
    refObj("f2").setAttribute("scrolling", "auto");
}

function formEnter(e) {
    if (!e) {
        e = window.event;
        if (e.keyCode == 13) formOk();
    }
}

function makeArray() {
    this.length = makeArray.arguments.length
    for (var i = 0; i < this.length; i++)
        this[i + 1] = makeArray.arguments[i]
}

function preload(pic_name, pic1, pic2) {
    button_no++;
    pics[button_no] = new Array(3);
    pics[button_no][0] = pic_name;
    pics[button_no][1] = new Image();
    pics[button_no][1].src = pic1;
    pics[button_no][2] = new Image();
    pics[button_no][2].src = pic2;
}

function change_pic(pic_name, j) {
    var i;
    for (i = 1; i <= button_no; i++)
        if (pics[i][0] == pic_name) {
            document.images[pic_name].src = pics[i][j].src;
            break;
        }
}
preload('img_for_start', "images/start0.gif", "images/start1.gif");
preload('img_for_clear', "images/clear0.gif", "images/clear1.gif");
preload('img_for_eval', "images/eval0.gif", "images/eval1.gif");
preload('img_for_button1', "images/left_right0.gif", "images/left_right1.gif");
preload('img_for_button2', "images/left_right2.gif", "images/left_right3.gif");
preload('img_for_up', "images/up_down0.gif", "images/up_down1.gif");
preload('img_for_dn', "images/up_down2.gif", "images/up_down3.gif");