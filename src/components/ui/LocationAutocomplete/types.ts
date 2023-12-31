import { type ActionMeta, type SingleValue } from 'react-select';

import { type MinGeocodingClientResponse } from '@/interfaces';

export interface LocationAutocompleteProps {
  onChange: (newValue: SingleValue<MinGeocodingClientResponse>, actionMeta: ActionMeta<MinGeocodingClientResponse>) => void;
}
