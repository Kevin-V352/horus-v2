import React, { type FC } from 'react';

import { formatters } from '@/utils';

import 'public/css/cooltipz.min.css';

import type * as T from './types';

const ProgressBar: FC<T.ProgressBarProps> = ({ min, max, value }) => {

  return (
    <div aria-label={`${value}°C`} className="cooltipz--top">
      <div
        className="bg-gradient-to-r from-cyan to-yellow-400 w-full h-1 rounded-xl justify-end flex overflow-x-hidden"
      >
        <div className="h-1 bg-gray-400" style={{ width: `${formatters.getTempPercentage(min, max, value)}%` }}></div>
      </div>
    </div>
  );

};

export default ProgressBar;
