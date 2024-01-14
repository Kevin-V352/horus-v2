import React, { type FC } from 'react';

import { Calendar } from '@/icons';
import { type WeatherIconId } from '@/interfaces';
import { Accordion, Card, ProgressBar, WeatherIcon } from '@/ui';

import type * as T from './types';

const ForecastCard: FC<T.ForecastCardProps> = ({ data }) => {

  return (
    <Card
      title="7-day forecast"
      headIcon={<Calendar />}
    >
      <div className="flex flex-col gap-2">
        {
          data.slice(0, 3).map((item, index) => (
            <div key={index} className="text-white grid items-center grid-cols-12 gap-y-2 sm:gap-y-0 lg:gap-x-2 text-base md:text-xl">
              <span className="col-start-3 col-end-13 row-start-1 row-end-2 sm:col-start-1 sm:col-end-4 sm:row-auto lg:col-end-5">{item.dayName}</span>
              <div className="justify-self-center col-start-1 col-end-3 sm:col-start-4 sm:col-end-5 lg:col-start-5 lg:col-end-6">
                <WeatherIcon iconId={item.iconId as WeatherIconId} size={24} />
              </div>
              <span className="justify-self-center col-start-1 col-end-3 sm:col-start-5 sm:col-end-6 lg:col-start-6 lg:col-end-7">{`${item.minTemp}°`}</span>
              <div className="col-start-3 col-end-11 sm:col-start-6 sm:col-end-12 lg:col-start-7 lg:col-end-12">
                <ProgressBar
                  min={item.minTemp}
                  max={item.maxTemp}
                  value={item.dayTemp}
                />
              </div>
              <span className="justify-self-center col-start-11 col-end-13 sm:col-start-12 sm:col-end-13">{`${item.maxTemp}°`}</span>
            </div>
          ))
        }
      </div>
      <Accordion>
        <div className="flex flex-col gap-2">
          {
            data.slice(3).map((item, index) => (
              <div key={index} className="text-white grid items-center grid-cols-12 gap-y-2 sm:gap-y-0 lg:gap-x-2 text-base md:text-xl">
                <span className="col-start-3 col-end-13 row-start-1 row-end-2 sm:col-start-1 sm:col-end-4 sm:row-auto lg:col-end-5">{item.dayName}</span>
                <div className="justify-self-center col-start-1 col-end-3 sm:col-start-4 sm:col-end-5 lg:col-start-5 lg:col-end-6">
                  <WeatherIcon iconId={item.iconId as WeatherIconId} size={24} />
                </div>
                <span className="justify-self-center col-start-1 col-end-3 sm:col-start-5 sm:col-end-6 lg:col-start-6 lg:col-end-7">{`${item.minTemp}°`}</span>
                <div className="col-start-3 col-end-11 sm:col-start-6 sm:col-end-12 lg:col-start-7 lg:col-end-12">
                  <ProgressBar
                    min={item.minTemp}
                    max={item.maxTemp}
                    value={item.dayTemp}
                  />
                </div>
                <span className="justify-self-center col-start-11 col-end-13 sm:col-start-12 sm:col-end-13">{`${item.maxTemp}°`}</span>
              </div>
            ))
          }
        </div>
      </Accordion>
    </Card>
  );

};

export default ForecastCard;
