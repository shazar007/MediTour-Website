import style from "./style.module.css";
import Footerr from "pages/Home/HomeNavBar/Footer";
import classNames from "classnames";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAvailability_Doctors, getSignle_Doctor } from "shared/services";
import CustomLoader from "shared/components/New_Loader/Loader";
import Priority from "assets/images/labcardsupport.png";
import Private from "assets/images/labcardsecurity.png";
import Encryption from "assets/images/labcardkey.png";
import { daysOfWeek } from "shared/utils";
import dayjs from "dayjs";
import { notifyError } from "shared/components/A_New_Components/ToastNotification";
import New_CustomSelect from "shared/components/A_New_Components/NewCustomSelect";
import { setSystemType } from "shared/redux";
import { useTranslation } from "react-i18next";
import { useDirection } from "shared/utils/DirectionContext";
import { MdLocationOn } from "react-icons/md";
import { FaBriefcase } from "react-icons/fa6";

const DoctorDetails = () => {
  const { t }: any = useTranslation();
  const { isRtl } = useDirection();
  const { state }: any = useLocation();
  let serviceName = state?.serviceName;
  let doctor = state?.doc;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [docAvail, setDocAvail] = useState<any>([]);
  const [selectedDay, setSelectedDay] = useState<any>("");
  const [selectedPlace, setSelectedPlace] = useState<any>("clinic");
  const [priceToSend, setPriceToSend] = useState<any>(0);

  var tempHos: any = [];

  if (docAvail[0]?.hospitalAvailability?.length > 0) {
    docAvail[0]?.hospitalAvailability?.map((item: any) => {
      if (item?.price?.actualPrice !== 0 && item?.price?.actualPrice != null) {
        tempHos.push({
          label: item?.hospitalId?.name,
          value: item?.hospitalId?._id,
          price: item?.price?.actualPrice,
        });
      }
    });
  }

  useEffect(() => {
    const defaultPrice = docAvail[0]?.clinicAvailability?.price?.actualPrice;
    if (defaultPrice) {
      setPriceToSend(defaultPrice);
    }
  }, [docAvail]);

  const navigate = useNavigate();

  const handleSelectPlace = (value: any) => {
    let availability = docAvail[0];
    if (value === "clinic") {
      setPriceToSend(availability?.clinicAvailability?.price?.actualPrice || 0);
    }
    if (value === "online") {
      setPriceToSend(availability?.videoAvailability?.price?.actualPrice || 0);
    }

    if (value === "inhouse") {
      setPriceToSend(
        availability?.inHouseAvailability?.price?.actualPrice || 0
      );
    }

    if (value === "hospital") {
      setPriceToSend(tempHos[0]?.price || 0);
    }

    setSelectedPlace(value);
  };

  const handleSelectHospital = (value: any) => {
    let availability = docAvail[0];

    const result = availability?.hospitalAvailability?.find(
      (obj: any) => obj?.hospitalId?._id === value
    );
    console.log("🚀 ~ handleSelectHospital ~ result:", result);
    setPriceToSend(result?.price?.actualPrice || 0);
  };

  const handelGoPayment = (item: any) => {
    dispatch(setSystemType("user"));

    let apptType =
      selectedPlace === "clinic"
        ? "clinic"
        : selectedPlace === "online"
        ? "video"
        : selectedPlace === "inhouse"
        ? "in-house"
        : "hospital";
    if (isLoggedIn) {
      if (docAvail?.length > 0 && selectedDay) {
        if (serviceName === "Hospital" || priceToSend) {
          navigate("/services/paymentDetail", {
            state: {
              serviceName: "doctor",
              actualAmount:
                serviceName === "Hospital"
                  ? docAvail[0]?.hospitalAvailability[0]?.price?.actualPrice
                  : priceToSend,
              doctorId: doctor?._id,
              appointmentType:
                serviceName === "Hospital" ? "hospital" : apptType,
            },
          });
        } else {
          notifyError(t("Doc_NotAvailSelectPlace"));
        }
      } else {
        notifyError(t("Doc_NotAvailOnThisDay"));
        return;
      }
    } else {
      navigate("/user/login", {
        state: {
          state: state,
          loginFrom: "doctor",
        },
        replace: true,
      });
    }
  };

  const { isLoggedIn, user } = useSelector((state: any) => state.root.common);

  useEffect(() => {
    setLoading(true);
    signle_Doctor();
    doctor_Availability();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const signle_Doctor = () => {
    const params = {
      doctorId: doctor?._id,
      type: serviceName == "Hospital" ? "hospital" : "doctor",
      doctorType: serviceName?.toLowerCase(),
      hospitalId: state?.hospitalId || "",
      patientId: user?._id || "",
    };

    getSignle_Doctor(params)
      .then((res: any) => {})
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  const doctor_Availability = async () => {
    const params = {
      doctorId: doctor?._id,
      type: serviceName === "Hospital" ? "hospital" : "doctor",
      doctorType: serviceName?.toLowerCase(),
      hospitalId: state?.hospitalId || "",
    };

    try {
      const res = await getAvailability_Doctors(params);
      setDocAvail(res?.data?.availability);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const [isExpanded, setIsExpanded] = useState(false);
  const text = doctor?.about;
  const wordsArray = text?.split(" ");
  const previewText = wordsArray?.slice(0, 100).join(" ") + "...";
  return (
    <div style={{ backgroundColor: "#F5F5F5" }}>
      <div className={classNames(style.container)}>
        <div className={classNames(style.flxouter, style.gap)}>
          <div className={classNames(style.w70)}>
            <div className={classNames(style.flx, style.gap20, style.h350)}>
              <div className={style.DocImgOuter}>
                <img
                  src={doctor?.doctorImage}
                  alt="DoctorImage"
                  className={style.DocImg}
                />
              </div>{" "}
              <div className={classNames(style.DocInfo, style.flexColumn)}>
                <div>
                  <div className={classNames(style.flx, style.gap20)}>
                    <p className={classNames(style.DcoName)}>{doctor?.name}</p>
                  </div>
                  <p className={classNames(style.Verified, style.mt8)}>
                    {t("pmdcVerified")}
                  </p>
                  <p className={classNames(style.mt16)}>
                    {doctor?.qualifications}
                  </p>
                </div>

                <div>
                  <div
                    className={classNames(style.flx, style.mt8)}
                    style={{
                      gap: "10px",
                    }}
                  >
                    <FaBriefcase color="#7d7d7d" size={20} />
                    <p className={style.text}>
                      {" "}
                      {doctor?.clinicExperience} {t("years")} {t("experince")}
                    </p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                    className={classNames(style.mt8)}
                  >
                    <div style={{ width: "20px" }}>
                      <MdLocationOn color="#7d7d7d" size={20} />
                    </div>
                    <p className={style.text}>{doctor?.location?.address}</p>
                  </div>
                </div>
              </div>
            </div>{" "}
            <div>
              <p className={classNames(style.headings, style.mt24)}>
                {t("about")}
              </p>
              <div>
                <div>
                  <p
                    className={classNames(
                      style.text,
                      !isExpanded && style.truncateText
                    )}
                    onClick={() => setIsExpanded(!isExpanded)}
                    style={
                      isRtl
                        ? { textAlign: "justify", lineHeight: "55px" }
                        : { textAlign: "justify" }
                    }
                  >
                    {!text
                      ? t("detailNotProvided")
                      : isExpanded
                      ? text
                      : previewText || t("detailNotProvided")}
                  </p>
                </div>

                {wordsArray?.length > 100 && (
                  <div style={{ display: "flex", justifyContent: "end" }}>
                    <button
                      className={style.readMoreButton}
                      onClick={() => setIsExpanded(!isExpanded)}
                    >
                      {isExpanded ? "Read Less" : "Read More"}
                    </button>
                  </div>
                )}
              </div>
              <p className={classNames(style.headings, style.mt24)}>
                {t("practiceAddressAndTimings")}{" "}
              </p>
              {docAvail?.length > 0 ? (
                <>
                  {docAvail[0]?.clinicAvailability?.availability?.length > 0 &&
                    docAvail[0]?.clinicAvailability?.price?.actualPrice && (
                      <div className={classNames(style.timeTable)}>
                        <div
                          className={classNames(style.flxBetween, style.row)}
                        >
                          <p className={classNames(style.tableHeading11)}>
                            {t("clinic")}{" "}
                          </p>
                          <p className={classNames(style.tableHeading11)}>
                            {t("rs")}{" "}
                            {docAvail[0]?.clinicAvailability?.price
                              ?.actualPrice || 0}
                          </p>
                        </div>
                        {daysOfWeek.map((item: any, index: number) => {
                          const dayAvailability =
                            docAvail[0]?.clinicAvailability?.availability.find(
                              (item: any) => item.dayOfWeek === index
                            );

                          if (dayAvailability) {
                            return (
                              <AvailabilityDays
                                key={index}
                                day={item?.day}
                                data={dayAvailability}
                              />
                            );
                          }
                        })}
                      </div>
                    )}
                  {docAvail[0]?.videoAvailability?.availability?.length > 0 &&
                    docAvail[0]?.videoAvailability?.price?.actualPrice && (
                      <div className={classNames(style.timeTable)}>
                        <div
                          className={classNames(style.flxBetween, style.row)}
                        >
                          <p className={classNames(style.tableHeading11)}>
                            {t("videoConsultancy")}{" "}
                          </p>
                          <p className={classNames(style.tableHeading11)}>
                            {t("rs")}{" "}
                            {docAvail[0]?.videoAvailability?.price
                              ?.actualPrice || 0}
                          </p>
                        </div>
                        {daysOfWeek.map((item: any, index: number) => {
                          const dayAvailability =
                            docAvail[0]?.videoAvailability?.availability.find(
                              (item: any) => item.dayOfWeek === index
                            );

                          if (dayAvailability) {
                            return (
                              <AvailabilityDays
                                day={item?.day}
                                data={dayAvailability}
                              />
                            );
                          }
                        })}
                      </div>
                    )}

                  {docAvail[0]?.inHouseAvailability?.availability?.length > 0 &&
                  docAvail[0]?.inHouseAvailability?.price?.actualPrice ? (
                    <div className={classNames(style.timeTable)}>
                      <div className={classNames(style.flxBetween, style.row)}>
                        <p className={classNames(style.tableHeading11)}>
                          {t("inHouse")}
                        </p>
                        <p className={classNames(style.tableHeading11)}>
                          {t("rs")}
                          {docAvail[0]?.inHouseAvailability?.price?.actualPrice}
                        </p>
                      </div>
                      {daysOfWeek.map((item: any, index: number) => {
                        const dayAvailability =
                          docAvail[0]?.inHouseAvailability?.availability.find(
                            (item: any) => item.dayOfWeek === index
                          );

                        return dayAvailability ? (
                          <AvailabilityDays
                            key={index}
                            day={item?.day}
                            data={dayAvailability}
                          />
                        ) : null;
                      })}
                    </div>
                  ) : null}
                  {docAvail[0]?.hospitalAvailability?.filter(
                    (hospitalItem: any) => hospitalItem?.price?.actualPrice
                  )?.length > 0 && (
                    <>
                      {docAvail[0]?.hospitalAvailability
                        ?.filter(
                          (hospitalItem: any) =>
                            hospitalItem?.price?.actualPrice
                        )
                        .map((hospitalItem: any, hospitalIndex: number) => (
                          <div
                            key={hospitalIndex}
                            className={classNames(style.timeTable)}
                          >
                            <div
                              className={classNames(
                                style.flxBetween,
                                style.row
                              )}
                            >
                              <p className={classNames(style.tableHeading11)}>
                                {hospitalItem?.hospitalId?.name}
                              </p>
                              <p className={classNames(style.tableHeading11)}>
                                {t("rs")}{" "}
                                {hospitalItem?.price?.actualPrice || 0}
                              </p>
                            </div>

                            {daysOfWeek.map((item: any, index: number) => {
                              const dayAvailability =
                                hospitalItem?.availability.find(
                                  (availItem: any) =>
                                    availItem.dayOfWeek === index
                                );

                              if (dayAvailability) {
                                return (
                                  <AvailabilityDays
                                    key={index}
                                    day={item?.day}
                                    data={dayAvailability}
                                  />
                                );
                              }
                              return null;
                            })}
                          </div>
                        ))}
                    </>
                  )}
                </>
              ) : (
                <>
                  <div className={style.availabilityContainer}>
                    <p className={style.availabilityText}>
                      {t("pleaseCheckBackSoon")}
                      <br />
                      {t("")}
                    </p>
                  </div>
                </>
              )}
              <div>
                <p className={classNames(style.mt16, style.headings)}>
                  {t("specialities")}
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "8px",
                  }}
                  className={classNames(style.mt16)}
                >
                  {doctor?.speciality && doctor?.speciality?.length > 0 ? (
                    doctor?.speciality.map(
                      (specialty: string, index: number) => (
                        <button key={index} className={style.SpecialtiesBTN}>
                          {specialty
                            ? specialty.charAt(0).toUpperCase() +
                              specialty.slice(1)
                            : ""}
                        </button>
                      )
                    )
                  ) : (
                    <p>{t("detailNotProvided")}</p>
                  )}
                </div>
              </div>
              <p
                className={classNames(style.mt24, style.headings)}
                style={isRtl ? { lineHeight: "46px" } : {}}
              >
                {t("experience")}
              </p>{" "}
              <div className={style.lists}>
                {doctor?.experience && doctor?.experience?.length > 0 ? (
                  doctor?.experience.map(
                    (experience: string, index: number) => (
                      <ul key={index}>
                        <li>{experience}</li>
                      </ul>
                    )
                  )
                ) : (
                  <p className={style.text}>{t("detailNotProvided")}</p>
                )}
              </div>
              <p className={classNames(style.mt24, style.headings)}>
                {t("awardsAndAchievements")}
              </p>
              <div
                style={{
                  marginTop: "24px",
                }}
              >
                <p className={style.text}>{t("detailNotProvided")}</p>
              </div>
            </div>
          </div>
          <div className={style.w30}>
            <div className={classNames(style.Consult)}>
              <p
                className={classNames(style.headings)}
                style={isRtl ? { lineHeight: "36px" } : {}}
              >
                {t("requestConsult")}
              </p>
              <p
                className={classNames(style.text, style.mt8)}
                style={isRtl ? { lineHeight: "36px" } : {}}
              >
                {t("sendRequestDesc")}
              </p>
              {serviceName?.toLowerCase() === "doctor" ? (
                <>
                  <p className={classNames(style.headings, style.mt16)}>
                    {t("selectYourPlace")}
                  </p>
                  <div style={{ marginTop: "16px" }}>
                    <New_CustomSelect
                      label={t("select")}
                      setSelectedOption={() => {}}
                      id={"place"}
                      onChange={(e: any) => handleSelectPlace(e?.target?.value)}
                      options={[
                        { label: "Clinic", value: "clinic" },
                        { label: "Hospital", value: "hospital" },
                        { label: "Online", value: "online" },
                        { label: "InHouse", value: "inhouse" },
                      ]}
                    />
                  </div>
                  {selectedPlace === "hospital" && (
                    <div style={{ marginTop: "16px" }}>
                      <New_CustomSelect
                        id={"hospital"}
                        setSelectedOption={() => {}}
                        label={t("selectHospital")}
                        onChange={(e: any) =>
                          handleSelectHospital(e?.target?.value)
                        }
                        options={tempHos}
                      />
                    </div>
                  )}
                </>
              ) : null}

              <p className={classNames(style.headings, style.mt16)}>
                {t("selectYourPreferredDay")}
              </p>
              <div className={classNames(style.FlxClum, style.mt24)}>
                {daysOfWeek.map((item: any, index: number) => (
                  <button
                    key={index}
                    style={{
                      border:
                        selectedDay === item.day
                          ? "1px solid #ff7631"
                          : "0.5px solid #7d7d7d",
                      color: selectedDay === item.day ? "#ff7631" : "#7d7d7d",
                    }}
                    className={style.dayBtn}
                    onClick={() => setSelectedDay(item.day)}
                  >
                    {item.day}
                  </button>
                ))}

                <button className={style.BookingBtn} onClick={handelGoPayment}>
                  {" "}
                  {t("bookAppointment")}
                </button>
              </div>
            </div>
            <div className={classNames(style.Consult, style.mt24)}>
              <p className={style.headings}>{t("whyUs")}</p>
              <div
                className={classNames(style.flx, style.mt16)}
                style={{ gap: "10px" }}
              >
                {" "}
                <img src={Priority} alt="Priority" className={style.iconss} />
                <p className={style.bluetext}>{t("priorityCustomerSupport")}</p>
              </div>
              <div
                className={classNames(style.flx, style.mt8)}
                style={{ gap: "10px" }}
              >
                {" "}
                <img src={Private} alt="private" className={style.iconss} />
                <p className={style.bluetext}>{t("privateAndSecure")}</p>
              </div>
              <div
                className={classNames(style.flx, style.mt8)}
                style={{ gap: "10px" }}
              >
                <img
                  src={Encryption}
                  alt="Encryption"
                  className={style.iconss}
                />
                <p className={style.bluetext}>{t("endToEndEncryption")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {loading && <CustomLoader />}
      <Footerr />
    </div>
  );
};

export default DoctorDetails;

const AvailabilityDays = ({ day, data, isRtl }: any) => {
  const { t } = useTranslation() as { t: (key: string) => string };

  function formatToAmPm(time: string) {
    return dayjs(time, "HH:mm").format("hh:mm A");
  }

  return (
    <div
      className={classNames(style.flxBetween, style.row)}
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className={style.tableSection2}>
        <p className={style.tableHeading}>{day}</p>
      </div>
      <div className={style.tableSection}>
        <p className={style.tabletext}>
          {data?.morning?.startTime ? (
            <span
              style={{ direction: isRtl ? "rtl" : "ltr", unicodeBidi: "embed" }}
            >
              {`${formatToAmPm(data.morning.startTime)} ${t(
                "to"
              )} ${formatToAmPm(data.morning.endTime)}`}
            </span>
          ) : (
            "--"
          )}
        </p>
      </div>
      <div className={style.tableSection}>
        <p className={style.tabletext}>
          {data?.evening?.startTime ? (
            <span
              style={{ direction: isRtl ? "rtl" : "ltr", unicodeBidi: "embed" }}
            >
              {`${formatToAmPm(data.evening.startTime)} ${t(
                "to"
              )} ${formatToAmPm(data.evening.endTime)}`}
            </span>
          ) : (
            "--"
          )}
        </p>
      </div>
    </div>
  );
};
