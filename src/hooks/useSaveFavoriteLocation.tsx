/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

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

const useSaveFavoriteLocation = (label: string, locationId: string): IHookResponse => {

  const [state, setState] = useState<IHookState>({
    isLoading:     false,
    locationSaved: false
  });

  useEffect(() => {

    init();

  }, []);

  const saveFavoriteLocation = (): void => {

    setState((prevState) => ({ ...prevState, isLoading: true }));

    const successfullySave = locationTools.saveFavoriteLocationsInLocalStorage(label, locationId);

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

    const successfullyRemove = locationTools.deleteFavoriteLocationFromLocalStorage(locationId);

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

    const locationIndex = previousFavoriteLocations.findIndex((favoriteLocation) => favoriteLocation.locationId === locationId);

    if (locationIndex !== -1) setState({ isLoading: false, locationSaved: true });

  };

  return {
    ...state,
    saveFavoriteLocation,
    removeFavoriteLocation
  };

};

export default useSaveFavoriteLocation;
