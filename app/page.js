'use client'
import React, { useState } from 'react';

const WeatherForecast = () => {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [forecastData, setForecastData] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(`https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${latitude}&lon=${longitude}`);
    const data = await response.json();
    setForecastData(data.properties.timeseries.slice(0, 30));
  };

  return (
    <div id = "root">
    <h1>Weather Forecast</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Latitude
          <input className="latitude" type="text" value={latitude} onChange={(e) => setLatitude(e.target.value)}/>
        </label>
        <label>
          Longitude
          <input className="longitude" type="text" value={longitude} onChange={(e) => setLongitude(e.target.value)} />
        </label>
        <button type="submit">Get Forecast</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Time</th>
            <th>Temperature (°C)</th>
            <th>Summary</th>
          </tr>
        </thead>
        <tbody>
          {forecastData.map((item) => (
            <tr key={item.time}>
              <td>{new Date(item.time).toLocaleString()}</td>
              <td>{item.data.instant.details.air_temperature.toFixed(1)}</td>
              <td>{item.data.next_1_hours.summary.symbol_code}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    
  );
};

export default WeatherForecast;
