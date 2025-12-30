/*
  app.js
  ------
  Controlador principal
  Conecta la UI con la API
*/

import { getWeatherByCity } from './api.js';
import { renderWeather } from './ui.js';

// Referencias al DOM
const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');

// Evento principal
searchBtn.addEventListener('click', async () => {
  const city = cityInput.value.trim();

  // Evitar búsquedas vacías
  if (!city) return;

  const weatherData = await getWeatherByCity(city);

  renderWeather(weatherData);
});
