import { useEffect, useState } from "react";
import classNames from "classnames";
import commonstyles from "shared/utils/common.module.css";
import { IoMdArrowForward } from "react-icons/io";
import Footerr from "pages/Home/HomeNavBar/Footer";
import CartStyles from "./Cart.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCart, setObj } from "shared/redux";
import PhysiotheristsEmpty from "shared/components/PhsiotheristEmpty";
import CustomLoader from "shared/components/New_Loader/Loader";
import ServiceHeader from "shared/components/ServicesHeaders";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useTranslation } from "react-i18next";
import { useDirection } from "shared/utils/DirectionContext";
import { IoDocumentTextOutline } from "react-icons/io5";

const PharmacyCart = () => {
  const { t }: any = useTranslation();
  const { isRtl } = useDirection();
  const { cart } = useSelector((state: any) => state.root.common);
  const dispatch: any = useDispatch();
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleValue = (value: any, item: any) => {
    const myArray = JSON.parse(JSON.stringify(cart));
    let objIndex = myArray.findIndex((obj: any) => obj?._id == item?._id);
    myArray[objIndex].quantity = value;
    const filteredCart = myArray.filter((item: any) => item?.quantity > 0);
    dispatch(setCart(filteredCart));
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cart?.forEach((item: any) => {
      totalPrice += item?.quantity * item?.tpPrice;
    });
    return totalPrice;
  };

  useEffect(() => {
    const calculatedTotalPrice = calculateTotalPrice();
    setTotalPrice(calculatedTotalPrice);
  }, [cart]);

  const navigate = useNavigate();

  const confirmation = () => {
    setLoading(true);
    setTimeout(async () => {
      await dispatch(setObj(cart));
      setLoading(false);
      navigate("/services/paymentDetail", {
        state: {
          serviceName: "pharmacy",
          actualAmount: totalPrice,
        },
      });
    }, 2000);
  };
  const handleDelete = (id: string) => {
    const updatedCart = cart.filter((item: any) => item._id !== id);
    dispatch(setCart(updatedCart));
  };
  return (
    <div>
      <ServiceHeader headingBlue={t("my")} headingOrange={t("cart")} />

      {cart?.length ? (
        <div className={classNames(CartStyles.container, commonstyles.mb32)}>
          <div className={CartStyles.w70}>
            {cart.map((item: any, index: any) => (
              <div key={index} className={classNames(CartStyles.card)}>
                <div
                  className={classNames(
                    CartStyles.cardImgOuter,
                    commonstyles.col4
                  )}
                >
                  <img
                    src={item.images}
                    alt="phrCart"
                    className={CartStyles.cartImage}
                  />
                </div>
                <div className={classNames(commonstyles.col8)}>
                  <div className={classNames(commonstyles.flxBetween)}>
                    <p className={CartStyles.medHeading}>
                      {" "}
                      {item?.brand} {item?.strength}
                    </p>
                    <RiDeleteBin6Line
                      className={CartStyles.DeleteIcon}
                      onClick={() => handleDelete(item._id)}
                    />
                  </div>

                  <p className={CartStyles.medType}>{item?.productType}</p>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <IoDocumentTextOutline color="#7d7d7d" />
                    <p className={CartStyles.medcontent}>{item?.content}</p>
                  </div>
                </div>
                <div
                  className={classNames(commonstyles.col12)}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "93%",
                  }}
                >
                  <div className={classNames(commonstyles.col4)}>
                    <p className={CartStyles.medHeadingsub}>
                      {t("rs")}&nbsp;
                      <span style={{ fontSize: "16px" }}>{item?.tpPrice}</span>
                    </p>
                  </div>
                  <div
                    className={classNames(commonstyles.col4)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Incriment
                      CartStyles={CartStyles}
                      value={item?.quantity}
                      setValue={handleValue}
                      item={item}
                    />
                  </div>
                  <div
                    className={classNames(commonstyles.col4)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                    }}
                  >
                    <p className={CartStyles.medHeadingsub}>
                      {t("rs")}
                      <span style={{ fontSize: "16px" }}>
                        {" "}
                        {item?.tpPrice * item?.quantity}{" "}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={CartStyles.showMoreContainer}>
            <p className={CartStyles.SummaryHEading}>{t("orderSummary")}</p>
            <div className={CartStyles.borderB}></div>

            <div className={CartStyles.flxxBetween}>
              <p className={CartStyles.total}>{t("total")}</p>
              <p className={CartStyles.total}> Rs.{totalPrice}</p>
            </div>
            <button
              onClick={confirmation}
              className={CartStyles.showMoreButton}
            >
              {t("checkout")}
              <span
                className={CartStyles.icon}
                style={isRtl ? { transform: "rotate(180deg)" } : undefined}
              >
                <IoMdArrowForward />
              </span>
            </button>
          </div>
        </div>
      ) : (
        <div>
          <PhysiotheristsEmpty />
        </div>
      )}
      {loading && <CustomLoader />}
      <Footerr />
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
export default PharmacyCart;
