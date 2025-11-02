export interface ForecastCurrent {
  time?: string;
  temperature_2m?: number;
  apparent_temperature?: number;
  precipitation?: number;
  cloud_cover?: number;
  relative_humidity_2m?: number;
  wind_speed_10m?: number;
  weather_code?: number;
}

export interface ForecastHourly {
  time: string[];
  temperature_2m: number[];
  apparent_temperature: number[];
  precipitation: number[];
  precipitation_probability: number[];
  relative_humidity_2m: number[];
  cloud_cover: number[];
  wind_speed_10m: number[];
  wind_gusts_10m: number[];
}

export interface ForecastDaily {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  precipitation_sum: number[];
  precipitation_probability_max: number[];
  weather_code: number[];
  sunrise: string[];
  sunset: string[];
}

export interface ForecastResponse {
  current: ForecastCurrent;
  hourly: ForecastHourly;
  daily: ForecastDaily;
}


