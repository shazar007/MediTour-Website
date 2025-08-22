import { useEffect, useState } from "react";
import style from "./insuranceTravel.module.css";
import classNames from "classnames";
import support from "assets/images/labcardsupport.png";
import security from "assets/images/labcardsecurity.png";
import key from "assets/images/labcardkey.png";
import From from "assets/images/Icon From (1).png";
import Trip from "assets/images/icon-park-outline_round-trip.png";
import Country from "assets/images/gis_search-country.png";
import Sliver from "assets/images/material-symbols_category-rounded.png";
import Time from "assets/images/Icon Time Lg.png";
import Footerr from "pages/Home/HomeNavBar/Footer";
import { RxDownload } from "react-icons/rx";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getInsuranceDetails } from "shared/services";
import { useSelector } from "react-redux";
import { useDirection } from "shared/utils/DirectionContext";
export default function InsuranceTravelDetail() {
  const { t }: any = useTranslation();
  const { isLoggedIn } = useSelector((state: any) => state.root.common);
  const location = useLocation();
  const { insuranceId, type } = location.state || {};
  const [showNumber2, setShowNumber2] = useState(false);
  const { isRtl } = useDirection();

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
          state: location.state,
          loginFrom: "insuranceTravel",
        },
        replace: true,
      });
    }
  };

  const handleDownload = () => {
    const fileUrl = travelDetails?.policyDocument;
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
                  src={travelDetails?.packageLogo}
                  className={style.mainImage}
                  alt="insurance packLogo"
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
                      {travelDetails?.packageName}
                    </p>
                    <p className={style.Featured}>Featured Package</p>
                  </div>
                  <p className={style.EFU}>
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
                    <img
                      src={Trip}
                      alt="insuranceTripp"
                      className={style.icon}
                    />
                    <p className={style.rowheading}>
                      {travelDetails?.tripType}
                    </p>
                  </div>{" "}
                  <div className={style.row}>
                    <img
                      src={Country}
                      alt="insurance Country"
                      className={style.icon}
                    />
                    <p className={style.rowheading}>
                      {" "}
                      {travelDetails?.countrySelection}
                    </p>
                  </div>{" "}
                  <div className={style.row}>
                    <img
                      src={Sliver}
                      alt="insuranceSliver"
                      className={style.icon}
                    />
                    <p className={style.rowheading}>
                      {travelDetails?.packageCategory}
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
                      {travelDetails?.coveringUpto}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <p className={classNames(style.RequestTitle, style.mt16)}>
              {t("description")}
            </p>
            <p className={style.DetailText}>
              {travelDetails?.packageDescription}
            </p>
            <p className={classNames(style.RequestTitle, style.mt16)}>
              {t("packageDetails")}
            </p>
            <div className={style.packageOuter}>
              <div className={style.borderBottom}>
                <p className={style.packageMainTitle}>{t("type")}</p>
              </div>
              <div className={style.borderBottom}>
                <p className={style.packageSubTitle}>{t("medicalCover")}</p>
                <button className={style.PackageBtn}>
                  {travelDetails?.medicalCover}
                </button>
              </div>
              <div className={style.borderBottom}>
                <p className={style.packageSubTitle}>{t("packageCategory")}</p>
                <button className={style.PackageBtn}>
                  {" "}
                  {travelDetails?.packageCategory}
                </button>
              </div>{" "}
              <div className={style.borderBottom}>
                <p className={style.packageSubTitle}>
                  {t("repatriationCoverage")}
                </p>
                <button className={style.PackageBtn}>
                  {" "}
                  {travelDetails?.repatriationCoverage}
                </button>
              </div>{" "}
              <div className={style.borderBottom}>
                <p className={style.packageSubTitle}>
                  {t("hospitalizationCoverage")}
                </p>
                <button className={style.PackageBtn}>
                  {" "}
                  {travelDetails?.medExpensesHospitalizationCoverage}
                </button>
              </div>{" "}
              <div className={style.borderBottom}>
                <p className={style.packageSubTitle}>
                  {t("dependentChildrenCoverage")}
                </p>
                <button className={style.PackageBtn}>
                  {" "}
                  {travelDetails?.returnOfDependentChildrenCoverage}
                </button>
              </div>{" "}
              <div className={style.borderBottom}>
                <p className={style.packageSubTitle}>
                  {t("illnessInjuryCoverage")}
                </p>
                <button className={style.PackageBtn}>
                  {" "}
                  {travelDetails?.repatriationIllnessInjuryCoverage}
                </button>
              </div>{" "}
              <div className={style.borderBottom}>
                <p className={style.packageSubTitle}>
                  {t("emergencyReturnHomeCoverage")}
                </p>
                <button className={style.PackageBtn}>
                  {" "}
                  {travelDetails?.emergencyReturnHomeCoverage}
                </button>
              </div>{" "}
              <div className={style.borderBottom}>
                <p className={style.packageSubTitle}>
                  Medicine Delivery Coverage
                </p>
                <button className={style.PackageBtn}>
                  {" "}
                  {travelDetails?.medicineDeliveryCoverage}
                </button>
              </div>{" "}
              <div className={style.borderBottom}>
                <p className={style.packageSubTitle}>Flight Delays</p>
                <button className={style.PackageBtn}>
                  {" "}
                  {travelDetails?.flightDelay}
                </button>
              </div>{" "}
              <div className={style.borderBottom}>
                <p className={style.packageSubTitle}>Passport Loss</p>
                <button className={style.PackageBtn}>
                  {" "}
                  {travelDetails?.passportLoss}
                </button>
              </div>{" "}
              <div className={style.borderBottom}>
                <p className={style.packageSubTitle}>Luggage Arrival Delay</p>
                <button className={style.PackageBtn}>
                  {" "}
                  {travelDetails?.luggageArrivalDelay}
                </button>
              </div>{" "}
              <div className={style.borderBottom}>
                <p className={style.packageSubTitle}>Baggage Loss</p>
                <button className={style.PackageBtn}>
                  {" "}
                  {travelDetails?.baggageLoss}
                </button>
              </div>{" "}
              <div style={{ flexWrap: "wrap" }} className={style.borderBottom}>
                <p className={style.packageSubTitle}>{t("perYear")}</p>
                <button className={style.PackageBtn}>
                  {" "}
                  {travelDetails?.perYear}
                </button>
              </div>{" "}
              <div className={style.flxcenter}>
                <button className={style.DownloadBtn} onClick={handleDownload}>
                  <RxDownload size={20} />
                  {t("policyDocuments")}
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
                  style={{
                    marginBottom: "5px",
                  }}
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
              <button className={style.BuyBtn} onClick={handlegotoBooking}>
                {t("buy")}
              </button>
            </div>
            <div className={style.request}>
              <p className={style.RequestTitle}>{t("whyUs")}</p>
              <div className={style.row}>
                {" "}
                <img
                  src={support}
                  alt="insuranceSupports"
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
                <img src={key} alt="insuranceKeys" className={style.icon} />
                <p className={style.requestRowtitle}>
                  {t("endToEndEncryption")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footerr />
    </>
  );
}
