import React, { useState, useCallback } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import LoadingModal from "../LoaderModal";

const containerStyle = {
  width: "100%",
  height: "192px",
  borderRadius: "16px ",
};

const GoogleMapComponent = ({ location }: { location?: any }) => {
  const center = {
    lat: location?.lat || 31.4797,
    lng: location?.lng || 74.2804,
  };
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBrNjsUsrJ0Mmjhe-WUKDKVaIsMkZ8iQ4A",
  });
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const onLoad = useCallback((map: google.maps.Map) => {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={12}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <Marker position={center} />
    </GoogleMap>
  ) : null;
};

export default React.memo(GoogleMapComponent);
