import { useState } from "react";
import classNames from "classnames";
import commonstyles from "shared/utils/common.module.css";
import Footerr from "pages/Home/HomeNavBar/Footer";
import ViewModel from "shared/components/ViewModel/ViewModel";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RoomComponent } from "shared/components";
import ContinueButton from "shared/components/ContinueButton";
import NavBreadCrumbs from "shared/components/NavBreadCrumbs";
import { HOTEL_DETAILS } from "shared/utils/mainHeaderQuery";

const HotelAvability = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedRooms, setSelectedRooms] = useState<any>([]);
  const { hotelDetail } = useSelector((state: any) => state.root.common);
  const navigate = useNavigate();
  const [error, setError] = useState<any>("");
  const { state } = useLocation();
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const item = state?.data;

  const handleShowModal = (roomId: any) => {
    setSelectedRoomId(roomId);
    setShowModal(true);
  };
  const calculateTotalPrice = () => {
    return selectedRooms.reduce((total: any, room: any) => {
      const roomData =
        item.rooms?.find((r: any) => r._id === room.id) ||
        item.apartments?.find((r: any) => r._id === room.id);
      const roomPrice =
        roomData?.pricePerNight ||
        roomData?.basePricePerNight ||
        item?.basePricePerNight ||
        0;
      return total + roomPrice * room.quantity;
    }, 0);
  };
  const handleSelectRoom = (roomId: any, quantity: any) => {
    const updatedRooms: any = [...selectedRooms];
    const roomIndex = updatedRooms.findIndex((room: any) => room.id === roomId);

    if (roomIndex >= 0) {
      updatedRooms[roomIndex].quantity = quantity;
    } else {
      updatedRooms.push({ id: roomId, quantity });
    }
    setSelectedRooms(updatedRooms);
  };
  const totalPrice = calculateTotalPrice();

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handlePayClick = () => {
    setShowModal(false);
  };

  const createSelectedRoomsObject = () => {
    return selectedRooms.map((room: any) => ({
      id: room.id,
      quantity: room.quantity,
    }));
  };

  const bookNow = () => {
    if (totalPrice === 0) {
      setError("Please choose no. of rooms.");
    } else {
      navigate("/services/hotel/HotelBooking", {
        state: {
          item: item,
          totalPrice: totalPrice,
          Type: hotelDetail?.selectedOption,
          selectedRooms: createSelectedRoomsObject(),
          roomValue: selectedRooms,
          actualAmount: totalPrice,
        },
      });
    }
  };

  return (
    <div>
      <NavBreadCrumbs {...HOTEL_DETAILS} />
      <div
        className={classNames(
          classNames(commonstyles.container, commonstyles.mb32)
        )}
      >
        <p
          className={classNames(
            commonstyles.fs24,
            commonstyles.colorBlue,
            commonstyles.semiBold
          )}
        >
          {item?.propertyName}
        </p>
        <div
          className={classNames(
            commonstyles.flx,
            commonstyles.flxBetween,
            commonstyles.flxWrap
          )}
        >
          <div
            className={classNames(
              commonstyles.col6,
              commonstyles.colmd12,
              commonstyles.colsm12
            )}
          >
            {hotelDetail?.selectedOption === "Hotel" ? (
              item?.rooms?.map((room: any, index: any) => {
                return (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "wrap",
                      overflow: "hidden",
                    }}
                  >
                    <RoomComponent
                      name={room?.roomName}
                      item={item}
                      price={`PKR ${room?.pricePerNight}`}
                      value1={`No of Bed: ${room?.noOfBeds}`}
                      rooms={`Home Type: ${room?.roomType}`}
                      value2={`Bed Kind: ${room?.bedKinds}`}
                      breakfast={`Breakfast: ${room?.breakfast}`}
                      noOfGuestsStay={`No of Guest: ${room?.noOfGuestsStay}`}
                      noOfRoomType={`No of Room Type: ${room?.noOfRoomType}`}
                      size={`Size ${room?.roomSize}`}
                      onClick={() => handleShowModal(room._id)}
                    />
                  </div>
                );
              })
            ) : hotelDetail?.selectedOption === "Home" ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
              >
                <RoomComponent
                  name={item?.homeName}
                  price={`PKR ${item?.basePricePerNight}`}
                  value1={`No of Bed: ${item?.numberOfBedroom}`}
                  item={item}
                  rooms={`Home Type: ${item?.homeType}`}
                  size={`Size ${item?.homeSize}`}
                  dinningRoom={`Number of DiningRooms: ${item?.numberOfDiningrooms}`}
                  noOfGuestsStay={`No of Guest: ${item?.noOfGuestsStay}`}
                  noOfRoomType={`No of Room Type: ${item?.noOfRoomType}`}
                  fromHome={true}
                  onClick={() => handleShowModal(item._id)}
                />
              </div>
            ) : (
              item?.apartments?.map((room: any, index: any) => (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                  }}
                >
                  <RoomComponent
                    name={room?.appartmentName}
                    item={item}
                    price={`PKR ${room?.basePricePerNight}`}
                    value1={`No Of Bed: ${room?.numberOfBedroom}`}
                    rooms={`Apartment No :${room?.appartmentNo} `}
                    size={`Size ${room?.appartmentSize}`}
                    dinningRoom={`Bathroom: ${room?.numberOfBathroom}`}
                    fromHome={true}
                    onClick={() => handleShowModal(item._id)}
                  />
                </div>
              ))
            )}
          </div>
          <div
            className={classNames(
              commonstyles.col5,
              commonstyles.colmd12,
              commonstyles.colsm12
            )}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                padding: "20px",
              }}
            >
              <div
                style={{
                  backgroundColor: "#fff",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  borderRadius: "8px",
                  padding: "20px 30px",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  minWidth: "300px",
                  cursor: "pointer", // Makes it feel more interactive
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 16px rgba(0, 0, 0, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 8px rgba(0, 0, 0, 0.1)";
                }}
              >
                <span
                  style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    color: "#333",
                  }}
                >
                  Total Price:
                </span>
                <span
                  style={{
                    fontSize: "22px",
                    fontWeight: "700",
                    color: "#ff5722", // Bold color for emphasis
                    marginLeft: "20px",
                    animation: "pulse 2s infinite",
                  }}
                >
                  PKR {totalPrice}
                </span>
                <span
                  style={{
                    fontSize: "16px",
                    fontWeight: "500",
                    color: "#2196f3",
                    marginLeft: "10px",
                    animation: "slideIn 1s ease-out",
                  }}
                >
                  {selectedRooms.length === 0
                    ? `0 ${
                        item.apartments
                          ? "apartment"
                          : item?.homeName
                          ? "Property"
                          : "room"
                      }`
                    : selectedRooms.reduce(
                        (total: any, room: any) => total + room.quantity,
                        0
                      ) === 0
                    ? `0 ${item.apartments ? "apartment" : "room"}`
                    : `${selectedRooms.reduce(
                        (total: any, room: any) => total + room.quantity,
                        0
                      )} ${
                        item.apartments
                          ? "apartments"
                          : item?.homeName
                          ? "Property"
                          : "rooms"
                      }`}
                </span>
              </div>
            </div>

            <style>
              {`
  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
    100% {
      transform: scale(1);
    }
  }

  @keyframes slideIn {
    0% {
      opacity: 0;
      transform: translateX(20px);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }
`}
            </style>
          </div>
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}
        <ContinueButton buttonText="Book Now" onClick={bookNow} />
      </div>
      <div className={classNames(commonstyles.mb32)}>
        {showModal && (
          <ViewModel
            subtitle={
              item.apartments
                ? "Number of Apartments"
                : item?.homeName
                ? "Property"
                : "Number of rooms"
            }
            beforeSelection={
              item.apartments
                ? "Apartment"
                : item?.homeName
                ? "Property"
                : "room"
            }
            afterSelection={
              item.apartments
                ? "Apartments"
                : item?.homeName
                ? "Properties"
                : "rooms"
            }
            buttonText="Choose"
            onButtonClick={handlePayClick}
            handleCloseModal={handleCloseModal}
            selectedRooms={selectedRooms}
            totalPrice={totalPrice}
            item={
              item.rooms?.find((room: any) => room._id === selectedRoomId) ||
              item.apartments?.find(
                (room: any) => room._id === selectedRoomId
              ) ||
              item
            }
            setSelectedRooms={handleSelectRoom}
          />
        )}
      </div>

      <Footerr />
    </div>
  );
};

export default HotelAvability;
