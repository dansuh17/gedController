var n = 90,                        // count
    random = d3.randomNormal(0,1),  // initialization
    data = d3.range(0).map(random);

var fighterA = "http://www.sherdog.com/image_crop.php?image=http://www.origin.sherdog.com/_images/fighter/20151018082752_1DX_3720.JPG&&width=200&&height=300",
fighterB = "http://www.sherdog.com/image_crop.php?image=http://www.origin.sherdog.com/_images/fighter/20160619102650_DevinPowell.JPG&&width=200&&height=300";

var svg = d3.select("svg"),
    margin = {top: 100, right: 100, bottom: 100, left: 100},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");




    // graph

    var x = d3.scaleLinear()
.domain([0, n - 1])
    .range([0, width]);

    var y = d3.scaleLinear()
.domain([-1, 1])
    .range([height, 0]);

var line = d3.line()
    .x(function(d, i) { return x(i); })
    .y(function(d, i) { return y(d); });


    g.append("defs").append("clipPath")
    .attr("id", "clip")
    .append("rect")
    .attr("width", width)
    .attr("height", height);

    g.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", "translate(0," + y(0) + ")")
    .attr("display", "none")
    .call(d3.axisBottom(x));

    g.append("g")
    .attr("class", "axis axis--y")
    //.attr("display", "none")
    .call(d3.axisLeft(y));

    g.append("g")
    .attr("clip-path", "url(#clip)")
    .append("path")
.datum(data)
    .attr("class", "line")
    .transition()
    .duration(1000)
.ease(d3.easeLinear)
    .on("start", tick);

    g.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "middle")
    .attr("y", 10)
    .attr("dy", ".75em")
    .attr("transform", "translate("+ (-margin.left/1.5) +", "+ (height/2) +")rotate(-90)")

    //.attr("transform", "rotate(-90)")
    .text("who's winning");

    //axis
    g.append("rect")
    .attr("x", width/3)
    .attr("y", 0)
    .attr("width", 1)
    .attr("height", height)
    .attr("fill","lightgrey")

    g.append("rect")
    .attr("x", width*2/3)
    .attr("y", 0)
    .attr("width", 1)
    .attr("height", height)
    .attr("fill","lightgrey")

    g.append("rect")
    .attr("x", width)
    .attr("y", 0)
    .attr("width", 1)
    .attr("height", height)
    .attr("fill","lightgrey")

    g.append("rect")
    .attr("x", 0)
    .attr("y", height/2)
    .attr("width", width)
    .attr("height", 1)
    .attr("fill","darkgrey")

    //round 1,2,3
    g.append("text")
    .attr("class", "round")
    .attr("text-anchor", "middle")
    .attr("x", width*1/6)
    .attr("y", 0)
    .text("round1")

    g.append("text")
    .attr("class", "round")
    .attr("text-anchor", "middle")
    .attr("x", width*3/6)
    .attr("y", 0)
    .text("round2")

    g.append("text")
    .attr("class", "round")
    .attr("text-anchor", "middle")
    .attr("x", width*5/6)
    .attr("y", 0)
    .text("round3")

    //add image of fighters
    g.append("svg:image")
    .attr("class", "fighter a")
    .attr("xlink:href", fighterA)
    .attr("width", 50)
    .attr("height", 50)
    .attr("transform", "translate("+ (-margin.left/1.2) +", "+ (height/1.15) +")");


    g.append("svg:image")
    .attr("class", "fighter b")
    .attr("xlink:href", fighterB)
    .attr("width", 50)
    .attr("height", 50)
    .attr("transform", "translate("+ (-margin.left/1.2) +", "+ 0 +")");


    /////////////

    var currentWinning = 0;
    var gameGoingOn = true; ////////////

    var sheet = document.getElementById('stylesheet');

    //tick();

    function tick() {
        // Redraw the line.
        $.ajax({
            url: "http://ged.uwcj.kr:3000/votes/getCurrentWinning",
            dataType: "jsonp",
            success: function(data) {
                currentWinning = ((data.devinUp/(data.tomUp + data.devinUp))-0.5)/0.5;

                if(currentWinning > 0) {tomWinning = true; devinWinning = false;}
                else if(currentWinning < 0) {tomWinning = false; devinWinning = true;}

                gameGoingOn = data.gameGoingOn;
            }
        });
        console.log("tick");
        if(gameGoingOn) {                
            data.push(currentWinning);  

        }
        d3.active(this)
            .transition()
            .on("start", tick);
        if(currentWinning>=0) {
            d3.select(this)
                .attr("d", line)
                .attr("transform", null)
                .style("fill", "none")
                .style("stroke", "blue");
        }
        else if(currentWinning<0){
            d3.select(this)
                .attr("d", line)
                .attr("transform", null)
                .style("fill", "none")
                .style("stroke", "red");
        };


    }