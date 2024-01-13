import { type FC } from 'react';

import { type GenericCardProps } from '@/components/ui/GenericCard/types';
import { DropletFill, EyeFill, Speedometer, SunsetFill, UmbrellaFill } from '@/icons';
import { type WeatherIconId, type MinWeatherResponse } from '@/interfaces';
import { BackgroundImage, ForecastBar, ForecastCard, GenericCard, MapCard, UVIndexCard, WeatherIcon } from '@/ui';

import type * as T from './types';

const PanelPage: FC<T.PanelPageProps> = ({ locationName, lat, lon, weather }) => {

  const getCardsInfo = (weather: MinWeatherResponse): GenericCardProps[] => {

    const commonHeadIconProps = {
      size: 16
    };

    const sunrise = weather.current.nextEvent === 'sunrise';

    return [
      {
        headIcon:    <SunsetFill {...commonHeadIconProps} />,
        title:       sunrise ? 'Sunrise' : 'Sunset',
        value:       sunrise ? weather.current.sunrise : weather.current.sunset,
        description: sunrise ? `Sunset: ${weather.current.sunset}` : `Sunrise: ${weather.current.sunrise}`
      },
      {
        headIcon:    <UmbrellaFill {...commonHeadIconProps} />,
        title:       'Precipitation',
        value:       `${weather.current.precipitation}`,
        unit:        'mm',
        description: 'Last hour forecast'
      },
      {
        headIcon:    <Speedometer {...commonHeadIconProps} />,
        title:       'Pressure',
        value:       String(weather.current.pressure),
        unit:        'hPa',
        description: 'High for clear skies, low for storms'
      },
      {
        headIcon:    <DropletFill {...commonHeadIconProps} />,
        title:       'Humidity',
        value:       `${weather.current.humidity}`,
        unit:        '%',
        description: `The dew point is now ${weather.current.dewPoint}°`
      },
      {
        headIcon:    <EyeFill {...commonHeadIconProps} />,
        title:       'Visibility',
        value:       `${weather.current.visibility}`,
        unit:        'km',
        description: 'Average visibility'
      }
    ];

  };

  return (
    <BackgroundImage backgroundId={weather.current.iconId as WeatherIconId}>
      <div className="grid grid-cols-2">
        <div className="min-h-screen p-8">
          <div className="flex flex-col text-white gap-8 justify-end h-full">
            <h1 className="text-7xl font-bold">{`${weather.current.temp}°C`}</h1>
            <h3 className="text-3xl font-bold">{locationName}</h3>
            <div className="flex gap-4">
              <WeatherIcon
                iconId={weather.current.iconId as WeatherIconId}
                size={32}
              />
              <span className="text-xl">{weather.current.description}</span>
            </div>
            <ForecastBar data={weather.hourly} />
          </div>
        </div>
        <div className="bg-black_transparent_03 min-h-screen p-8 grid gap-2.5 grid-cols-3 auto-rows-min h-screen overflow-y-scroll">
          <div className='col-start-1 col-end-4'>
            <ForecastCard data={weather?.daily} />
          </div>
          <UVIndexCard
            uvIndex={weather.current.uvi}
            description="Average"
          />
          {
            getCardsInfo(weather).map((value, key) => (
              <GenericCard
                key={key}
                {...value}
              />
            ))
          }
          <div className='col-start-1 col-end-4'>
            <MapCard
              lat={lat}
              lon={lon}
            />
          </div>
        </div>
      </div>
    </BackgroundImage>
  );

};

export default PanelPage;
