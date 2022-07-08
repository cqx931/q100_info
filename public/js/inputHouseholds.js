//------------------------------ BAR CHARTS ---------------------------
const plotlyHorizontalBarChart = function (inputData) {

  console.log(inputData.clusters)

  var xValues = [inputData.connection_to_heat_grid, inputData.connection_to_heat_grid];

  var yValues = ['cluster', 'district'];

  var trace1 = {
    x: xValues,
    y: yValues,
    xaxis: 'x1',
    yaxis: 'y1',
    type: 'bar',
    marker: {
      color: 'rgba(50,171,96,0.6)',
      line: {
        color: 'rgba(50,171,96,1.0)',
        width: 1
      }
    },
    name: 'Anzahl der Anschlüsse ans Wärmenetz',
    orientation: 'h'
  };

  // var trace2 = {
  //   x: xNetworth,
  //   y: yNetworth,
  //   xaxis: 'x2',
  //   yaxis: 'y1',
  //   mode: 'lines+markers',
  //   line: {
  //     color: 'rgb(128,0,128)'
  //   },
  //   name: 'Household net worth, Million USD/capita'
  // };

  var data = [trace1];

  var layout = {
    title: 'Anzahl der angeschlossenen Gebäude an das Wärmenetz',
    xaxis1: {
      range: [0, inputData.clusters.length],
      domain: [0, 0.5],
      zeroline: false,
      showline: false,
      showticklabels: true,
      showgrid: true
    },
    // xaxis2: {
    //   range: [25000, 150000],
    //   domain: [0.5, 1],
    //   zeroline: false,
    //   showline: false,
    //   showticklabels: true,
    //   showgrid: true,
    //   side: 'top',
    //   dtick: 25000
    // },
    legend: {
      x: 0.029,
      y: 1.238,
      font: {
        size: 10
      }
    },
    margin: {
      l: 100,
      r: 20,
      t: 200,
      b: 70
    },
    width: 600,
    height: 600,
    paper_bgcolor: 'rgb(0,0,0)',
    plot_bgcolor: 'rgb(0,0,0)',
    annotations: [
      {
        xref: 'paper',
        yref: 'paper',
        x: -0.2,
        y: -0.109,
        // text: 'Anzahl der Anschlüsse ans QUARREE100 Wärmenetz',
        showarrow: false,
        font: {
          family: 'Arial',
          size: 10,
          color: 'rgb(150,150,150)'
        }
      }
    ]
  };

  for (var i = 0; i < xValues.length; i++) {
    var result = {
      xref: 'x1',
      yref: 'y1',
      x: xValues[i] + 2.3,
      y: yValues[i],
      text: xValues[i] + '%',
      font: {
        family: 'Arial',
        size: 12,
        color: 'rgb(50, 171, 96)'
      },
      showarrow: false,
    };
    // var result2 = {
    //   xref: 'x2',
    //   yref: 'y1',
    //   x: xNetworth[i] - 20000,
    //   y: yNetworth[i],
    //   text: xNetworth[i] + ' M',
    //   font: {
    //     family: 'Arial',
    //     size: 12,
    //     color: 'rgb(128, 0, 128)'
    //   },
    //   showarrow: false
    // };
    layout.annotations.push(result);
  }

  Plotly.newPlot('plotly', data, layout);

}











// fetch data: mockup data
let clusterBefore = {
  connection_to_heat_grid: 3.459,
  clusters: [0, 1, 2, 3]
};

let totalBefore = {
  connection_to_heat_grid: 30.459
};

const CHART_MARGIN = ({
  top: 30,
  right: 0,
  bottom: 0,
  left: 50
});

const EASE_STYLE = d3.easeCubicOut,
  ANIMATION_TIME = 2000;

// ------------------ update buildings cluster data -------------------
const updateClusterCharts = (clusterData) => {
  if (!clusterData) {
    return;
  }

  const clusterDiv = document.getElementById("cluster");

  while (clusterDiv.getElementsByTagName('svg').length > 0) {
    clusterDiv.removeChild(clusterDiv.lastChild);
  }

  renderAnimatedBarCharts(clusterData, clusterBefore, "Cluster", clusterDiv);
  clusterBefore = clusterData;
}

// ------------------------ update district data ----------------------
const updateTotalCharts = (totalData) => {
  if (!totalData) {
    return;
  }

  const totalDiv = document.getElementById("total");

  while (totalDiv.getElementsByTagName('svg').length > 0) {
    totalDiv.removeChild(totalDiv.lastChild);
  }

  renderAnimatedBarCharts(totalData, totalBefore, "Total", totalDiv);
  totalBefore = totalData;
}

/*********************** RENDER BAR CHARTS *************************/
const renderAnimatedBarCharts = (clusterData, clusterBefore, type, parentNode) => {

  console.log("clusterData:", clusterData)


  // calculate available space from element dimensions
  let w = parseFloat(getComputedStyle(parentNode).width),
    h = parseFloat(getComputedStyle(parentNode).height);
  for (const child of parentNode.children) {
    h -= parseFloat(getComputedStyle(child).height);
  }

  const CONFIG_connections = {
    width: w,
    height: h - 10,
    colors: ["gray", "orange"],
    type: type,
    title: "Anschlussquote",
    unit: "%"
  };

  if (clusterBefore) {
    CONFIG_connections.before = {
      total: clusterBefore.connection_to_heat_grid
    };
  }

  // make charts:
  const bar1 = animatedHorizontalBarChart(clusterData, CONFIG_connections);

  // const bar2 = stackableHorizontalBarChartWithGoal(formatData({
  //   total: input.connection_to_heat_grid
  // }), 0.3, CONFIG_connections);

  parentNode.append(bar1);
  // parentNode.append(bar2);
}

/****************** STACKABLE BAR CHART WITH GOAL ******************/
const stackableHorizontalBarChartWithGoal = function (data, goal, config) {
  // config: w,h, color,title, unit
  const w = config.width,
    h = config.height,
    margin = CHART_MARGIN;

  const svg = d3.create("svg")
    .attr("viewBox", [0, 0, w, h]);

  const fillColor = data.connection_to_heat_grid > 30 ? "#16af44" : "#aaaaaa";

  if (config.title != null) {
    svg.append("text")
      .attr("class", "chart_title")
      .attr("text-anchor", "left")
      //.attr("transform", `translate(0,${h - margin.bottom})`)
      .attr("x", 10)
      .attr("y", 20)
      .attr("fill", fillColor)
      .style("font-weight", "bold")
      .text(config.title);
  }

  const total = d3.sum(data, d => d.value),
    _data = groupData(data, total);

  let x = d3.scaleLinear()
    .domain([0, total])
    .range([margin.left, w - margin.right]);

  let y = d3.scaleBand()
    .domain(d3.range(data.length))
    .rangeRound([margin.top + 20, h - margin.bottom])
    .padding(0.1);

  const format = x.tickFormat(20, data.format);

  let xAxis = g => g
    .attr("transform", `translate(0,${margin.top + 20})`)
    .call(d3.axisTop(x).ticks(w / 80, data.format))
    .call(g => g.select(".domain").remove());

  let yAxis = g => g
    .call(g => g.append("text")
      .attr("x", 10)
      .attr("y", margin.top + 10)
      .attr("font-size", 11)
      .attr("fill", "currentColor")
      .attr("text-anchor", "start")
      .style("font-weight", "bold")
      .attr("font-family", "sans-serif")
      .text(config.unit));

  //col
  //TODO: stack
  svg.append("g")
    .selectAll("rect")
    .data(_data)
    .join("rect")
    .attr("id", d => config.type + '_' + config.title + '_' + d.label)
    .attr("x", d => x(d.cumulative))
    .attr("y", y(0))
    .attr("width", d => config.before == null ? x(d.value) - x(0) : x(config.before[d.label]) - x(0))
    .attr("height", y.bandwidth())
    .style('fill', (d, i) => config.colors[i])
    .transition()
    .ease(EASE_STYLE)
    .duration(ANIMATION_TIME)
    .attr("width", d => x(d.value) - x(0));

  //text
  svg.append("g")
    .attr("fill", "white")
    .attr("text-anchor", "end")
    .attr("font-family", "sans-serif")
    .attr("font-size", 12)
    .selectAll("text")
    .data(data)
    .join("text")
    .attr("x", d => x(d.value))
    .attr("y", y(0) + y.bandwidth() / 2)
    .attr("dy", "0.35em")
    .attr("dx", -4)
    .text(d => format(d.value))
    .call(text => text.filter(d => x(d.value) - x(0) < 20) // short bars
      .attr("dx", +4)
      .attr("fill", "white")
      .attr("text-anchor", "start"));

  // goal:
  if (goal != null) {
    svg.append("rect")
      .attr("fill", "transparent")
      .attr("stroke", "red")
      .attr("x", 30)
      .attr("y", y(0))
      .attr("width", (w - margin.right - margin.left) * goal)
      .attr("height", y.bandwidth());

    svg.append("text")
      .attr("fill", "black")
      .attr("text-anchor", "middle")
      .attr("font-family", "sans-serif")
      .attr("font-size", 14)
      .attr("font-weight", 600)
      .text(goal * 100 + "%")
      .attr("x", (w - margin.right - margin.left) * goal)
      .attr("y", y(0) + y.bandwidth() / 2 + 7);
  }
  svg.append("g")
    .call(xAxis);

  //text label
  svg.append("g").selectAll('.text-label')
    .data(_data)
    .join('text')
    .attr('class', 'text-label')
    .attr('text-anchor', 'middle')
    .attr('x', d => x(d.cumulative) + x(d.value) / 2)
    .attr('y', y(0) + y.bandwidth() + 15)
    .attr("font-family", "sans-serif")
    .attr("font-size", 12)
    .style('fill', (d, i) => config.colors[i])
    .text(d => d.label);

  svg.append("g")
    .call(yAxis);

  return svg.node();
}

/****************** SIMPLE HORIZONTAL BAR CHARTS *******************/
const animatedHorizontalBarChart = function (clusterData, config) {

  console.log(clusterData)

  const w = config.width,
    h = config.height,
    margin = CHART_MARGIN,
    svg = d3.create("svg")
      .attr("viewBox", [0, 0, w, h]);

  const fillColor = clusterData.connection_to_heat_grid > 5 ? "#16af44" : "#aaaaaa";

  if (config.title != null) {
    svg.append("text")
      .attr("class", "chart_title")
      .attr("text-anchor", "left")
      //.attr("transform", `translate(0,${h - margin.bottom})`)
      .attr("x", 10)
      .attr("y", 20)
      .attr("fill", fillColor)
      .style("font-weight", "bold")
      .text(config.title);
  }

  let x = d3.scaleLinear()
    // .domain([0, d3.max(data, d => d.value)])
    .domain([0, clusterData.clusters.length])
    .range([margin.left, w - margin.right]);

  let y = d3.scaleBand()
    .domain(d3.range(clusterData.connection_to_heat_grid))
    .rangeRound([margin.top + 20, h - margin.bottom])
    .padding(0.1);

  const format = x.tickFormat(20, clusterData.format);

  // x-ticks
  let xAxis = g => g
    .attr("transform", `translate(0,${margin.top + 20})`)
    .call(d3.axisTop(x).ticks(w / 80, clusterData.format))
    .call(g => g.select(".domain").remove());

  let yAxis = g => g
    .attr("transform", `translate(${margin.left},0)`)
    // .call(d3.axisLeft(y).tickFormat(i => clusterData[i].name).tickSizeOuter(0))
    .call(g => g.append("text")
      .attr("x", -margin.left + 10)
      .attr("y", margin.top + 10)
      .attr("fill", "currentColor")
      .attr("text-anchor", "start")
      .style("font-weight", "bold")
      .text(config.unit));

  svg.append("g")
    .selectAll("rect")
    .data(clusterData.connection_to_heat_grid)
    .join("rect")
    .attr("id", d => config.type + '_' + config.title + '_' + d.name)
    .attr("x", x(0))
    .attr("y", (d, i) => y(i))
    .attr("fill", (d, i) => config.colors[i])
    // .attr("width", d => config.before == null ? x(d.value) - x(0) : x(config.before[d.name]) - x(0))
    .attr("width", clusterData.connection_to_heat_grid)
    .attr("height", y.bandwidth())
    .transition()
    // .ease(EASE_STYLE)
    // .duration(ANIMATION_TIME)
    .attr("width", d => x(d.value) - x(0));

  svg.append("g")
    .attr("fill", "white")
    .attr("text-anchor", "end")
    .attr("font-family", "sans-serif")
    .attr("font-size", 12)
    .selectAll("text")
    .data(clusterData.connection_to_heat_grid)
    .join("text")
    .attr("x", d => x(d.value))
    .attr("y", (d, i) => y(i) + y.bandwidth() / 2)
    .attr("dy", "0.35em")
    .attr("dx", -4)
    .text(d => format(d.value))
    .call(text => text.filter(d => x(d.value) - x(0) < 20) // short bars
      .attr("dx", +4)
      .attr("fill", "white")
      .attr("text-anchor", "start"));

  svg.append("g")
    .call(xAxis);

  svg.append("g")
    .call(yAxis);

  return svg.node();
}
