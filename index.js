let searchString = "La Crosse";
let weatherUnits = "imperial"; // toggle units for api call; imperial/metric options

async function getWeather() { // syntactic sugar for promises!
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchString}&appid=dab7713d41275b858f22f7809ce1dbb8&units=${weatherUnits}`, {mode: "cors"});
    const searchData = await response.json();
    console.log(searchData);
}
getWeather();

function updateSearchString() {
    searchString = document.querySelector("#searchBox").value;
    document.querySelector("#searchBox").value = "";
    getWeather();
}

const searchBtn = document.querySelector("#searchSubmit");
searchBtn.addEventListener("click", updateSearchString);