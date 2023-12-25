import { type FC } from 'react';

import CloudSunFill from '@/components/icons/CloudSunFill';
import {
  BrightnessHighFill,
  CloudDrizzleFill,
  CloudFill,
  CloudFogFill,
  CloudLightningRain,
  CloudMoonFill,
  CloudSnowFill,
  CloudsFill,
  FileEarmarkXFill,
  MoonFill,
  SunriseFill,
  SunsetFill
} from '@/icons';

import type * as T from './types';

const WeatherIcon: FC<T.Props> = ({ iconId, size }) => {

  const commonProps = {
    size
  };

  switch (iconId) {

    case '01d':
      return <BrightnessHighFill {...commonProps}/>;

    case '01n':
      return <MoonFill {...commonProps}/>;

    case '02d':
      return <CloudSunFill {...commonProps}/>;

    case '02n':
      return <CloudMoonFill {...commonProps}/>;

    case '03d':
    case '03n':
      return <CloudFill {...commonProps}/>;

    case '04d':
    case '04n':
      return <CloudsFill {...commonProps}/>;

    case '09d':
    case '09n':
    case '10d':
    case '10n':
      return <CloudDrizzleFill {...commonProps}/>;

    case '11d':
    case '11n':
      return <CloudLightningRain {...commonProps}/>;

    case '13d':
    case '13n':
      return <CloudSnowFill {...commonProps}/>;

    case '50d':
    case '50n':
      return <CloudFogFill {...commonProps}/>;

    case '10001d':
      return <SunriseFill {...commonProps}/>;

    case '10001n':
      return <SunsetFill {...commonProps}/>;

    default:
      return <FileEarmarkXFill {...commonProps}/>;

  };

};

export default WeatherIcon;
