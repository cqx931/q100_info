



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

    document.getElementById('chartsImage').src = json.iteration_images[json.iteration_round][0]+new Date().getTime();
    document.getElementById('emissionsCumulativeImage').src = json.iteration_images[json.iteration_round][1]+new Date().getTime();
    document.getElementById('emissionsPerYearImage').src = json.iteration_images[json.iteration_round][2]+new Date().getTime();
    document.getElementById('householdsEmploymentPieImage').src = json.iteration_images[json.iteration_round][3]+new Date().getTime();
    document.getElementById('modernizationImage').src = json.iteration_images[json.iteration_round][4]+new Date().getTime();
    document.getElementById('neighborhoodImage').src = json.iteration_images[json.iteration_round][5]+new Date().getTime();
}

function renewDataViewGAMAImgSrcPath(iteration_number, json) {
    const arg = "iteration_round_" + iteration_number
    GAMASimulationImgSrcPaths[arg] = json
    console.log("updating images src path");
}

function renewDataViewGAMAImgsPerSection(section_number) {
    const sectionClassName = ".graphs_wrapper_" + section_number + " > div"
    let image_index_counter = 0
    $(sectionClassName).children().each(function () {
        $(this).attr("src", GAMASimulationImgSrcPaths["iteration_round_" + section_number]["iteration_images"][image_index_counter]);
        image_index_counter++;
    });
}

