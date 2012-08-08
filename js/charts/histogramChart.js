define([], function(){

  return function (opts) {
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

    var bar = svg.selectAll(".bar")
        .data(hist_data)
      .enter().append("g")
        .attr("class", "bar")
        .attr("transform", function(d) { return "translate(" + x(d.x) + "," + y(d.y) + ")"; });

    bar.append("rect")
        .attr("width", function(d){return x(d.dx);})
        .attr("height", function(d) { return chart_height - y(d.y); });

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + chart_height + ")")
        .call(xAxis);

    svg.append("g")
        .attr('class', 'y axis')
        .attr('transform', 'translate(0,0)')
        .call(yAxis);

}});