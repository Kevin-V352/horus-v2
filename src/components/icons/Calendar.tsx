import React, { type FC } from 'react';

import type * as T from './types';

const Calendar: FC<T.GenericIconsProps> = ({ size = 16 }) => {

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="currentColor" className="bi bi-calendar-fill" viewBox="0 0 16 16">
      <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V5h16V4H0V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5" />
    </svg>
  );

};

export default Calendar;
