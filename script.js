let title = document.querySelector('.title-container');

let home = document.querySelector('.home-container');
let list_home_items = document.querySelector('.list-home-items');
let menu = document.querySelector('.menu-icon');
let exit_home = document.querySelector('.exit-home');

menu.addEventListener('click', () => {
    console.log("Working");
    list_home_items.classList.remove('left-[-100%]');
    list_home_items.classList.add('left-0');
});

exit_home.addEventListener('click', () => {
    list_home_items.classList.remove('left-0');
    list_home_items.classList.add('left-[-100%]');
});

async function getWeather() {
    const city = document.getElementById("cityInput").value;
    const apiKey = "c6cb561fd6e4ba71fe5c85def29416b5";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const resultDiv = document.getElementById("weatherResult");
       

        const weatherTips = {
            "clear sky": "Enjoy the sunshine! 😎 Don't forget sunscreen.",
            "few clouds": "Nice weather ahead. Take a light jacket! 🌤️",
            "scattered clouds": "Partly cloudy skies. 🌥️",
            "broken clouds": "Cloudy weather. Might get gloomy! ☁️",
            "overcast clouds": "No sun today. Maybe a nap? 😴",
            "light rain": "Take your umbrella! ☔",
            "moderate rain": "It's a wet day. Avoid getting soaked! 🌧️",
            "heavy intensity rain": "Heavy rain alert! Stay indoors if possible. ⛈️",
            "thunderstorm": "Thunder outside! Stay safe indoors. ⚡",
            "snow": "Bundle up! It's snowing outside. ❄️",
            "light snow": "Light snowflakes. Winter vibes! ☃️",
            "mist": "Drive carefully, low visibility due to mist. 🌫️",
            "haze": "Air may feel heavy. Avoid outdoor exercise.",
            "fog": "Can't see far? It's foggy! 🌁",
            "smoke": "Avoid going out, air may be unhealthy. 🚭",
            "tornado": "Seek shelter immediately! 🚨",
        };
        if (data.cod === 200) {
            const cityWeatherCard = document.createElement("div");
            cityWeatherCard.classList.add("bg-white", "rounded-xl", "shadow-md", "p-5", "border", "border-gray-200", "hover:shadow-xl", "transition", "duration-300");
    
            cityWeatherCard.innerHTML=`
          <p class="text-gray-700 my-2 text-center text-xl">🌆 <strong>City:</strong> ${data.name}</p>
          <p class="text-gray-700">🌡️ <strong>Temperature:</strong> ${data.main.temp} °C</p>
          <p class="text-gray-700">☁️ <strong>Condition:</strong> ${data.weather[0].description}</p>
          <p class="text-gray-700">💧 <strong>Humidity:</strong> ${data.main.humidity}%</p>
          <p class="text-gray-700">🌬️ <strong>Wind:</strong> ${data.wind.speed} m/s</p>
        `;

            const condition = data.weather[0].description;

            if (weatherTips[condition]) {
                const tipPara = document.createElement("p");
                tipPara.innerText = weatherTips[condition];
                tipPara.classList.add("text-purple-700", "font-medium", "mt-2"); // Tailwind style
                cityWeatherCard.appendChild(tipPara);
            } 
             resultDiv.prepend(cityWeatherCard);
        }else {
            const errorCard = document.createElement("div");
            errorCard.classList.add(
                "bg-red-100", "text-red-700", "p-4", "rounded-xl",
                "shadow", "mb-4", "border", "border-red-300"
            );
            errorCard.innerText = `❌ City "${city}" not found! Please try again.`;
            resultDiv.prepend(errorCard);            }
        
    } catch (error) {
        console.error(error);
        document.getElementById("weatherResult").innerHTML = "⚠️ Error fetching data. \n Check the interner Connection";
    }
}
document.getElementById("cityInput").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        getWeather();
    }
});
