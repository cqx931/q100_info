// https://observablehq.com/@d3/threshold-encoding

const createXYplotlyChart = function (targetSelector) {
    trace1 = {
        type: 'scatter',
        x: [1, 2, 3, 4],
        y: [10, 15, 13, 17],
        mode: 'lines',
        name: 'Red',
        line: {
            color: 'rgb(219, 64, 82)',
            width: 3
        }
    };

    trace2 = {
        type: 'scatter',
        x: [1, 2, 3, 4],
        y: [12, 9, 15, 12],
        mode: 'lines',
        name: 'Blue',
        line: {
            color: 'rgb(55, 128, 191)',
            width: 1
        }
    };

    var layout = {
        width: 500,
        height: 500
    };

    var data = [trace1, trace2];

    Plotly.newPlot("plotlyChart", data, layout);

}

const createD3thresholdLineChart_ = function (targetSelector) {

    const height = 500
    const width = 300
    const margin = ({ top: 20, right: 30, bottom: 30, left: 40 })

    // make svg object from selected target div:
    const svg = d3.select(targetSelector)
        // chart = {
        // const svg = d3.create("svg")
        // .attr("viewBox", [0, 0, width, height]);
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    //Read the data
    const testDataApiURL = "http://localhost:8000/api/testData"
    let csvRowCount = 0
    d3.csv(testDataApiURL, function (data){
        // process data
    });
    // d3.csv(csvData,
    // When reading the csv, I must format variables:
    // function (d) {
    //     if (csvRowCount > 9497) return
    //     csvRowCount += 1
    //     const formatDate = d.current_date.match(/'([^']+)'/)[1].slice(0, 11)
    //     return { date: d3.timeParse("%Y-%m-%d ")(formatDate), value: d.value }
    // }).then(data => {
    //     drawThreshGraph(data, svg)
    // }).catch(err => { console.log("error while processing CSV with D3", err) })

    // return svg.node();
    //   }

    drawThreshGraph(data, svg);

}
const drawThreshGraph = function (data, svg) {

    const x = d3.scaleUtc()
        .domain(d3.extent(data, d => d.date))
        .range([margin.left, width - margin.right])


    svg.append("g")
        .call(xAxis);

    xAxis = g => g
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0))
        .call(g => g.select(".domain").remove())

    const y = d3.scaleLinear()
        .domain(d3.extent(data, d => d.value)).nice()
        .range([height - margin.bottom, margin.top])

    svg.append("g")
        .call(yAxis);


    yAxis = g => g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y))
        .call(g => g.select(".domain").remove())
        .call(g => g.select(".tick:last-of-type text").clone()
            .attr("x", 3)
            .attr("text-anchor", "start")
            .attr("font-weight", "bold")
            .text(data.y))

    line = d3.line()
        .curve(d3.curveStep)
        .defined(d => !isNaN(d.value))
        .x(d => x(d.date))
        .y(d => y(d.value))

    threshold = d3.median(data, d => d.value)

    const gradient = "asdf";

    svg.append("linearGradient")
        .attr("id", gradient.id)
        .attr("gradientUnits", "userSpaceOnUse")
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", 0)
        .attr("y2", height)
        .selectAll("stop")
        .data([
            { offset: y(threshold) / height, color: "red" },
            { offset: y(threshold) / height, color: "black" }
        ])
        .join("stop")
        .attr("offset", d => d.offset)
        .attr("stop-color", d => d.color);

    svg.append("path")
        .datum(data)
        .attr("fill", "none")
        // .attr("stroke", gradient)
        .attr("stroke-width", 1.5)
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("d", line);

    // data = Object.assign((await FileAttachment("temperature.csv").csv({ typed: true })).map(({ date, temperature }) => ({ date, value: temperature })), { y: "°F" })
}
