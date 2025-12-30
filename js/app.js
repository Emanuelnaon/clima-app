/*
  app.js - Controlador Principal
*/
import { getWeatherByCity } from './api.js';
import { showLoader, hideLoader, renderWeather, showError } from './ui.js';

// Elementos del DOM
const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');

// Estado
let lastCity = '';

// Utilidad para limpiar texto
function normalizeCity(text) {
  return text.trim().toLowerCase().replace(/\s+/g, ' ');
}

// Lógica principal
async function handleSearch() {
  const city = normalizeCity(cityInput.value);

  // Validaciones iniciales
  if (!city) {
    showError("Por favor ingresá una ciudad.");
    return;
  }
  if (city === lastCity) return; // Evitar búsqueda repetida

  // Preparar interfaz
  lastCity = city;
  searchBtn.disabled = true;
  showLoader();

  try {
    const result = await getWeatherByCity(city);

    if (!result) {
      showError("Ciudad no encontrada.");
    } else {
      renderWeather(result);
    }

  } catch (error) {
    showError("Error de conexión. Intentalo más tarde.");
  } finally {
    // Restaurar interfaz
    hideLoader();
    searchBtn.disabled = false;
  }
}

// Event Listeners
searchBtn.addEventListener('click', handleSearch);

cityInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') handleSearch();
});