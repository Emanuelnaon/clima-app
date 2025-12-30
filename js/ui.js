/* Ubicación: js/ui.js */

// Referencias a elementos del DOM
const loader = document.getElementById('loader');
const resultContainer = document.getElementById('weatherResult');

/**
 * Muestra el spinner de carga y limpia el resultado previo
 */
export function showLoader() {
  if (loader) loader.classList.remove('hidden');
  if (resultContainer) resultContainer.innerHTML = ''; 
}

/**
 * Oculta el spinner de carga
 */
export function hideLoader() {
  if (loader) loader.classList.add('hidden');
}

/**
 * Muestra mensajes de error al usuario
 */
export function showError(message) {
  resultContainer.innerHTML = `
    <p class="weather__result--error">⚠️ ${message}</p>
  `;
}

/**
 * Renderiza el clima actual y dispara el renderizado del pronóstico
 */
export function renderWeather(data) {
  const { temperature, windspeed } = data.current_weather;
  const { cityName, daily } = data;

  // Tiempo Real: Hora de actualización
  const ahora = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // Determinamos clase de temperatura (BEM)
  let tempClass = '';
  if (temperature <= 15) tempClass = 'weather__temp--cold';
  if (temperature > 25) tempClass = 'weather__temp--hot';

  resultContainer.innerHTML = `
    <h2 class="weather__city">${cityName}</h2>
    <div class="weather__temp ${tempClass}">${Math.round(temperature)}°C</div>
    <p class="weather__info">Viento: ${windspeed} km/h</p>
    <p class="weather__update">Actualizado a las: ${ahora}</p>
    
    <div class="weather__forecast" id="forecastContainer">
      </div>
  `;

  // Llamamos a la función interna para los 5 días
  renderForecast(daily);
}

/**
 * Genera las filas del pronóstico extendido
 */
function renderForecast(daily) {
  const forecastContainer = document.getElementById('forecastContainer');
  let html = '';

  // Recorremos del día 1 al 5 (mañana a 5 días vista)
  for (let i = 1; i <= 5; i++) {
    const fecha = new Date(daily.time[i]).toLocaleDateString('es', { weekday: 'short' });
    const max = Math.round(daily.temperature_2m_max[i]);
    const min = Math.round(daily.temperature_2m_min[i]);

    html += `
      <div class="weather__day">
        <span class="weather__day-name">${fecha}</span>
        <span class="weather__day-temps"><strong>${max}°</strong> / ${min}°</span>
      </div>
    `;
  }
  forecastContainer.innerHTML = html;
}