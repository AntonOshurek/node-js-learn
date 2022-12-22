import axios from 'axios';
import { getKeyValue, TOKEN_DICTIONARY } from './storage.service.js';

const getIcon = (icon) => {
  switch (icon.slice(0, -1)) {
		case '01':
			return '☀️';
		case '02':
			return '🌤️';
		case '03':
			return '☁️';
		case '04':
			return '☁️';
		case '09':
			return '🌧️';
		case '10':
			return '🌦️';
		case '11':
			return '🌩️';
		case '13':
			return '❄️';
		case '50':
			return '🌫️';
	}
};

const getWeather = async (city) => {
  const token = await getKeyValue(TOKEN_DICTIONARY.token);

  if(!token) {
    throw new Error('Токен не обнаружен или не задан ключ API, задайте его через команду -t [API_KEY]');
  };

  //for testing - coordinates of Moskow
  // const coordinates = {
  //   lat: '55.7504461',
  //   lon: '37.6174943',
  // }

  const { data: coordinates } = await axios.get('http://api.openweathermap.org/geo/1.0/direct', {
    params: {
      q: `{${city}}`,
      appid: token,
    }
  });

  const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
    params: {
      lat: coordinates[0].lat,
      lon: coordinates[0].lon,
      appid: token,
      lang: 'ru',
      units: 'metric',
    }
  });

  return data;
};

export { getWeather, getIcon };
