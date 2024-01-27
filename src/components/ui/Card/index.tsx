import { type FC } from 'react';

import { XCircleFill } from '@/components/icons';

import { type CardProps } from './types';

const Card: FC<CardProps> = ({ children, title, headIcon, onClose }) => {

  return (
    <div className='rounded-xl p-5 flex flex-col gap-4 bg-black_transparent_05' >
      {
        (title ?? headIcon ?? onClose) && (
          <div className="flex flex-row gap-2.5">
            <div className="text-gray-400 flex flex-row flex-1 items-center gap-2.5">
              {headIcon}
              {title}
            </div>
            {
              onClose && (
                <button
                  onClick={onClose}
                  className="text-white"
                >
                  <XCircleFill />
                </button>
              )
            }
          </div>
        )
      }
      {children}
    </div>
  );

};

export default Card;
