
// ------------------------------ SCENARIOS ---------------------------
function updateCurrentScenarioGraph(scenario_handle) {
  let file_name = "";
  file_name = "data/includes/csv-data_technical/graphs/Energiepreisprognose_" + scenario_handle + ".png";
  document.getElementById("current_energy_prices_scenario").src = file_name + "?update=" + new Date().getTime();
}

function updateConnectionsScenario(scenario_data) {
  // const element = document.getElementById("scenario_num_connections");
  let element = $("#scenario_num_connections").find(".global");
  element.replaceWith(`<span class="global">+ ${scenario_data} zusätzliche</span>`);
}

function updateSelectedConnectionsNumber(json) { // could be merged with the function above (updateConnectionsSenario)
  if (json.hasOwnProperty('data_view_individual_data')) {
    return // this data structure is sent right after the simulation therefore irrelevant
  }
  let sum = 0
  for (let key in json.buildings_groups) {
    if (!isNaN(json.buildings_groups[key].connections)) {
      sum += json.buildings_groups[key].connections
      console.log(sum)
    }
  }

  let element = $("#scenario_num_connections").find(".selected");
  element.replaceWith(`<span class="selected">${sum} ausgewählte</span>`);
}

// reload image
function updateMapImageTimed() {
  setTimeout(
    function () {
      document.getElementById('map').src = "data/canvas.png?update=" + new Date().getTime();
    },
    1000);
}

function updateMapImage() {
  document.getElementById('map').src = "data/canvas.png?update=" + new Date().getTime();
}


// ---------------------- LEFT SIDEBAR FOR BUILDINGS ------------------
// parse "clusters" from incoming json and replace elements in html
const renderHouseInfo = function (groupData, identifier) {

  const column = document.getElementById(identifier);
  column.innerHTML = ""; // clear div before append new

  groupData = groupData.buildings;

  if (groupData == null) return;
  for (var i = 0; i < groupData.length; i++) {
    const h = groupData[i];
    const div = document.createElement("div");

    div.className = "meta";
    div.className += h.connection_to_heat_grid == 1 ? " connection_to_heat_grid" : "";
    div.className += h.connection_to_heat_grid > 0.7 ? " green" : (h.connection_to_heat_grid <= 0.7 && h.connection_to_heat_grid > 0.3 ? " mix" : " gray");

    let template = document.getElementById("meta_template").innerHTML;
    template = template.replace("$Adresse", h.address);

    const v = Math.floor(Math.random() * 500) + 500
    //
    let environmental_engagement = h.environmental_engagement ? "ja" : "nein";
    template = template.replace("$e", environmental_engagement);
    let refurbished = h["refurbished"] ? "saniert" : "unsaniert";
    template = template.replace("$s", refurbished);
    let connection_to_heat_grid = h["connection_to_heat_grid"] == false ? "nein" : parseInt(h["connection_to_heat_grid"]);
    template = template.replace("$c", connection_to_heat_grid);
    let avg_spec_heat_consumption = h["avg_spec_heat_consumption"].toFixed(0);
    template = template.replace("$h", avg_spec_heat_consumption);
    let avg_spec_power_consumption = h["avg_spec_power_consumption"].toFixed(0);
    template = template.replace("$p", avg_spec_power_consumption);
    let cluster_size = h["cluster_size"];
    template = template.replace("$x", cluster_size);
    div.innerHTML = template;
    column.append(div);
  }
}

//------------------------------ BAR CHARTS ---------------------------
/* bar charts for energy consumption clustered (selected buildings) vs total*/

// fetch data: mockup data
let clusterBefore = {
  connection_to_heat_grid: 3.459,
  group_0: [1, 2, 3],
  group_1: [1, 2, 3],
  group_2: [1, 2, 3],
  group_3: [1, 2, 3]
};
let totalBefore = {
  connection_to_heat_grid: 30.459
};

const CHART_MARGIN = ({
  top: 0,
  right: 50,
  bottom: 0,
  left: 100
});
const EASE_STYLE = d3.easeCubicOut,
  ANIMATION_TIME = 2000;

// --------------- households bar charts -------------------
const updateClusterCharts = (clusterData) => {

  if (!clusterData) {
    return;
  }

  const clusterDiv = document.getElementById("cluster");

  while (clusterDiv.getElementsByTagName('svg').length > 0) {
    clusterDiv.removeChild(clusterDiv.lastChild);
  }

  renderBarCharts(clusterData, clusterBefore, "Cluster", clusterDiv);
  clusterBefore = clusterData;
}

// -------------------- district bar charts ----------------
const updateTotalCharts = (totalData) => {
  if (!totalData) {
    return;
  }

  const totalDiv = document.getElementById("total");

  while (totalDiv.getElementsByTagName('svg').length > 0) {
    totalDiv.removeChild(totalDiv.lastChild);
  }

  renderBarCharts(totalData, totalBefore, "Total", totalDiv);
  totalBefore = totalData;
}

/*********************** RENDER BAR CHARTS *************************/
const renderBarCharts = (input, beforeInput, type, parentNode) => {

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
    title: "Wärmenetzanschluss",
    unit: "%"
  };

  if (beforeInput) {
    CONFIG_connections.before = {
      total_0: input.group_0.length,
      total_1: input.group_1.length,
      total_2: input.group_2.length,
      total_3: input.group_3.length,
      "1": beforeInput.connection_to_heat_grid,
      "2": beforeInput.connection_to_heat_grid,
      "3": beforeInput.connection_to_heat_grid,
      "4": beforeInput.connection_to_heat_grid
    };
  }
  const bar1 = horizontalBarChart(formatData({
    // total: input.clusters.length,
    "Gebäudeauswahl": input.connection_to_heat_grid,
    // "Gebäudeauswahl": input.connection_to_heat_grid

    // must be something like
    // "1": input.group_0.connection_to_heat_grid
    "1": input.group_0.connections,
    "2": input.group_1.connections,
    "3": input.group_2.connections,
    "4": input.group_3.connections
  }), CONFIG_connections);

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
const horizontalBarChart = function (data, config) {

  const w = config.width,
    h = config.height,
    margin = CHART_MARGIN,
    svg = d3.create("svg")
      .attr("viewBox", [0, 0, w, h]);

  let fillColor = data[0].value > 10 ? "#16af44" : "#aaaaaa";

  if (config.title != null) {
    svg.append("text")
      .attr("class", "chart_title")
      .attr("text-anchor", "left")
      //.attr("transform", `translate(0,${h - margin.bottom})`)
      .attr("x", 10)
      .attr("y", 20)
      .attr("fill", "#ffffff")
      .style("font-weight", "bold")
      .text(config.title); // heading: "Wärmenetzanschluss"
  }

  const total = d3.sum(data, d => d.value),
    _data = groupData(data, total);

  let x = d3.scaleLinear()
    .domain([0, 30]) // TODO: adjust width of y-axis according to num of selected buildings
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

  // y-axis
  let yAxis = g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).tickFormat(i => data[i].name).tickSizeOuter(0))
    .call(g => g.append("text")
      .attr("x", -margin.left + 10)
      .attr("y", margin.top + 10)
      .attr("fill", "currentColor")
      .attr("text-anchor", "start")
      .style("font-weight", "bold")
      .text(config.unit)); // "%"

  // design the actual bar(s):
  svg.append("g")
    .selectAll("rect")
    .data(data)
    .join("rect")
    .attr("id", d => config.type + '_' + config.title + '_' + d.name)
    .attr("x", x(0))
    .attr("y", (d, i) => y(i))
    .attr("fill", fillColor)
    .attr("width", d => config.before == null ? x(d.value) - x(0) : x(config.before[d.name]) - x(0))
    .attr("height", y.bandwidth())
    .transition()
    .ease(EASE_STYLE)
    .duration(ANIMATION_TIME)
    .attr("width", d => x(d.value) - x(0));

  // show value in bar:
  svg.append("g")
    .attr("fill", "white")
    .attr("text-anchor", "end")
    .attr("font-family", "sans-serif")
    .attr("font-size", 12)
    .selectAll("text")
    .data(data)
    .join("text")
    .attr("x", d => x(d.value))
    .attr("y", (d, i) => y(i) + y.bandwidth() / 2)
    .attr("dy", "0.35em")
    .attr("dx", -4)
    .text(d => format(d.value)) // bar value
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
