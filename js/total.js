function refObj(s) {
    if (document.getElementById) return document.getElementById(s);
    else return eval('document.all.' + s);
}

function windTasks(n) {
    var w = 850;
    var l = 0;
    ntask = n;
    if (screen.width > 800) {
        w = 800;
        l = 20;
    };
    window.open('../question/question.html?nt=' + ntask, '������', 'width=' + w + ',height=600,scrollbars=yes,left=' + l + ',top=10')
        //window.open('question.html','������','width=780,height=600,scrollbars=yes,left=0,top=0')
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