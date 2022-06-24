



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

function updateSimulationOutputs(json) {
    // get class round
    // get each element
    console.log("updating images");

    document.getElementById('chartsImage').src = json.iteration_images[json.iteration_round]+new Date().getTime();
    // document.getElementById('emissionsCumulativeImage').src = "data/headless/output/snapshot/Emissions cumulativenull-199.png?" +new Date().getTime();
    // document.getElementById('emissionsPerYearImage').src = "data/headless/output/snapshot/Emissions per yearnull-199.png?" +new Date().getTime();
    // document.getElementById('householdsEmploymentPieImage').src = "data/headless/output/snapshot/households_employment_pienull-199.png?" +new Date().getTime();
    // document.getElementById('modernizationImage').src = "data/headless/output/snapshot/Modernizationnull-199.png?" +new Date().getTime();
    // document.getElementById('neighborhoodImage').src = "data/headless/output/snapshot/neighborhoodnull-199.png?" +new Date().getTime();
}

function renewDataViewGAMAImgSrcPath(json) {
    const arg = "iteration_round_" + json.iteration_round
    GAMASimulationImgSrcPaths[arg] = json
}

function renewDataViewGAMAImgsPerSection(section_number) {
    const sectionClassName = ".graphs_wrapper_" + section_number + " > div"
    let image_index_counter = 0
    // $(sectionClassName).children().each(function () {
    //     $(this).attr("src", GAMASimulationImgSrcPaths["iteration_round_" + section_number]["images"][image_index_counter])
    //     image_index_counter ++
    // });

    console.log(GAMASimulationImgSrcPaths);

    document.getElementById('chartsImage').src = GAMASimulationImgSrcPaths["iteration_round_0"] +new Date().getTime();

}

