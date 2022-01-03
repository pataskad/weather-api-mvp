/* 
    file layout:
    variable configs
    eventListeners/unit toggle
    async function to retrieve weather from vendor API
    helper functions to display correct weather information to the user
*/

let searchString = "La Crosse";
let weatherUnits = "imperial"; // toggle units for api call; imperial/metric options
let unitsDisplay = "F";
let currentSkyCover = "";
let feelsLike = 25;
let highToday = 25;
let lowToday = 25;
let windSpeed = 0;
let windDirectionCompass = "NW";
let humidity = 0;

let currentTemp = 25;

const unitLabelToggle = document.querySelector(".unit-label");
document.addEventListener("click", function (e) {
    if (e.target.matches(".toggle-units-btn") || e.target.matches(".round-slider") || e.target.matches(".unit-label") || e.target.matches("#unit-label-output")) {
        toggleUnits();
    }
});

const searchBtn = document.querySelector("#searchSubmit");
searchBtn.addEventListener("click", updateSearchString);

async function getWeather() { // syntactic sugar for promises!
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchString}&appid=dab7713d41275b858f22f7809ce1dbb8&units=${weatherUnits}`, {mode: "cors"}); 
        const searchData = await response.json();
        if (searchData.cod === "400" || searchData.cod === "404") {
            throw new Error("=> Please enter a valid or higher populated city");
        } else {
            console.log(searchData); // testing 

            currentTemp = parseInt(searchData.main.temp.toFixed(0));
            currentSkyCover = searchData.weather[0].main;
            feelsLike = parseInt(searchData.main.feels_like.toFixed(0));
            windSpeed = parseInt(searchData.wind.speed.toFixed(0));
            highToday = parseInt(searchData.main.temp_max.toFixed(0));
            lowToday = parseInt(searchData.main.temp_min.toFixed(0));
            humidity = parseInt(searchData.main.humidity);
            searchString = searchData.name;

            windDirectionCompass = convertWindDirection(parseInt(searchData.wind.deg));
            showWeather();
            return searchData;
        }
    } catch (err) {
        console.log(err + " **Error caught!**");
    }
}
getWeather();

function showWeather() {
    const searchOutput = document.querySelector(".search-results-output");
    searchOutput.textContent = `Showing results for: ${searchString}`;
    
    const currTemp = document.querySelector("#current-temp");
    currTemp.innerHTML = `${currentTemp} <span id="degrees-symbol">&deg;${unitsDisplay}</span>`;
    unitLabelToggle.innerHTML = `<span id="unit-label-output">&deg;${unitsDisplay}</span>`;

    const currSkyCover = document.querySelector("#current-sky-cover");
    currSkyCover.innerHTML = `${currentSkyCover}`;

    const feelsLikeTemp = document.querySelector("#feels-like");
    feelsLikeTemp.innerHTML = `${feelsLike} <span class="degree-symbol-only">&deg;</>`;
    const todaysHighTemp = document.querySelector("#today-high");
    todaysHighTemp.innerHTML = `${highToday} <span class="degree-symbol-only">&deg;</>`;
    const todaysLowTemp = document.querySelector("#today-low");
    todaysLowTemp.innerHTML = `${lowToday} <span class="degree-symbol-only">&deg;</>`;

    const windSpeedOutput = document.querySelector("#wind-speed");
    windSpeedOutput.innerHTML = `${windSpeed}`;

    const windDirectionOutput = document.querySelector("#wind-direction");
    windDirectionOutput.innerHTML = `${windDirectionCompass}`;

    const hgOutput = document.querySelector("#humidity");
    hgOutput.innerHTML = `${humidity}`;
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
function convertWindDirection(windDirection) {
    let windDegrees = Math.floor((windDirection / 22.5) + 0.5);
    let compassArr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    return compassArr[(windDegrees % 16)];
}
