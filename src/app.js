function displayTemperature(response) {
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
}

let apiKey = "be4f04372f126ocaa2t8a5df316fc3ab";
let apiUrl = `https://api.shecodes.io/weather/v1/current?
query={Marsaskala}&key=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
