import React, { useState, useRef } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";
import { IoLocationOutline } from "react-icons/io5";
import styles from "./GoogleMapComponent.module.css";

const libraries:any = ["places"];
const defaultCenter = { lat: 31.5204, lng: 74.3587 };

const GoogleMapComponent = ({ setFieldValue }:any) => {
  const [marker, setMarker] = useState(defaultCenter);
  const autocompleteRef = useRef<any>(null);
  const apiKey = "AIzaSyBrNjsUsrJ0Mmjhe-WUKDKVaIsMkZ8iQ4A";

  const handlePlaceSelect = () => {
    const place = autocompleteRef.current.getPlace();
    if (place.geometry) {
      const location = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
      setMarker(location);
      setFieldValue("lat", location.lat);
      setFieldValue("lng", location.lng);
      setFieldValue("address", place.formatted_address || "");
      setFieldValue(
        "city",
        place.address_components?.find((comp:any) =>
          comp.types.includes("locality")
        )?.long_name || ""
      );
    }
  };

  return (
    <LoadScript googleMapsApiKey={apiKey} libraries={libraries}>
      <div className={styles.mapContainer}>
        <GoogleMap
          mapContainerClassName={styles.map}
          center={marker}
          zoom={12}
        >
          <Marker position={marker} />
        </GoogleMap>
        <div className={styles.searchBox}>
          <IoLocationOutline size={16} color="#CCCCCC" />
          <Autocomplete
            onLoad={(auto) => (autocompleteRef.current = auto)}
            onPlaceChanged={handlePlaceSelect}
          >
            <input
              type="text"
              placeholder="Search location..."
              className={styles.searchInput}
            />
          </Autocomplete>
        </div>
      </div>
    </LoadScript>
  );
};

export default GoogleMapComponent;
