import { type MinWeatherResponse } from '@/interfaces';

export interface PanelPageProps {
  lat: number;
  lon: number;
  weather: MinWeatherResponse;
}
