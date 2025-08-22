import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { SlLocationPin } from "react-icons/sl";
import { useTranslation } from "react-i18next";
import { useDirection } from "shared/utils/DirectionContext";

const LocationInput = ({
  placeholder = "Enter Your Location",
  type,
  setData,
  disabled,
  defaultValue,
  border = "1px solid #ccc",
  borderRadius = "4px",
  height = "48px",
  keyValue,
}) => {
  const autocompleteRef = useRef();
  const { t, i18n } = useTranslation();
  const { isRtl } = useDirection();
  const [isFocused, setIsFocused] = useState(false);

  const handleSelect = async (value) => {
    const {
      label,
      value: { place_id },
    } = value;

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?place_id=${place_id}&key=AIzaSyBrNjsUsrJ0Mmjhe-WUKDKVaIsMkZ8iQ4A`
      );
      const data = await response.json();

      if (data?.results?.[0]?.geometry?.location) {
        const { lat, lng } = data.results[0].geometry.location;
        const addressComponents = data.results[0].address_components;
        let cityComponent = addressComponents.find((component) =>
          component.types.includes("locality")
        );
        if (!cityComponent) {
          cityComponent = addressComponents.find((component) =>
            component.types.includes("administrative_area_level_3")
          );
        }
        const city = cityComponent ? cityComponent.long_name : "";
        setData({ label, lat, lng, city }, keyValue);
      } else {
        console.error("Location data not available");
      }
    } catch (error) {
      console.error("Error fetching location data:", error);
    }
  };

  const handleIconClick = () => {
    if (autocompleteRef.current) {
      autocompleteRef.current.focus();
    }
  };

  return (
    <div
      style={
        type === "box"
          ? {
              backgroundColor: "white",
              display: "flex",
              alignItems: "center",
              border: isFocused ? "2px solid transparent" : border,
              borderRadius,
              paddingRight: "10px",
              paddingLeft: "10px",
              width: "100%",
              height,
              position: "relative",
              ...(isFocused && {
                backgroundImage:
                  "linear-gradient(white, white), linear-gradient(to right, #ff7631, #2575fc)",

                backgroundOrigin: "border-box",
                backgroundClip: "padding-box, border-box",
              }),
            }
          : {
              display: "flex",
              alignItems: "center",
              borderBottom: isFocused
                ? "1px solid transparent"
                : "1px solid #ccc",
              position: "relative",
              ...(isFocused && {
                backgroundImage:
                  "linear-gradient(white, white), linear-gradient(to right, #ff7631, #2575fc)",
                backgroundOrigin: "border-box",
                backgroundClip: "padding-box, border-box",
              }),
            }
      }
    >
      <div style={{ width: "100%" }}>
        <GooglePlacesAutocomplete
          apiKey="AIzaSyBrNjsUsrJ0Mmjhe-WUKDKVaIsMkZ8iQ4A"
          selectProps={{
            ref: autocompleteRef,
            placeholder,
            isDisabled: disabled,
            value: defaultValue,
            onChange: handleSelect,
            onFocus: () => setIsFocused(true), // ✅ focus triggers border
            onBlur: () => setIsFocused(false), // ✅ blur removes border

            styles: {
              placeholder: (provided) => ({
                ...provided,
                color: type === "box" ? "#999" : "#00276d",
                fontSize: "14px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: "100%",
              }),
              input: (provided) => ({
                ...provided,
                color: "#000000",
                fontSize: "14px",
              }),

              option: (provided) => ({
                ...provided,
                color: "#000000",
                fontSize: "14px",
                backgroundColor: "#ffffff",
                position: "relative",
                zIndex: 9999,
                width: "100%",
                "&:hover": {
                  backgroundColor: "#f5f5f5", // light gray hover
                  cursor: "pointer",
                },
              }),
              menu: (provided) => ({
                ...provided,
                backgroundColor: "#ffffff",
                zIndex: 99999,
                marginTop: 0,
                boxShadow: "none",
                width: "100%",
              }),
              menuList: (provided) => ({
                ...provided,
                paddingTop: 1,
                paddingBottom: 0,
                zIndex: 99999,
              }),

              singleValue: (provided) => ({
                ...provided,
                color: disabled ? "#999" : "#000000",
                fontSize: "14px",
              }),
              control: (provided) => ({
                ...provided,
                border: "none",
                backgroundColor: "transparent",
                opacity: disabled ? 0.3 : 1,
                minHeight: "35px",
                boxShadow: "none",
              }),
              indicatorsContainer: (provided) => ({
                ...provided,
                display: "none",
              }),
              valueContainer: (provided) => ({
                ...provided,
                padding: "0px",
              }),
              container: (provided) => ({
                ...provided,
                "&:hover": {
                  border: "none",
                },
              }),
            },
          }}
        />
      </div>
      <SlLocationPin
        style={{
          fontSize: type === "box" ? "20px" : "28px",
          color: "black",
        }}
        onClick={handleIconClick}
      />
    </div>
  );
};

LocationInput.propTypes = {
  placeholder: PropTypes.string,
  type: PropTypes.string,
  setData: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  defaultValue: PropTypes.any,
  keyValue: PropTypes.any,
};

export default LocationInput;
