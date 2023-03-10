
import React, { useState } from 'react';
import axios from 'axios';

const WeatherApp = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&appid=f722f648bd3222839f532f9e553db582`


  const fetchData = async () => {
    try {
      const response = await axios.get(API_URL);
      setWeatherData(response.data);
      setErrorMessage(null);
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    }
  };
  console.log(weatherData)

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        <button type="submit">Search</button>
      </form>

      {errorMessage && <p>{errorMessage}</p>}

      {weatherData && (
        <div>
          <h2>{weatherData.name}</h2>
          <p style={{textDecoration:'bold'}}>Weather type</p><p>{weatherData.weather[0].description}</p>
          <p>temparature</p> <p>{weatherData.main.temp}°C</p>
        <p>Minumum temparature</p><p>{weatherData.main.temp_min}°C</p>
        <p>Minumum temparature</p><p>{weatherData.main.temp_max}°C</p>
        <p>Wind speed</p><p>{weatherData.wind.speed}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
