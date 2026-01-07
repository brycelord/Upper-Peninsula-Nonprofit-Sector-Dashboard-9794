import React, { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, MarkerF, InfoWindowF } from '@react-google-maps/api';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiUsers, FiBriefcase, FiMapPin, FiAlertCircle } = FiIcons;

const containerStyle = {
  width: '100%',
  height: '100%'
};

const center = {
  lat: 46.45,
  lng: -87.40
};

const mapOptions = {
  disableDefaultUI: true,
  zoomControl: true,
  styles: [
    { "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }] },
    { "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] },
    { "elementType": "labels.text.fill", "stylers": [{ "color": "#616161" }] },
    { "elementType": "labels.text.stroke", "stylers": [{ "color": "#f5f5f5" }] },
    { "featureType": "administrative.land_parcel", "elementType": "labels.text.fill", "stylers": [{ "color": "#bdbdbd" }] },
    { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#eeeeee" }] },
    { "featureType": "poi", "elementType": "labels.text.fill", "stylers": [{ "color": "#757575" }] },
    { "featureType": "road", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }] },
    { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#c9c9c9" }] },
    { "featureType": "water", "elementType": "labels.text.fill", "stylers": [{ "color": "#9e9e9e" }] }
  ]
};

const counties = [
  { name: 'Marquette', lat: 46.5436, lng: -87.3954, organizations: 387, employment: 8245 },
  { name: 'Houghton', lat: 47.1211, lng: -88.5694, organizations: 312, employment: 6890 },
  { name: 'Chippewa', lat: 46.3533, lng: -84.5122, organizations: 298, employment: 5670 },
  { name: 'Delta', lat: 45.8752, lng: -86.9926, organizations: 245, employment: 4320 },
  { name: 'Dickinson', lat: 45.9755, lng: -87.8924, organizations: 189, employment: 3450 },
  { name: 'Menominee', lat: 45.4180, lng: -87.5684, organizations: 156, employment: 2890 },
  { name: 'Gogebic', lat: 46.4011, lng: -89.8708, organizations: 134, employment: 2340 },
  { name: 'Iron', lat: 46.1601, lng: -88.5135, organizations: 98, employment: 1780 },
  { name: 'Mackinac', lat: 46.0125, lng: -84.7725, organizations: 87, employment: 1560 },
  { name: 'Baraga', lat: 46.7266, lng: -88.4552, organizations: 76, employment: 1230 },
  { name: 'Alger', lat: 46.3661, lng: -86.7420, organizations: 65, employment: 980 },
  { name: 'Schoolcraft', lat: 46.1264, lng: -86.1364, organizations: 54, employment: 890 },
  { name: 'Luce', lat: 46.4853, lng: -85.5398, organizations: 43, employment: 650 },
  { name: 'Ontonagon', lat: 46.7327, lng: -89.2319, organizations: 38, employment: 540 },
  { name: 'Keweenaw', lat: 47.3871, lng: -88.0837, organizations: 21, employment: 280 }
];

const InteractiveMap = ({ onSelectCounty }) => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey || ""
  });

  const [activeMarker, setActiveMarker] = useState(null);
  const [selectedCounty, setSelectedCounty] = useState('Marquette');

  const handleMarkerClick = useCallback((county) => {
    setActiveMarker(county);
    setSelectedCounty(county.name);
    if (onSelectCounty) onSelectCounty(county.name);
  }, [onSelectCounty]);

  if (loadError || !apiKey) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 p-8 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4 text-red-600">
          <SafeIcon icon={FiAlertCircle} className="text-3xl" />
        </div>
        <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight mb-2">Maps Configuration Required</h3>
        <p className="text-sm text-gray-500 max-w-xs leading-relaxed">
          Please add a valid Google Maps API Key to your <code>.env</code> file as <code>VITE_GOOGLE_MAPS_API_KEY</code> to enable geospatial analysis.
        </p>
      </div>
    );
  }

  return isLoaded ? (
    <div className="relative w-full h-full rounded-b-2xl overflow-hidden group">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={7}
        options={mapOptions}
      >
        {counties.map((county) => (
          <MarkerF
            key={county.name}
            position={{ lat: county.lat, lng: county.lng }}
            onClick={() => handleMarkerClick(county)}
            icon={{
              path: window.google.maps.SymbolPath.CIRCLE,
              scale: Math.sqrt(county.organizations) * 0.8 + 4,
              fillColor: selectedCounty === county.name ? "#FFBD00" : "#14364D",
              fillOpacity: 0.9,
              strokeWeight: 2,
              strokeColor: "#ffffff",
            }}
          />
        ))}

        {activeMarker && (
          <InfoWindowF
            position={{ lat: activeMarker.lat, lng: activeMarker.lng }}
            onCloseClick={() => setActiveMarker(null)}
          >
            <div className="p-2 min-w-[160px]">
              <h4 className="text-sm font-black text-gray-900 uppercase border-b border-gray-100 pb-1 mb-2">
                {activeMarker.name} County
              </h4>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-[10px] font-bold text-gray-500">
                  <SafeIcon icon={FiUsers} className="text-blue-600" />
                  <span>{activeMarker.organizations} Nonprofits</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-bold text-gray-500">
                  <SafeIcon icon={FiBriefcase} className="text-teal-600" />
                  <span>{activeMarker.employment.toLocaleString()} Jobs</span>
                </div>
              </div>
            </div>
          </InfoWindowF>
        )}
      </GoogleMap>

      <div className="absolute top-4 left-4 pointer-events-none">
        <div className="bg-white/90 backdrop-blur-md p-3 rounded-xl border border-gray-200 shadow-xl pointer-events-auto">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-tight text-gray-900">
            <SafeIcon icon={FiMapPin} className="text-yellow-500" />
            Regional Hotspots
          </div>
          <p className="text-[10px] text-gray-500 mt-1">Marker size relative to org density</p>
        </div>
      </div>
    </div>
  ) : (
    <div className="w-full h-full flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm font-bold text-gray-400 animate-pulse uppercase tracking-widest">Initialising Map...</p>
      </div>
    </div>
  );
};

export default InteractiveMap;