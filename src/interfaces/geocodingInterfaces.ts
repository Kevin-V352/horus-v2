export interface MapboxGeocodingV5Response {
  type:        string;
  query:       string[];
  features:    Feature[];
  attribution: string;
}

export interface Feature {
  id:         string;
  type:       string;
  place_type: string[];
  relevance:  number;
  properties: Properties;
  text:       string;
  place_name: string;
  bbox:       number[];
  center:     number[];
  geometry:   Geometry;
  context:    Context[];
}

export interface Context {
  id:          string;
  mapbox_id:   string;
  wikidata:    string;
  short_code?: string;
  text:        string;
}

export interface Geometry {
  type:        string;
  coordinates: number[];
}

export interface Properties {
  mapbox_id: string;
  wikidata?: string;
}

export interface MinGeocodingResponse {
  id: string;
  lat: number;
  lon: number;
  locationName: string;
}

export interface MinGeocodingClientResponse extends Omit<MinGeocodingResponse, 'locationName' | 'id'> {
  label: string;
  tempId: number;
  type: MinGeocodingResponseType;
}

export enum MinGeocodingResponseType {
  historyItem = 'historyItem',
  newItem = 'newItem'
}
