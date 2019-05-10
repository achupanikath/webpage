const express = require("express");
const app = express();
const file = require("./webData.json");
const bodyParser = require('body-parser')

app.use(bodyParser.json());

var margin = { top: 20, right: 50, bottom: 30, left: 20 },
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width]);

var y = d3.scale.linear()
    .rangeRound([height, 0]);

var z = d3.scale.category10();

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");
var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.json("webData.json", type, function (error, crimea) {
    if (error) throw error;

    var layers = d3.layout.stack()(causes.map(function (c) {
        return crimea.map(function (d) {
            return {};
        });
    }));
});


app.get('/primarylist', function (req, res) {

    let arr = [];
    arr = file.map(function (elem) {
        return Object.keys(elem)[0];
    })//makes an array of the keys- the list of Primary Types
    res.send(arr);
});


app.post('/arrestgraph', function (req, res) {
    let sample = req.body.selectedList;
    let arr = [];
    sample.forEach((item) => {
        file.forEach(element => {
            if (Object.keys(element)[0] === item)
                arr.push(element);
        });
    });
    res.send(arr);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App is listening on port ${port}...`));