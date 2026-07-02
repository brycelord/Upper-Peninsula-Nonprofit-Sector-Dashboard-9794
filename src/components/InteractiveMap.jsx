import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiUsers, FiBriefcase, FiMapPin } = FiIcons;

// Fixing Leaflet default icon issues in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const center = [46.45, -87.40];

const COUNTY_COORDS = [
  { name: 'Alger County', lat: 46.4127, lng: -86.6554, organizations: 65, employment: 980 },
  { name: 'Baraga County', lat: 46.7161, lng: -88.4552, organizations: 76, employment: 1230 },
  { name: 'Chippewa County', lat: 46.3533, lng: -84.5122, organizations: 184, employment: 5670 },
  { name: 'Delta County', lat: 45.8752, lng: -86.9926, organizations: 145, employment: 4320 },
  { name: 'Dickinson County', lat: 45.9755, lng: -87.8924, organizations: 98, employment: 3450 },
  { name: 'Gogebic County', lat: 46.4011, lng: -89.8708, organizations: 134, employment: 2340 },
  { name: 'Houghton County', lat: 47.1211, lng: -88.5694, organizations: 212, employment: 6890 },
  { name: 'Iron County', lat: 46.1601, lng: -88.5135, organizations: 98, employment: 1780 },
  { name: 'Keweenaw County', lat: 47.3871, lng: -88.0837, organizations: 21, employment: 280 },
  { name: 'Luce County', lat: 46.4853, lng: -85.5398, organizations: 43, employment: 650 },
  { name: 'Mackinac County', lat: 46.0125, lng: -84.7725, organizations: 87, employment: 1560 },
  { name: 'Marquette County', lat: 46.5436, lng: -87.3954, organizations: 387, employment: 8245 },
  { name: 'Menominee County', lat: 45.4180, lng: -87.5684, organizations: 156, employment: 2890 },
  { name: 'Ontonagon County', lat: 46.7327, lng: -89.2319, organizations: 38, employment: 540 },
  { name: 'Schoolcraft County', lat: 46.1264, lng: -86.1364, organizations: 54, employment: 890 }
];

function MapController({ selectedCounty }) {
  const map = useMap();
  useEffect(() => {
    if (selectedCounty) {
      const county = COUNTY_COORDS.find(c => c.name === selectedCounty);
      if (county) {
        map.setView([county.lat, county.lng], 9, { animate: true });
      }
    }
  }, [selectedCounty, map]);
  return null;
}

const InteractiveMap = ({ onSelectCounty, activeCounty }) => {
  const [internalSelected, setInternalSelected] = useState('Marquette County');
  
  const displaySelected = activeCounty || internalSelected;

  const handleMarkerClick = (county) => {
    setInternalSelected(county.name);
    if (onSelectCounty) onSelectCounty(county.name);
  };

  return (
    <div className="relative w-full h-full rounded-b-2xl overflow-hidden group">
      <MapContainer 
        center={center} 
        zoom={7} 
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
        scrollWheelZoom={true}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; CARTO'
        />
        <MapController selectedCounty={displaySelected} />
        {COUNTY_COORDS.map((county) => (
          <CircleMarker
            key={county.name}
            center={[county.lat, county.lng]}
            radius={Math.sqrt(county.organizations) * 0.8 + 5}
            pathOptions={{ 
              fillColor: displaySelected === county.name ? "#FFC627" : "#005C46", 
              fillOpacity: 0.8, 
              color: "#ffffff", 
              weight: 2 
            }}
            eventHandlers={{
              click: () => handleMarkerClick(county),
            }}
          >
            <Popup>
              <div className="p-1 min-w-[140px]">
                <h4 className="text-xs font-black text-gray-900 uppercase border-b border-gray-100 pb-1 mb-2">
                  {county.name}
                </h4>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-gray-500">
                    <SafeIcon icon={FiUsers} className="text-blue-600" />
                    <span>{county.organizations} Nonprofits</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-gray-500">
                    <SafeIcon icon={FiBriefcase} className="text-teal-600" />
                    <span>{county.employment.toLocaleString()} Jobs</span>
                  </div>
                </div>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>

      <div className="absolute top-4 left-4 z-[1000] pointer-events-none">
        <div className="bg-white/90 backdrop-blur-md p-3 rounded-xl border border-gray-200 shadow-xl pointer-events-auto">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-tight text-gray-900">
            <SafeIcon icon={FiMapPin} className="text-yellow-500" />
            15-County Analysis Active
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;