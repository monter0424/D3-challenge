// @TODO: YOUR CODE HERE!

//Define SVG area dimensions
var svgWidth = 900;
var svgHeight = 550

//Define the chart's margins as an object
var chartMargin = {
    top: 30,
    right: 30,
    bottom: 30,
    left: 30
};

//Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom; 

// Select body, append SVG area to it, and set the dimensions
    var svg = d3.select("#scatter")
      .append("svg")
      .attr("height", svgHeight)
      .attr("width", svgWidth);

        // Append a group to the SVG area and shift ('translate') it to the right and to the bottom 
    var chartGroup = svg.append("g")
      .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

// Load CSV data
    d3.csv("data.csv").then(function(data){
      console.log(data);   

// convert all number strings into ints 
    data.forEach(function(data) {
    data.poverty = +data.poverty;
    data.healthcare = +data.healthcareLow;
  });

// create scales
var xBandScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.healthcare)])
    .range([0, chartWidth]);

// Create a linear scale for the vertical axis.
var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.poverty)])
    .range([chartHeight, 0])

// create axes
var bottomAxis = d3.axisBottom(xBandScale);
var leftAxis = d3.axisLeft(yLinearScale);

// set x to bottom of chart(x-axis)
    chartGroup.append("g")
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(bottomAxis);

    // set y to left of chart (y-axis)
    chartGroup.append("g")
        .call(leftAxis)

    // Append data to chart group
    chartGroup.selectAll(".scatter")
      .data(data)
      .enter()
      .append('circle')
      .attr("cx", d => xBandScale(d.healthcare))
      .attr("cy", d => yLinearScale(d.poverty))
      .attr("r", "10")
      .attr("fill", "purple")
      .attr("opacity", "0.5");

    // add text to circles
    chartGroup.selectAll(".scatter")
      .data(data)
      .enter()
      .append('text')
      .text(d => d.abbr)
      .attr('x', d => xBandScale(d.healthcare))
      .attr('y', d => yLinearScale(d.poverty));

    // x-axis label
    svg.append("text")
      .attr("x", 450)
      .attr("y", 500)
      .style("text-anchor", "mddle")
      .text("Poverty");

  // y-axis label
    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 45)
      .attr("x", 0 - (chartHeight / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Healthcare");

});
