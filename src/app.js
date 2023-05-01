function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Mon", "Tue", "Wed", "Thur"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
       <div class="col-2">
          <div class="weather-forecast-date">${day}</div>
              <img
                src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/scattered-clouds-day.png"
                alt=""
                width="42"
                />
              <div class="weather-forecast-temperatures">
                <span class="weather-forecast-max"> 21° </span
                ><span class="weather-forecast-min"> 18° </span>
              </div>
       </div>
       `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function displayTemperature(response) {
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", response.data.condition.icon_url);
  iconElement.setAttribute("alt", response.data.condition.icon);

  https: console.log(response.data);
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.time * 1000);

  console.log(response.data.wind.speed);
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);

  console.log(response.data.temperature.humidity);
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.temperature.humidity;

  console.log(response.data.condition.description);
  let description = document.querySelector("#description");
  description.innerHTML = response.data.condition.description;

  console.log(response.data.city);
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;

  console.log(response.data.temperature.current);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);

  celsiusTemperature = response.data.temperature.current;
}

function search(city) {
  let apiKey = "be4f04372f126ocaa2t8a5df316fc3ab";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?
query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("Marsaskala");
displayForecast();
