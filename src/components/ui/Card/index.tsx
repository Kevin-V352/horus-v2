import { type FC } from 'react';

import { type Props } from './types';

const Card: FC<Props> = ({ children, title, headIcon }) => {

  return (
    <div className='rounded-xl bg-slate-600 p-5 flex flex-col gap-2.5' >
      <div className='flex flex-row gap-2.5'>
        {headIcon}
        {title}
      </div>
      {children}
    </div>
  );

};

export default Card;
