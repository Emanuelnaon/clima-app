/*
  api.js - Gestión de datos
*/

export async function getWeatherByCity(city) {
  try {
    // 1. Obtener coordenadas (Geocoding)
    // Usamos encodeURIComponent para manejar espacios y tildes
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=es&format=json`;

    const geoResponse = await fetch(geoUrl);
    const geoData = await geoResponse.json();

    // Si no hay resultados, retornamos null
    if (!geoData.results || geoData.results.length === 0) {
      return null;
    }

    const { latitude, longitude, name, country } = geoData.results[0];

    // 2. Obtener clima con las coordenadas
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

    const weatherResponse = await fetch(weatherUrl);
    const weatherData = await weatherResponse.json();

    // Retornamos un objeto combinado con nombre y datos del clima
    return {
      name: name,
      country: country,
      data: weatherData.current_weather
    };

  } catch (error) {
    console.error("Error en API:", error);
    throw error; // Re-lanzamos el error para que app.js lo note
  }
}