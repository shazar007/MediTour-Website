import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { IoMdArrowForward } from "react-icons/io";
import { useFormik } from "formik";
import classNames from "classnames";
import commonPayStyle from "shared/utils/common.module.css";
import PayStyle from "./Appointment.module.css";
import Footerr from "pages/Home/HomeNavBar/Footer";
import Vector from "assets/images/Vector.png";
import CardStyless from "./DetailsCards.module.css";
import CommonStyless from "shared/utils/common.module.css";
import { AppointmentSchema } from "shared/utils/constants";
import { useDispatch } from "react-redux";
import { setHospitalId, setObj } from "shared/redux";
import {
  add_Appointment_Doctors,
  get_Hospital_Price,
} from "shared/services/UserService";
import RatingStar from "shared/RatingStar";

import NavBreadCrumbs from "shared/components/NavBreadCrumbs";
import { DOCTOR_APPOITMENT } from "shared/utils/mainHeaderQuery";
import CustomLoader from "shared/components/New_Loader/Loader";
import { notifyError } from "shared/components/A_New_Components/ToastNotification";

const DoctorAppoinmentPay: React.FC = () => {
  const dispatch = useDispatch();
  const { state } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  let serviceName = state.serviceName;
  let doc = state?.data;

  const [activeTab, setActiveTab] = useState<any>(null);
  const [activeHospital, setActiveHospital] = useState<any>("");
  const [loading, setLoading] = useState(false);
  const [underlineStyle, setUnderlineStyle] = useState<{
    left: number;
    width: number;
  }>({ left: 0, width: 0 });

  const navButtonsRef = useRef<HTMLDivElement>(null);
  const [actualAmount, setActualAmount] = useState<any>();
  const [hospError, setHospError] = useState<any>("");

  useEffect(() => {
    if (navButtonsRef.current) {
      const buttons = Array.from(
        navButtonsRef.current.children
      ) as HTMLElement[];
      const activeButton = buttons.find(
        (button) => button.innerText === activeTab?.type
      );

      if (activeButton) {
        setUnderlineStyle({
          left: activeButton.offsetLeft,
          width: activeButton.offsetWidth,
        });
      }
    }
  }, [activeTab?.type]);

  useEffect(() => {
    if (state?.opdType == "Free OPD" || state?.opdType == "Paid OPD") {
      setActiveTab("Video");
    } else {
      setActiveTab(null);
    }
  }, []);

  const handleTabClick = (item: any) => {
    if (item?.type !== "hospital") {
      setHospError("");
      setActiveHospital("");
    }
    if (item?.type == "hospital") {
      setActualAmount(0);
    }
    setActualAmount(item?.price);
    setActiveTab(item);
    formik.setFieldValue("appointmentType", item?.type);
  };

  const handleHospitalClick = (i: any) => {
    setHospError("");
    setActiveHospital(i);
    dispatch(setHospitalId(i?._id));
    get_Hospital_Price(i?._id, doc?.doctor?._id)
      .then((res: any) => {
        //
        setActualAmount(res?.data?.actualPrice);
      })
      .catch((err: any) => {
        //
      })
      .finally(() => { });
  };

  const handleGoToPaymentNavbar = async (values: any) => {
    if (state?.opdType == "Free OPD") {
      setLoading(true);

      let params = {
        appointmentType: activeTab.toLowerCase(),
        totalAmount: 0,
        remainingAmount: 0,
      };
      add_Appointment_Doctors(params, id)
        .then((res: any) => {
          navigate("/");
        })
        .catch((err: any) => {
          notifyError(err?.response?.data?.message);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      if (values?.appointmentType == "hospital" && activeHospital == "") {
        setHospError("Please select hospital");
      } else {
        await dispatch(setObj(doc?.doctor));
        navigate("/services/paymentDetail", {
          state: {
            serviceName: state?.speciality
              ? "doctor"
              : serviceName?.toLowerCase(),
            actualAmount:
              state?.opdType === "Paid OPD"
                ? state?.paidOpdAmount
                : actualAmount,
            appointmentType:
              state?.opdType === "Paid OPD"
                ? activeTab?.toLowerCase()
                : activeTab?.type,
            doctorId: doc?.doctor?._id,
            speciality: state?.speciality,
          },
        });
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      appointmentType: state?.opdType ? "video" : "",
    },
    validationSchema: AppointmentSchema,
    onSubmit: (values) => {
      handleGoToPaymentNavbar(values);
    },
  });

  let sliceData = state?.speciality
    ? doc?.appointmentType.filter(
      (item: any) => item.type !== "video" && item.type !== "in-house"
    )
    : doc?.appointmentType;

  if (!doc) {
    return <div>Doctor not found</div>;
  }

  return (
    <div>
      <NavBreadCrumbs {...DOCTOR_APPOITMENT(serviceName)} />

      <div
        className={classNames(commonPayStyle.container, commonPayStyle.mb32)}
      >
        <div>
          <div
            className={classNames(
              commonPayStyle.flx,
              commonPayStyle.flxBetween,
              PayStyle.container
            )}
          >
            <div
              className={classNames(
                commonPayStyle.col6,
                commonPayStyle.colsm12
              )}
            >
              <div className={classNames(CardStyless.cardWrapper)}>
                <div className={CardStyless.cardImageWrapper1}>
                  <img
                    src={
                      doc?.doctor?.doctorImage
                        ? doc?.doctor?.doctorImage
                        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0t6_9TNVL-wX1SZhfif9Umhe3kfz7OluS6QmspjqUeGmzhG_18svSJIFvxXmaXEl1Z3I&usqp=CAU"
                    }
                    alt={doc?.doctor?.name}
                    className={CardStyless.cardImage1}
                  />
                </div>
                <div className={CardStyless.cardBody}>
                  <div className={CommonStyless.flxBetween}>
                    <div className={`${CommonStyless.flx}`}>
                      <div className={CardStyless.cardName}>
                        {doc?.doctor?.name}
                      </div>
                      <div className={`${CardStyless.cardName1}`}>
                        {" "}
                        ({doc?.doctor?.clinicExperience} years)
                      </div>
                    </div>
                    <div>
                      <img
                        src={Vector}
                        alt="Vector"
                        className={CardStyless.vectorIcon}
                      />
                    </div>
                  </div>

                  <div className={CardStyless.cardTitle}>
                    {doc?.doctor?.qualifications}
                  </div>
                  <div className={CardStyless.cardDetail}>
                    {doc?.doctor?.speciality}
                  </div>
                  <div className={CardStyless.cardFooter}>
                    <span className={CardStyless.ratingContainer}>
                      <RatingStar rating={doc?.doctor?.averageRating} />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className={classNames(
            commonPayStyle.fs16,
            commonPayStyle.colorBlue,
            commonPayStyle.semiBold
          )}
        >
          <p>Appointment Type</p>
        </div>
        {state?.opdType == "Free OPD" || state?.opdType == "Paid OPD" ? (
          <button
            className={classNames(PayStyle.navButton, {
              [PayStyle.active]: activeTab === "Video",
            })}
          >
            Video
          </button>
        ) : (
          <div className={PayStyle.navBar} ref={navButtonsRef}>
            {sliceData?.map((item: any, index: any) => {
              return (
                <button
                  key={index}
                  className={classNames(PayStyle.navButton, {
                    [PayStyle.active]: activeTab?.type === item?.type,
                  })}
                  onClick={() => handleTabClick(item)}
                >
                  {item?.type
                    ? item.type.charAt(0).toUpperCase() + item.type.slice(1)
                    : ""}
                </button>
              );
            })}
            <div
              className={PayStyle.underline}
              style={{
                left: `${underlineStyle.left}px`,
                width: `${underlineStyle.width}px`,
              }}
            ></div>
          </div>
        )}

        {formik.touched.appointmentType && formik.errors.appointmentType ? (
          <div className={classNames(commonPayStyle.error)}>
            *{formik.errors.appointmentType}
          </div>
        ) : null}

        {hospError && (
          <div className={classNames(commonPayStyle.error)}>*{hospError}</div>
        )}

        {activeTab?.type == "hospital" && (
          <div
            className={classNames(PayStyle.hospitalBar, commonPayStyle.mt16)}
          >
            {doc?.hospitals?.map((item: any, index: any) => (
              <button
                key={index}
                className={classNames(PayStyle.hospitalButton, {
                  [PayStyle.active]: activeHospital?.name === item?.name,
                })}
                onClick={() => handleHospitalClick(item)}
              >
                {item?.name}
              </button>
            ))}
          </div>
        )}

        <form onSubmit={formik.handleSubmit}>
          <div className={PayStyle.showMoreContainer}>
            <button
              className={CardStyless.showMoreButton}
              style={{
                marginBottom: "20px",
              }}
            >
              Continue
              <span className={CardStyless.icon}>
                <IoMdArrowForward />
              </span>
            </button>
          </div>
        </form>
      </div>
      {loading && <CustomLoader />}

      <Footerr />
    </div>
  );
};

export default DoctorAppoinmentPay;
