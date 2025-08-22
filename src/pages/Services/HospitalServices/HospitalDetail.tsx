import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import CardStyless from "./HospitalDeatilCards.module.css";
import CommonStyless from "shared/utils/common.module.css";
import classNames from "classnames";
import detailStyle from "./HospitalDetail.module.css";
import { useNavigate } from "react-router-dom";
import {
  getHospital_Departments,
  getHospital_Doctors,
  getSingle_UserHospital,
} from "shared/services/UserService";
import { useDispatch } from "react-redux";
import { setHospitalId } from "shared/redux";
import PhysiotheristsEmpty from "shared/components/PhsiotheristEmpty";
import CustomLoader from "shared/components/New_Loader/Loader";
import Special from "../../../assets/images/treatment 3.png";
import { useTranslation } from "react-i18next";
import Doctor_Card from "shared/components/Doctor_Card";
import { useDirection } from "shared/utils/DirectionContext";
import { MdLocationOn } from "react-icons/md";
import Footerr from "pages/Home/HomeNavBar/Footer";
import { FaRegClock } from "react-icons/fa6";
import { TbBed } from "react-icons/tb";
import { RiStethoscopeLine } from "react-icons/ri";

const DoctorDetail: React.FC = () => {
  const { t, i18n }: any = useTranslation();
  const { isRtl } = useDirection();

  const { state } = useLocation();
  let serviceName = state.serviceName;
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState<any>();
  const [hospitalDoc, setHospitalDoc] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [visibleCards, setVisibleCards] = useState(12);
  const [doctorCards, setDoctorCards] = useState(4);
  const [showNumber, setShowNumber] = useState(false);
  const [showNumber2, setShowNumber2] = useState(false);

  const [hospitalDepartment, setHospitalDepartments] = useState<any>();

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  let params = {
    hospitalId: id,
  };

  useEffect(() => {
    getHospitalDetails();
  }, []);

  const getHospitalDetails = async () => {
    setLoading(true);
    try {
      await dispatch(setHospitalId(id));
      await getSingleHospital();
      await getHospitalDepartments();
      await getHospitalDoctors();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const getSingleHospital = async () => {
    try {
      const res = await getSingle_UserHospital(params);
      setData(res?.data);
      getHospitalDepartments();
    } catch (error) { }
  };

  const getHospitalDepartments = async () => {
    try {
      const res = await getHospital_Departments(params);
      setHospitalDepartments(res?.data?.departments);
    } catch (error) { }
  };

  const getHospitalDoctors = async () => {
    try {
      const res = await getHospital_Doctors(params);
      setHospitalDoc(res?.data?.doctors);
    } catch (error) { }
  };

  const handleViewMoreClick = (doc: any) => {
    navigate(`/services/doctor/DoctorDetail`, {
      state: { serviceName, doc, hospitalId: data?.hospital?._id },
    });
  };

  if (id === undefined) {
    return <div>Doctor ID is missing</div>;
  }

  if (loading) {
    return <CustomLoader />;
  }
  return (
    <div style={{ marginTop: "84px" }}>
      <div
        className={classNames(
          CommonStyless.container,
          CommonStyless.mt24
        )}
      >
        <div className={classNames(CommonStyless.mt24)}>
          <div>
            <div className={CardStyless.cardWrapper}>
              <div className={CardStyless.cardImageWrapper}>
                <img
                  src={data?.hospital?.logo}
                  alt="card img"
                  className={CardStyless.cardImage}
                />
              </div>
              <div className={CardStyless.cardBody}>
                <div className={classNames()}>
                  <p
                    style={{ textTransform: "capitalize" }}
                    className={classNames(CardStyless.cardName)}
                  >
                    {data?.hospital?.name}
                  </p>
                  <p className={classNames(CardStyless.hopTitle)}>
                    PMC {t("verified")}
                  </p>
                </div>
                <div className={classNames(CardStyless.flxB, CardStyless.mt16)}>
                  <div
                    className={classNames(CardStyless.w75, CardStyless.flx)}
                    style={{
                      justifyContent: "space-between",
                      alignItems: "start",
                    }}
                  >
                    <div className={CardStyless.w_45}>
                      <div className={CardStyless.cardtime}>
                        <TbBed color="#7d7d7d" size={20} />
                        <p className={CardStyless.texts}>
                          32 {t("bedsHospital")}
                        </p>
                      </div>

                      <div
                        className={CardStyless.cardtime}
                        style={{ alignItems: "start" }}
                      >
                        <MdLocationOn
                          style={{ minWidth: "20px" }}
                          color="#7d7d7d"
                          size={20}
                        />{" "}
                        <p className={CardStyless.texts}>
                          {data?.hospital?.location?.address}
                        </p>
                      </div>
                    </div>
                    <div className={CardStyless.w_45}>
                      <div className={CardStyless.cardtime}>
                        <img
                          src={Special}
                          alt="Special"
                          className={CardStyless.Iconns}
                        />
                        <p className={CardStyless.texts}>
                          {" "}
                          {data?.treatmentDoctorCount} {t("specialities")}
                        </p>
                      </div>
                      <div className={CardStyless.cardtime}>
                        <FaRegClock color="#7d7d7d" size={20} />

                        <p className={CardStyless.texts}>
                          {data?.hospital?.openTime} -{" "}
                          {data?.hospital?.closeTime}
                        </p>
                      </div>{" "}
                      <div className={CardStyless.cardtime}>
                        <RiStethoscopeLine color="#7d7d7d" size={20} />
                        <p className={CardStyless.texts}>
                          {data?.doctorCount} {t("panelDoctors")}
                        </p>
                      </div>
                    </div>
                  </div>
                  {!showNumber2 && (
                    <button
                      className={CardStyless.CallBtn}
                      onClick={() => setShowNumber2(!showNumber2)}
                    >
                      {" "}
                      {t("callHelpline")}
                    </button>
                  )}
                  {showNumber2 && (
                    <p className={CardStyless.Number}>
                      <p dir={isRtl ? "rtl" : "ltr"}>
                        <span
                          style={{ direction: "ltr", unicodeBidi: "embed" }}
                        >
                          +92-42-37885101-4
                        </span>
                      </p>
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={classNames(CommonStyless.mt24)}>
          <div>
            <p
              className={classNames(
                CommonStyless.fs24,
                CommonStyless.semiBold,
                CardStyless.mt40
              )}
            >
              {t("availableDepartments")}
            </p>
            {data?.treatments?.length == 0 ? <PhysiotheristsEmpty /> : null}

            <div className={CardStyless.departmentCardsContainer}>
              {data?.treatments?.length > 0 ? (
                data?.treatments
                  ?.slice(0, visibleCards)
                  .map((dep: any, index: any) => (
                    <div
                      key={index}
                      className={CardStyless.departmentCardWrapper}
                    >
                      <button className={CardStyless.departmentCards}>
                        <p style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {data?.treatments?.[index]?.length > 10
                            ? `${data?.treatments?.[index].substring(0, 15)}...`
                            : data?.treatments?.[index] || t("noName")}
                        </p>
                      </button>
                    </div>
                  ))
              ) : (
                <p>{t("noTreatmentsAvailable")}</p>
              )}
            </div>
          </div>
        </div>

        <div className={classNames(CommonStyless.mt24)}>
          <p
            className={classNames(
              CardStyless.mt40,
              CommonStyless.fs24,
              CommonStyless.semiBold
            )}
            style={{ textTransform: "capitalize" }}
          >
            {data?.hospital?.name} {t("doctorsList")}
          </p>
          {hospitalDoc?.length === 0 || hospitalDepartment?.length === 0 ? (
            <PhysiotheristsEmpty />
          ) : (
            <>
              <div className={CardStyless.mt40}>
                {hospitalDoc
                  ?.slice(0, doctorCards)
                  .map((hospDoc: any, index: number) => (
                    <Doctor_Card
                      key={index}
                      data={hospDoc}
                      goToDetails={() => handleViewMoreClick(hospDoc)}
                    />
                  ))}
              </div>
            </>
          )}
        </div>

        <div style={i18n.language === "ur" ? { lineHeight: "24px" } : {}}>
          <div className={classNames(CardStyless.mt40, CommonStyless.fs24)}>
            <p className={CardStyless.heading}>
              {" "}
              {t("about")} {data?.hospital?.name}
            </p>
            <p className={CardStyless.ttext}>{data?.hospital?.description}</p>
          </div>

          <div className={classNames(CardStyless.mt40, CommonStyless.fs24)}>
            <p className={CardStyless.heading}>
              {" "}
              {t("topDoctorsAt")} {data?.hospital?.name}
            </p>
            <ul className={CardStyless.TopDoctorList}>
              {hospitalDoc?.length > 0 ? (
                hospitalDoc
                  .slice(0, 5) // Limit to 5 doctors
                  .map((doctor: { name: string }, index: number) => (
                    <li key={index} className={CardStyless.ttext}>
                      {doctor?.name || t("unknownDoctor")}
                    </li>
                  ))
              ) : (
                <li className={CardStyless.ttext}>{t("noDoctorsAvailable")}</li>
              )}
            </ul>
          </div>

          <div className={classNames(CardStyless.mt40, CommonStyless.fs24)}>
            <p className={CardStyless.heading}>
              {" "}
              {data?.hospital?.name} {t("feeStructure")}
            </p>
            <p
              className={CardStyless.ttext}
              style={i18n.language === "ur" ? { lineHeight: "24px" } : {}}
            >
              {t("theConsultationFee_")} {data?.hospital?.name},{" "}
              {data?.hospital?.location?.city}, {t("consultaionFeesRange")} Rs
              1,500 PKR - 5,000 PKR.
            </p>
          </div>

          <div className={classNames(CardStyless.mt40, CommonStyless.fs24)}>
            <p className={CardStyless.heading}>
              {data?.hospital?.name} {t("timing")}
            </p>
            <p
              className={CardStyless.ttext}
              style={i18n.language === "ur" ? { lineHeight: "24px" } : {}}
            >
              {t("checkAppointmentTimmings")}
              {showNumber2 && (
                <p dir={isRtl ? "rtl" : "ltr"}>
                  <span style={{ direction: "ltr", unicodeBidi: "embed" }}>
                    +92-42-37885101-4
                  </span>
                </p>
              )}
            </p>
          </div>

          <div className={classNames(CardStyless.mt40, CommonStyless.fs24)}>
            <p className={CardStyless.heading}>
              {" "}
              {data?.hospital?.name} {t("address")}
            </p>
            <p
              className={CardStyless.ttext}
              style={i18n.language === "ur" ? { lineHeight: "24px" } : {}}
            >
              {t("theAddressOf")} {data?.hospital?.name},{" "}
              {data?.hospital?.location?.address}
            </p>
          </div>

          <div className={classNames(CardStyless.mt40, CommonStyless.fs24)}>
            <p className={CardStyless.heading}>
              {" "}
              {data?.hospital?.name} {t("contactNumber")}
            </p>
            <p
              className={CardStyless.ttext}
              style={i18n.language === "ur" ? { lineHeight: "24px" } : {}}
            >
              {t("youCanSeek_")} {data?.hospital?.name},{" "}
              {data?.hospital?.location?.city}. {t("byCalling")}{" "}
              <p dir={isRtl ? "rtl" : "ltr"}>
                <span style={{ direction: "ltr", unicodeBidi: "embed" }}>
                  +92-42-37885101-4
                </span>
              </p>
            </p>
          </div>
          <div className={classNames(CardStyless.mt40, CommonStyless.fs24)}>
            <p className={CardStyless.heading}> {t("appointmentDetails")}</p>
            <p
              className={CardStyless.ttext}
              style={i18n.language === "ur" ? { lineHeight: "24px" } : {}}
            >
              {t("bookAppointmentAt")} {data?.hospital?.name},{" "}
              {data?.hospital?.location?.city}. {t("callAt")}
              <p className={CardStyless.Number} dir={isRtl ? "rtl" : "ltr"}>
                <span style={{ direction: "ltr", unicodeBidi: "embed" }}>
                  0300-1122334
                </span>
              </p>
              {t("alsoBookOnline")}
            </p>
            <p
              className={CardStyless.ttext}
              style={i18n.language === "ur" ? { lineHeight: "24px" } : {}}
            >
              {t("moreoveYouCan")} {data?.hospital?.name},{" "}
              {data?.hospital?.location?.city}.
            </p>
            <p
              className={CardStyless.ttext}
              style={i18n.language === "ur" ? { lineHeight: "24px" } : {}}
            >
              {t("furthermoreDownloadAppOn")}{" "}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://play.google.com/store/apps/details?id=com.meditourapp&hl=en_US&pli=1"
              >
                {" "}
                Android
              </a>{" "}
              {t("and")}{" "}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://apps.apple.com/us/app/meditour-global/id6738271103"
              >
                IOS
              </a>{" "}
              {t("byClickingHereTo_")}
            </p>
            <p
              className={CardStyless.ttext}
              style={i18n.language === "ur" ? { lineHeight: "24px" } : {}}
            >
              {t("weLookForward_")}
            </p>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "40px 0 ",
            }}
          >
            {!showNumber && (
              <button
                className={CardStyless.helpLine}
                onClick={() => setShowNumber(!showNumber)}
              >
                {" "}
                {t("callHelpline")}
              </button>
            )}
            {showNumber && (
              <p dir={isRtl ? "rtl" : "ltr"}>
                <span style={{ direction: "ltr", unicodeBidi: "embed" }}>
                  +92-42-37885101-4
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
      <Footerr />
    </div>
  );
};

export default DoctorDetail;
