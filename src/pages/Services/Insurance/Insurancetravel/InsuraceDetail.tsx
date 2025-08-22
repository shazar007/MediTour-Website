import React, { useEffect, useState } from "react";
import commonstyle from "shared/utils/common.module.css";
import classNames from "classnames";
import style from "./Paydetail.module.css";
import Footerr from "pages/Home/HomeNavBar/Footer";
import ContinueButton from "shared/components/ContinueButton";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setObj } from "shared/redux";
import FilePicker from "shared/components/FilePickeInsurance";

import uploadFile from "assets/images/upload.png";
import { useTranslation } from "react-i18next";
import ServiceHeader from "shared/components/ServicesHeaders";
import { useDirection } from "shared/utils/DirectionContext";

interface InputData {
  label?: string;
  type: string;
  placeholder: string;
  readOnly: boolean;
  style?: React.CSSProperties;
}

const InsuracePaydetail = () => {
  const { t }: any = useTranslation();
  const { isRtl } = useDirection();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { formType, data, passengerType, selectedPlan } = location.state || {};
  const type = formType == "travel" ? passengerType : selectedPlan;
  const [cnic, setCnic] = useState("");
  const item = data;
  const [cnicError, setCnicError] = useState("");
  const [urlEror, seturlEror] = useState("");
  const [cnicUrl, setcnicUrl] = useState("");
  const { user, userAge } = useSelector((state: any) => state.root.common);
  const handleCnicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 5 && value.length <= 12) {
      value = `${value.slice(0, 5)}-${value.slice(5)}`;
    } else if (value.length > 12) {
      value = `${value.slice(0, 5)}-${value.slice(5, 12)}-${value.slice(12)}`;
    }
    setCnic(value);
  };

  const inputData: InputData[] = [
    { label: "_name", type: "text", placeholder: user?.name, readOnly: true },
    {
      label: "age",
      type: "text",
      placeholder: userAge,
      readOnly: true,
    },
    {
      label: "MR No",
      type: "text",
      placeholder: user?.mrNo,
      readOnly: true,
    },
    {
      label: "phoneNumber",
      type: "text",
      placeholder: user?.phone,
      readOnly: true,
    },
    {
      label: "currentAddress",
      type: "text",
      placeholder: user?.address.address,
      readOnly: true,
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const handleContinue = async () => {
    if (!cnic) {
      setCnicError(t("pleaseEnterYourCNC"));
      return;
    }
    if (!cnicUrl) {
      seturlEror(t("pleaseUploadYourCNICImage"));
      return;
    } else {
      await dispatch(
        setObj({
          item,
          cnic,
          type,
          cnicUrl,
        })
      );
      navigate("/services/paymentDetail", {
        state: {
          serviceName: "insurance",
          actualAmount: item?.actualPrice,
        },
      });
    }
  };
  const handlecnicUrl = (items: any) => {
    setcnicUrl(items);
  };
  return (
    <div>
      <ServiceHeader
        headingBlue={t("SecureYourFuture")}
        headingOrange={t("Today")}
        content={t("Lifeisfullofuncertainties__")}
        desc_width="80%"
      />

      <div className={classNames(commonstyle.container, commonstyle.mb32)}>
        <div
          className={classNames(
            commonstyle.flx,
            commonstyle.flxBetween,
            commonstyle.flxWrap
          )}
        >
          <div className={classNames(commonstyle.col5, commonstyle.colsm12)}>
            <p
              className={classNames(
                commonstyle.colorBlue,
                commonstyle.fs24,
                commonstyle.semiBold
              )}
            >
              {t("packageDetails")}
            </p>
            <div
              className={style.mainconatiner}
              style={
                isRtl
                  ? {
                      padding: "0 15px",
                    }
                  : {}
              }
            >
              <p
                className={classNames(
                  commonstyle.colorBlue,
                  commonstyle.fs16,
                  commonstyle.semiBold
                )}
              >
                {item?.insuranceId?.name}
              </p>
              <div className={classNames(commonstyle.flx)}>
                <div className={style.imgcontainer}>
                  <img
                    src={item?.insuranceId?.logo}
                    alt="insuranceLogo"
                    className={style.treeimg}
                  />
                </div>

                <div className={style.headerconatiner}>
                  <p
                    className={classNames(
                      commonstyle.colorBlue,
                      commonstyle.fs12,
                      commonstyle.semiBold
                    )}
                  >
                    {item?.packageName}
                  </p>
                  <p
                    className={classNames(
                      commonstyle.colorBlue,
                      commonstyle.fs12,
                      commonstyle.semiBold
                    )}
                  >
                    {item?.actualPrice}
                  </p>
                  <p
                    className={classNames(
                      commonstyle.colorGray,
                      commonstyle.fs14
                    )}
                  >
                    {item?.description || item?.packageDescription}
                  </p>
                </div>
              </div>
              <div>
                <p
                  className={classNames(
                    commonstyle.colorBlue,
                    commonstyle.fs12,
                    commonstyle.semiBold
                  )}
                >
                  {t("medicalBenifits")}
                </p>

                <div>
                  <ul className={style.payDetailList}>
                    <li className={style.payDetailItem}>
                      {t("accidentalDeath&Disability")}:
                      <span style={{ color: "#0D47A1" }}>
                        {" "}
                        {item?.adndCoverage || "None"}
                      </span>
                    </li>

                    <li className={style.payDetailItem}>
                      {t("medicineDeliveryCoverage")}:
                      <span style={{ color: "#0D47A1" }}>
                        {" "}
                        {item?.accidentalEmergencyLimits ||
                          item?.repatriationCoverage ||
                          "None"}
                      </span>
                    </li>

                    <li className={style.payDetailItem}>
                      {t("medicalExpenses&Hospitalization")}:
                      <span style={{ color: "#0D47A1" }}>
                        {" "}
                        {item?.specializedInvestigationCoverage ||
                          item?.medExpensesHospitalizationCoverage ||
                          "None"}
                      </span>
                    </li>

                    <li className={style.payDetailItem}>
                      {t("emergencyReurnHomeCoverage")}:
                      <span style={{ color: "#0D47A1" }}>
                        {" "}
                        {item?.maternity ||
                          item?.emergencyReturnHomeCoverage ||
                          "None"}
                      </span>
                    </li>
                  </ul>
                </div>
                {item?.tripCancellation && (
                  <>
                    <p
                      className={classNames(
                        commonstyle.colorBlue,
                        commonstyle.fs12,
                        commonstyle.semiBold
                      )}
                    >
                      {t("travelBenefits")}
                    </p>

                    <div>
                      <ul className={style.payDetailList}>
                        <li className={style.payDetailItem}>
                          {t("tripCancellation")}:
                          <span style={{ color: "#0D47A1" }}>
                            {" "}
                            {item?.tripCancellation || "None"}
                          </span>
                        </li>

                        <li className={style.payDetailItem}>
                          {t("delayInTheArrivalLuggage")}:
                          <span style={{ color: "#0D47A1" }}>
                            {" "}
                            {item?.luggageArrivalDelay || "None"}
                          </span>
                        </li>

                        <li className={style.payDetailItem}>
                          {t("flightDelay")}:
                          <span style={{ color: "#0D47A1" }}>
                            {" "}
                            {item?.flightDelay || "None"}
                          </span>
                        </li>

                        <li className={style.payDetailItem}>
                          {t("travelAndStayOverOneFamilyMember")}:
                          <span style={{ color: "#0D47A1" }}>
                            {" "}
                            {item?.travelStayOverOneFamMember || "None"}
                          </span>
                        </li>

                        <li className={style.payDetailItem}>
                          {t("lossOfPassport")}:
                          <span style={{ color: "#0D47A1" }}>
                            {" "}
                            {item?.passportLoss || "None"}
                          </span>
                        </li>

                        <li className={style.payDetailItem}>
                          {t("lossOfBaggage")}:
                          <span style={{ color: "#0D47A1" }}>
                            {" "}
                            {item?.baggageLoss || "None"}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </>
                )}
                <div>
                  <div
                    style={{
                      marginTop: "10px",
                    }}
                  >
                    <p
                      className={classNames(
                        commonstyle.colorBlue,
                        commonstyle.fs12,
                        commonstyle.semiBold
                      )}
                    >
                      {item?.heading}
                    </p>

                    <p
                      className={classNames(
                        commonstyle.colorGray,
                        commonstyle.fs12,
                        commonstyle.semiBold
                      )}
                    >
                      {item?.description}
                    </p>
                  </div>
                </div>

                <div>
                  <div
                    style={{
                      marginTop: "10px",
                    }}
                  >
                    <p
                      className={classNames(
                        commonstyle.colorBlue,
                        commonstyle.fs12,
                        commonstyle.semiBold
                      )}
                    >
                      {t("address")}
                    </p>

                    <p
                      className={classNames(
                        commonstyle.colorGray,
                        commonstyle.fs12,
                        commonstyle.semiBold
                      )}
                    >
                      {item?.insuranceId?.location?.address}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={classNames(commonstyle.col5, commonstyle.colsm12)}>
            <p
              className={classNames(
                commonstyle.colorBlue,
                commonstyle.fs24,
                commonstyle.semiBold
              )}
            >
              {t("yoursInfo")}
            </p>

            <div className={style.mainconatiner}>
              <div>
                {inputData.map((input, index) => (
                  <div key={index} className={style.inputContainer}>
                    {input.label && (
                      <label className={style.label}>{t(input.label)}</label>
                    )}
                    <input
                      className={style.input}
                      type={input.type}
                      placeholder={input.placeholder}
                      style={{
                        ...input.style,
                      }}
                      readOnly={input.readOnly}
                    />
                  </div>
                ))}
                <div>
                  <label className={style.label}>{t("cnic")}</label>
                  <input
                    className={style.inputCNIC}
                    type="text"
                    value={cnic}
                    placeholder="33303-1234567-1"
                    onChange={handleCnicChange}
                    maxLength={15}
                  />
                  {cnicError && <p style={{ color: "red" }}>{cnicError}</p>}{" "}
                </div>
              </div>

              <div className={style.containerUpload}>
                <div className={style.uploadBox}>
                  <div className={style.uploadText}>
                    <FilePicker setData={handlecnicUrl} img={uploadFile} />
                    {urlEror && <p className={style.errorMessage}>{urlEror}</p>}
                  </div>
                </div>
              </div>
            </div>

            <ContinueButton
              buttonText={t("continue")}
              backgroundColor="#0e54a3"
              onClick={handleContinue}
            />
          </div>
        </div>
      </div>
      <div className={style.marginBottom}></div>
      <Footerr />
    </div>
  );
};

export default InsuracePaydetail;
