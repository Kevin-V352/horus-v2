'use client';

/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, type FC } from 'react';

import { Icon, Point } from 'leaflet';
import { Marker, useMap } from 'react-leaflet';

import type * as I from './types';

const MapMaker: FC<I.IMapMakerProps> = ({ lat, lon }) => {

  const mapController = useMap();

  useEffect(() => {

    mapController.flyTo([lat, lon]);

  }, [lat, lon]);

  const iconMaker = new Icon({
    iconUrl:  '/assets/icons/map_marker.svg',
    iconSize: new Point(30, 30)
  });

  return (
    <Marker
      position={[lat, lon]}
      icon={iconMaker}
    >
      {/* <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup> */}
    </Marker>
  );

};

export default MapMaker;
