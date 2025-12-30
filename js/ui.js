/*
  ui.js - Gestión del DOM
*/

const loader = document.getElementById('loader');
const resultContainer = document.getElementById('weatherResult');

export function showLoader() {
  loader.classList.remove('hidden');
  resultContainer.innerHTML = ''; // Limpiar resultado previo
}

export function hideLoader() {
  loader.classList.add('hidden');
}

export function showError(message) {
  resultContainer.innerHTML = `
    <p class="weather__result--error">⚠️ ${message}</p>
  `;
}

export function renderWeather(weatherObject) {
  // Desestructuramos los datos que armamos en api.js
  const { name, country, data } = weatherObject;
  const { temperature, windspeed } = data;

  // Lógica de colores (Guard Clauses)
  let tempClass = '';
  if (temperature <= 15) tempClass = 'weather__temp--cold';
  if (temperature > 25) tempClass = 'weather__temp--hot';

  // Inyectar HTML
  resultContainer.innerHTML = `
    <h2>${name}, ${country}</h2>
    <div class="weather__temp ${tempClass}">
      ${temperature}°C
    </div>
    <p>Viento: ${windspeed} km/h</p>
  `;
}