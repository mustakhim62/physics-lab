/*{Кубический интерполяционный сплайн}
program Spline;
uses crt; {модуль управления экраном}
type vector=array [0..100] of real; {Нумеруем точки с нуля}
var x,y,c:vector;
    x0,x9,h,x1,p,p1,p2,e:real;
    n,i:integer;
 
procedure InputData (var n:integer; var x,y:vector); {Ввод исходных данных}
var i:integer;
begin
 write ('Введите количество точек n (3<n<100): ');
 read (n);
 for i:=1 to n do begin
  write ('Введите точку x[',i,'], f(x[',i,']): ');
  read (x[i-1], y[i-1]);
 end;
end;*/
//var c=new Array();
var p, p1, p2, e;

function Coeff(n, x, f) {
    //{Вычисление коээфициентов сплайна}
    //alert("begin Coeff  n= "+n+" x= "+x);
    var i, j, m;
    var a, b, r;
    var k = new Array();
    var c1 = new Array();
    // {Прямой ход прогонки}
    k[1] = 0;
    c1[1] = 0;
    for (i = 2; i < n; i++) { //i:=2 to n do begin
        j = i - 1;
        m = j - 1;
        a = x[i] - x[j];
        b = x[j] - x[m];
        r = 2 * (a + b) - b * c1[j];
        c1[i] = a / r;
        k[i] = (3.0 * ((f[i] - f[j]) / a - (f[j] - f[m]) / b) - b * k[j]) / r;
        //console.log("Coeff  i= "+i+"  k["+i+"]= "+k[i]+"  c1["+i+"]= "+c1[i]);
    } //end;
    // {Обратный ход прогонки}
    c1[n - 1] = k[n - 1];
    for (i = n - 2; i > 1; i--) /* i:=n-1 downto 2 do*/ {
        c1[i] = k[i] - c1[i] * c1[i + 1];
        console.log(" i= " + i + " c1[i]= " + c1[i])
    }
    //alert("end Coeff  c1= "+c1);
    return c1;
}

function Spl(n, x, f, c, x1) {
    //function Spl (n:integer; var x,f,c:vector; x1:real; var p,p1,p2:real);
    /*{Построение сплайна. x,f - исходные данные, c - вектор коэффициентов,
    наденный процедурой Coeff, x1 - значение x, для которого строим сплайн,
    p - значение сплайна в точке, p1,p2 - 1-я и 2-я производные}*/
    var i, j;
    var a, b, d, q, r;
    i = 2;
    while ((x1 > x[i]) && (i != n - 2)) { i = i + 1; } // {Ищем номер соседнего узла}
    //console.log("Spl n= "+n+" x= "+x+" x1= "+x1+" i= "+i)
    // {Промежуточные переменные и коэффициенты}
    j = i - 1;
    a = f[j];
    b = x[j];
    q = x[i] - b;
    //console.log("j= "+j+" a= "+a+" b= "+b+" q= "+q)
    r = x1 - b;
    p = c[i];
    d = c[i + 1];
    console.log("r= " + r + " p= " + p + " d= " + d)
    b = (f[i] - a) / q - (d + 2 * p) * q / 3.0;
    d = (d - p) / q * r;
    // console.log("b= "+b+" d= "+d)
    //{Считаем значения сплайна и его производных:}
    p1 = b + r * (2 * p + d);
    p2 = 2 * (p + d);
    p = a + r * (b + r * (p + d / 3.0))
}
/*begin
 clrscr; {очистить экран}
 writeln ('Построение кубического интерполяционного сплайна');
 InputData (n,x,y);
 
 Coeff (n,x,y,c); {Нашли коэффициенты C с помощью прогонки}
 {Строим таблицу значений сплайна}
 writeln ('Значение X':19,'Значение F(X)':19,'Сплайн':19,'Ошибка':19);
 for i:=0 to n do begin
  Spl (n,x,y,c,x[i],p,p1,p2);
  e:=abs(y[i]-p);
  writeln (x[i]:19:8,y[i]:19:8,p:19:8,e:19:8);
 end;
 reset (input); readln;
end.*/