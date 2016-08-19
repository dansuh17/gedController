/**
 * Draws cumulative graphs of fighters' punch counts.
 * Graphs' punch counts are the sum of the each punch count KISWE user have made.
 * by Minki Chung 8/17/2016
 */

//total running time for graphs(in minutes) is x_range * timeInterval /1000
var x_range = 900;
var y_range = 100;
var timeInterval = 1000;
var fighterA = "../../assets/images/fA.png";
var fighterB = "../../assets/images/fB.png";

// FIXME: Size should be responsive to any mobile devices
var margin = {top: 10, right: 10, bottom: 10, left: 10};
var width = parseInt(d3.select("#graphContainer").style("width"));
var height = parseInt(d3.select("#graphContainer").style("height"));

//Works only for iPhone6
//var width = 420;
//var height = 240;

//match data
var punchCountA = 0;
var punchCountB = 0;
var gameGoingOn = false;

//initialization
var d3random = d3.randomNormal(0,1);
var dataA = d3.range(0).map(d3random);
var dataB = d3.range(0).map(d3random);
var currentTick = 0;

//From now on it is about drawing graph
var svg = d3.select("svg");

var g = svg.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var div = g.append("div")
	.attr("class", "tooltip")
	.style("opacity", 0);

var x = d3.scaleLinear()
	.domain([0, x_range])
	.range([0, width]);

var y = d3.scaleLinear()
	.domain([0, y_range])
	.range([height, 0]);

var d3lineA = d3.line()
		.curve(d3.curveBasis)
		.x(function(d, i) { return x(i); })
		.y(function(d) { return y(d); });

var d3lineB = d3.line()
		.curve(d3.curveBasis)
		.x(function(d, i) { return x(i); })
		.y(function(d) { return y(d); });

//main graph drawing function
function tick1() {

	// redraw the line.
	if (currentTick <= x_range) {
		currentTick++;

		//get punch count data
		$.ajax({
			url: "http://ged.uwcj.kr/punch/",
			dataType: "jsonp",
			success: function (data) { punchCountA = data.fighter1; }
		});

        //check whether game is going on or not
		$.ajax({
			url: "http://ged.uwcj.kr/votes/",
			dataType: "jsonp",
			success: function (data) { gameGoingOn = data.gameGoingOn; }
		});

		if (gameGoingOn) { dataA.push(punchCountA); }

		d3.active(this)
			.transition()

            //recursive part
			.on("start", tick1)
			d3.select(this)
				.attr("d", d3lineA)
				.attr("transform", null)
				.style("fill", "none")
				.style("stroke-width", height / 70 + "px")
				.style("stroke", "e91a67");

        //attach fighters' images and current punch count in front of graphs
		g.selectAll(".fighterA").remove();

		g.append("svg:image")
			.attr("class", "fighterA")
			.attr("xlink:href", fighterA)
			.attr("width", width / 10)
			.attr("height", width / 10)
			.style("opacity", 1)
			.attr("x", width * dataA.length / x_range)
			.attr("y", height - height*punchCountA / y_range - width / 16);

		g.append("text")
			.attr("class", "fighterA")
			.text(punchCountA)
			.attr("font-size", width / 30 + "px")
			.attr("font-family", "HelveticaNeue")
			.style("opacity", 1)
			.attr("x", width * dataA.length / x_range + width / 10)
			.style("stroke", "e91a67")
			.style("fill", "e91a67")
			.attr("y", height - height * punchCountA / y_range - width / 32);

	}
}

//same as function tick1()
function tick2() {

	// redraw the line.
	if (currentTick <= x_range) {

		//get punch count data
		$.ajax({
			url: "http://ged.uwcj.kr/punch",
			dataType: "jsonp",
			success: function (data) { punchCountB = data.fighter2; }
		});

		if (gameGoingOn) { dataB.push(punchCountB); }

		d3.active(this)
			.transition()

            //recursive part
			.on("start", tick2);

		d3.select(this)
			.attr("d", d3lineB)
			.attr("transform", null)
			.style("fill", "none")
			.style("stroke-width", height / 70 + "px")
			.style("stroke", "32bdf0");

        //attach fighters' images and current punch count in front of graphs
		g.selectAll(".fighterB").remove();

		g.append("svg:image")
			.attr("class", "fighterB")
			.attr("xlink:href", fighterB)
			.attr("width", width / 10)
			.attr("height", width / 10)
			.style("opacity", 1)
			.attr("x", width * dataB.length / x_range)
			.attr("y", height - height*punchCountB/y_range - width/16); //- height of image

		g.append("text")
			.attr("class", "fighterB")
			.text(punchCountB)
			.attr("font-size", width / 30 + "px")
			.attr("font-family", "HelveticaNeue")
			.style("opacity", 1)
			.attr("x", width*dataB.length / x_range + width / 10)
			.style("stroke", "32bdf0")
			.style("fill", "32bdf0")
			.attr("y", height - height * punchCountB / y_range - width / 32); //- height of image
	}
}

//designate border line of the graphs
g.append("defs").append("clipPath")
	.attr("id", "clip")
	.append("rect")
	.attr("width", width)
	.attr("height", height);

g.append("g")
	.attr("clip-path", "url(#clip)")
	.append("path")
	.datum(dataA)
	.transition()
	.duration(timeInterval)

    //tick
	.on("start", tick1);

g.append("g")
	.attr("clip-path", "url(#clip)")
	.append("path")
	.datum(dataB)
	.transition()
	.duration(timeInterval)

    //tick
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
	.call(d3.axisLeft(y))

make_roundBorder(0, 5);
make_roundBorder(3, 2);
function make_roundBorder(roundNum, strokeWidth){
	for (var i = 0; i <= roundNum; i++) {
		g.append("rect")
			.attr("x", width / roundNum * i)
			.attr("y", 0)
			.attr("width", strokeWidth)
			.attr("height", height)
			.attr("fill","lightgrey");
	}
}

g.append("rect")
	.attr("x", 0)
	.attr("y", height)
	.attr("width", width + 2)
	.attr("height", 5)
	.attr("fill","darkgrey");

//graph grid
make_x_grid(27);
make_y_grid(16);
function make_x_grid (gridNum) {
	for (var i = 0; i < gridNum; i++){
		g.append("rect")
			.attr("x", width / gridNum * i)
			.attr("y", 0)
			.attr("width", 0.1)
			.attr("height", height)
			.attr("fill","lightgrey")
	}
}
function make_y_grid(gridNum) {
	for(var i = 1; i < gridNum; i++){
		g.append("rect")
			.attr("x", 0)
			.attr("y", height / gridNum * i)
			.attr("width", width)
			.attr("height", 0.1)
			.attr("fill","lightgrey");
	}
}

//round 1,2,3
put_roundTxt(3);
function put_roundTxt(roundNum) {
	for( var i = 1; i <= roundNum; i++){
		g.append("text")
			.attr("class", "text")
			.attr("text-anchor", "middle")
			.attr("x", width * ( 2 * i - 1) / 6)
			.attr("y", height / 10)
			.attr("font-size", width / 25 + "px")
			.attr("font-family", "HelveticaNeue")
			.text("Round " + i)
			.style("fill", "white");
	}
}


