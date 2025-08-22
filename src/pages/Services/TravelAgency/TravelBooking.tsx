import React, { useEffect, useMemo, useState } from "react";
import classNames from "classnames";
import Footerr from "pages/Home/HomeNavBar/Footer";
import style from "./BookingStyle.module.css";
import { IoMdArrowForward } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setObj } from "shared/redux";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import ServiceHeader from "shared/components/ServicesHeaders";
import img1 from "assets/images/Icon From (1).png";
import img2 from "assets/images/Calendarffff.png";
import img3 from "assets/images/raphael_people.png";
import { useDirection } from "shared/utils/DirectionContext";
interface InputData {
  label?: string;
  type: string;
  placeholder: string;
  readOnly: boolean;
  style?: React.CSSProperties;
}
const TravelBooking: React.FC = () => {
  const { user } = useSelector((state: any) => state.root.common);
  const { t }: any = useTranslation();
  const { isRtl } = useDirection();

  const { state } = useLocation();
  let item = state.item;
  const TravelData = [
    { img: img1, item: ` ${item?.from}  to ${item?.to}` },
    {
      img: img2,
      item: `${new Date(item?.departDate).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
      })} ${t("to")} ${new Date(item?.returnDate).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
      })}`,
    },

    {
      img: img3,
      item: `${t("maxPeople")} ${item?.limitedSeats ?? ""}`,
    },
  ];

  const dispatch = useDispatch();
  const [headCount, setHeadCount] = useState(1);
  const [coupleCount, setCoupleCount] = useState(0);
  const [error, setError] = useState<string | null>(null); // Add error state
  function calculateAge(dateOfBirthString: string) {
    if (!dateOfBirthString) return "Date of birth not provided";
    const [day, month, year] = dateOfBirthString.split("-").map(Number);
    const dob = new Date(year, month - 1, day);
    const today = new Date();

    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
      age--;
    }

    return age;
  }
  const inputData: InputData[] = [
    { label: t("name"), type: "text", placeholder: user?.name, readOnly: true },
    {
      label: t("age"),
      type: "text",
      placeholder: user?.dateOfBirth ? `${calculateAge(user.dateOfBirth)}` : "",
      readOnly: true,
    },
    {
      label: t("phoneNumber"),
      type: "text",
      placeholder: user?.phone,
      readOnly: true,
    },
    {
      label: t("email"),

      type: "text",
      placeholder: user?.email,
      readOnly: true,
    },
    {
      label: t("address"),
      type: "text",
      placeholder: user?.address?.address,
      readOnly: true,
    },
  ];
  const navigate = useNavigate();
  const formatDepartDate = useMemo(
    () => dayjs(item?.departDate).format("DD/MM/YYYY"),
    [item?.departDate]
  );
  const formatReturnDate = useMemo(
    () => dayjs(item?.returnDate).format("DD/MM/YYYY"),
    [item?.returnDate]
  );

  const totalPersons = headCount + coupleCount * 2;

  const totalPrice =
    headCount * item.pricePerHead + coupleCount * item.pricePerCouple;
  useEffect(() => {
    if (totalPersons > item?.remainingSeats) {
      setError(`Only ${item?.remainingSeats} seats available.`);
    } else {
      setError(null);
    }
  }, [headCount, coupleCount, totalPersons, item?.remainingSeats]);

  const handleHeadCountChange = (newCount: number) => {
    setHeadCount(newCount);
  };
  const handlePayment = async () => {
    setError(null);

    let params: any = {
      tourId: item?._id,
    };
    let body: any = {
      agencyId: item?.agencyId,
      from: item?.from,
      to: item?.to,
      actualPrice: totalPrice,
      packageName: item?.packageName,
      totalUser: totalPersons,
      departDate: formatDepartDate,
      returnDate: formatReturnDate,
      age: calculateAge(user.dateOfBirth),
    };

    const payload = {
      params,
      body,
      item,
    };

    dispatch(setObj(payload));
    navigate("/services/paymentDetail", {
      state: { actualAmount: totalPrice, serviceName: "tour" },
    });
  };

  return (
    <>
      <div className={classNames(style.maincontainer)}>
        <ServiceHeader headingBlue={t("travelAgencies")} />

        <div className={style.propertycard}>
          <div className={style.pfirst}>
            <div className={style.pimgConatiner}>
              <img src={item?.images?.[0]} alt="pimg" className={style.pimg} />
            </div>

            <div className={style.pfirstfirstcontent}>
              <div className={style.pfirstcontenthead}>
                <div
                  style={{
                    display: "flex ",
                    justifyContent: "space-between",
                    width: "100%",
                    flexWrap: "wrap",
                  }}
                >
                  <p className={style.hotelName}> {item.packageName}</p>
                </div>
                <p className={style.citynamee}>{item.to}</p>
                <div>
                  {TravelData.map((dataItem, index) => (
                    <ListItem
                      key={index}
                      img={dataItem.img}
                      item={dataItem.item}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className={style.incremnetcontainer}>
            <Increment
              value={headCount}
              setError={setError}
              text={`${t("select")} ${t("seats")}`}
              setValue={handleHeadCountChange}
              maxLimit={item?.remainingSeats}
            />
          </div>
          <div className={style.psecound}>
            <div className={style.psecoundcontent}>
              <div className={style.psecoundconententHead}>
                <p className={style.pvalue}>
                  <span className={style.pRs}> {t("rs")}.</span>{" "}
                  {item?.pricePerHead}
                </p>

                <div
                  className={style.pvalue}
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  <span
                    style={{
                      margin: "0 5px",
                    }}
                  >
                    {" "}
                    {totalPersons}
                  </span>
                  <span className={style.pRs}>{t("seats")} </span>
                  <span
                    style={{
                      margin: "0 5px",
                    }}
                  >
                    X
                  </span>
                  <span>
                    <span className={style.pRs}>{t("rs")}</span>
                    {totalPrice}
                  </span>
                </div>
              </div>

              <div className={style.psecoundconententBottom}>
                <div
                  className={style.pvalue}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <p>
                    <span className={style.pRs}>{t("total")}</span>
                  </p>
                  <p className={style.pvalue}>
                    <span className={style.pRs}> {t("rs")}.</span> {totalPrice}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            marginTop: "10px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {error && (
            <p className={style.error} style={{ color: "red" }}>
              {error}
            </p>
          )}{" "}
        </div>

        <div className={style.inputConatiner}>
          <div>
            <p
              className={classNames(style.heading)}
              style={{
                fontSize: "24px",
                fontWeight: "600",
                margin: "10px 0",
              }}
            >
              {t("userDetails")}
            </p>
          </div>

          <div className={style.thisinput}>
            {inputData.map((input, index) => (
              <div key={index} className={index === 4 ? style.fullWidth : ""}>
                {input.label && (
                  <label className={style.label}>{input.label}</label>
                )}

                <input
                  id={`input-${index}`}
                  value={input.placeholder}
                  readOnly={input.readOnly}
                  style={{
                    outline: "none",
                    width: "100%",
                    height: "48px",
                    fontSize: "16px",
                    borderRadius: "16px",
                    backgroundColor: "rgb(18 17 17 / 17%)",
                    color: "#131313",
                  }}
                />
              </div>
            ))}
          </div>

          <div className={style.showMoreContainer}>
            <button onClick={handlePayment} className={style.showMoreButton}>
              {t("continue")}
              <span
                className={style.icon}
                style={isRtl ? { transform: "rotate(180deg)" } : {}}
              >
                <IoMdArrowForward />
              </span>
            </button>
          </div>
        </div>
      </div>
      <Footerr />
    </>
  );
};
interface IncrementProps {
  value: number;
  setValue: (value: number) => void;
  text: string;
  setError: (error: string | null) => void;
  maxLimit?: number;
}

const Increment: React.FC<IncrementProps> = ({
  value,
  setValue,
  text,
  setError,
  maxLimit,
}) => {
  const handleIncrement = () => {
    const newValue = value + 1;
    if (maxLimit && newValue > maxLimit) {
      setError(`Maximum ${maxLimit} seats available`);
      return;
    }
    setValue(newValue);
    setError(null);
  };
  const handleDecrement = () => {
    if (value > 1) {
      setValue(value - 1);
      setError(null);
    }
  };
  return (
    <>
      <div className={classNames(style.viewQuantitybox)}>
        <p
          style={{
            color: "#0E54A3",
            margin: "0 15px",
          }}
        >
          {text}
        </p>

        <button
          className={value <= 1 ? style.decrementButton : style.incrementButton}
          onClick={handleDecrement}
        >
          -
        </button>
        <span className={style.quantity}>{value}</span>
        <button className={style.incrementButton} onClick={handleIncrement}>
          +
        </button>
      </div>
    </>
  );
};
export default TravelBooking;

const ListItem = ({ img, item }: any) => {
  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        width: "100%",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "16px",
          height: "16px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <img
          src={img}
          alt="dsssdsd"
          style={{ width: "100%", height: "100%" }}
        />
      </div>
      <p
        className={style.item}
        style={{
          whiteSpace: "nowrap",
        }}
      >
        {item}
      </p>
    </div>
  );
};
