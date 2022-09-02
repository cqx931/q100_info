



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

const createEmissionComparisonChart = function (data_path_list){
    const targetHTMLElement = "#emissionComparisonChart"
    createD3MultipleLineChart(targetHTMLElement, data_path_list)
}

const removeHouseholdCards = function(){
    $('#householdDataChart').empty();
}

const removeEmissionComparisonChart = function(){
    $('#emissionComparisonChart').empty();
}

function renewResultsImgSrcPath(iteration_number, json) {
    const arg = "iteration_round_" + iteration_number
    GAMASimulationImgSrcPaths[arg] = json
    console.log("updating images src path for " + arg);
}

function renewDataViewGAMAImgsPerSection(section_number) {
    const sectionClassName = ".graphs_wrapper_" + section_number + " > div"
    let image_index_counter = 0
    $(sectionClassName).children().each(function () {
        $(this).attr("src", GAMASimulationImgSrcPaths["iteration_round_" + section_number]["gama_iteration_images"][image_index_counter]);
        image_index_counter++;
    });
}

const injectDataToDataView = function(data){
    console.log(data)
    data.forEach((data_per_iteration) => { // for each val in arr, exec func
        renewResultsImgSrcPath(data_per_iteration.iteration_round, data_per_iteration)
        console.log(GAMASimulationImgSrcPaths)
        renewDataViewGAMAImgsPerSection(data_per_iteration.iteration_round)
    });
    removeEmissionComparisonChart()
    createEmissionComparisonChart(data[0].emissions_data_paths)
}

const injectDataToIndividualDataView = function(data) {
    console.log('individualdataviewdata', data.buildings_groups)
    for(let i = 0; i<4; i++){
        const group_name = "group_" + i
        let targetBuilding
        try {
            targetBuilding = data.buildings_groups[group_name].buildings[0]
        } catch (error) {
            return
        }
        $("#dataViewIndividualQuarter"+i).find("h3 > span").text(targetBuilding["address"])

        $("#dataViewIndividualQuarter"+i).find(".connectionToHeatGridNow").prop("checked", targetBuilding["connection_to_heat_grid_prior"])
        $("#dataViewIndividualQuarter"+i).find(".connectionToHeatGridFuture").prop("checked", targetBuilding["connection_to_heat_grid"])
        $("#dataViewIndividualQuarter"+i).find(".refurbishedNow").prop("checked", targetBuilding["refurbished_prior"])
        $("#dataViewIndividualQuarter"+i).find(".refurbishedFuture").prop("checked", targetBuilding["refurbished"])
        $("#dataViewIndividualQuarter"+i).find(".environmentCommitmentNow").prop("checked", targetBuilding["environmental_engagement_prior"])
        $("#dataViewIndividualQuarter"+i).find(".environmentCommitmentFuture").prop("checked", targetBuilding["environmental_engagement"])

        $("#dataViewIndividualQuarter"+i).find(".emissions_graphs img").attr("src", targetBuilding["emissions_graphs"]);
        $("#dataViewIndividualQuarter"+i).find(".energy_prices_graphs img").attr("src", targetBuilding["energy_prices_graphs"]);
    }

}


