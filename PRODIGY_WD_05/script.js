window.onload = function() {
    toggleLocationInputs();
};

function fetchWeather() {
    const apiKey = '57afd9748a5727777df65dc7aaeadf73'; 
    let apiUrl;
    const locationInput = document.getElementById('location').value;

    if (locationInput) {
        apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${locationInput}&appid=${apiKey}&units=metric`;
    } else {
        alert("Please provide a place name.");
        return;
    }
    fetchWeatherData(apiUrl);
}

function fetchWeatherData(apiUrl) {
    fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        const weatherInfo = document.getElementById('weather-info');
        weatherInfo.innerHTML = `
            <h2>${data.name}, ${data.sys.country}</h2>
            <p>Weather: ${data.weather[0].main}</p>
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
        `;

        
        const resetButton = document.createElement('button');
        resetButton.textContent = 'Reset';
        resetButton.onclick = resetForm;
        weatherInfo.appendChild(resetButton);
    })
    .catch(error => {
        console.error('Error fetching weather:', error);
        const weatherInfo = document.getElementById('weather-info');
        weatherInfo.innerHTML = `<p>Error fetching weather. Please try again later.</p>`;
    });
}

function resetForm() {
    const weatherInfo = document.getElementById('weather-info');
    const locationInput = document.getElementById('location');

    weatherInfo.innerHTML = '';
    locationInput.value = '';
}