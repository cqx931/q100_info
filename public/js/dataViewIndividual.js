



const createIndividualHouseholdCardChart = function () {
    const targetHTMLElement = "#householdDataChart"
    createD3BasicLineChart(targetHTMLElement)
}

const createIndividualHousehouldCardTitleSection = function () {
    //inject individual household info: streetname, green friendly tendency, isHeizung
    return
}

const createIndividualHouseholdCard = function () {
    createIndividualHousehouldCardTitleSection()
    createIndividualHouseholdCardChart()
}

const createHouseholdCards = function () {
    createIndividualHouseholdCard()
}

const createEmissionComparisonChart = function (data_path_list) {
    const targetHTMLElement = "#emissionComparisonChart"
    // createD3MultipleLineChart(targetHTMLElement, data_path_list)
}

const removeHouseholdCards = function () {
    $('#householdDataChart').empty();
}

const removeEmissionComparisonChart = function () {
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

const injectDataToDataView = function (data) {
    console.log(data)
    data.forEach((data_per_iteration) => { // for each val in arr, exec func
        renewResultsImgSrcPath(data_per_iteration.iteration_round, data_per_iteration)
        console.log(GAMASimulationImgSrcPaths)
        renewDataViewGAMAImgsPerSection(data_per_iteration.iteration_round)
    });
    removeEmissionComparisonChart()
    createEmissionComparisonChart(data[0].emissions_data_paths)
}

const updateIndividualData = function (data) {
    for (let i = 0; i < 4; i++) {
        const group_name = "group_" + i;
        let targetBuilding;
        let value;
        try {
            // get first building of group:
            targetBuilding = data.buildings_groups[group_name].buildings[0];
            let individualQuarter = $("#dataViewIndividualQuarter" + i)

            // Bestandsdaten:
            value = targetBuilding["refurbished_prior"] > 0 ? targetBuilding["refurbished_prior"] : "unsaniert";
            individualQuarter
                .find(".refurbished")
                .children(".unchanged")
                .text(value);

            value = targetBuilding["connection_to_heat_grid_prior"] > 0 ? targetBuilding["connection_to_heat_grid_prior"] : "nein";
            individualQuarter
                .find(".connection_to_heat_grid")
                .children(".unchanged")
                .text(value);

            value = targetBuilding["save_energy_prior"] ? "ja" : "nein";
            individualQuarter
                .find(".save_energy")
                .children(".unchanged")
                .text(value);

            // update round decisions:
            value = targetBuilding["refurbished"] > 0 ? targetBuilding["refurbished"] : "unsaniert";
            individualQuarter
                .find(".refurbished")
                .children(".round" + currentIterationRound)
                .text(value);

            value = targetBuilding["connection_to_heat_grid"] > 0 ? targetBuilding["connection_to_heat_grid"] : "nein";
            individualQuarter
                .find(".connection_to_heat_grid")
                .children(".round" + currentIterationRound)
                .text(value);

            value = targetBuilding["save_energy"] ? "ja" : "nein";
            individualQuarter
                .find(".save_energy")
                .children(".round" + currentIterationRound)
                .text(value);

            individualQuarter.find(".emissions_graphs img").attr("src", targetBuilding["emissions_graphs"]);
            individualQuarter.find(".energy_prices_graphs img").attr("src", targetBuilding["energy_prices_graphs"]);

            ["refurbished", "connection_to_heat_grid", "save_energy"].forEach(function (item){
                if (targetBuilding[item] != 0)
                    individualQuarter.find("img."+item).show();
                else
                    individualQuarter.find("img."+item).hide();
            });


        } catch (error) {
            // console.log(error)
            console.log("failed loading data for ", group_name, " - group is probably empty.")
        }
    }

}

function focusActiveUserData(userNumber){

    // hide all quarterSections:
    for (var i = 0; i<4; i++){
        $("#dataViewIndividualQuarter" + i).css("display", "None");
    }

    // show only active quarterSection:
    let individualQuarter = $("#dataViewIndividualQuarter" + userNumber)
    individualQuarter.css("display", "grid");
}

function tableAddColumn(round) {
    for (let i = 0; i < 4; i++) {
        // add header column:
        let element = $('#dataViewIndividualQuarter' + i).find('.headerRow');
        element.append(`<th class="round${round}">Runde ${round + 1}</th>`);

        // add data columns:
        $('#dataViewIndividualQuarter' + i)
            .find('.refurbished')
            .append(`<td class="round${round}">---</td>`);

        $('#dataViewIndividualQuarter' + i)
            .find('.connection_to_heat_grid')
            .append(`<td class="round${round}">---</td>`);

        $('#dataViewIndividualQuarter' + i)
            .find('.save_energy')
            .append(`<td class="round${round}">---</td>`);
    }
}