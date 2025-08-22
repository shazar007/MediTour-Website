import React, { useState } from "react";
import {
  GoogleMap,
  Marker,
  OverlayView,
  useLoadScript,
} from "@react-google-maps/api";
import classNames from "classnames";
import style from "./Style.module.css";
import { useSelector } from "react-redux";
import commonstyles from "shared/utils/common.module.css";

import BnbHotel from "../BnbHotel";
import { useNavigate } from "react-router-dom";
const containerStyle = {
  width: "100%",
  height: "400px",
};

// Adjust the offset to position the label correctly above the marker
const getPixelPositionOffset = (width: number, height: number) => ({
  x: -(width / 2),
  y: -(height + 20), // This ensures the label is above the marker
});

const BnbMap = ({ data }: { data?: any }) => {
  const { hotelDetail } = useSelector((state: any) => state.root.common);
  const navigate = useNavigate();
  const { isLoaded } = useLoadScript({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBrNjsUsrJ0Mmjhe-WUKDKVaIsMkZ8iQ4A",
  });
  const [selectedItem, setSelectedItemId] = useState<any>(null);
  const [selectModal, setselectModal] = useState<any>(false);
  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  const onMarkerPress = (itemId: string) => {
    setSelectedItemId(itemId);
    setselectModal(true);
  };
  const handledetails = (item: any) => {
    navigate("/services/hotel/HotelDetails", { state: { item: item } });
  };
  const selectedItemId = data.find((hotel: any) => hotel._id === selectedItem);
  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={{ lat: 31.5204, lng: 74.3587 }}
      zoom={12}
    >
      {data?.map((hotel: any, index: any) => {
        const hotelLocation = hotel?.location;
        const price =
          hotel?.minRoomPrice ||
          hotel?.minHomePrice ||
          hotel?.minApartmentPrice;

        if (!hotelLocation) return null;

        return (
          <div
            key={index}
            // onClick={() => onMarkerPress(hotel._id)}
            style={{ cursor: "pointer" }}
          >
            {/* Regular Marker */}
            <Marker
              position={{ lat: hotelLocation.lat, lng: hotelLocation.lng }}
              // onClick={() => onMarkerPress(hotel._id)}
            >
              {/* Custom Overlay for Price Label */}
              <OverlayView
                position={{ lat: hotelLocation.lat, lng: hotelLocation.lng }}
                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                getPixelPositionOffset={getPixelPositionOffset}
              >
                <div
                  style={{
                    backgroundColor: "#2B65EC",
                    color: "#FFF",
                    borderWidth: "2px",
                    width: "100px",
                    borderRadius: "10px",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
                    fontSize: "14px",
                    fontWeight: "bold",
                    zIndex: 1000,
                    textAlign: "center",
                    cursor: "pointer",
                  }}
                  onClick={() => onMarkerPress(hotel._id)}
                >
                  PKR {price}
                </div>
              </OverlayView>
            </Marker>

            {selectModal && (
              <div className={classNames(style.modal)}>
                <div
                  className={classNames(style.modalContent)}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div
                    className={classNames(
                      commonstyles.flx,
                      commonstyles.flxCenter
                    )}
                  >
                    {hotelDetail?.selectedOption == "Hotel" ? (
                      <BnbHotel
                        location={selectedItemId?.location?.address}
                        cancel={selectedItemId?.advanceCancelfreeofCharge}
                        name={selectedItemId?.hotelId?.name}
                        cross
                        Click={() => setselectModal(false)}
                        CarImage={
                          selectedItemId?.hotelId?.logo ||
                          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0t6_9TNVL-wX1SZhfif9Umhe3kfz7OluS6QmspjqUeGmzhG_18svSJIFvxXmaXEl1Z3I&usqp=CAU"
                        }
                        price={selectedItemId?.minRoomPrice}
                        handledetails={() => handledetails(selectedItemId)}
                      />
                    ) : hotelDetail?.selectedOption == "Apartment" ? (
                      <BnbHotel
                        location={selectedItemId?.location?.address}
                        cross
                        Click={() => setselectModal(false)}
                        cancel={selectedItemId?.advanceCancelfreeofCharge}
                        name={selectedItemId?.propertyName}
                        CarImage={
                          selectedItemId?.propertyphoto?.[0] ||
                          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0t6_9TNVL-wX1SZhfif9Umhe3kfz7OluS6QmspjqUeGmzhG_18svSJIFvxXmaXEl1Z3I&usqp=CAU"
                        }
                        price={selectedItemId?.minApartmentPrice}
                        handledetails={() => handledetails(selectedItemId)}
                      />
                    ) : (
                      <BnbHotel
                        location={`${selectedItemId?.location?.address}-${selectedItemId?.location?.city}`}
                        cancel={selectedItemId?.advanceCancelfreeofCharge}
                        cross
                        Click={() => setselectModal(false)}
                        name={selectedItemId?.propertyName}
                        CarImage={
                          selectedItemId?.propertyphoto?.[0] ||
                          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0t6_9TNVL-wX1SZhfif9Umhe3kfz7OluS6QmspjqUeGmzhG_18svSJIFvxXmaXEl1Z3I&usqp=CAU"
                        }
                        price={selectedItemId?.minHomePrice}
                        handledetails={() => handledetails(selectedItemId)}
                      />
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </GoogleMap>
  );
};

export default BnbMap;
