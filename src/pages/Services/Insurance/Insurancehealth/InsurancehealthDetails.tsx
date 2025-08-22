import { useEffect, useState } from "react";
import style from "./insurancehealth.module.css";
import classNames from "classnames";
import support from "assets/images/labcardsupport.png";
import security from "assets/images/labcardsecurity.png";
import key from "assets/images/labcardkey.png";
import From from "assets/images/Icon From (1).png";
import Time from "assets/images/Icon Time Lg.png";
import Footerr from "pages/Home/HomeNavBar/Footer";
import { RxDownload } from "react-icons/rx";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getInsuranceDetails } from "shared/services";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useDirection } from "shared/utils/DirectionContext";
import { CiSliderVertical } from "react-icons/ci";

export default function InsuranceHealthDetail() {
  const { t }: any = useTranslation();
  const { isRtl } = useDirection();
  const [showNumber2, setShowNumber2] = useState(false);
  const { isLoggedIn } = useSelector((state: any) => state.root.common);
  const [isHospitalModalOpen, setHospitalModalOpen] = useState(false);
  const [isLabModalOpen, setLabModalOpen] = useState(false);
  const location = useLocation();
  const { insuranceId, type } = location.state || {};
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { data } = useQuery({
    queryKey: ["InsuranceTravelDetails", insuranceId, type],
    queryFn: () => getInsuranceDetails({ insuranceId, type }),
    staleTime: 5 * 60 * 1000,
  });
  let travelDetails = data?.data?.insurance;
  const navigate = useNavigate();

  const handlegotoBooking = () => {
    if (isLoggedIn) {
      navigate("/services/insurance/InsuranceBooking", {
        state: { travelDetails, type },
      });
    } else {
      navigate("/user/login", {
        state: {
          state: location?.state,
          loginFrom: "insuranceHealth",
        },
        replace: true,
      });
    }
  };

  const handlepolicyDocumentDownload = () => {
    const fileUrl = travelDetails?.policyDocument;
    const link = document.createElement("a");
    link.href = fileUrl;
    link.setAttribute("download", "policy-document.pdf");
    document.body.appendChild(link);
    link.click();
    link.remove();
  };
  const handleclaimProcessDownload = () => {
    const fileUrl = travelDetails?.claimProcess;
    const link = document.createElement("a");
    link.href = fileUrl;
    link.setAttribute("download", "policy-document.pdf");
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <>
      <div style={{ paddingTop: "60px", backgroundColor: "#F5F5F5" }}>
        <div className={style.outerWrapper22}>
          <div className={classNames(style.w70)}>
            <div className={classNames(style.flxx)}>
              <div className={classNames(style.w40, style.flxx)}>
                <img
                  alt="insurancePackageLogo"
                  src={travelDetails?.packageLogo}
                  className={style.mainImage}
                />
              </div>
              <div className={classNames(style.w60, style.flxcol)}>
                <div>
                  <div
                    style={{
                      display: "flex",
                      gap: "24px",
                      alignItems: "center",
                    }}
                  >
                    <p className={style.mianHeading}>
                      {" "}
                      {travelDetails?.packageName}
                    </p>
                    <p className={style.Featured}>Featured Package</p>
                  </div>
                  <p className={style.EFU}>
                    {" "}
                    {travelDetails?.insuranceId?.name}
                  </p>
                  <p className={style.DetailsPrice}>
                    <span style={{ fontSize: "16px" }}>Rs: </span>
                    <span>{travelDetails?.actualPrice}</span>
                  </p>
                </div>
                <div>
                  <div className={style.row}>
                    <img
                      src={From}
                      alt="insuranceForm"
                      className={style.icon}
                    />
                    <p className={style.rowheading}>{type}</p>
                  </div>{" "}
                  <div className={style.row}>
                    <CiSliderVertical color="#7d7d7d" className={style.icon} />
                    <p className={style.rowheading}>
                      {travelDetails?.hospitalizationLimit?.startLimit} -{" "}
                      {travelDetails?.hospitalizationLimit?.endLimit}{" "}
                    </p>
                  </div>{" "}
                  <div className={style.row}>
                    <img
                      src={Time}
                      alt="insuranceTime"
                      className={style.icon}
                    />
                    <p className={style.rowheading}>
                      {" "}
                      {travelDetails?.perYear}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <p className={classNames(style.RequestTitle, style.mt16)}>
              {t("description")}
            </p>
            <p className={style.DetailText}>{travelDetails?.description}</p>
            <p className={classNames(style.RequestTitle, style.mt16)}>
              {t("packageDetails")}
            </p>
            <div className={style.packageOuter}>
              <div className={style.borderBottom}>
                <p className={style.packageMainTitle}>{t("type")}</p>
              </div>
              {type !== "family plan" ? (
                <div className={style.borderBottom}>
                  <p className={style.packageSubTitle}>Age Criteria</p>
                  <button className={style.PackageBtn}>
                    {travelDetails?.ageCriteria?.startAge} -{" "}
                    {travelDetails?.ageCriteria?.endAge} Years
                  </button>
                </div>
              ) : (
                <>
                  <div className={style.borderBottom}>
                    <p className={style.packageSubTitle}>Your Age Criteria</p>
                    <button className={style.PackageBtn}>
                      {travelDetails?.yourAgeCriteria?.startAge} -{" "}
                      {travelDetails?.yourAgeCriteria?.endAge} Years
                    </button>
                  </div>{" "}
                  <div className={style.borderBottom}>
                    <p className={style.packageSubTitle}>Spouse Age Criteria</p>
                    <button className={style.PackageBtn}>
                      {travelDetails?.spouseAgeCriteria?.startAge} -{" "}
                      {travelDetails?.spouseAgeCriteria?.endAge} Years
                    </button>
                  </div>{" "}
                  <div className={style.borderBottom}>
                    <p className={style.packageSubTitle}>Kids Age Criteria</p>
                    <button className={style.PackageBtn}>
                      {travelDetails?.kidsAge?.startAge} -{" "}
                      {travelDetails?.kidsAge?.endAge} Years
                    </button>
                  </div>
                </>
              )}
              <div className={style.borderBottom}>
                <p className={style.packageSubTitle}>
                  Hospitalization Cover (Per Person)
                </p>
                <button className={style.PackageBtn}>
                  {travelDetails?.hospitalizationPerPerson || "---"}
                </button>
              </div>{" "}
              <div className={style.borderBottom}>
                <p className={style.packageSubTitle}>
                  Daily Room & Board Limit
                </p>
                <button className={style.PackageBtn}>
                  {" "}
                  {travelDetails?.dailyRoomAndBoardLimit || "---"}
                </button>
              </div>{" "}
              <div className={style.borderBottom}>
                <p className={style.packageSubTitle}>ICU/CCU</p>
                <button className={style.PackageBtn}>
                  {" "}
                  {travelDetails?.icuCcuLimits || "---"}
                </button>
              </div>{" "}
              <div className={style.borderBottom}>
                <p className={style.packageSubTitle}>
                  Coverage of specialized Investigation
                </p>
                <button className={style.PackageBtn}>
                  {" "}
                  {travelDetails?.specializedInvestigationCoverage || "---"}
                </button>
              </div>{" "}
              <div className={style.borderBottom}>
                <p className={style.packageSubTitle}>
                  Ambulance Service Charges
                </p>
                <button className={style.PackageBtn}>
                  {" "}
                  {travelDetails?.ambulanceCoverage || "---"}
                </button>
              </div>{" "}
              <div className={style.borderBottom}>
                <p className={style.packageSubTitle}>
                  Additional Limit for Accidental Emergency
                </p>
                <button className={style.PackageBtn}>
                  {" "}
                  {travelDetails?.accidentalEmergencyLimits || "---"}
                </button>
              </div>{" "}
              <div className={style.borderBottom}>
                <p className={style.packageSubTitle}>Yearly Test</p>
                <button className={style.PackageBtn}>
                  {" "}
                  {travelDetails?.accidentalEmergencyLimits || "---"}
                </button>
              </div>{" "}
              <div className={style.borderBottom}>
                <p className={style.packageSubTitle}>Hospitals</p>
                <button
                  style={{ cursor: "pointer" }}
                  className={style.PackageBtn}
                  onClick={() => {
                    setHospitalModalOpen(true);
                  }}
                >
                  View Hospitals
                </button>
              </div>{" "}
              <div className={style.borderBottom}>
                <p className={style.packageSubTitle}>Laboratory</p>
                <button
                  style={{ cursor: "pointer" }}
                  className={style.PackageBtn}
                  onClick={() => {
                    setLabModalOpen(true);
                  }}
                >
                  View Labs
                </button>
              </div>{" "}
              <div className={style.borderBottom}>
                <p className={style.packageSubTitle}>Waiting Period</p>
                <button className={style.PackageBtn}>
                  {" "}
                  {travelDetails?.waitingPeriod || "---"}
                </button>
              </div>{" "}
              <div className={style.borderBottom}>
                <p className={style.packageSubTitle}>Claim Payout Ratio</p>
                <button className={style.PackageBtn}>
                  {" "}
                  {travelDetails?.claimPayoutRatio || "---"}
                </button>
              </div>{" "}
              <div className={style.flxcenter}>
                <button
                  className={style.DownloadBtn}
                  onClick={handlepolicyDocumentDownload}
                >
                  {" "}
                  <RxDownload size={20} /> {t("policyDocuments")}
                </button>
                <button
                  className={style.DownloadBtn}
                  onClick={handleclaimProcessDownload}
                >
                  {" "}
                  <RxDownload size={20} />
                  {t("claimProcess")}
                </button>
              </div>
            </div>
          </div>
          <div className={classNames(style.w30)}>
            <div className={style.request}>
              <p className={style.RequestTitle}>{t("RequestaInsurance")}</p>
              <p className={style.RequestText}>
                {t("Sendrequest&ourcustomer")}
              </p>
              {!showNumber2 && (
                <button
                  className={style.CallBtn}
                  onClick={() => setShowNumber2(true)}
                >
                  {t("callHelpline")}
                </button>
              )}

              {showNumber2 && (
                <p className={style.Number}>
                  <p dir={isRtl ? "rtl" : "ltr"}>
                    <span
                      style={{
                        direction: "ltr",
                        unicodeBidi: "embed",
                        color: "#0e54a3",
                      }}
                    >
                      +92-42-37885101-4
                    </span>
                  </p>
                </p>
              )}
              <p className={classNames(style.RequestTitle, style.mt16)}>
                {t("sendInquiry")}
              </p>
              <p className={style.RequestText}>
                {t("Requestyourpreferredpackagenow")}
              </p>
              {/* <button className={style.sendBtn}> {t("sendInquiry")}</button> */}
              <button className={style.BuyBtn} onClick={handlegotoBooking}>
                {" "}
                {t("buy")}
              </button>
            </div>
            <div className={style.request}>
              <p className={style.RequestTitle}>{t("whyUs")}</p>
              <div className={style.row}>
                {" "}
                <img
                  src={support}
                  alt="insuranceSupport"
                  className={style.icon}
                />
                <p className={style.requestRowtitle}>
                  {t("priorityCustomerSupport")}
                </p>
              </div>
              <div className={style.row}>
                {" "}
                <img
                  src={security}
                  alt="insuranceSecurity"
                  className={style.icon}
                />
                <p className={style.requestRowtitle}>{t("privateAndSecure")}</p>
              </div>
              <div className={style.row}>
                {" "}
                <img src={key} alt="insuranceKey" className={style.icon} />
                <p className={style.requestRowtitle}>
                  {t("endToEndEncryption")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isHospitalModalOpen && (
        <div className={style.modalOverlay}>
          <div className={style.modalContent}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <p className={style.modeltitle}>Hospitals List</p>
              <div
                className={style.closeBtn}
                onClick={() => {
                  setHospitalModalOpen(false);
                }}
              >
                <IoClose />
              </div>
            </div>
            <div className={style.list}>
              <ul>
                {travelDetails?.hospitals.map((lab: any, index: any) => (
                  <li key={index} style={{ marginTop: "8px" }}>
                    {lab}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
      {isLabModalOpen && (
        <div className={style.modalOverlay}>
          <div className={style.modalContent}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <p className={style.modeltitle}>Laboratory List</p>
              <div
                className={style.closeBtn}
                onClick={() => {
                  setLabModalOpen(false);
                }}
              >
                <IoClose />
              </div>
            </div>

            <div className={style.list}>
              <ul>
                {travelDetails?.laboratories.map((lab: any, index: any) => (
                  <li key={index} style={{ marginTop: "8px" }}>
                    {lab}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
      <Footerr />
    </>
  );
}
