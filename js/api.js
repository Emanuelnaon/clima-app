/*
  api.js
  ------
  Responsabilidad:
  - Comunicarse con la API externa
  - NO tocar el DOM
*/

export async function getWeatherByCity(city) {
  try {
    // 1️⃣ Convertir ciudad → coordenadas
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}`;

    const geoResponse = await fetch(geoUrl);
    const geoData = await geoResponse.json();

    // Si no hay resultados, devolvemos null
    if (!geoData.results || geoData.results.length === 0) {
      return null;
    }

    const { latitude, longitude } = geoData.results[0];

    // 2️⃣ Obtener clima usando coordenadas
    const weatherUrl = `
      https://api.open-meteo.com/v1/forecast
      ?latitude=${latitude}
      &longitude=${longitude}
      &current_weather=true
    `;

    const weatherResponse = await fetch(weatherUrl);
    const weatherData = await weatherResponse.json();

    return weatherData;

  } catch (error) {
    console.error('Error al obtener el clima:', error);
    return null;
  }
}
