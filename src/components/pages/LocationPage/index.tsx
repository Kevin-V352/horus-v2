'use client';

import { useEffect, type FC, useState } from 'react';

import { useRouter } from 'next/navigation';
import { type SingleValue } from 'react-select';

import { locationServices } from '@/clientServices';
import { type MinGeocodingClientResponse } from '@/interfaces';
import { LocationAutocomplete } from '@/ui';
import { locationTools } from '@/utils';

const LocationPage: FC = () => {

  const [currentLocationId, setCurrentLocationId] = useState<string | null>(null);

  useEffect(() => {

    void retrieveUserLocation();

  }, []);

  const router = useRouter();

  const retrieveUserLocation = async (): Promise<void> => {

    const [userLocation] = await locationTools.getUserLocation();

    if (!userLocation) return;

    const { latitude, longitude } = userLocation;

    const [locationId] = await locationServices.getLocationIdByCoordinates(latitude, longitude);

    if (locationId) setCurrentLocationId(locationId);

  };

  const redirectToPanel = (locationId: string): void => {

    router.push(`/panel?locationId=${locationId}`);

  };

  const onLocationChange = (newValue: SingleValue<MinGeocodingClientResponse>): void => {

    if (!newValue) return;

    const { value: locationId } = newValue;

    locationTools.saveLocationInLocalHistory(newValue);
    redirectToPanel(locationId);

  };

  const onCurrentUserLocation = (): void => {

    if (currentLocationId) redirectToPanel(currentLocationId);

  };

  return (
    <main>
      <LocationAutocomplete onChange={onLocationChange}/>
      <button
        onClick={onCurrentUserLocation}
        disabled={!currentLocationId}
      >
        Usar ubicacion actual
      </button>
    </main>
  );

};

export default LocationPage;
