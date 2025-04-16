// ========== Menu Toggle ==========
const menu = document.querySelector('.menu-icon');
const exitHome = document.querySelector('.exit-home');
const listHomeItems = document.querySelector('.list-home-items');

menu.addEventListener('click', () => {
  listHomeItems.classList.replace('left-[-100%]', 'left-0');
});

exitHome.addEventListener('click', () => {
  listHomeItems.classList.replace('left-0', 'left-[-100%]');
});

async function getWeather() {
  const city = document.getElementById("cityInput").value;
  const apiKey = "c6cb561fd6e4ba71fe5c85def29416b5";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

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

  try {
    document.getElementById("loader").classList.remove("hidden");
    const response = await fetch(url);
    document.getElementById("loader").classList.add("hidden");

    const data = await response.json();
    const resultDiv = document.getElementById("weatherResult");

    if (data.cod === 200) {
      const card = document.createElement("div");
      card.className = "bg-white rounded-xl shadow-md p-5 pl-2 border border-gray-200 hover:shadow-xl transition duration-300";

      card.innerHTML = `
        <p class="text-gray-700 my-2 text-center text-xl">🌆 <strong>City:</strong> ${data.name}</p>
        <p class="text-gray-700">🌡️ <strong>Temperature:</strong> ${data.main.temp} °C</p>
        <p class="text-gray-700">☁️ <strong>Condition:</strong> ${data.weather[0].description}</p>
        <p class="text-gray-700">💧 <strong>Humidity:</strong> ${data.main.humidity}%</p>
        <p class="text-gray-700">🌬️ <strong>Wind:</strong> ${data.wind.speed} m/s</p>
      `;

      const tip = weatherTips[data.weather[0].description];
      if (tip) {
        const tipText = document.createElement("p");
        tipText.innerText = tip;
        tipText.className = "text-purple-700 font-medium mt-2";
        card.appendChild(tipText);
      }
      

      resultDiv.prepend(card);
    } else {
      const errorCard = document.createElement("div");
      errorCard.className = "bg-red-100 text-red-700 p-4 rounded-xl shadow mb-4 border border-red-300";
      errorCard.innerText = `❌ City "${city}" not found! Please try again.`;
      resultDiv.prepend(errorCard);
    }

  } catch (error) {
    console.error(error);
    document.getElementById("weatherResult").innerHTML = "⚠️ Error fetching data. Check your internet connection.";
  }
}

document.getElementById("cityInput").addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    getWeather();
  }
});

async function fetchCitySuggestions() {
  const input = document.getElementById("cityInput").value;
  const suggestionBox = document.getElementById("suggestions");

  if (input.length < 2) {
    suggestionBox.classList.add("hidden");
    return;
  }

  const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${input}&limit=5&sort=-population`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'd91305c3eamsh3c80260bc18ce53p1be99bjsn9ac65f497a50',
        'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
      }
    });

    const result = await response.json();
    suggestionBox.innerHTML = "";

    result.data.forEach(city => {
      const li = document.createElement("li");
      li.innerText = `${city.city}, ${city.countryCode}`;
      li.className = "p-2 hover:bg-blue-100 cursor-pointer rounded";
      li.onclick = () => {
        document.getElementById("cityInput").value = city.city;
        suggestionBox.classList.add("hidden");
      };
      suggestionBox.appendChild(li);
    });

    suggestionBox.classList.remove("hidden");

  } catch (error) {
    console.error("City API error:", error);
  }
}

document.getElementById("cityInput").addEventListener("input", fetchCitySuggestions);

const contactBtn = document.getElementById('contact');
const contactSection = document.getElementById('contact-section');
const exitContact = document.querySelector('.exit-contact');

const aboutBtn = document.getElementById('about');
const aboutSection = document.getElementById('about-section');
const exitAbout = document.querySelector('.exit-about');

const locationBtn = document.getElementById('location');
const locationSection = document.getElementById('location-section');
const exitLocation = document.querySelector('.exit-location');

const sectionButtons = [
  [contactBtn, contactSection],
  [aboutBtn, aboutSection],
  [locationBtn, locationSection]
];

const exitButtons = [exitContact, exitAbout, exitLocation];

sectionButtons.forEach(([btn, section]) => {
  btn.addEventListener('click', () => {
    section.classList.add('top-0');
    section.classList.remove('bottom-[-150%]', 'hidden');
  });
});

exitButtons.forEach((exit, index) => {
  exit.addEventListener('click', () => {
    sectionButtons[index][1].classList.remove('top-0');
    sectionButtons[index][1].classList.add('bottom-[-150%]');
  });
});
