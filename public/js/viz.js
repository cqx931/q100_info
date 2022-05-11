// reload image
    function updateImage() {
      setTimeout(
        function () {
          document.getElementById('map').src = "data/canvas.png?update=" + +new Date();
        },
        1000);
    }

//------------------------------ BAR CHARTS ---------------------------
/* bar charts for energy consumption clustered (selected buildings) vs total*/

// fetch data: clustered
let clusterBefore = {
  Energieverbrauch: {
    "Strom": 103.159,
    "Wärme": 720.3691
  },
  CO2: 3.459
};
let totalBefore = {
  Energieverbrauch: {
    "Strom": 1103.629,
    "Wärme": 134720.5319
  },
  CO2: 30.459
};

const CHART_MARGIN = ({
  top: 30,
  right: 0,
  bottom: 0,
  left: 50
});
const EASE_STYLE = d3.easeCubicOut,
  ANIMATION_TIME = 2000;

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

// fetch data: total
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

const renderBarCharts = (input, beforeInput, type, parentNode) => {
  // calculate available space from element dimensions
  let w = parseFloat(getComputedStyle(parentNode).width),
    h = parseFloat(getComputedStyle(parentNode).height);
  for (const child of parentNode.children) {
    h -= parseFloat(getComputedStyle(child).height);
  }

  const CONFIG_Energie = {
    width: w,
    height: h * 2 / 3 - 10,
    colors: ["gray", "orange"],
    type: type,
    title: "Energieverbrauch",
    unit: "MWh"
  };
  const CONFIG_CO2 = {
    width: w,
    height: h / 3,
    colors: ["gray", "orange"],
    type: type,
    title: "CO2",
    unit: "tCO2"
  };

  if (beforeInput) {
    CONFIG_CO2.before = {
      total: beforeInput.CO2
    };
    CONFIG_Energie.before = beforeInput.Energieverbrauch;
  }
  const bar1 = stackableHorizontalBarChartWithGoal(formatData({
      total: input.CO2
    }), 0.65, CONFIG_CO2),
    bar2 = horizontalBarChart(formatData(input.Energieverbrauch), CONFIG_Energie);

  parentNode.append(bar1);
  parentNode.append(bar2);
}

const stackableHorizontalBarChartWithGoal = function(data, goal, config) {
  // config: w,h, color,title, unit
  const w = config.width,
    h = config.height,
    margin = CHART_MARGIN;

  const svg = d3.create("svg")
    .attr("viewBox", [0, 0, w, h]);

  if (config.title != null) {
    svg.append("text")
      .attr("class", "chart_title")
      .attr("text-anchor", "left")
      //.attr("transform", `translate(0,${h - margin.bottom})`)
      .attr("x", 10)
      .attr("y", 20)
      .attr("fill", "#aaa")
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
      .attr("x", 50)
      .attr("y", y(0))
      .attr("width", (w - margin.right - margin.left) * goal)
      .attr("height", y.bandwidth());

    svg.append("text")
      .attr("fill", "red")
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

const horizontalBarChart = function(data, config) {
  const w = config.width,
    h = config.height,
    margin = CHART_MARGIN,
    svg = d3.create("svg")
    .attr("viewBox", [0, 0, w, h]);

  if (config.title != null) {
    svg.append("text")
      .attr("class", "chart_title")
      .attr("text-anchor", "left")
      //.attr("transform", `translate(0,${h - margin.bottom})`)
      .attr("x", 10)
      .attr("y", 20)
      .attr("fill", "#aaa")
      .style("font-weight", "bold")
      .text(config.title);
  }

  let x = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.value)])
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
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).tickFormat(i => data[i].name).tickSizeOuter(0))
    .call(g => g.append("text")
      .attr("x", -margin.left + 10)
      .attr("y", margin.top + 10)
      .attr("fill", "currentColor")
      .attr("text-anchor", "start")
      .style("font-weight", "bold")
      .text(config.unit));

  svg.append("g")
    .selectAll("rect")
    .data(data)
    .join("rect")
    .attr("id", d => config.type + '_' + config.title + '_' + d.name)
    .attr("x", x(0))
    .attr("y", (d, i) => y(i))
    .attr("fill", (d, i) => config.colors[i])
    .attr("width", d => config.before == null ? x(d.value) - x(0) : x(config.before[d.name]) - x(0))
    .attr("height", y.bandwidth())
    .transition()
    .ease(EASE_STYLE)
    .duration(ANIMATION_TIME)
    .attr("width", d => x(d.value) - x(0));

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

// ---------------------- LEFT SIDEBAR FOR BUILDINGS ------------------
// parse "clusters" from incoming json and replace elements in html
const renderHouseInfo = function(data) {

  const left = document.getElementsByClassName("left")[0];
  left.innerHTML = ""; // clear div before append new

  if (data == null) return;
  for (var i = 0; i < data.length; i++) {
    const h = data[i];
    const div = document.createElement("div");

    div.className = "meta";
    div.className += h.connection_to_heat_grid == 1 ? " connection_to_heat_grid" : "";
    div.className += h.electricity_supplier == "green" ? " green" : (h.electricity_supplier == "mix" ? " mix" : " gray");

    let template = document.getElementById("meta_template").innerHTML;
    template = template.replace("$Adresse", h.address);

    const v = Math.floor(Math.random() * 500) + 500
    //
    template = template.replace("$e", h.CO2.toFixed(3));
    template = template.replace("$v_s", h["spec_power_consumption"].toFixed(0));
    template = template.replace("$v_w", h["spec_heat_consumption"].toFixed(0));
    template = template.replace("$e", h["environmental_engagement"].toFixed(2));
    let refurbished = h["refurbished"] ? "saniert" : "unsaniert";
    template = template.replace("$s", refurbished);
    let connection_to_heat_grid = h["connection_to_heat_grid"] ? "ja" : "nein";
    template = template.replace("$c", connection_to_heat_grid);
    template = template.replace("$n", h["renovation_cost"]);
    div.innerHTML = template;
    left.append(div);
  }
}

// ---------------------- global environment variables ----------------
/* at the bottom of the page */
const renderSimulationVariables = function(data) {
  const bottom = document.getElementsByClassName("bottom")[0];
  let template = document.getElementById("simulation_template").innerHTML;
  template = template.replace("$year", data.year);
  template = template.replace("$x", data.co2);
  bottom.innerHTML = template;
}


/******************************** SIMULATION *************************/
const renderSimulationScreen = function(clusterData, districtData) {
  // TODO: line plots of sum/selected houses, x axis - time
  // Exampels: Wärme
  renderClusterSimulations(clusterData);
  renderQuartierSimulations(districtData);
  // Reference
  // https://www.d3-graph-gallery.com/graph/line_smallmultiple.html
  // https://bl.ocks.org/tomshanley/b841837f5414b34b7c45055d97e7674d
}

const renderClusterSimulations = function(data) {
  // TODO:
  data = formatSimulationData(data);
  renderMultipleLineCharts(data, "clusterSimulation")
}

const renderQuartierSimulations = function(data) {
  data = formatQuartierSimulationData(data);
  const id = "quartierSimulation";
  const groupBy = "attribute"

  // Nest data by subject.
  const sumstat = d3.nest() // nest function allows to group the calculation per level of a factor
    .key(function(d) {
      return d[groupBy];
    })
    .entries(data);
  console.log("Quartier sumstat", sumstat)
  const allKeys = sumstat.map(function(d){return d.key})

  // Styles
  const text_color = "gray",
        chart_colors = ["red", "green","yellow","orange"];
  const font_size = 24;

  // set the dimensions and margins of the graph
  const margin = {
      top: 20,
      right: 15,
      bottom: 20,
      left: 40
    },
    width = 350 - margin.left - margin.right,
    height = 220 - margin.top - margin.bottom;

    var svg = d3.select("#" + id)
    .selectAll("uniqueChart")
    .data(sumstat)
    .enter()
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // Add X axis --> it is a date format
    var x = d3.scaleLinear()
      .domain(d3.extent(data, function(d) { return d.step; }))
      .range([ 0, width ]);
    svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).ticks(3));

    //Add Y axis
    var y = d3.scaleLinear()
      .domain([0, d3.max(data, function(d) {
        // TODO: different Y axis for different charts
         return +d.value;
       })])
      .range([ height, 0 ]);
    svg.append("g")
      .call(d3.axisLeft(y).ticks(5));

  var color = d3.scaleOrdinal()
    .domain(allKeys)
    .range(chart_colors);

  // Add path
    svg.append("path")
        .attr("fill", "none")
        .attr("stroke", function(d){ return color(d.key) })
        .attr("stroke-width", 1.9)
        .attr("d", function(d){
          return d3.line()
            .x(function(d) { return x(d.step); })
            .y(function(d) { return y(+d.value); })
            (d.values)
        })

    // Add titles
    svg.append("text")
      .attr("text-anchor", "start")
      .attr("y", -5)
      .attr("x", 0)
      .text(function(d){ return(d.key)})
      .style("fill", function(d){ return color(d.key)});
}

const renderMultipleLineCharts = function(data, id) {
  // Attributes to plot
  const attrs = ["CO2"];
  const groupBy = "address"

  // Nest data by subject.
  const sumstat = d3.nest() // nest function allows to group the calculation per level of a factor
    .key(function(d) {
      return d[groupBy];
    })
    .entries(data);
  console.log("sumstat", sumstat)

  // Styles
  const text_color = "gray",
        line_colors = ["#8B0000", "green"];
  const font_size = 12;

  // set the dimensions and margins of the graph
  const margin = {
      top: 8,
      right: 15,
      bottom: 20,
      left: 40
    },
    width = 180 - margin.left - margin.right,
    height = 120 - margin.top - margin.bottom;

  const xScale = d3.scaleLinear()
    .range([0, width])
    .domain(d3.extent(data, function(d) {
      return d.step;
    }));

  const yScale = d3.scaleLinear()
    .range([height, 0])
    .domain([0, d3.max(data, function(d) {
      return d[attrs[0]];
    })]);

  const yAxis = d3.axisLeft()
    .scale(yScale)
    .ticks(3);

  // Add an SVG element for each
  const svg = d3.select("#" + id).selectAll("svg")
    .data(sumstat)
    .enter().append("svg")
    .style("margin-bottom", "10px")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // Add the line paths to each element
  for (var i = 0; i < attrs.length; i++) {
    const line = d3.line()
      .x(function(d) {
        return xScale(d.step);
      })
      .y(function(d) {
        return yScale(d[attrs[i]]);
      });

    svg.append("path")
      .attr("class", "line")
      .attr("d", function(d) {
        return line(d.values);
      })
      .attr("stroke", line_colors[i]);
  }

  // Add label for each house
  svg.append("text")
    .attr("x", (width + 10) / 2)
    .attr("y", height - 85)
    .style("text-anchor", "middle")
    .style("font-size", font_size+"px")
    .attr("fill", text_color)
    .text(function(d) {
      return d.key;
    });

  svg.append("text")
    .text(xScale.domain()[0])
    .attr("x", 0)
    .attr("y", height + 15)
    .style("text-anchor", "start")
    .style("font-size", font_size+"px")
    .attr("fill", text_color);

  svg.append("text")
    .text(xScale.domain()[1])
    .attr("x", width)
    .attr("y", height + 15)
    .style("text-anchor", "end")
    .style("font-size", font_size+"px")
    .attr("fill", text_color);

  //add y axes
  //svg.append("g").attr("id", "yAxisG").call(yAxis);
  //d3.selectAll("path.domain").remove();
  //d3.selectAll("line").style("stroke", "silver");

  // labels for all
  const labels = d3.select("#" + id).append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", attrs.length*font_size*1.5)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  for (var i = 0; i < attrs.length; i++) {
    const text = attrs[i];
    const color = line_colors[i];
    labels.append("text")
      .text("— " + text)
      .attr("x", width)
      .attr("y", i*font_size*1.5 + margin.top)
      .style("text-anchor", "end")
      .style("font-size", font_size+"px")
      .attr("fill", color);
  }
}

/**************************** Data Processing ************************/
const formatQuartierSimulationData = function(data) {
  let newD = [];
  for (var i = 0; i < data.length; i++) {
    const g = data[i];
    g.step = data[i].step;
    for (var attr in data[i].attributes) {
      const each = {
        step: g.step,
        attribute: attr,
        value: data[i].attributes[attr]
      }
      //console.log(each);
      newD.push(each)
    }
    }
  return newD;
}

const formatSimulationData = function(data) {
  // Process simulation data to the format that d3 requires
  let newD = [];
  for (var i = 0; i < data.length; i++) {
    const g = data[i];
    g.step = data[i].step;
    for (var j = 0; j < data[i].buildings.length; j++) {
      const b = data[i].buildings[j];
      const each = {
        step: g.step,
        address: b.address,
        CO2: b.CO2
      }
      //console.log(each);
      newD.push(each)
    }
  }
  return newD;
}
const processData = function(json) {
  let result = {
    Energieverbrauch: { //in mwh
      "Strom": 0,
      "Wärme": 0,
    },
    CO2: {
      "Strom": 0,
      "Wärme": 0
    },
    year: 0
  };

  const map = function(c) {
    for (let key in c) {
      if (key == "spec_heat_consumption" && c[key] != null) {
        result.Energieverbrauch["Wärme"] += kwh2mwh(c[key]);
        result.CO2["Wärme"] += getCo2(result.Energieverbrauch["Wärme"], "Wärme");
      }
      if (key == "spec_power_consumption" && c[key] != null) {
        result.Energieverbrauch["Strom"] += kwh2mwh(c[key]);
        result.CO2["Strom"] += getCo2(result.Energieverbrauch["Strom"], "Strom");
      }

      if (key == "year" && c[key] != null) {
        result.year += c[key];
        document.querySelector(".Jahr").innerHTML = result.year;
      } else if (['renovation_cost', 'CO2-prize'].includes(key) && c[key] != null) {
        result[key] = c[key];
        document.querySelector("." + key + " span").innerHTML = c[key];
      }
    }
  }

  if (json.length) {
    map(json[0]);
  } else {
    map(json)
  }

  return result;
}

const groupData = function(data, total) {
  // use scale to get percent values
  const percent = d3.scaleLinear()
    .domain([0, total])
    .range([0, 100]);

  // filter out data that has zero values
  // also get mapping for next placement
  // (save having to format data for d3 stack)
  let cumulative = 0;
  const _data = data.map(d => {
    cumulative += d.value;
    return {
      value: d.value,
      // want the cumulative to prior value (start of rect)
      cumulative: cumulative - d.value,
      label: d.name,
      percent: percent(d.value)
    };
  }).filter(d => d.value > 0);
  return _data;
}

const formatData = function(obj) {
  let r = [];
  for (let key in obj) {
    r.push({
      "name": key,
      "value": obj[key]
    });
  }
  return r;
}

const getCo2 = function(e, type) {
  let r = 0;
  if (type === "Strom") {
    r = e / 8 * 3; // der strommix bei ca 3000 kg(3 ton) Co2-äq / 8 MWh
  } else if (type === "Wärme") {
    r = e / 8 * 2.5;
  }
  return r;
}

const kwh2mwh = function(kwh) {
  return kwh / 1000;
}
