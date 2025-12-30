/*
  app.js
  ------
  Controlador principal
  Conecta la UI con la API
*/
// Normaliza texto para evitar búsquedas duplicadas
function normalizeCity(text) {
  return text
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ');
}

let lastCity = '';/* Última ciudad buscada */


import { getWeatherByCity } from './api.js';/* Importar funciones de UI */
import { renderWeather } from './ui.js';/* Importar funciones de UI */

// Referencias al DOM
const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');

// Evento principal
searchBtn.addEventListener('click', async () => {
  const city = normalizeCity(cityInput.value);

  // 1️⃣ Validar input vacío
  if (!city) return;

  // 2️⃣ Evitar búsqueda repetida
  if (city === lastCity) {
    searchBtn.disabled = false;
    return;
  }
// Actualizar última ciudad buscada
  lastCity = city;
  // 3️⃣ Bloquear botón
  searchBtn.disabled = true;
  // 4️⃣ Mostrar loader
  showLoader();

try {
    const weatherData = await getWeatherByCity(city);
    renderWeather(weatherData);
  } catch (error) {
    showError('No se pudo obtener el clima');
  } finally {
    searchBtn.disabled = false;
  }
});

/* Habilitar búsqueda al presionar Enter */
cityInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    searchBtn.click();/* Simular click en el botón de búsqueda */
  }
});

