/* Ubicación: js/api.js */

export async function getWeather(city = null, coords = null) {
  try {
    let lat, lon, cityName;

    if (coords) {
      // Caso A: Usamos GPS
      lat = coords.lat;
      lon = coords.lon;
      cityName = "Mi ubicación";
    } else {
      // Caso B: Buscamos por nombre de ciudad
      const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=es&format=json`;
      const geoRes = await fetch(geoUrl);
      const geoData = await geoRes.json();

      if (!geoData.results) return null;

      lat = geoData.results[0].latitude;
      lon = geoData.results[0].longitude;
      cityName = geoData.results[0].name;
    }

    // Pedimos clima actual Y pronóstico de 7 días (daily)
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`;
    const weatherRes = await fetch(weatherUrl);
    const weatherData = await weatherRes.json();

    // Devolvemos todo el paquete de datos
    return { ...weatherData, cityName };

  } catch (error) {
    console.error('Error en API:', error);
    throw error;
  }
}