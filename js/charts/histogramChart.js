

var coursera_age_data = ["16", "21", "22", "20", "66", "66", "26", "17", "44", "45", "54", "34", "27", "53", "37", "40", "20", "27", "45", "40", "24", "59", "46", "59", "15", "21", "18", "23", "15", "26", "59", "23", "21", "36", "29", "20", "33", "29", "20", "18", "15", "20", "61", "61", "57", "15", "49", "36", "38", "16", "20", "40", "28", "49", "47", "70", "29", "18", "23", "16", "53", "40", "16", "69", "25", "21", "15", "24", "39", "27", "30", "19", "59", "46", "59", "15", "21", "18", "23", "15", "26", "59", "23", "21", "36", "29", "20", "33", "29", "20", "16", "46", "26", "19", "25", "18", "25", "27", "19", "20", "19", "19", "65", "31", "21", "22", "46", "23", "19", "51", "18", "19", "19", "49", "59", "46", "59", "15", "21", "18", "23", "15", "26", "59", "23", "21", "36", "29", "20", "33", "29", "20", "16", "24", "45", "16", "39", "71", "22", "32", "26", "15", "31", "38", "62", "31", "29", "27", "16", "24", "31", "24", "22", "19", "36", "22", "16", "59", "46", "59", "15", "21", "18", "23", "15", "26", "59", "23", "21", "36", "29", "20", "33", "29", "20", "24", "16", "22", "29", "20", "59", "46", "59", "15", "21", "18", "23", "15", "26", "59", "23", "21", "36", "29", "20", "33", "29", "20"];
var opts = {
    el: "#coursera-age-histogram",
    data: coursera_age_data,
    bins: [0,12,18,24,30,40,50,60,70,80,90]
};

histogram(opts);

function histogram(opts) {
    opts = _.extend(
      {
        margin: {
          top: 10, 
          right: 30, 
          bottom: 30, 
          left: 30
        },
        width: 500, 
        height: 400,
        el: 'body',
        bins: null
      }, opts);
    
    var chart_width = opts.width - opts.margin.left - opts.margin.right,
        chart_height = opts.height - opts.margin.top - opts.margin.bottom,
        data = opts.data;

    var hist_data = d3.layout.histogram()
        .bins(opts.bins)
        (data);

    var x = d3.scale.linear()
        .domain([d3.min(hist_data, function(d){return d.x;}), d3.max(hist_data, function(d){return (d.x + d.dx);})])
        .range([0, chart_width]);

    var y = d3.scale.linear()
        .domain([0, d3.max(hist_data, function(d) { return d.y; })])
        .range([chart_height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .tickValues(opts.bins);

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient('left');

    var svg = d3.select(opts.el).append("svg")
        .attr("width", chart_width + opts.margin.left + opts.margin.right)
        .attr("height", chart_height + opts.margin.top + opts.margin.bottom)
      .append("g")
        .attr("transform", "translate(" + opts.margin.left + "," + opts.margin.top + ")");

    var bar = svg.selectAll(".histogram-bar")
        .data(hist_data)
      .enter().append("g")
        .attr("class", "histogram-bar")
        .attr("transform", function(d) { return "translate(" + x(d.x) + "," + y(d.y) + ")"; });

    bar.append("rect")
        .attr("width", function(d){return x(d.dx);})
        .attr("height", function(d) { return chart_height - y(d.y); });

    svg.append("g")
        .attr("class", "histogram-axis")
        .attr("transform", "translate(0," + chart_height + ")")
        .call(xAxis);

    svg.append("g")
        .attr('class', 'histogram-axis')
        .attr('transform', 'translate(0,0)')
        .call(yAxis);

};