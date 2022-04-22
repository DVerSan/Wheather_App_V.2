async function fetchWeather(cityName) {
  const urlCity = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=753bf7675696927d1daa601c92d681df&units=metric`;
  const response = await fetch(urlCity);

  if (!response.ok) {
    throw new Error('🚨 Something went wrong!');
  }
  return await response.json();
}

export { fetchWeather };
