import React, { useState } from "react";
import style from "./ViewModal.module.css";
import { IoCloseSharp } from "react-icons/io5";
import commonstyles from "shared/utils/common.module.css";
import classNames from "classnames";

interface ViewModelProps {
  subtitle: string;
  buttonText: string;
  totalPrice?: any;
  selectedRooms?: any;
  handleCloseModal: () => void;
  onButtonClick: () => void;
  item?: any;
  setSelectedRooms: any;
  afterSelection: any;
  beforeSelection: any;
}

const ViewModel: React.FC<ViewModelProps> = ({
  subtitle,
  selectedRooms,
  totalPrice,
  buttonText,
  onButtonClick,
  handleCloseModal,
  afterSelection,
  beforeSelection,
  item,

  setSelectedRooms,
}) => {
  const handleQuantityChange = (quantity: any) => {
    setSelectedRooms(item._id, quantity);
  };

  return (
    <div className={style.UserLoginmodal}>
      <div className={style.viewconatiner}>
        <div className={classNames(commonstyles.flx, commonstyles.flxEnd)}>
          {/* <p
            className={classNames(
              commonstyles.fs24,
              commonstyles.colorBlue,
              commonstyles.semiBold
            )}
          >
            {item?.roomName || item?.apartments?.[0]?.roomName}
          </p> */}
          <IoCloseSharp
            className={classNames(
              commonstyles.fs24,
              commonstyles.colorBlue,
              commonstyles.semiBold
            )}
            onClick={handleCloseModal}
            style={{
              cursor: "pointer",
              padding: "5px",
            }}
            // Close modal on click
          />
        </div>

        <div className={classNames(commonstyles.flx, commonstyles.flxBetween)}>
          <p className={classNames(commonstyles.fs16, commonstyles.colorBlue)}>
            {subtitle}
          </p>
          <Incriment
            CartStyles={style}
            value={
              selectedRooms.find((room: any) => room.id === item._id)
                ?.quantity || 0
            }
            setValue={handleQuantityChange}
            item={item}
          />
        </div>

        <div style={{ margin: "15px 0", borderBottom: "1px solid gray" }}></div>
        <span style={{ fontSize: 14, fontWeight: "500" }}>
          PKR {totalPrice}{" "}
          <span style={{ fontSize: 14, fontWeight: "500" }}>
            {selectedRooms.length === 0
              ? `0 ${item.apartments ? "apartment" : beforeSelection}`
              : selectedRooms.reduce(
                  (total: any, room: any) => total + room.quantity,
                  0
                ) > 0
              ? `${selectedRooms.reduce(
                  (total: any, room: any) => total + room.quantity,
                  0
                )} ${item.apartments ? "apartments" : afterSelection}`
              : selectedRooms.map((item: any) => item?.quantity)}
          </span>
        </span>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "20px 0",
          }}
        >
          <button className={style.showMoreButton} onClick={onButtonClick}>
            {buttonText}
            {/* <IoMdArrowForward /> */}
          </button>
        </div>
      </div>
    </div>
  );
};
interface Props {
  setValue?: any;
  value?: any;
  item?: any;
  CartStyles?: any;
}
const Incriment = (props: Props) => {
  const { setValue, value, item, CartStyles } = props;

  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setValue(value + 1, item);
    setCount(count + 1);
  };

  const handleDecrement = () => {
    if (value > 0) {
      setValue(value - 1, item);
      setCount(count - 1);
    }
  };
  return (
    <>
      <div className={classNames(CartStyles.viewQuantitybox)}>
        <button
          className={CartStyles.decrementButton}
          onClick={handleDecrement}
        >
          -
        </button>
        <span className={CartStyles.quantity}>{value}</span>
        <button
          className={CartStyles.incrementButton}
          onClick={handleIncrement}
        >
          +
        </button>
      </div>
    </>
  );
};
export default ViewModel;
