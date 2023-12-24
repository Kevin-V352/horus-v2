import { type FC } from 'react';

import { type CardProps } from './types';

const Card: FC<CardProps> = ({ children, title, headIcon }) => {

  return (
    <div className='rounded-xl p-5 flex flex-col gap-4 bg-black_transparent_05' >
      <div className="flex flex-row gap-2.5 items-center text-gray-400">
        {headIcon}
        {title}
      </div>
      {children}
    </div>
  );

};

export default Card;
