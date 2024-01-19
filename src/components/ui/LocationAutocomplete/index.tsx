'use client';

import { useEffect, type FC, useState } from 'react';

import debounce from 'debounce-promise';
import { type OptionProps, components } from 'react-select';
import AsyncSelect from 'react-select/async';

import { locationServices } from '@/clientServices';
import { ClockHistory } from '@/icons';
import { MinGeocodingResponseType, type MinGeocodingClientResponse } from '@/interfaces';
import { locationTools } from '@/utils';

import type * as T from './types';

const { Option } = components;

const CustomOption: FC<OptionProps> = (props) => {

  const { label, data } = props;

  const { type } = data as MinGeocodingClientResponse;

  return (
    <Option {...props}>
      <div className='flex flex-row items-center gap-2'>
        {
          (type === MinGeocodingResponseType.historyItem) && <ClockHistory />
        }
        {label}
      </div>
    </Option>
  );

};

const LocationAutocomplete: FC<T.LocationAutocompleteProps> = ({ onChange }) => {

  const [prevLocationsHistory, setPrevLocationsHistory] = useState<MinGeocodingClientResponse[]>([]);

  useEffect(() => {

    setPrevLocationsHistory(locationTools.getLocationFromLocalHistory());

  }, []);

  const loadLocations = debounce(async (inputValue: string) => {

    if (!inputValue || inputValue.trim() === '') return [];

    const [newLocations] = await locationServices.getLocations(inputValue);

    if (!newLocations) return [];
    else return newLocations;

  }, 1000);

  return (
    <AsyncSelect
      cacheOptions
      onChange={onChange}
      defaultOptions={prevLocationsHistory}
      loadOptions={loadLocations}
      components={{ Option: CustomOption as any }}
    />
  );

};

export default LocationAutocomplete;
