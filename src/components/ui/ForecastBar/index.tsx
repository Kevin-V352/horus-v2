'use client';

import { type FC, useRef, type WheelEventHandler } from 'react';

import SimpleBar from 'simplebar-react';

import 'simplebar-react/dist/simplebar.min.css';

import { type WeatherIconId } from '@/interfaces';
import { WeatherIcon } from '@/ui';
import { formatters } from '@/utils';

import s from './styles.module.css';
import type * as T from './types';

const ForecastBar: FC<T.ForecastBarProps> = ({ data }) => {

  const scrollableDiv = useRef<HTMLDivElement | null>(null);

  const scroll: WheelEventHandler<HTMLDivElement> = (event) => {

    if ((event.deltaY === 0) ?? !scrollableDiv.current) return;

    scrollableDiv.current.scrollLeft += event.deltaY;

  };

  return (
    <SimpleBar
      forceVisible="x"
      autoHide={false}
      scrollableNodeProps={{ ref: scrollableDiv }}
      onWheel={scroll}
      classNames={{
        track:     s.simpleBarTrack,
        scrollbar: s.simpleBarScrollbar
      }}
    >
      <div className="flex flex-row gap-6 cursor-ew-resize">
        {
          data.map(({ hour, iconId, temp, type }, index) => (
            <div key={index} className="flex flex-col items-center gap-5 text-xl">
              <span>{hour}</span>
              <WeatherIcon iconId={iconId as WeatherIconId} size={35} />
              <span>
                {(type === 'hour') ? `${temp}°` : formatters.capitalize(type)}
              </span>
            </div>
          ))
        }
      </div>
    </SimpleBar>
  );

};

export default ForecastBar;
