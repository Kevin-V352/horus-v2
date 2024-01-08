import { type MinWeatherResponse } from '@/interfaces';

export interface PanelPageProps {
  locationName: string;
  lat: number;
  lon: number;
  weather: MinWeatherResponse;
}
