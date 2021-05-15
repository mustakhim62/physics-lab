var itable = 0;
var nrows = 1;
var ncols = 1;
var widthT = 320
var heightT = 75;
var w_col, h_row, w1;
var w1col = 0;
var k = 0;
var nspace = 2; //3;
var cells = new Array();
var labels = [String.fromCharCode(920) + String.fromCharCode(176), "A", "h" + String.fromCharCode(957) + "',кэВ"];

MyCell = function(cont, value, backgr, x0, y0, w, h, k) {
    this.cont = cont,
        this.value = value,
        this.x0 = x0,
        this.y0 = y0,
        this.w = w,
        this.h = h,
        this.k = k,
        this.backgr = backgr,
        this.setValue = function(v) { value = v },
        this.getValue = function() { return value },
        this.drawCell = function() {
            cont.fillStyle = backgr;
            cont.fillRect(x0, y0, w, h);
            cont.strokeStyle = "black";
            cont.strokeRect(x0, y0, w, h);
            cont.stroke();
            cont.fillStyle = "black";
            cont.font = '14px bold sans-serif';
            cont.textBaseline = "top";
            cont.textAlign = "center";
            val = String(value);
            line = val.length;
            xs = (w - line) / 2;
            if (k == 1) xs = xs + 3;
            //alert("val= "+val+" typeof(val)= "+typeof(val)+" xs= "+xs)
            cont.fillText(val, x0 + xs, y0 + 2);
        }
}

function prepare_screenT(cont, nrows, ncols) {
    this.nrows = nrows;
    this.ncols = ncols;
    cont.fillStyle = "white"; //rgb(224,224,224)";
    cont.fillRect(0, 0, widthT, heightT);
    cont.strokeStyle = "rgb(32,32,32)";
    cont.strokeRect(0, 0, widthT - 1, heightT - 1);
    cont.strokeRect(2 * nspace, 2 * nspace, widthT - 4 * nspace, heightT - 4 * nspace);
    xint = 2 * nspace;
    for (i = 0; i < nrows; i++) {
        yint = 3 * nspace + (h_row + nspace) * i;
        cont.strokeRect(xint + 1, yint + 1, w1 - 4, h_row - 4);
    }
    cont.stroke();
    //===============================
    var n = (w1col == 0) ? ncols : ncols - 1;
    w_col = (widthT - w1col - nspace * (ncols + 3)) / n;
    w1 = (w1col == 0) ? w_col : w1col;
    h_row = (heightT - nspace * (nrows + 3)) / nrows;
    for (i = 0; i < nrows; i++) {
        cells[i] = new Array(ncols);
        yint = 3 * nspace + (h_row + nspace) * i;
        xint = 2 * nspace;
        if (i == 2) k = 1;
        else k = 0;
        cells[i][0] = new MyCell(cont, labels[i], "rgb(248,248,248)", xint + 2, yint + 2, w_col - 2, h_row - 2, k);
        cells[i][0].drawCell()
    }
    for (i = 1; i < ncols; i++) {
        xint = 2 * nspace + w1 + (w_col + nspace) * (i - 1);
        for (j = 0; j < nrows; j++) {
            yint = 3 * nspace + (h_row + nspace) * j;
            cells[j][i] = new MyCell(cont, "", "rgb(248,248,248)", xint + 1, yint + 1, w_col - 2, h_row - 2, k);
            cells[j][i].drawCell();

            //		cont.font = '12px plain sans-serif';
        }
    }
    //	 for ( i = 1;i<ncols;i++){ cells[1][i].setValue(i);cells[0][i].drawCell();}
}
//======================================================
function setValueTable(i, S) {
    nc = Math.floor(i / 3) + 1;
    nr = i % 3 - 1
        //alert("i= "+i+" nc= "+nc+" nr= "+nr)
    S = round_double(S);
    cells[nr][nc].setValue(S);
    cells[nr][nc].drawCell();
}
//======================================================
function clearTable() {
    //alert("input[i]._value"+input[0]._value)
    for (i = 1; i < ncols; i++)
        for (j = 0; j < nrows - 1; j++) {
            cells[j][i].setValue("");
            cells[j][i].drawCell();
        }
    for (i = 0; i < 5; i++) input[i].value("");

}