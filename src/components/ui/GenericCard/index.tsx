import { type FC } from 'react';

import { Card } from '@/ui';

import type * as T from './types';

const GenericCard: FC<T.GenericCardProps> = ({ title, headIcon, value, unit, description }) => {

  return (
    <Card
      title={title}
      headIcon={headIcon}
    >
      <div className="flex flex-col justify-between text-center text-white" style={{ minHeight: '110px' }}>
        <div className="flex flex-row justify-center items-end">
          <h3 className="text-5xl">{value}</h3>
          {
            unit && (<span className="text-xl">{unit}</span>)
          }
        </div>
        <p>{description}</p>
      </div>
    </Card>
  );

};

export default GenericCard;
