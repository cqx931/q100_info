


const renewResultsImages = function(data){
    document.getElementById("energy_prices").src = data.energy_prices + "?update=" + new Date().getTime();
    document.getElementById("emissions_neighborhood_accu").src = data.emissions_neighborhood_accu + "?update=" + new Date();
    document.getElementById("emissions_groups").src = data.emissions_groups + "?update=" + new Date();
    document.getElementById("energy_prices_groups").src = data.energy_prices_groups + "?update=" + new Date();
}
