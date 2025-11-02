import axios from 'axios';

export const geodb = axios.create({
  baseURL: 'https://wft-geo-db.p.rapidapi.com/v1/geo',
  headers: {
    'X-RapidAPI-Key': (import.meta.env.VITE_GEODB_API_KEY as string) || '',
    'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
  },
});


