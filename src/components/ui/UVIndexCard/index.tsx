import { type CSSProperties, type FC } from 'react';

import { BrightnessHighFill } from '@/icons';
import { Card } from '@/ui';

import s from './styles.module.css';
import type * as T from './types';

const UVIndexCard: FC<T.IUVIndexCardProps> = ({ uvIndex, description }) => {

  const calcCursorPosition = (uvIndex: number): CSSProperties => {

    const xPercentage = ((uvIndex * 100) / 11);

    return {
      top:       '50%',
      left:      `${xPercentage}%`,
      transform: `translate(-${xPercentage}%, -50%)`
    } as CSSProperties;

  };

  return (
    <Card
      title="UV index"
      headIcon={<BrightnessHighFill size={16}/>}
    >
      <div className="flex flex-col justify-between text-center text-white" style={{ minHeight: '140px' }}>
        <h3 className="text-5xl">{uvIndex}</h3>
        <p>{description}</p>
        <div className={s.uvIndexBar}>
          <div className={s.uvIndexBarSelector} style={calcCursorPosition(uvIndex)}/>
        </div>
      </div>
    </Card>
  );

};

export default UVIndexCard;
