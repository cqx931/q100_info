// reload image
function updateMapImageTimed() {
  setTimeout(
    function () {
      document.getElementById('map').src = "data/canvas.png?update=" + +new Date();
    },
    1000);
}

function updateMapImage() {
  document.getElementById('map').src = "data/canvas.png?update=" + new Date().getTime();
}


// ---------------------- LEFT SIDEBAR FOR BUILDINGS ------------------
// parse "clusters" from incoming json and replace elements in html
const renderHouseInfo = function (data) {

  const columns = document.getElementsByClassName("columns")[0];
  columns.innerHTML = ""; // clear div before append new

  if (data == null) return;
  for (var i = 0; i < data.length; i++) {
    const h = data[i];
    const div = document.createElement("div");

    div.className = "meta";
    div.className += h.connection_to_heat_grid == 1 ? " connection_to_heat_grid" : "";
    div.className += h.environmental_engagement > 0.7 ? " green" : (h.environmental_engagement <= 0.7 && h.environmental_engagement > 0.3 ? " mix" : " gray");

    let template = document.getElementById("meta_template").innerHTML;
    template = template.replace("$Adresse", h.address);

    const v = Math.floor(Math.random() * 500) + 500
    //
    template = template.replace("$e", h.environmental_engagement.toFixed(2));
    let refurbished = h["refurbished"] ? "saniert" : "unsaniert";
    template = template.replace("$s", refurbished);
    let connection_to_heat_grid = h["connection_to_heat_grid"] ? "ja" : "nein";
    template = template.replace("$c", connection_to_heat_grid);
    div.innerHTML = template;
    columns.append(div);
  }
}

// ---------------------- global environment variables ----------------
/* at the bottom of the page */
const renderSimulationVariables = function (data) {
  const bottom = document.getElementById("simulation_area");
  let template = document.getElementById("simulation_template").innerHTML;
  template = template.replace("$year", data.year);
  template = template.replace("$x", data.active_scenario);
  bottom.innerHTML = template;
}


/******************************** SIMULATION *************************/
const renderSimulationScreen = function (clusterData, districtData) {
  // TODO: line plots of sum/selected houses, x axis - time
  // Exampels: Wärme
  renderClusterSimulations(clusterData);

  const formattedDistrictData = formatQuartierSimulationData(districtData);
  renderQuartierSimulations(formattedDistrictData);
  // Reference
  // https://www.d3-graph-gallery.com/graph/line_smallmultiple.html
  // https://bl.ocks.org/tomshanley/b841837f5414b34b7c45055d97e7674d
}

const renderClusterSimulations = function (data) {
  // TODO:
  data = formatSimulationData(data);
  renderMultipleLineCharts(data, "clusterSimulation")
}

const renderQuartierSimulations = function (data) {
  const id = "quartierSimulation";
  const groupBy = "attribute"

  // Nest data by subject.
  const sumstat = d3.nest() // nest function allows to group the calculation per level of a factor
    .key(function (d) {
      return d[groupBy];
    })
    .entries(data);
  console.log("Quartier sumstat", sumstat)
  const allKeys = sumstat.map(function (d) { return d.key })

  // Styles
  const text_color = "gray",
    chart_colors = ["red", "green", "yellow", "orange"];
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
    .domain(d3.extent(data, function (d) { return d.step; }))
    .range([0, width]);
  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).ticks(3));

  //Add Y axis
  var y = d3.scaleLinear()
    .domain([0, d3.max(data, function (d) {
      // TODO: different Y axis for different charts
      return +d.value;
    })])
    .range([height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y).ticks(5));

  var color = d3.scaleOrdinal()
    .domain(allKeys)
    .range(chart_colors);

  // Add path
  svg.append("path")
    .attr("fill", "none")
    .attr("stroke", function (d) { return color(d.key) })
    .attr("stroke-width", 1.9)
    .attr("d", function (d) {
      return d3.line()
        .x(function (d) { return x(d.step); })
        .y(function (d) { return y(+d.value); })
        (d.values)
    })

  // Add titles
  svg.append("text")
    .attr("text-anchor", "start")
    .attr("y", -5)
    .attr("x", 0)
    .text(function (d) { return (d.key) })
    .style("fill", function (d) { return color(d.key) });
}

const renderMultipleLineCharts = function (data, id) {
  // Attributes to plot
  const attrs = ["CO2"];
  const groupBy = "address"

  // Nest data by subject.
  const sumstat = d3.nest() // nest function allows to group the calculation per level of a factor
    .key(function (d) {
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
    .domain(d3.extent(data, function (d) {
      return d.step;
    }));

  const yScale = d3.scaleLinear()
    .range([height, 0])
    .domain([0, d3.max(data, function (d) {
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
      .x(function (d) {
        return xScale(d.step);
      })
      .y(function (d) {
        return yScale(d[attrs[i]]);
      });

    svg.append("path")
      .attr("class", "line")
      .attr("d", function (d) {
        return line(d.values);
      })
      .attr("stroke", line_colors[i]);
  }

  // Add label for each house
  svg.append("text")
    .attr("x", (width + 10) / 2)
    .attr("y", height - 85)
    .style("text-anchor", "middle")
    .style("font-size", font_size + "px")
    .attr("fill", text_color)
    .text(function (d) {
      return d.key;
    });

  svg.append("text")
    .text(xScale.domain()[0])
    .attr("x", 0)
    .attr("y", height + 15)
    .style("text-anchor", "start")
    .style("font-size", font_size + "px")
    .attr("fill", text_color);

  svg.append("text")
    .text(xScale.domain()[1])
    .attr("x", width)
    .attr("y", height + 15)
    .style("text-anchor", "end")
    .style("font-size", font_size + "px")
    .attr("fill", text_color);

  //add y axes
  //svg.append("g").attr("id", "yAxisG").call(yAxis);
  //d3.selectAll("path.domain").remove();
  //d3.selectAll("line").style("stroke", "silver");

  // labels for all
  const labels = d3.select("#" + id).append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", attrs.length * font_size * 1.5)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  for (var i = 0; i < attrs.length; i++) {
    const text = attrs[i];
    const color = line_colors[i];
    labels.append("text")
      .text("— " + text)
      .attr("x", width)
      .attr("y", i * font_size * 1.5 + margin.top)
      .style("text-anchor", "end")
      .style("font-size", font_size + "px")
      .attr("fill", color);
  }
}

/**************************** Data Processing ************************/
const formatQuartierSimulationData = function (data) {
  // input data type
  // [
  //   {
  //     "step": 0,
  //     "attributes": {
  //       "Verbrauch": 1000000,
  //       "CO2": 10.813611631,
  //       "Investment": 0.3,
  //       "EEH": 0.4458936055
  //     }
  //   },
  //   ...
  // ]
  //
  // output data type
  // [
  //   {
  //       "step": 0,
  //       "attribute": "Verbrauch",
  //       "value": 1000000
  //   },
  //   {
  //       "step": 0,
  //       "attribute": "CO2",
  //       "value": 10.813611631
  //   },
  //   ...
  // ]

  let returnValue = [];
  for (var i = 0; i < data.length; i++) {
    const g = data[i];
    // g.step = data[i].step; redundant
    for (var attr in data[i].attributes) {
      const each = {
        step: g.step,
        attribute: attr,
        value: data[i].attributes[attr]
      }
      //console.log(each);
      returnValue.push(each)
    }
  }
  return returnValue;
}

const formatSimulationData = function (data) {
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

// -------------------- process incoming data ---------------
const processData = function (json) {
  let result = {
    connection_to_heat_grid: 0,
    clusters: [0, 1, 2],
    year: 0
  };

  const map = function (c) {
    for (let key in c) {
      if (key == "connection_to_heat_grid" && c[key] != null) {
        result.connection_to_heat_grid += c[key];
      }
      else if (key == 'clusters' && c[key] != null) {
        result.clusters = c[key];
      }

      else if (key == "year" && c[key] != null) {
        result.year += c[key];
        document.querySelector(".Jahr").innerHTML = result.year;
      }
      else if (key == 'active_scenario' && c[key] != null) {
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

const groupData = function (data, total) {
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

const formatData = function (obj) {
  let r = [];
  for (let key in obj) {
    r.push({
      "name": key,
      "value": obj[key]
    });
  }
  return r;
}

const getCo2 = function (e, type) {
  let r = 0;
  if (type === "Strom") {
    r = e / 8 * 3; // der strommix bei ca 3000 kg(3 ton) Co2-äq / 8 MWh
  } else if (type === "Wärme") {
    r = e / 8 * 2.5;
  }
  return r;
}

const kwh2mwh = function (kwh) {
  return kwh / 1000;
}
