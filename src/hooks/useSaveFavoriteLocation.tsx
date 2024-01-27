/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

import { useSearchParams } from 'next/navigation';

import { type FavoriteLocation } from '@/interfaces';
import { locationTools } from '@/utils';

interface IHookState {
  locationSaved: boolean;
  isLoading: boolean;
};

interface IHookResponse extends IHookState {
  saveFavoriteLocation: () => void;
  removeFavoriteLocation: () => void;
};

const useSaveFavoriteLocation = (newFavoriteLocation: FavoriteLocation): IHookResponse => {

  const [state, setState] = useState<IHookState>({
    isLoading:     false,
    locationSaved: false
  });

  const searchParams = useSearchParams().get('locationId');

  useEffect(() => {

    init();

  }, [searchParams]);

  const saveFavoriteLocation = (): void => {

    setState((prevState) => ({ ...prevState, isLoading: true }));

    const successfullySave = locationTools.saveFavoriteLocationsInLocalStorage(newFavoriteLocation);

    if (successfullySave) {

      setState({ isLoading: false, locationSaved: true });
      // TODO: ADD NOTIFY

    } else {

      setState((prevState) => ({ ...prevState, isLoading: false }));
      // TODO: ADD NOTIFY

    };

  };

  const removeFavoriteLocation = (): void => {

    setState((prevState) => ({ ...prevState, isLoading: true }));

    const successfullyRemove = locationTools.deleteFavoriteLocationFromLocalStorage(newFavoriteLocation.id);

    if (successfullyRemove) {

      setState({ isLoading: false, locationSaved: false });
      // TODO: ADD NOTIFY

    } else {

      setState((prevState) => ({ ...prevState, isLoading: false }));
      // TODO: ADD NOTIFY

    };

  };

  const init = (): void => {

    const [savedFavoriteLocations] = locationTools.getFavoriteLocationsFromLocalStorage();

    let previousFavoriteLocations: FavoriteLocation[] = [];

    if (savedFavoriteLocations) previousFavoriteLocations = savedFavoriteLocations;

    const locationIndex = previousFavoriteLocations.findIndex((favoriteLocation) => favoriteLocation.id === newFavoriteLocation.id);

    setState({ isLoading: false, locationSaved: (locationIndex !== -1) });

  };

  return {
    ...state,
    saveFavoriteLocation,
    removeFavoriteLocation
  };

};

export default useSaveFavoriteLocation;
