let searchString = "La Crosse";
let weatherUnits = "imperial"; // toggle units for api call; imperial/metric options

async function getWeather() { // syntactic sugar for promises!
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchString}&appid=dab7713d41275b858f22f7809ce1dbb8&units=${weatherUnits}`, {mode: "cors"}); 
        const searchData = await response.json();
        if (searchData.cod === "400" || searchData.cod === "404") {
            console.log(searchData.cod + " => Please enter a valid or higher populated city");
        } else {
            console.log(searchData); // testing 
            return searchData;
        }
    } catch (err) {
        console.log(err + " **Error caught!**");
    }
}
getWeather();

function updateSearchString() {
    searchString = document.querySelector("#searchBox").value;
    document.querySelector("#searchBox").value = "";
    getWeather();
}

const searchBtn = document.querySelector("#searchSubmit");
searchBtn.addEventListener("click", updateSearchString);