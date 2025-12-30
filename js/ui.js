/*
  ui.js
  -----
  Responsabilidad:
  - Manipular el DOM
  - Mostrar datos al usuario
*/

export function renderWeather(data) {
  const result = document.getElementById('weatherResult');

  // Limpiar contenido previo
  result.innerHTML = '';

  if (!data) {
    result.innerHTML = `
      <p class="weather__result--error">
        Ciudad no encontrada
      </p>
    `;
    return;
  }

  const weather = data.current_weather;

  result.innerHTML = `
    <h2>${weather.temperature}°C</h2>
    <p>Viento: ${weather.windspeed} km/h</p>
  `;
}
