const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

// Coordenadas para Guernica, Argentina: lat=-34.7833, lon=-58.4167
const url = 'https://api.openweathermap.org/data/2.5/weather?lat=-34.7833&lon=-58.4167&appid=c90e5232f5eb9f25193687186a14f7bc';

async function apiFetch() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data); // Para pruebas en consola
      displayResults(data); // Mostrar resultados
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}

function displayResults(data) {
  // Convertir de Kelvin a Celsius
  const tempCelsius = data.main.temp - 273.15;
  currentTemp.innerHTML = `${tempCelsius.toFixed(1)}&deg;C`; // Mostrar temperatura en °C

  const icon = data.weather[0].icon;
  const desc = data.weather[0].description;
  const iconsrc = `https://openweathermap.org/img/wn/${icon}@2x.png`;

  weatherIcon.setAttribute('src', iconsrc);
  weatherIcon.setAttribute('alt', desc);
  captionDesc.textContent = desc;
}

apiFetch();
