// script.js

const apikey = "3a1e060c38b443cc015a67c8b2b71ef8";
const apiCountryURL = "https://flagcdn.com/32x24/";
const apiUnsplash = "https://api.unsplash.com/search/photos?page=1&query=";
const unsplashApiKey = "-PYwj_V7vHauncNCmfbyz3WfuzOqxCGcJFRvzZn9Sio";

const cityInput = document.querySelector("#city-input");
const button = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const countryFlag = document.querySelector("#country");
const temperatureElement = document.querySelector("#temperature span");
const descriptionElement = document.querySelector("#description");
const humidityElement = document.querySelector("#humidity");
const windElement = document.querySelector("#wind");
const weatherIcon = document.querySelector("#weather-icon");

const weatherContainer = document.querySelector("#weather-data");
const errorMessageContainer = document.querySelector("#error-message");
const loader = document.querySelector("#loader");
const suggestionContainer = document.querySelector("#suggestions");
const suggestionButtons = document.querySelectorAll("#suggestions button");

const toggleLoader = () => {
  loader.classList.toggle("hide");
};

const getWeatherData = async (city) => {
  const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}&lang=pt_br`;

  const res = await fetch(apiWeatherURL);
  const data = await res.json();
  toggleLoader();
  return data;
};

// Tratamento de erro
const showErrorMessage = () => {
  errorMessageContainer.classList.remove("hide");
};

const hideInformation = () => {
  errorMessageContainer.classList.add("hide");
  weatherContainer.classList.add("hide");
  suggestionContainer.classList.add("hide");
};

const getUnsplashImage = async (city) => {
  const response = await fetch(`${apiUnsplash}${city}&client_id=${unsplashApiKey}`);
  const data = await response.json();
  return data.results[0].urls.regular;
};

const showWeatherData = async (city) => {
  hideInformation();
  const data = await getWeatherData(city);

  if (data.cod === "404") {
    showErrorMessage();
    return;
  }

  if (cityElement) cityElement.innerText = data.name;
  if (temperatureElement) temperatureElement.innerText = parseInt(data.main.temp);
  if (descriptionElement) descriptionElement.innerText = data.weather[0].description;
  if (weatherIcon) weatherIcon.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
  let countryFlagICON = data.sys.country.toLowerCase();
  if (countryFlag) countryFlag.setAttribute("src", apiCountryURL + `${countryFlagICON}.png`);
  if (humidityElement) humidityElement.innerText = `${data.main.humidity}%`;
  if (windElement) windElement.innerText = `${data.wind.speed}km/h`;

  // Change bg image
  try {
    const imageUrl = await getUnsplashImage(city);
    document.body.style.backgroundImage = `url("${imageUrl}")`;
  } catch (error) {
    console.error(error);
  }

  weatherContainer.classList.remove("hide");
};

// Eventos
button.addEventListener("click", (e) => {
  e.preventDefault();
  const city = cityInput.value;
  showWeatherData(city);
});

cityInput.addEventListener("keyup", (e) => {
  if (e.code === "Enter") {
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
