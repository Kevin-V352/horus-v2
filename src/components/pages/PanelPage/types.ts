import { type MinWeatherResponse } from '@/interfaces';

export interface PanelPageProps {
  locationName: string;
  locationId: string;
  lat: number;
  lon: number;
  weather: MinWeatherResponse;
}
