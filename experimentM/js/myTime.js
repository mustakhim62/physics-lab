var tt = 0;

function TimeRepeat() {
    tt++;
    set_digits(tt);
    timerID = setTimeout("TimeRepeat()", 100);
}

function StartTime() {
    TimeRepeat();
    console.log("StartTime yball= " + yball)
}

function TimeStop() {
    clearTimeout(timerID);
    console.log("TimeStop yball= " + yball)
}

function clearTime() {
    set_digits(0);
    tt = 0;
}