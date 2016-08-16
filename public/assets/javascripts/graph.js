var n = 900; // count
var y_range = 100;
var timeInterval = 100;
var d3random = d3.randomNormal(0,1); // initialization
var dataA = d3.range(0).map(d3random);
var dataB = d3.range(0).map(d3random);


var fighterA = "../../assets/images/vote1.png";
var fighterB = "../../assets/images/vote2.png";
var eMark = "../../assets/images/emark.svg";
//
// var timezone = -(1000*60*60*4) + (1000*60*20.7); // -jsTime
//

var currentTick = 0;
var svg = d3.select("svg");

var margin = {top: 10, right: 0, bottom: 0, left: 25};
var width = parseInt(d3.select("#graphContainer").style("width"));
var height = parseInt(d3.select("#graphContainer").style("height"));
width = 480;
height = 250;

//width = window.innerWidth / 2 ;`
//height = window.innerHeight / 2;

var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var div = g.append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);


var punchCountA = 0;
var punchCountB = 0;
var gameGoingOn = false;

// graph
var x = d3.scaleLinear()
    .domain([0, n - 1])
    .range([0, width]);

var y = d3.scaleLinear()
    .domain([0, y_range])
    .range([height, 0]);

var d3lineA = d3.line()
        .curve(d3.curveBasis)
        .x(function(d, i) { return x(i); })
        .y(function(d, i) { return y(d); })
    ;

var d3lineB = d3.line()
        .curve(d3.curveBasis)
        .x(function(d, i) { return x(i); })
        .y(function(d, i) { return y(d); })
    ;


//main function
function tick1() {
    // Redraw the line.
    if (currentTick <= n) {
        currentTick++;
        //get vote data
        $.ajax({
            url: "http://ged.uwcj.kr:3000/votes/get", ///perhaps change
            dataType: "jsonp",
            success: function (data) {

                punchCountA = data.devinUp; //punchCountA = data.punchCountA;
                // punchCountB = data.tomUp; //punchCountB = data.punchCountB;
                gameGoingOn = data.gameGoingOn;
            }
        });

        if (gameGoingOn) {

            dataA.push(punchCountA);
            // dataB.push(punchCountB);
        }

        d3.active(this)
            .transition()
            .on("start", tick1) //recursive
        // if (currentWinning >= 0) {
            d3.select(this)
                .attr("d", d3lineA)
                .attr("transform", null)
                .style("fill", "none")
                .style("stroke-width", height/70+"px")
                .style("stroke", "e91a67");

        g.selectAll(".fighterA").remove();

        g.append("svg:image")
            .attr("class", "fighterA")
            .attr("xlink:href", fighterA)
            .attr("width", width/10)
            .attr("height", width/10)
            .style("opacity", 1)
            .attr("x", width*dataA.length/n)
            .attr("y", height - height*punchCountA/y_range - width/16); //- height of image

        g.append("text")
            .attr("class", "fighterA")
            .text(punchCountA)
            .attr("font-size", width/30+"px")
            .attr("font-family", "HelveticaNeue")
            .style("opacity", 1)
            .attr("x", width*dataA.length/n - width/16)
            .style("stroke", "e91a67")
            .style("fill", "e91a67")
            .attr("y", height - height*punchCountA/y_range - width/32); //- height of image

    }
}

function tick2() {
    // Redraw the line.
    if (currentTick <= n) {

        //get vote data
        $.ajax({
            url: "http://ged.uwcj.kr:3000/votes/get", ///perhaps change
            dataType: "jsonp",
            success: function (data) {

                // punchCountA = data.devinUp; //punchCountA = data.punchCountA;
                punchCountB = data.tomUp; //punchCountB = data.punchCountB;
                gameGoingOn = data.gameGoingOn;
            }
        });

        if (gameGoingOn) {

            // dataA.push(punchCountA);
            dataB.push(punchCountB);
        }

        d3.active(this)
            .transition()
            .on("start", tick2); //recursive
        // if (currentWinning >= 0) {

        d3.select(this)
            .attr("d", d3lineB)
            .attr("transform", null)
            .style("fill", "none")
            .style("stroke-width", height/70+"px")
            .style("stroke", "32bdf0");

        g.selectAll(".fighterB").remove();

        g.append("svg:image")
            .attr("class", "fighterB")
            .attr("xlink:href", fighterB)
            .attr("width", width/10)
            .attr("height", width/10)
            .style("opacity", 1)
            .attr("x", width*dataB.length/n)
            .attr("y", height - height*punchCountB/y_range - width/16); //- height of image

        g.append("text")
            .attr("class", "fighterB")
            .text(punchCountB)
            .attr("font-size", width/30+"px")
            .attr("font-family", "HelveticaNeue")
            .style("opacity", 1)
            .attr("x", width*dataB.length/n - width/16)
            .style("stroke", "32bdf0")
            .style("fill", "32bdf0")
            .attr("y", height - height*punchCountB/y_range - width/32); //- height of image
    }
}

g.append("defs").append("clipPath")
    .attr("id", "clip")
    .append("rect")
    .attr("width", width)
    .attr("height", height);

g.append("g")
    .attr("clip-path", "url(#clip)")
    .append("path")
    .datum(dataA)
    // .attr("class", "d3lineA")
    .transition()
    .duration(timeInterval)
    // .ease(d3.easeLinear)
    .on("start", tick1);  /// tick is the main function that draws the line

g.append("g")
    .attr("clip-path", "url(#clip)")
    .append("path")
    .datum(dataB)
    // .attr("class", "d3lineB")
    .transition()
    .duration(timeInterval)
    // .ease(d3.easeLinear)
    .on("start", tick2);

//axis
g.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", "translate(0," + y(0) + ")")
    .attr("display", "none")
    .call(d3.axisBottom(x));

g.append("g")
    .attr("class", "axis axis--y")
    .attr("display", "none")
    // .attr("stroke", "lightgrey")
    .call(d3.axisLeft(y))
   // .append("text")
   //  .attr("transform", "rotate(-90)")
   //  // .attr("x", 0 )
   //  .attr("y", width/20)
   //  .attr("font-size", width/40+"px")
   //  .attr("font-family", "HelveticaNeue")
   //  .style("fill", "white")
   //  .text("Punch Count");

//axis text
/*
g.append("text")
    .attr("class", "text")
    .attr("text-anchor", "middle")
    .attr("y", 10)
    .attr("dy", ".75em")
    .attr("transform", "translate("+ (-margin.left/1.5) +", "+ (height/2) +")rotate(-90)")
    .text("who's winning");
*/

// x
make_roundBorder(0, 5);
make_roundBorder(3, 2);
function make_roundBorder(roundNum, strokeWidth){
    for(var i=0; i<=roundNum; i++){
        g.append("rect")
            .attr("x", width/roundNum*i)
            .attr("y", 0)
            .attr("width", strokeWidth)
            .attr("height", height)
            .attr("fill","lightgrey");
    }
}

// y
g.append("rect")
    .attr("x", 0)
    .attr("y", height)
    .attr("width", width)
    .attr("height", 5)
    .attr("fill","darkgrey");


//graph grid

 make_x_grid(27);
 make_y_grid(16);

// function for the x grid lines
function make_x_grid(gridNum) {
    for(var i=0; i<gridNum; i++){
        g.append("rect")
            .attr("x", width/gridNum*i)
            .attr("y", 0)
            .attr("width", 0.1)
            .attr("height", height)
            .attr("fill","lightgrey")
    }
}

// function for the y grid lines
function make_y_grid(gridNum) {
    for(var i=1; i<gridNum; i++){
        g.append("rect")
            .attr("x", 0)
            .attr("y", height/gridNum*i)
            .attr("width", width)
            .attr("height", 0.1)
            .attr("fill","lightgrey");
    }
}

//round 1,2,3
put_roundTxt(3);

function put_roundTxt(roundNum) {
    for(var i=1; i<=roundNum; i++){
        g.append("text")
            .attr("class", "text")
            .attr("text-anchor", "middle")
            .attr("x", width*(2*i-1)/6)
            // .attr("y", +height*9.5/10 )
            .attr("y", height*1/10)
            .attr("font-size", width/25+"px")
            .attr("font-family", "HelveticaNeue")
            .text("Round " + i)
            .style("fill", "white");
    }
}


