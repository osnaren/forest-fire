'use client';

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Crosshair } from 'lucide-react';
import { useEffect } from 'react';
import {
  AttributionControl,
  LayersControl,
  MapContainer,
  TileLayer,
  useMap,
  WMSTileLayer,
  ZoomControl,
} from 'react-leaflet';

// Fix for Leaflet icons in Next.js
const fixLeafletIcons = () => {
  // @ts-expect-error Leaflet Icon Fix
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  });
};

function LocateControl() {
  const map = useMap();

  const handleLocate = () => {
    map.locate({ setView: true, maxZoom: 8 });
  };

  return (
    <div className="leaflet-bottom leaflet-right mr-4! mb-24!">
      <div className="leaflet-control border-0! shadow-none!">
        <button
          onClick={(e) => {
            e.preventDefault();
            handleLocate();
          }}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-black/60 text-white shadow-xl backdrop-blur-xl transition-all hover:scale-105 hover:bg-white/10 active:scale-95"
          title="Locate me"
        >
          <Crosshair size={20} />
        </button>
      </div>
    </div>
  );
}

interface FireMapProps {
  date: string; // YYYY-MM-DD
  opacity?: number;
}

export default function FireMap({ date, opacity = 0.8 }: FireMapProps) {
  useEffect(() => {
    fixLeafletIcons();
  }, []);

  return (
    <MapContainer
      center={[20, 0]}
      zoom={3}
      minZoom={2}
      style={{ height: '100%', width: '100%', background: '#1a1a1a' }}
      zoomControl={false}
      attributionControl={false}
    >
      <ZoomControl position="bottomright" />
      <AttributionControl position="bottomright" prefix={false} />
      <LocateControl />

      <LayersControl position="topright">
        <LayersControl.BaseLayer checked name="Dark Matter">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />
        </LayersControl.BaseLayer>

        <LayersControl.BaseLayer name="Satellite">
          <TileLayer
            attribution='&copy; <a href="https://www.esri.com/">Esri</a>'
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          />
        </LayersControl.BaseLayer>

        <LayersControl.Overlay checked name="VIIRS Active Fires (High Res)">
          <WMSTileLayer
            url="https://gibs.earthdata.nasa.gov/wms/epsg3857/best/wms.cgi"
            params={{
              layers: 'VIIRS_SNPP_Thermal_Anomalies_375m_All',
              format: 'image/png',
              transparent: true,
              // @ts-expect-error - time is a valid WMS param
              time: date,
            }}
            attribution="NASA GIBS"
            opacity={opacity}
          />
        </LayersControl.Overlay>

        <LayersControl.Overlay name="MODIS Active Fires">
          <WMSTileLayer
            url="https://gibs.earthdata.nasa.gov/wms/epsg3857/best/wms.cgi"
            params={{
              layers: 'MODIS_Combined_Thermal_Anomalies_All',
              format: 'image/png',
              transparent: true,
              // @ts-expect-error - time is a valid WMS param
              time: date,
            }}
            attribution="NASA GIBS"
            opacity={opacity}
          />
        </LayersControl.Overlay>
      </LayersControl>
    </MapContainer>
  );
}
