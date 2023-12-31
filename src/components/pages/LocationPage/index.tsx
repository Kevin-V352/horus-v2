'use client';

import { useEffect, type FC, useState } from 'react';

import { useRouter } from 'next/navigation';
import { type SingleValue } from 'react-select';

import { type MinGeocodingClientResponse } from '@/interfaces';
import { LocationAutocomplete } from '@/ui';
import { locationTools } from '@/utils';

const LocationPage: FC = () => {

  const [currentUserLocation, setCurrentUserLocation] = useState<GeolocationCoordinates | null>(null);

  useEffect(() => {

    void retrieveUserLocation();

  }, []);

  const router = useRouter();

  const retrieveUserLocation = async (): Promise<void> => {

    const [userLocation] = await locationTools.getUserLocation();
    if (userLocation) setCurrentUserLocation(userLocation);

  };

  const redirectToPanel = (lat: number, lon: number): void => {

    router.push(`/panel?lat=${lat}&lon=${lon}`);

  };

  const onLocationChange = (newValue: SingleValue<MinGeocodingClientResponse>): void => {

    if (!newValue) return;

    const { lat, lon } = newValue;

    locationTools.saveLocationInLocalHistory(newValue);
    redirectToPanel(lat, lon);

  };

  const onCurrentUserLocation = (): void => {

    if (!currentUserLocation) return;

    const { latitude, longitude } = currentUserLocation;

    redirectToPanel(latitude, longitude);

  };

  return (
    <main>
      <LocationAutocomplete onChange={onLocationChange}/>
      <button
        onClick={onCurrentUserLocation}
        disabled={!currentUserLocation}
      >
        Usar ubicacion actual
      </button>
    </main>
  );

};

export default LocationPage;
