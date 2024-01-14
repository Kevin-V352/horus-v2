import { type FC } from 'react';

import type * as T from './types';

const BackgroundImage: FC<T.BackgroundImageProps> = ({ children, backgroundId }) => {

  return (
    <main
      className="flex flex-col bg-cover bg-center"
      style={{ backgroundImage: `url(/assets/images/backgrounds/${backgroundId}.jpg)` }}
    >
      {children}
    </main>
  );

};

export default BackgroundImage;
