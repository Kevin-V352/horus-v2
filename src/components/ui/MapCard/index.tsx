'use client';

import { type FC } from 'react';

import { LayersControl, MapContainer, TileLayer } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

import { MapFill } from '@/icons';
import { LayerTypes } from '@/interfaces';
import { Card, MapMaker } from '@/ui';

import type * as T from './types';

const MapCard: FC<T.MapCardProps> = ({ lat, lon, zoom = 5, minZoom = 5 }) => {

  return (
    <Card
      title="Interactive map"
      headIcon={<MapFill />}
    >
      <div>
        <MapContainer
          center={[lat, lon]}
          minZoom={minZoom}
          scrollWheelZoom={false}
          zoom={zoom}
          style={{
            height:       '400px',
            borderRadius: '10px'
          }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MapMaker
            lat={lat}
            lon={lon}
          />

          <LayersControl position='topright'>
            <LayersControl.Overlay name='Precipitación'>
              <TileLayer url={`/api/maps?type=${LayerTypes.precipitation_new}&z={z}&x={x}&y={y}`} />
            </LayersControl.Overlay>
            <LayersControl.Overlay name='Nubes'>
              <TileLayer url={`/api/maps?type=${LayerTypes.clouds_new}&z={z}&x={x}&y={y}`} />
            </LayersControl.Overlay>
            <LayersControl.Overlay name='Nivel de presión'>
              <TileLayer url={`/api/maps?type=${LayerTypes.pressure_new}&z={z}&x={x}&y={y}`} />
            </LayersControl.Overlay>
            <LayersControl.Overlay name='Velocidad del viento'>
              <TileLayer url={`/api/maps?type=${LayerTypes.wind_new}&z={z}&x={x}&y={y}`} />
            </LayersControl.Overlay>
            <LayersControl.Overlay name='Temperatura'>
              <TileLayer url={`/api/maps?type=${LayerTypes.temp_new}&z={z}&x={x}&y={y}`} />
            </LayersControl.Overlay>
          </LayersControl>
        </MapContainer>
      </div>
    </Card>
  );

};

export default MapCard;
