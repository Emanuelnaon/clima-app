/* Ubicación: js/app.js */
import { getWeather } from './api.js';
import { renderWeather, showLoader, hideLoader, showError } from './ui.js';

const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');
let lastCity = '';

// --- NUEVO: Función para ejecutar la búsqueda ---
async function performSearch(city = null, coords = null) {
  showLoader();
  try {
    const data = await getWeather(city, coords);
    if (!data) {
      showError("Ciudad no encontrada");
    } else {
      renderWeather(data);
      if (city) lastCity = city; // Guardamos para la actualización automática
    }
  } catch (error) {
    showError("Error de conexión");
  } finally {
    hideLoader();
    searchBtn.disabled = false;
  }
}

// --- EVENTOS ---

// 1. Click en buscar
searchBtn.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (city) performSearch(city);
});

// 2. Geolocalización automática al cargar la página
/* Ubicación: js/app.js */

const geoBtn = document.getElementById('geoBtn');

// Escuchar el clic en el nuevo botón de ubicación
geoBtn.addEventListener('click', () => {
  if (navigator.geolocation) {
    showLoader(); // Mostramos que estamos trabajando
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = { lat: pos.coords.latitude, lon: pos.coords.longitude };
        performSearch(null, coords);
      },
      (error) => {
        hideLoader();
        showError("No se pudo acceder a tu ubicación");
      }
    );
  } else {
    showError("Tu navegador no soporta geolocalización");
  }
});

// 3. Actualización en tiempo real (cada 15 minutos)
setInterval(() => {
  if (lastCity) {
    console.log("Actualizando datos...");
    performSearch(lastCity);
  }
}, 15 * 60 * 1000);