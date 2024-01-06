import { type FC } from 'react';

import { Card } from '@/ui';

import type * as T from './types';

const GenericCard: FC<T.GenericCardProps> = ({ title, headIcon, mainData, description }) => {

  return (
    <Card
      title={title}
      headIcon={headIcon}
    >
      <div className="flex flex-col justify-between text-center text-white" style={{ minHeight: '140px' }}>
        <h3 className="text-5xl">{mainData}</h3>
        <p>{description}</p>
      </div>
    </Card>
  );

};

export default GenericCard;
