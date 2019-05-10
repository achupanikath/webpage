const d3 = require("d3"),
    jsdom = require("jsdom");
const document = jsdom.jsdom(),
     svg = d3.select(document.body).append("svg");


const margin = { top: 20, right: 10, bottom: 100, left: 50 };
    width = 700 - margin.right - margin.left,
    height = 500 - margin.top - margin.bottom;

    svg = d3.select(document.body)
    .append("svg")
    .attr({
        "width": width + margin.right + margin.left,
        "height": height + margin.top + margin.bottom
    })
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.right + ")");
var xScale = d3.scale.ordinal()
    .rangeRoundBands([0, width], 0.2, 0.2);

var yScale = d3.scale.linear()
    .range([height, 0]);

// define x axis and y axis
var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left");

d3.json("webData.json", function (error, data) {
    if (error) console.log("Error: data not loaded!");
    data.forEach(function (d) {
        d.key = Object.keys(d)[0];
        d.Arrest = +d["Arrest"];
        console.log(d.Arrest);
    });
});
