//tmp data
const clusterTotal = {
  Energieverbrauch: {
  	
  	"Strom": 103.159,
    "Wärme": 720.3691
  },
  CO2: {
  	"Strom": 38.6846,
    "Wärme": 225.1153
  }
}
const total = {
  Energieverbrauch: {
  	"Strom": 1103.629,
    "Wärme": 134720.5319},
  CO2: {
  	"Strom": 413.8608,
     "Wärme": 42100.1662
   }
}

const CHART_MARGIN = ({top: 30, right: 20, bottom: 0, left: 50});

const updateInfoScreen = function(data) {
  const cluster = renderCluster(data, window.innerWidth*0.6, window.innerHeight/5, "horizontal");
  const currentCluster = document.getElementById("cluster");
  currentCluster.parentNode.replaceChild(cluster, currentCluster);
}


const renderInfoScreen_horizontal = function(w, h, data){
  w -= 20;
  const cluster = renderCluster(clusterTotal, w*0.6, h/5, "horizontal")
  const totalDataviz = renderTotal(total,w,h/5, "horizontal")
  const infoScreen = document.getElementById("infoScreen")
  infoScreen.append(cluster)
  infoScreen.append(totalDataviz)
  infoScreen.style.width = w + "px"
  infoScreen.style.height = h + "px"
}

const renderCluster = function(input, w, h, type){
  let renderChart = horizontalBarChart;
  if (type == "vertical") renderChart = barChart;
  const CONFIG_Energie = {width:w, height:h, colors:["grey","orange"], title: "Energieverbrauch", unit: "MWh"};
  const CONFIG_CO2 = {width:w, height:h, colors:["grey","orange"], title: "CO2" , unit: "tCO2"};
  const bar1 = stackableHorizontalBarChartWithGoal(formatData(input.CO2), 0.65, CONFIG_CO2)
  const bar2 = horizontalBarChart(formatData(input.Energieverbrauch), CONFIG_Energie)
 
  const title = document.createElement("h4")
  title.textContent = "Gebäudecluster"
  
  const wrapper = document.createElement("div")

  wrapper.id = "cluster"
  wrapper.style.width = w + "px";
  wrapper.append(title)
  wrapper.append(bar1)
  wrapper.append(bar2)
return wrapper
}

const renderTotal = function(input, w, h, type){
  const wrapper = document.createElement("div");
  
  let renderChart = horizontalBarChart;
  if (type == "vertical") renderChart = barChart;
  const CONFIG_Energie = {width:w, height:h, colors:["grey","orange"], title: "Energieverbrauch", unit: "MWh"};
  const CONFIG_CO2 = {width:w, height:h, colors:["grey","orange"], title: "CO2" , unit: "tCO2"};
  const bar1 = stackableHorizontalBarChartWithGoal(formatData(input.CO2), 0.65, CONFIG_CO2)
  const bar2 = renderChart(formatData(input.Energieverbrauch), CONFIG_Energie)
  
  const title = document.createElement("h4")
  title.textContent = "Quartier gesamt"
  
  wrapper.id = "total";
  wrapper.style.width = w + "px";
  wrapper.append(title)
  wrapper.append(bar1)
  wrapper.append(bar2)
return wrapper;
}

const stackableHorizontalBarChartWithGoal = function(data, goal, config) {
     // config: w,h, color,title, unit
    const w = config.width-20, h = config.height,
          margin = CHART_MARGIN;

    const svg = d3.create("svg")
      .attr("viewBox", [0, 0, w, h]);

  if(config.title != null) {
    svg.append("text")
    .attr("class","chart_title")
    .attr("text-anchor","left")
    //.attr("transform", `translate(0,${h - margin.bottom})`)
    .attr("x", 10)
    .attr("y", 20)
    .attr("fill", "#aaa")
    .style("font-weight", "bold")
    .text(config.title)
  }
  
  const total = d3.sum(data, d => d.value)
  const _data = groupData(data, total)
  
  let x = d3.scaleLinear()
    .domain([0, total])
    .range([margin.left, w - margin.right])
  
  let y = d3.scaleBand()
    .domain(d3.range(data.length))
    .rangeRound([margin.top + 20, h - margin.bottom])
    .padding(0.1)
  
  const format = x.tickFormat(20, data.format)
  
  let xAxis = g => g
    .attr("transform", `translate(0,${margin.top+20})`)
    .call(d3.axisTop(x).ticks(w / 80, data.format))
    .call(g => g.select(".domain").remove())
  
  let yAxis = g => g
    .call(g => g.append("text")
    .attr("x", 10)
    .attr("y", margin.top + 10)
    .attr("font-size", 11)
    .attr("fill", "currentColor")
    .attr("text-anchor", "start")
    .style("font-weight", "bold")
    .attr("font-family", "sans-serif")
    .text(config.unit))

  //col
  //todo: stack
  svg.append("g")
    .selectAll("rect")
    .data(_data)
    .join("rect")
      .attr("x", d => x(d.cumulative))
      .attr("y", y(0))
      .attr("width", d => x(d.value) - x(0))
      .attr("height", y.bandwidth())
      .style('fill', (d, i) => config.colors[i])
    ;

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
  if(goal != null) {
    svg.append("rect")
      .attr("fill", "transparent")
      .attr("stroke", "red")
    .attr("x", 50)
    .attr("y", y(0))
    .attr("width", (w - margin.right-margin.left)*goal)
    .attr("height", y.bandwidth());

    svg.append("text")
       .attr("fill", "red")
      .attr("text-anchor", "middle")
       .attr("font-family", "sans-serif")
       .attr("font-size", 14)
      .attr("font-weight", 600)
       .text(goal * 100 + "%")
       .attr("x", (w - margin.right-margin.left)*goal)
       .attr("y", y(0) + y.bandwidth()/2 + 7)
  }
  svg.append("g")
      .call(xAxis);

  //text label
  svg.append("g").selectAll('.text-label')
    .data(_data)
    .join('text')
    .attr('class', 'text-label')
    .attr('text-anchor', 'middle')
    .attr('x', d => x(d.cumulative) + x(d.value)/2)
    .attr('y', y(0) + y.bandwidth() + 15)
    .attr("font-family", "sans-serif")
    .attr("font-size", 12)
    .style('fill',(d, i) => config.colors[i])
    .text(d => d.label)

  svg.append("g")
      .call(yAxis);

  return svg.node();

}

const horizontalBarChart = function(data,config){
  const w = config.width-20, h = config.height,
        margin = CHART_MARGIN; 
  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, w, h]);

  if (config.title != null) {
    svg.append("text")
    .attr("class","chart_title")
    .attr("text-anchor","left")
    //.attr("transform", `translate(0,${h - margin.bottom})`)
    .attr("x", 10)
    .attr("y", 20)
    .attr("fill", "#aaa")
    .style("font-weight", "bold")
    .text(config.title)
  }
  
  let x = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.value)])
    .range([margin.left, w - margin.right])

  let y = d3.scaleBand()
    .domain(d3.range(data.length))
    .rangeRound([margin.top + 20, h - margin.bottom])
    .padding(0.1)

  const format = x.tickFormat(20, data.format)

  let xAxis = g => g
    .attr("transform", `translate(0,${margin.top+20})`)
    .call(d3.axisTop(x).ticks(w / 80, data.format))
    .call(g => g.select(".domain").remove())

  let yAxis = g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).tickFormat(i => data[i].name).tickSizeOuter(0))
    .call(g => g.append("text")
    .attr("x", -margin.left + 10)
    .attr("y", margin.top + 10)
    .attr("fill", "currentColor")
    .attr("text-anchor", "start")
    .style("font-weight", "bold")
    .text(config.unit))
  
  svg.append("g")
      .selectAll("rect")
      .data(data)
      .join("rect")
      .attr("x", x(0))
      .attr("y", (d, i) => y(i))
      .attr("fill", (d, i) => config.colors[i])
      .attr("width", d => x(d.value) - x(0))
      .attr("height", y.bandwidth());
  
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

// Data Processing

const processData = function(json){
  let result = {
      Energieverbrauch:{ //in mwh
        "Strom":0,
        "Wärme":0, 
    }, 
    CO2:{
      "Strom":0,
      "Wärme":0
    }
    };
  for (var i = json.length - 1; i >= 0; i--) {
    const c = json[i];
    for (let key in c) {
      if (key == "Wärmeverbrauch 2017 [kWh]" && c[key] != null) {
            result.Energieverbrauch["Wärme"] += kwh2mwh(c[key]);
            result.CO2["Wärme"] += getCo2(result.Energieverbrauch["Wärme"], "Wärme");

        }
        if(key == "Stromverbrauch 2017 [kWh]" && c[key] != null) {
            result.Energieverbrauch["Strom"] += kwh2mwh(c[key]);
             result.CO2["Strom"] += getCo2(result.Energieverbrauch["Strom"], "Strom");
        }
    }

  }
  console.log(result)
  return result;
}

const groupData = function(data, total) {

  // use scale to get percent values
  const percent = d3.scaleLinear()
    .domain([0, total])
    .range([0, 100])
  // filter out data that has zero values
  // also get mapping for next placement
  // (save having to format data for d3 stack)
  let cumulative = 0
  const _data = data.map(d => {
    cumulative += d.value
    return {
      value: d.value,
      // want the cumulative to prior value (start of rect)
      cumulative: cumulative - d.value,
      label: d.name,
      percent: percent(d.value)
    }
  }).filter(d => d.value > 0)
  return _data
}

const getCo2 = function(e, type) {
  let r = 0;
  if ( type === "Strom" ) r = e/8*3; // der strommix bei ca 3000 kg(3 ton) Co2-äq / 8 MWh
  else if ( type === "Wärme" ) r = e/8*2.5;
  return r;
}

const kwh2mwh = function(kwh){
  return kwh/1000;
}

const formatData = function(obj) {
  let r = [];
  for (let key in obj){
    r.push({"name":key,"value":obj[key]});
  }
  return r;
}