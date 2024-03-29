import React, { useEffect, useState } from 'react';

const api = {
  key: '2f1d565acc496b45465327ba81a3b293',
  base: 'https://api.openweathermap.org/data/2.5/',
};

function App() {
  const [query, setQuery] = useState('');
  const [message, setMessage] = useState('');
  const [weather, setWeather] = useState({});

  const search = (evt) => {
    if (evt.key === 'Enter') {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => {
          if (!res.ok) {
            setMessage(`Not Found Country ${query}!`);
          }
          return res.json();
        })
        .then((result) => {
          setWeather(result);
        })
        .catch((error) => {
          console.error('Error', error);
        });
    }
  };

  const dateBuilder = (d) => {
    let months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    let days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date}, ${month} ${year}`;
  };

  useEffect(() => {
    if (message !== '') {
      const errorPopup = document.getElementsByClassName('error-popup');
      const btnClose = document.getElementsByClassName('close-button');

      btnClose[0].addEventListener('click', () => {
        errorPopup[0].classList.add('active-popup');
      });
    }
  }, [message]);

  return (
    <div
      className={
        typeof weather.main != 'undefined'
          ? weather.main.temp > 16
            ? 'app warm'
            : 'app'
          : 'app'
      }
    >
      <main>
        <div className='search-box'>
          <input
            type='text'
            className='search-bar'
            placeholder='Search...'
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyDown={search}
          />
        </div>
        {typeof weather.main != 'undefined' ? (
          <>
            <div className='location-box'>
              <div className='location'>
                {weather.name}, {weather.sys.country}
              </div>
              <div className='date'>{dateBuilder(new Date())}</div>
            </div>
            <div className='weather-box'>
              <div className='temp'>{weather.main.temp}°C</div>
              <div className='weather'>{weather.weather[0].main}</div>
            </div>
          </>
        ) : message ? (
          <div className='error-popup'>
            <div className='error-message'>
              <h2>Error!</h2>
              <p>{message}</p>
              <button className='close-button'>Close</button>
            </div>
          </div>
        ) : (
          ''
        )}
      </main>
    </div>
  );
}

export default App;
