import React, { useEffect, useRef } from 'react';

interface UserLocationMapProps {
  onLocationSelect: (location: string) => void;
}

const UserLocationMap: React.FC<UserLocationMapProps> = ({ onLocationSelect }) => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const initMap = () => {
      const defaultLocation = { lat: 0, lng: 0 };
      const map = new window.google.maps.Map(mapRef.current!, {
        zoom: 12,
        center: defaultLocation,
      });

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };

            map.setCenter(userLocation);

            new window.google.maps.Marker({
              position: userLocation,
              map,
              title: 'You are here!',
            });

            // Send location back to parent
            onLocationSelect(`${userLocation.lat}, ${userLocation.lng}`);
          },
          () => {
            alert('Geolocation failed.');
          }
        );
      } else {
        alert("Your browser doesn't support geolocation.");
      }
    };

    const loadGoogleMapsScript = () => {
      const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
      if (!existingScript) {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyA--7lXktxQLlk9Hq9cO6fwxGIJ9EsCDdw&callback=initMap`;
        script.async = true;
        window.initMap = initMap;
        document.body.appendChild(script);
      } else {
        initMap();
      }
    };

    loadGoogleMapsScript();
  }, [onLocationSelect]);

  return <div ref={mapRef} style={{ height: '300px', width: '100%' }} />;
};

declare global {
  interface Window {
    initMap: () => void;
    google: typeof google;
  }
}


export default UserLocationMap;
