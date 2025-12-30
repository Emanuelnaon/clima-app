/* Ubicación: js/ui.js */

const loader = document.getElementById('loader');
const resultContainer = document.getElementById('weatherResult');

export function showLoader() {
  if (loader) loader.classList.remove('hidden');
  if (resultContainer) resultContainer.innerHTML = ''; 
}

export function hideLoader() {
  if (loader) loader.classList.add('hidden');
}

export function showError(message) {
  resultContainer.innerHTML = `<p class="weather__result--error">⚠️ ${message}</p>`;
}

/**
 * Mapeo de códigos de clima a iconos y textos
 */
function getWeatherConfig(code) {
  const mapping = {
    0: { icon: 'clear.svg', text: 'Cielo despejado' },
    1: { icon: 'clear.svg', text: 'Mayormente soleado' },
    2: { icon: 'cloudy.svg', text: 'Parcialmente nublado' },
    3: { icon: 'cloudy.svg', text: 'Nublado' },
    45: { icon: 'fog.svg', text: 'Niebla' },
    48: { icon: 'fog.svg', text: 'Niebla con escarcha' },
    51: { icon: 'rain.svg', text: 'Llovizna leve' },
    53: { icon: 'rain.svg', text: 'Llovizna moderada' },
    61: { icon: 'rain.svg', text: 'Lluvia leve' },
    63: { icon: 'rain.svg', text: 'Lluvia moderada' },
    71: { icon: 'snow.svg', text: 'Nieve ligera' },
    95: { icon: 'storm.svg', text: 'Tormenta eléctrica' },
  };
  return mapping[code] || { icon: 'unknown.svg', text: 'Clima' };
}

export function renderWeather(data) {
  try {
    const { temperature, windspeed, weathercode } = data.current_weather;
    const { cityName, daily } = data;
    const config = getWeatherConfig(weathercode);
    const ahora = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    resultContainer.innerHTML = `
      <h2 class="weather__city">${cityName}</h2>
      <img src="assets/icons/${config.icon}" alt="${config.text}" class="weather__main-icon" onerror="this.src='assets/icons/clear.svg'">
      <div class="weather__temp">${Math.round(temperature)}°C</div>
      <p class="weather__description">${config.text}</p>
      <p class="weather__info">Viento: ${windspeed} km/h</p>
      <p class="weather__update">Actualizado a las: ${ahora}</p>
      <div class="weather__forecast" id="forecastContainer"></div>
    `;

    renderForecast(daily);
  } catch (error) {
    console.error("Error en renderWeather:", error);
    showError("Error al mostrar los datos");
  }
}

function renderForecast(daily) {
  const forecastContainer = document.getElementById('forecastContainer');
  let html = '';

  for (let i = 1; i <= 5; i++) {
    const fecha = new Date(daily.time[i]).toLocaleDateString('es', { weekday: 'short' });
    const max = Math.round(daily.temperature_2m_max[i]);
    const min = Math.round(daily.temperature_2m_min[i]);
    const config = getWeatherConfig(daily.weathercode[i]);

    html += `
      <div class="weather__day">
        <span class="weather__day-name">${fecha}</span>
        <img src="assets/icons/${config.icon}" class="weather__day-icon" alt="${config.text}" onerror="this.src='assets/icons/clear.svg'">
        <span class="weather__day-temps"><strong>${max}°</strong> / ${min}°</span>
      </div>
    `;
  }
  forecastContainer.innerHTML = html;
}