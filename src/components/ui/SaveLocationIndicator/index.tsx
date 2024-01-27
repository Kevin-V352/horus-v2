'use client';

import { type FC } from 'react';

import { useSaveFavoriteLocation } from '@/hooks';
import { Compass, CompassFill } from '@/icons';

import type * as T from './types';

const SaveLocationIndicator: FC<T.ISaveLocationIndicatorProps> = ({ newFavoriteLocation }) => {

  const {
    isLoading,
    locationSaved,
    saveFavoriteLocation,
    removeFavoriteLocation
  } = useSaveFavoriteLocation(newFavoriteLocation);

  const userToggle = (): void => {

    if (isLoading) return;

    if (locationSaved) removeFavoriteLocation();
    else saveFavoriteLocation();

  };

  return (
    <div aria-label={'Mark location as favorite'} className="cooltipz--bottom">
      <div className="flex items-center">
        <button onClick={userToggle}>
          {
            isLoading
              ? <p>cargando</p>
              : (locationSaved)
                  ? <CompassFill size={36}/>
                  : <Compass size={36}/>
          }
        </button>
      </div>
    </div>
  );

};

export default SaveLocationIndicator;
