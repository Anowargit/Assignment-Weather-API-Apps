const API_KEY = 'd3e3505747b2df689645a874bceb1cfd'; 
const DEFAULT_CITY = 'Assam';

const locationElement = document.querySelector('.location');
const dateElement = document.querySelector('.date');
const tempValueElement = document.querySelector('.temp-value');
const descriptionElement = document.querySelector('.description');
const humidityElement = document.querySelector('.humidity');
const windElement = document.querySelector('.wind');
const weatherIconElement = document.querySelector('.weather-icon i');
const refreshBtn = document.getElementById('refreshBtn');
const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');

const weatherIcons = {
    '01d': 'sun',
    '01n': 'moon',
    '02d': 'cloud-sun',
    '02n': 'cloud-moon',
    '03d': 'cloud',
    '03n': 'cloud',
    '04d': 'cloud',
    '04n': 'cloud',
    '09d': 'cloud-rain',
    '09n': 'cloud-rain',
    '10d': 'cloud-sun-rain',
    '10n': 'cloud-moon-rain',
    '11d': 'bolt',
    '11n': 'bolt',
    '13d': 'snowflake',
    '13n': 'snowflake',
    '50d': 'smog',
    '50n': 'smog'
};

function init() {
    updateDate();
    fetchWeather(DEFAULT_CITY);
    refreshBtn.addEventListener('click', () => fetchWeather(DEFAULT_CITY));

    searchBtn.addEventListener('click', () => {
        const city = cityInput.value.trim();
        if (city) {
            fetchWeather(city);
        } else {
            alert('Please enter a city name.');
        }
    });

    cityInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchBtn.click();
        }
    });
}

async function fetchWeather(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        );
        
        if (!response.ok) {
            throw new Error('City not found');
        }
        
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Failed to fetch weather data. Please check the city name and try again.');
    }
}

function displayWeather(data) {
    locationElement.textContent = `${data.name}, ${data.sys.country}`;
    tempValueElement.textContent = Math.round(data.main.temp);
    descriptionElement.textContent = data.weather[0].description;
    humidityElement.textContent = `${data.main.humidity}%`;
    windElement.textContent = `${data.wind.speed} m/s`;
    
    const iconCode = data.weather[0].icon;
    const iconClass = weatherIcons[iconCode] || 'question';
    weatherIconElement.className = `fas fa-${iconClass}`;
}

function updateDate() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateElement.textContent = now.toLocaleDateString('en-US', options);
}

init();