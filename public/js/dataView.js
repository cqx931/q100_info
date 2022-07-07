



const createIndividualHouseholdCardChart = function(){
    const targetHTMLElement = "#householdDataChart"
    createD3BasicLineChart(targetHTMLElement)
    createXYplotlyChart("#plotlyChart")
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

function renewDataViewGAMAImgSrcPath(iteration_number, json) {
    const arg = "iteration_round_" + iteration_number
    GAMASimulationImgSrcPaths[arg] = json
    console.log("updating images src path for " + arg);
}

function renewDataViewGAMAImgsPerSection(section_number) {
    const sectionClassName = ".graphs_wrapper_" + section_number + " > div"
    let image_index_counter = 0
    $(sectionClassName).children().each(function () {
        $(this).attr("src", GAMASimulationImgSrcPaths["iteration_round_" + section_number]["iteration_images"][image_index_counter]);
        image_index_counter++;
    });
}

