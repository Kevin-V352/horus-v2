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
            <div key={index} className="text-white grid grid-cols-12 items-center text-xl">
              <span className="col-start-1 col-end-4">{item.dayName}</span>
              <div className="col-start-4 col-end-5 justify-self-center">
                <WeatherIcon iconId={item.iconId as WeatherIconId} size={24} />
              </div>
              <span className="col-start-5 col-end-6 justify-self-center">{`${item.minTemp}°`}</span>
              <div className="col-start-6 col-end-12">
                <ProgressBar
                  min={item.minTemp}
                  max={item.maxTemp}
                  value={item.dayTemp}
                />
              </div>
              <span className="col-start-12 col-end-12 justify-self-center">{`${item.maxTemp}°`}</span>
            </div>
          ))
        }
      </div>
      <Accordion>
        <div className="flex flex-col gap-2">
          {
            data.slice(3).map((item, index) => (
              <div key={index} className="text-white grid grid-cols-12 items-center text-xl">
                <span className="col-start-1 col-end-4">{item.dayName}</span>
                <div className="col-start-4 col-end-5 justify-self-center">
                  <WeatherIcon iconId={item.iconId as WeatherIconId} size={24} />
                </div>
                <span className="col-start-5 col-end-6 justify-self-center">{`${item.minTemp}°`}</span>
                <div className="col-start-6 col-end-12">
                  <ProgressBar
                    min={item.minTemp}
                    max={item.maxTemp}
                    value={item.dayTemp}
                  />
                </div>
                <span className="col-start-12 col-end-12 justify-self-center">{`${item.maxTemp}°`}</span>
              </div>
            ))
          }
        </div>
      </Accordion>
    </Card>
  );

};

export default ForecastCard;
