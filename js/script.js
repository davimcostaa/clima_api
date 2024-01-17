// d2d3a560205a252970e53cdabb734ea4

const apiKey = "d2d3a560205a252970e53cdabb734ea4";
const apiKeyUnsplash = "L6iqxFFrtFqGHOy-klK-FgFVvHwMq84B9zVNM6y5FWA"


const cityInput = document.querySelector("[data-input]");
const searchBtn = document.querySelector("[data-search]")

const cityElement = document.querySelector("#city")
const tempElement = document.querySelector("#temperature span")
const descElement = document.querySelector("#description")
const weatherIconElement = document.querySelector("#weather-icon")
const countryElement = document.querySelector("#country")
const humidityElement = document.querySelector("#umidity span")
const windElement = document.querySelector("#wind span")

const weatherContainer = document.querySelector('#weather-data')


const getWeatherData = async (city) => {

    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`
    const res = await fetch(apiWeatherURL)
    const data = res.json()
    return data
}

const getPictures = async (city) => {
    const apiUnsplashURL = `https://api.unsplash.com/search/photos?client_id=${apiKeyUnsplash}&query=${city}&per_page=1&w=1200&dpr=2`
    const picture = await fetch(apiUnsplashURL)
    const pictures = picture.json()
    return pictures
} 


const showWeatherData = async (city) => {
    const data = await getWeatherData(city)
    const pic = await getPictures(city)


    cityElement.innerText = data.name;
    tempElement.innerText = parseInt(data.main.temp);
    descElement.innerText = data.weather[0].description;
    weatherIconElement.setAttribute("src",
     `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    countryElement.setAttribute("src", `https://flagsapi.com/${data.sys.country}/flat/64.png`);
    humidityElement.innerText = `${data.main.humidity}%`;
    windElement.innerText = `${data.wind.speed}km/h`;
    weatherContainer.classList.remove("hide")

    document.body.style.backgroundImage = `url(${pic.results[0].urls.regular})`;
}    

searchBtn.addEventListener('click', async (e) => {
    e.preventDefault()

    const city = cityInput.value;

    showWeatherData(city);
})

cityInput.addEventListener("keyup", (e) => {

    if(e.code === "Enter") {
        const city = e.target.value;

        showWeatherData(city)
    }
})