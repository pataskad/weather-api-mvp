let searchString = "La Crosse";
let weatherUnits = "imperial"; // toggle units for api call; imperial/metric options
let unitsDisplay = "F";

let currentTemp = 25;

async function getWeather() { // syntactic sugar for promises!
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchString}&appid=dab7713d41275b858f22f7809ce1dbb8&units=${weatherUnits}`, {mode: "cors"}); 
        const searchData = await response.json();
        if (searchData.cod === "400" || searchData.cod === "404") {
            console.log(searchData.cod + " => Please enter a valid or higher populated city");
        } else {
            console.log(searchData); // testing 

            currentTemp = parseInt(searchData.main.temp.toFixed(0));
            searchString = searchData.name;
            showWeather();
            return searchData;
        }
    } catch (err) {
        console.log(err + " **Error caught!**");
    }
}
getWeather();

function showWeather() {
    const currTemp = document.querySelector("#current-temp");
    currTemp.innerHTML = `${currentTemp} <span id="degrees-symbol">&deg;${unitsDisplay}</span>`;
    unitLabelToggle.innerHTML = `<span id="unit-label-output">&deg;${unitsDisplay}</span>`;

    const searchOutput = document.querySelector(".search-results-output");
    searchOutput.textContent = `Showing results for: ${searchString}`;
}

function updateSearchString() {
    searchString = document.querySelector("#searchBox").value;
    document.querySelector("#searchBox").value = "";
    getWeather();
}

function toggleUnits() {
    if (weatherUnits === "imperial") {
        weatherUnits = "metric";
        unitsDisplay = "C";
    } else if (weatherUnits === "metric") {
        weatherUnits = "imperial";
        unitsDisplay = "F";
    }
    return getWeather();
}

const unitLabelToggle = document.querySelector(".unit-label");
document.addEventListener("click", function (e) {
    if (e.target.matches(".toggle-units-btn") || e.target.matches(".round-slider") || e.target.matches(".unit-label") || e.target.matches("#unit-label-output")) {
        toggleUnits();
    }
});

const searchBtn = document.querySelector("#searchSubmit");
searchBtn.addEventListener("click", updateSearchString);