var container = document.getElementById('container');
var data1 = [],
    data2 = [],
    data3 = [],
    graph;
var properties;
properties = {
    yaxis: {
        max: 30,
        min: 0,
        title: "I,&nbsp;&nbsp;<br>mA"
    },
    xaxis: {
        max: 90,
        min: 0,
        title: "&#966;, град"
    },
    grid: {
        backgroundColor: "cyan"
    },
    lines: { show: false },
    points: { show: true, radius: 1 }
};
graph = Flotr.draw(container, [data1, data2, data3], properties);