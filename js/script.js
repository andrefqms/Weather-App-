const apikey = "3a1e060c38b443cc015a67c8b2b71ef8";
const apiCountryURL =  "https://flagcdn.com/32x24/";
const apiUnsplash = "https://source.unsplash.com/1600x900/?";

const cityInput = document.querySelector("#city-input");

const button = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const countryFlag = document.querySelector("#country");
const temperatureElement = document.querySelector("#temperature span");
const descriptionElement = document.querySelector("#description");
const humidity = document.querySelector("#umidity i");
const wind = document.querySelector("#wind i");
const weatherIcon = document.querySelector("#weather-icon");

const weatherContainer = document.querySelector("#weather-data");

const errorMessageContainer = document.querySelector("#error-message");
const loader = document.querySelector("#loader");
const suggestionContainer = document.querySelector("#suggestions");
const suggestionButtons = document.querySelectorAll("#suggestions button");

//funcoes
const toggleLoader = () => {
    loader.classList.toggle("hide");
};


const getWeatherData = async (city) => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}&lang=pt_br`;

    const res = await fetch(apiWeatherURL);
    const data = await res.json();
    toggleLoader();
    return(data);

}

// Tratamento de erro
const showErrorMessage = () => {
    errorMessageContainer.classList.remove("hide");
};
  
const hideInformation = () => {
    errorMessageContainer.classList.add("hide");
    weatherContainer.classList.add("hide");
  
    suggestionContainer.classList.add("hide");
};

const showWeatherData = async (city) =>{
    hideInformation();
    const data = await getWeatherData(city);

    if (data.cod === "404") {
        showErrorMessage();
        return;
      }

    

    cityElement.innerText = data.name;
    temperatureElement.innerText = parseInt(data.main.temp);
    descriptionElement.innerText = data.weather[0].description;
    weatherIcon.setAttribute("src",`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    let countryFlagICON = data.sys.country.toLowerCase();
    countryFlag.setAttribute("src", apiCountryURL + `${countryFlagICON}.png`);
    humidity.innerText = `${data.main.humidity}%`;
    wind.innerText = `${data.wind.speed}km/h`;


    // Change bg image
    document.body.style.backgroundImage = `url("${apiUnsplash + city}")`;

    weatherContainer.classList.remove("hide");
}

//eventos
button.addEventListener("click", (e)=>{
    e.preventDefault();
    const city = cityInput.value;
    showWeatherData(city);
});

cityInput.addEventListener("keyup",(e)=>{
    if(e.code === "Enter"){
        const city = e.target.value;
        showWeatherData(city);
    }
});

// Sugestões
suggestionButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const city = btn.getAttribute("id");
  
      showWeatherData(city);
    });
  });