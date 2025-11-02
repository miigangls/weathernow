import axios from 'axios';

export const meteo = axios.create({
  baseURL: 'https://api.open-meteo.com/v1',
});


