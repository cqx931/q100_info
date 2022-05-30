



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
