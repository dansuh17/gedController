var n = 900;                         // count
var d3random = d3.randomNormal(0,1); // initialization
var data = d3.range(0).map(d3random);

var fighterA = "assets/images/profile.png";
var fighterB = "assets/images/profile.png";
var eMark = "assets/images/emark.svg";

var timezone = -(1000*60*60*4) + (1000*60*20.7); // -jsTime
var jsTime = 0;

var currentTick = 0;
var svg = d3.select("svg"),
    margin = {top: 100, right: 100, bottom: 100, left: 100};
var width = +svg.attr("width") - margin.left - margin.right;
var height = +svg.attr("height") - margin.top - margin.bottom;
var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var div = g.append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

function addMark() {
    console.log("working")
    //if(reqHighlight.response.length > 10) {
         // tempHL = JSON.parse(reqHighlight.response).comments;
     var tempHL = clipInfo.vsrc + clipInfo.evid + "/highlights/" + clipData[done].files[0];
     console.log(tempHL);
    //}
    done++;
    g.append("svg:image:title")
        .attr("class", "eMark")
        .attr("xlink:href", eMark)
        .attr("width", 30)
        .attr("height", 30)
        .attr("x", width / n * (currentTick - 1) - 15)
        .attr("y", data[currentTick - 1] * (-1) * (height / 2) + (height / 2) - 15)
        .on("mouseover", function () {
            div.transition()
                .duration(200)
                .style("opacity", .9);
            div.html(tempHL) // done is variable for the order of highlights
                .attr("width", 30)
                .attr("height", 30)
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function () {
            this.transition()
                .duration(500)
                .style("opacity", 0);
        });
}

function addMarkAt(time_) {
    var tick = (new Date(time_).getTime() - eventStartTime*1000*60*2) / 1000 + (currentRound - 1) * 300;
    console.log("tick : "+tick);

    // if (tick < currentTick && tick > 0)
    if(true){
        tick = Math.floor(tick);
        if(reqHighlight.response.length > 10) {
            var tempHL = clipInfo.vsrc + clipInfo.evid + "/highlights/" + clipData[done].files[1];
            console.log(tempHL);
        }
        done++;
        g.append("svg:image")
            .attr("class", "eMark")
            .attr("xlink:href", eMark)
            .attr("width", 30)
            .attr("height", 30)
            .attr("x", width / n * (tick - 1) - 15)
            .attr("y", data[tick - 1] * (-1) * (height / 2) + (height / 2) - 15)
            ///tooltip
            .on("mouseover", function () {
                div.transition()
                    .duration(200)
                    .style("opacity", .9);
                div.html(tempHLV) // done is variable for the order of highlights
                    .attr("width", 30)
                    .attr("height", 30)
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function () {
                div.transition()
                    .duration(500)
                    .style("opacity", 0);
            });

    }

}



///event id
var eventID = "wsof_wsof32_20160727140717";
var eventIS = "api-v4";
    //for prod use
    //"api-v4";
    //for stage use
    //"stage-api";

var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJraXN3ZSIsInN1YiI6IjU3M2UxMzM4YTYzZjU5OWEwY2M4NjY1YyIsImV4cCI6IjIxMTUtMTEtMTZUMjA6MDg6MjkuNDg0WiJ9.L-JdjzIZ0Y6LHhtvygVyl-_DJUvJ7PWjbapNfp_Ea1s"
    //for prod, use this token
    //"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJraXN3ZSIsInN1YiI6IjU3M2UxMzM4YTYzZjU5OWEwY2M4NjY1YyIsImV4cCI6IjIxMTUtMTEtMTZUMjA6MDg6MjkuNDg0WiJ9.L-JdjzIZ0Y6LHhtvygVyl-_DJUvJ7PWjbapNfp_Ea1s"
    //for stage, use this token
    //"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJLaXN3ZSIsInN1YiI6IjU3M2UxMzU5NmU0ZjEzNjEwYWY5YjY4ZCIsImV4cCI6IjIwMTYtMTEtMTlUMTk6Mjk6NDYuMzE3WiJ9.AxazxY2ToE4e8qEOZEobI7jKbRf_P1xezJbps_8KrPI";


var gameStartTime;
var timeZone = -1000*60*60*4 + 1000*60*20; // for eastern time -4;
var eventStartTime = new Date().getTime() + timeZone;
var timediff = 0;

var reqEvent = new XMLHttpRequest();

reqEvent.open('GET', 'https://' + eventIS + '.kiswe.com:443/api/events/id/' + eventID, true);
reqEvent.setRequestHeader("Authorization", token);
reqEvent.send(null);

var isStart = false;
var currentRound = 0;

var currentWinning = 0;
var gameGoingOn = true; ////////////

var reqHighlight = new XMLHttpRequest();

var clipInfo = new Object();
var clipData = new Object();
var done = 0;

var flag = false;
var flag2 = 0;

function tick() {
    // Redraw the line.
    if (currentTick <= n) {

        $.ajax({
            url: "http://ged.uwcj.kr:3000/votes/getCurrentWinning",
            dataType: "jsonp",
            success: function (data) {
                currentWinning = ((data.devinUp / (data.tomUp + data.devinUp)) - 0.5) / 0.5;

                if (currentWinning > 0) {
                    tomWinning = true;
                    devinWinning = false;
                } else if (currentWinning < 0) {
                    tomWinning = false;
                    devinWinning = true;
                }
                gameGoingOn = data.gameGoingOn;
            }
        });

        if(reqHighlight.response.length > 10) {
            if (flag) {
                if (flag2 < 1) {
                    timediff += eventStartTime - ((new Date(JSON.parse(reqEvent.response).event.start_time).getTime()));
                    // flag2++;
                    // console.log(flag2);
                    console.log("real event start in db : " + JSON.parse(reqEvent.response).event.start_time);
                    console.log("real event start in date format : " + new Date(JSON.parse(reqEvent.response).event.start_time));
                    console.log("current event play : " + new Date(eventStartTime));
                    console.log("time diff in : " + timediff / 1000 / 60 / 60 / 24 + " day + " + (timediff / 1000 / 60 / 60) % 24 + " hours");
                }
                clipInfo = JSON.parse(reqHighlight.response).comments;
                clipData = clipInfo.el;
                if (flag2 < 1) {
                    console.log("first clip time in db : " + clipData[0].start_time);
                    console.log("first clip time in date format : " + new Date(clipData[0].start_time));
                    console.log("first clip in min : " + ((new Date(clipData[0].start_time).getTime()) + timediff - eventStartTime) / 1000 / 60);
                }
                flag2++;
                // timediff = (new Date().getTime()) - (new Date(clipData[0].start_time).getTime());
                for (var i = done; i < clipData.length; i++) {
                    var startIn = (new Date(clipData[i].start_time).getTime()) + timediff - (new Date().getTime() + timezone);
                    // console.log(startIn);
                    if (startIn < 0) {
                        // addMarkAt();
                        // done++;
                    } else {
                        break;
                    }
                }
            }
        }
        // console.log(clipData);

        flag = true;
        reqHighlight.open('GET', 'https://' + eventIS + '.kiswe.com:443/api/comments/' + eventID, true);
        reqHighlight.setRequestHeader("Authorization", token);
        reqHighlight.send(null);

        if (gameGoingOn) {
            if (!isStart) {
                currentRound++;
                gameStartTime = new Date().getTime();
            }
            isStart = true;
            data.push(currentWinning);
            currentTick++;
            if (Math.random() > 0.8) {
                addMark();

            }
        } else {
            isStart = false;
        }

        d3.active(this)
            .transition()
            .on("start", tick);
        if (currentWinning >= 0) {
            d3.select(this)
                .attr("d", d3line)
                .attr("transform", null)
                .style("fill", "none")
                .style("stroke", "e91a67");
        }
        else if (currentWinning < 0) {
            d3.select(this)
                .attr("d", d3line)
                .attr("transform", null)
                .style("fill", "none")
                .style("stroke", "32bdf0");
        }
    }

}






// graph
var x = d3.scaleLinear()
    .domain([0, n - 1])
    .range([0, width]);

var y = d3.scaleLinear()
    .domain([-1, 1])
    .range([height, 0]);

var d3line = d3.line()
    .x(function(d, i) { return x(i); })
    .y(function(d, i) { return y(d); });

g.append("defs").append("clipPath")
    .attr("id", "clip")
    .append("rect")
    .attr("width", width)
    .attr("height", height);

g.append("g")
    .attr("clip-path", "url(#clip)")
    .append("path")
    .datum(data)
    .attr("class", "d3line")
    .transition()
    .duration(1000)
    .ease(d3.easeLinear)
    .on("start", tick);  /// tick is the main function that draws the line

//axis
g.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", "translate(0," + y(0) + ")")
    .attr("display", "none")
    .call(d3.axisBottom(x));

g.append("g")
    .attr("class", "axis axis--y")
    .attr("display", "none")
    .attr("stroke", "darkgrey")
    .call(d3.axisLeft(y));

//axis text
g.append("text")
    .attr("class", "text")
    .attr("text-anchor", "middle")
    .attr("y", 10)
    .attr("dy", ".75em")
    .attr("transform", "translate("+ (-margin.left/1.5) +", "+ (height/2) +")rotate(-90)")
    .text("who's winning");

//x
make_roundBorder(3);
function make_roundBorder(roundNum){
    for(var i=0; i<=roundNum; i++){
        g.append("rect")
            .attr("x", width/roundNum*i)
            .attr("y", 0)
            .attr("width", 1)
            .attr("height", height)
            .attr("fill","lightgrey")
    }
}

//y
g.append("rect")
    .attr("x", 0)
    .attr("y", height/2)
    .attr("width", width)
    .attr("height", 1)
    .attr("fill","darkgrey")

//graph grid

make_x_grid(27);
make_y_grid(8);

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
            .attr("fill","lightgrey")
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
            .attr("y", -height*1/10)
            .attr("font-size", "20px")
            .text("Round " + i)
            .style("fill", "greycolor")
    }
}


//add image of fighters
g.append("svg:image")
    .attr("class", "fighter a")
    .attr("xlink:href", fighterA)
    .attr("width", 50)
    .attr("height", 50)
    .attr("y", 1/2*height - 50) //- height of image
    .attr("x", -1/7*width)

//.attr("transform", "translate("+ (-margin.left/1.2) +", "+ (height/1.15) +")");

g.append("svg:image")
    .attr("class", "fighter b")
    .attr("xlink:href", fighterB)
    .attr("width", 50)
    .attr("height", 50)
    .attr("y", 1/2*height)
    .attr("x", -1/7*width)

//.attr("transform", "translate("+ (-margin.left/1.2) +", "+ 0 +")");

/* tooltip
 var div = d3.select("body").append("div")
 .attr("class", "tooltip")
 .style("opacity", 0);
 */

