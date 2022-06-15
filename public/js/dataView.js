



const createIndividualHouseholdCardChart = function(){
    const targetHTMLElement = "#householdDataChart"
    createD3BasicLineChart(targetHTMLElement)
}

const createIndividualHousehouldCardTitleSection = function() {
    //inject individual household info: streetname, green friendly tendency, isHeizung
    return
}

const createIndividualHouseholdCard = function (){
    createIndividualHousehouldCardTitleSection()
    createIndividualHouseholdCardChart()
}

const createHouseholdCards = function (){
    createIndividualHouseholdCard()
}

const removeHouseholdCards = function(){
    $('#householdDataChart').empty();
}

function updateSimulationOutputs() {
    document.getElementById('chartsImage').src = "data/headless/output/snapshot/Chartsnull-199.png?" +new Date().getTime();
    document.getElementById('emissionsCumulativeImage').src = "data/headless/output/snapshot/Emissions cumulativenull-199.png?" +new Date().getTime();
    document.getElementById('emissionsPerYearImage').src = "data/headless/output/snapshot/Emissions per yearnull-199.png?" +new Date().getTime();
    document.getElementById('householdsEmploymentPieImage').src = "data/headless/output/snapshot/households_employment_pienull-199.png?" +new Date().getTime();
    document.getElementById('modernizationImage').src = "data/headless/output/snapshot/Modernizationnull-199.png?" +new Date().getTime();
    document.getElementById('neighborhoodImage').src = "data/headless/output/snapshot/neighborhoodnull-199.png?" +new Date().getTime();
}