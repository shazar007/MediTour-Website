import React, { useState } from "react";
import classNames from "classnames";
import style from "./newPayment.module.css";
import data from "assets/images/umbrella.jpg";
import { LocationCitySharp } from "@mui/icons-material";
import { TiLocation } from "react-icons/ti";
import { Radio } from "@mui/material";
import { useLocation } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
export default function New_Payment() {
  const { state }: any = useLocation();
  let doctor = state?.doc;
  let doctorAvailability = state?.doctorAvailability[0];
  console.log("🚀 ~ New_Payment ~ doctorAvailability:", doctorAvailability);

  const [activeOption, setActiveOption] = useState(null);
  const [showHospitals, setShowHospitals] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState(null);

  const [selectedMethod, setSelectedMethod] = useState("International");
  const [selectedPaymentType, setSelectedPaymentType] = useState("Partial");

  const options = [
    { type: "Clinic", price: "Rs: 4,000" },
    { type: "Hospital", price: "" },
    { type: "Online", price: "Rs.1,500" },
    { type: "Inhouse", price: "Rs.8,000" },
  ];

  const hospitals = [
    { name: "Sakina Int Lahore", price: "Rs.3500" },
    { name: "NJINSKY Medical Center", price: "Rs.3500" },
  ];

  const handleClick = (type: any) => {
    setActiveOption(type);
    if (type === "Hospital") {
      setShowHospitals(true);
      setSelectedHospital(null);
    } else {
      setShowHospitals(false);
      setSelectedHospital(null);
    }
  };

  const handleHospitalClick = (hospital: any) => {
    setSelectedHospital(hospital);
  };
  const [activeDay, setActiveDay] = useState(null);

  const handleClickDays = (day: any) => {
    setActiveDay(day);
  };

  const onBookAppointment = () => {};
  return (
    <div
      style={{
        marginTop: "52px",
        background: "#f5f5f5",
        padding: "80px 0",
        height: "100%",
      }}
    >
      <div className={style.container}>
        <div className={style.Doc_Card}>
          <img src={data} alt="data" className={style.Doc_Img} />
          <div
            className={style.flx}
            style={{
              justifyContent: "space-between",
              flexDirection: "column",
              height: "176px",
              width: "calc(80% - 16px)",
            }}
          >
            <div>
              <div
                className={style.flx}
                style={{
                  gap: "16px",
                  alignItems: "center",
                }}
              >
                <p className={style.Name}>{doctor?.name}</p>
                {/* <div className={style.Featured}>
                  <p>Featured Doctor</p>
                </div> */}
              </div>
              <p className={style.Verified}>PMDC Verified</p>
              <p className={style.about}>{doctor?.qualifications}</p>
            </div>
            <div
              className={style.flx}
              style={{ justifyContent: "space-between", alignItems: "center" }}
            >
              <div
                className={style.flx}
                style={{ gap: "16px", alignItems: "center" }}
              >
                <FaLocationDot className={style.loactionIcon} />
                <p className={style.about}>{doctor?.location?.address}</p>
              </div>
              <div
                className={style.flx}
                style={{
                  gap: "10px",
                  alignItems: "center",
                }}
              >
                <div>
                  <p className={style.bold}>{doctor?.clinicExperience} years</p>
                  <p className={style.normal}>Experience</p>
                </div>
                {/* <div
                  style={{ border: "1px solid #7d7d7d", height: "30px" }}
                ></div>
                <div>
                  <p className={style.bold}>98% (660)</p>
                  <p className={style.normal}>Satisfied Patient</p>
                </div> */}
              </div>
            </div>
          </div>
        </div>
        <div className={style.mt48}>
          <p className={style.mianheading}>
            <span>Get </span>
            <span style={{ color: "#0e54a3" }}>Confirmed </span>
            <span>Appointment</span>
          </p>
          <p className={classNames(style.subheading, style.mt36)}>
            Select Appointment Type
          </p>
          <div className={classNames(style.Wrapper, style.mt24)}>
            {doctorAvailability?.clinicAvailability?.availability?.length >
              0 && (
              <div
                className={classNames(style.Btn_Card, {
                  [style.Active]: activeOption === "Clinic",
                })}
                style={{ cursor: "pointer" }}
                onClick={() => handleClick("Clinic")}
              >
                <p className={style.CardPrimary}>Clinic</p>

                {doctorAvailability?.clinicAvailability?.price?.actualPrice ||
                  0}
              </div>
            )}

            {doctorAvailability?.hospitalAvailability?.length > 0 && (
              <div
                className={classNames(style.Btn_Card, {
                  [style.Active]: activeOption === "Hospital",
                })}
                style={{ cursor: "pointer" }}
                onClick={() => handleClick("Hospital")}
              >
                <p className={style.CardPrimary}>Hospital</p>
              </div>
            )}

            {doctorAvailability?.videoAvailability?.availability?.length >
              0 && (
              <div
                className={classNames(style.Btn_Card, {
                  [style.Active]: activeOption === "Online",
                })}
                style={{ cursor: "pointer" }}
                onClick={() => handleClick("Online")}
              >
                <p className={style.CardPrimary}>Online</p>

                {doctorAvailability?.videoAvailability?.price?.actualPrice || 0}
              </div>
            )}

            {doctorAvailability?.inHouseAvailability?.availability?.length >
              0 && (
              <div
                className={classNames(style.Btn_Card, {
                  [style.Active]: activeOption === "Inhouse",
                })}
                style={{ cursor: "pointer" }}
                onClick={() => handleClick("Inhouse")}
              >
                <p className={style.CardPrimary}>Inhouse</p>

                {doctorAvailability?.inHouseAvailability?.price?.actualPrice ||
                  0}
              </div>
            )}

            {/* Show hospitals only when "Hospital" is clicked */}
            {showHospitals && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                <p className={classNames(style.subheading, style.mt36)}>
                  Select Hospital
                </p>
                <div
                  style={{ width: "100%" }}
                  className={classNames(style.Wrapper, style.mt24)}
                >
                  {doctorAvailability?.hospitalAvailability.map(
                    (hospital: any, index: number) => (
                      <div
                        key={index}
                        className={classNames(style.Btn_Card, {
                          [style.Active]:
                            selectedHospital === hospital?.hospitalId?.name, // Active only when clicked
                        })}
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          handleHospitalClick(hospital?.hospitalId?.name)
                        }
                      >
                        <p className={style.CardPrimary}>
                          {hospital?.hospitalId?.name}
                        </p>
                        <p className={style.colortext}>
                          {hospital?.price?.actualPrice || 0}
                        </p>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
          {/* <p className={classNames(style.subheading, style.mt36)}>
            Select Appointment Day
          </p>
          <div className={classNames(style.Wrapper, style.mt24)}>
            {[
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ].map((day, index) => (
              <div
                key={index}
                className={classNames(style.Btn_Card, {
                  [style.Active]: activeDay === day,
                })}
                style={{ cursor: "pointer" }}
                onClick={() => handleClickDays(day)}
              >
                <p>{day}</p>
              </div>
            ))}
          </div> */}
          <div className={classNames(style.flxBtwen, style.mt36)}>
            <div style={{ width: "50%" }}>
              <div>
                <p className={style.subheading}>Choose your payment Type</p>

                <div
                  className={classNames(style.paymentMethod, style.mt36)}
                  onClick={() => setSelectedPaymentType("Partial")}
                >
                  <Radio
                    checked={selectedPaymentType === "Partial"}
                    size="small"
                    sx={{
                      color: "#0E54A3",
                      "&.Mui-checked": {
                        color: "#0E54A3",
                      },
                    }}
                  />
                  <p>Partial</p>
                </div>

                <div
                  className={classNames(style.paymentMethod, style.mt16)}
                  onClick={() => setSelectedPaymentType("Full")}
                >
                  <Radio
                    checked={selectedPaymentType === "Full"}
                    size="small"
                    sx={{
                      color: "#0E54A3",
                      "&.Mui-checked": {
                        color: "#0E54A3",
                      },
                    }}
                  />
                  <p>Full</p>
                </div>
              </div>
              <div style={{ marginTop: "32px" }}>
                <p className={style.subheading}>Choose your payment method</p>

                <div
                  className={classNames(style.paymentMethod, style.mt36)}
                  onClick={() => setSelectedMethod("International")}
                >
                  <Radio
                    checked={selectedMethod === "International"}
                    size="small"
                    sx={{
                      color: "#0E54A3",
                      "&.Mui-checked": {
                        color: "#0E54A3",
                      },
                    }}
                  />
                  <p>International</p>
                </div>

                <div
                  className={classNames(style.paymentMethod, style.mt16)}
                  onClick={() => setSelectedMethod("Pakistan")}
                >
                  <Radio
                    checked={selectedMethod === "Pakistan"}
                    size="small"
                    sx={{
                      color: "#0E54A3",
                      "&.Mui-checked": {
                        color: "#0E54A3",
                      },
                    }}
                  />
                  <p>Pakistan</p>
                </div>
              </div>
            </div>
            <div
              className={classNames(style.orderSumary)}
              style={{ marginTop: "56px" }}
            >
              <p className={style.subheading}>Order Summary</p>
              <div className={classNames(style.border, style.mt24)}></div>
              <div className={classNames(style.flxBtwen, style.mt36)}>
                <p className={style.orderSumaryText}>Sub Total</p>
                <p className={style.orderSumaryText}>Rs4,500</p>
              </div>
              <div className={classNames(style.flxBtwen, style.mt36)}>
                <p className={style.orderSumaryText}>Discount</p>
                <p className={style.orderSumaryText}>Rs0</p>
              </div>
              <div className={classNames(style.flxBtwen, style.mt36)}>
                <p className={style.orderSumaryText}>Charges</p>
                <p
                  style={{ color: "#0e54a3" }}
                  className={style.orderSumaryText}
                >
                  Free
                </p>
              </div>
              <div className={classNames(style.border, style.mt24)}></div>
              <div className={classNames(style.flxBtwen)}>
                <p className={style.totalText}>Total</p>
                <p className={style.totalText}>Rs. 4500</p>
              </div>
            </div>
          </div>
          <div className={style.flxCenter} style={{ marginTop: "16px" }}>
            <button className={style.BookAppBtn} onClick={onBookAppointment}>
              Book Appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
