import { type ReactNode } from 'react';

import { type WeatherIconId } from '@/interfaces';

export interface BackgroundImageProps {
  children: ReactNode;
  backgroundId: WeatherIconId;
};
