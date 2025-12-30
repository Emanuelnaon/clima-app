/* Ubicación: js/app.js */
import { getWeather } from './api.js';
import { renderWeather, showLoader, hideLoader, showError } from './ui.js';

const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');
const geoBtn = document.getElementById('geoBtn');

// --- Función Principal de Búsqueda ---
async function performSearch(city = null, coords = null) {
  // Evitar búsquedas vacías si el botón se presiona rápido
  searchBtn.disabled = true;
  showLoader();

  try {
    const data = await getWeather(city, coords);
    
    if (!data) {
      showError("No se encontró la ubicación");
    } else {
      // Intentamos renderizar. Si falla un icono, ui.js ahora es más robusto.
      renderWeather(data);
      
      // Guardar en memoria solo si es búsqueda por nombre exitosa
      if (city) {
        localStorage.setItem('weather_last_city', city);
      }
    }
  } catch (error) {
    // Imprimimos el error real en consola para que tú lo veas, 
    // pero al usuario le damos un mensaje claro.
    console.error("Error en la búsqueda:", error);
    showError("No se pudo obtener el clima. Revisa tu conexión.");
  } finally {
    hideLoader();
    searchBtn.disabled = false;
  }
}

// --- EVENTOS ---

// 1. Carga inicial: Prioriza LocalStorage
window.addEventListener('load', () => {
  const savedCity = localStorage.getItem('weather_last_city');
  if (savedCity) {
    performSearch(savedCity);
  }
});

// 2. Búsqueda manual
searchBtn.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (city) {
    performSearch(city);
    cityInput.value = ''; // Limpia el input después de buscar
  }
});

// 3. Soporte para tecla "Enter" (Mejora de UX)
cityInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    const city = cityInput.value.trim();
    if (city) performSearch(city);
  }
});

// 4. Geolocalización
geoBtn.addEventListener('click', () => {
  if (navigator.geolocation) {
    // Notificamos que estamos obteniendo coordenadas
    showLoader(); 
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = { lat: pos.coords.latitude, lon: pos.coords.longitude };
        performSearch(null, coords);
      },
      (err) => {
        hideLoader();
        showError("Acceso a ubicación denegado");
      }
    );
  }
});