import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTemperatureHigh, faCloudSun, faWind, faTint, faCloudRain, faSun } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

import '../css/WeatherUpdates.css';

const WeatherUpdates = ({ lat, lon }) => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const API_KEY = 'feceb4521026c192ab4d8ef42a3b2450'; // Replace with your OpenWeatherMap API key

  // Mapping weather descriptions to video URLs
  const weatherVideos = {
    'clear sky': '/assets/home/weather/clear-sky-video.mp4',
    'few clouds': '/assets/home/weather/few-clouds-video.mp4',
    'scattered clouds': '/assets/home/weather/scattered-clouds-video.mp4',
    'broken clouds': '/assets/home/weather/broken-clouds-video.mp4',
    'shower rain': '/assets/home/weather/shower-rain-video.mp4',
    'rain': '/assets/home/weather/rain-video.mp4',
    'thunderstorm': '/assets/home/weather/thunderstorm-video.mp4',
    'snow': '/assets/home/weather/snow-video.mp4',
    'mist': '/assets/home/weather/mist-video.mp4',
    default: '/assets/home/weather/default-video.mp4', // Fallback video
  };

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
        );
        setWeather(response.data);
      } catch (err) {
        setError('Unable to fetch weather data. Please try again later.');
      }
    };

    fetchWeather();
  }, [lat, lon]);

  if (error) {
    return <div className="weather-error">{error}</div>;
  }

  if (!weather) {
    return <div className="weather-loading">Loading weather...</div>;
  }

  const {
    name,
    weather: weatherInfo,
    main,
    wind,
    rain,
    clouds,
    sys,
  } = weather;

  const weatherDescription = weatherInfo[0].description.toLowerCase();
  const videoSrc = weatherVideos[weatherDescription] || weatherVideos.default;

  return (
    <section className="weather-updates-section">
      <div className="row">
        {/* Left Section: Weather Video */}
        <div className="col-md-6">
          <div className="weather-video-container">
            <video autoPlay loop muted className="weather-video">
              <source src={videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

        {/* Right Section: Weather Details */}
        <div className="col-md-6">
          <div className="weather-details-container">
            <h2>{name}, {sys.country}</h2>
            
            <div className="weather-details">
              <span className="weather-description">{weatherInfo[0].description}</span>
              <p><strong><FontAwesomeIcon icon={faTemperatureHigh} /> Temperature:</strong> {main.temp}°C</p>
              <p><strong><FontAwesomeIcon icon={faTemperatureHigh} /> Feels Like:</strong> {main.feels_like}°C</p>
              <p><strong><FontAwesomeIcon icon={faTemperatureHigh} /> Min/Max Temp:</strong> {main.temp_min}°C / {main.temp_max}°C</p>
              <p><strong><FontAwesomeIcon icon={faTint} /> Humidity:</strong> {main.humidity}%</p>
              <p><strong><FontAwesomeIcon icon={faWind} /> Wind Speed:</strong> {wind.speed} m/s</p>
              <p><strong><FontAwesomeIcon icon={faCloudSun} /> Cloud Cover:</strong> {clouds.all}%</p>
              {rain && <p><strong><FontAwesomeIcon icon={faCloudRain} /> Rain (last 1 hour):</strong> {rain['1h']} mm</p>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeatherUpdates;
