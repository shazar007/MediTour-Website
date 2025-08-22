import React from "react";
import classNames from "classnames";
import commonstyles from "shared/utils/common.module.css";
import Footerr from "../../Footer";
import { useLocation, useNavigate } from "react-router-dom";
import Styles from "./InsuranceBokkingDetail.module.css";
import { FaDownload } from "react-icons/fa6";
import { INSURANCE_NAVBAR } from "shared/utils/mainHeaderQuery";
import NavBreadCrumbs from "shared/components/NavBreadCrumbs";
import { useTranslation } from "react-i18next";

const InsuranceBookingDetail = React.memo((props) => {
  const {t} : any = useTranslation()
  const navigate = useNavigate();
  const { state } = useLocation();
  const item = state?.item;

  const fileUrl = item?.insuranceFile;

  const handleFileClick = (fileUrl: string) => {
    if (!fileUrl) {
      console.error("File URL is not available.");
      return;
    }

    // const downloadLink = document.createElement("a");
    // downloadLink.href = fileUrl;
    // downloadLink.download = "insurance_file.pdf";
    // document.body.appendChild(downloadLink);
    // downloadLink.click();
    // document.body.removeChild(downloadLink);

    const downloadLink: any = document.createElement("a");
    downloadLink.href = fileUrl;
    downloadLink.download = "downloaded_file.pdf";
    document.body.appendChild(downloadLink);
    window.open(downloadLink);
    document.body.removeChild(downloadLink);
  };

  const handleDownload = (fileUrl: string) => {
    if (!fileUrl) {
      console.error("File URL is not available.");
      return;
    }

    // const downloadLink = document.createElement("a");
    // downloadLink.href = fileUrl;
    // downloadLink.download = "insurance_file.pdf";
    // document.body.appendChild(downloadLink);
    // downloadLink.click();
    // document.body.removeChild(downloadLink);

    const downloadLink: any = document.createElement("a");
    downloadLink.href = fileUrl;
    downloadLink.download = "downloaded_file.pdf";
    document.body.appendChild(downloadLink);
    window.open(downloadLink);
    document.body.removeChild(downloadLink);
  };

  return (
    <div>
      <NavBreadCrumbs {...INSURANCE_NAVBAR(t)} />

      <div className={classNames(commonstyles.container, commonstyles.mb32)}>
        <div
          className={classNames(commonstyles.colorBlue, commonstyles.mb16)}
          style={{
            textAlign: "center",

            fontWeight: "bold",
            fontSize: "24px",
          }}
        >
          {t("insuranceDetail")}
        </div>
        <div
          // className={classNames(commonstyles.flx, commonstyles.flxBetween)}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          {/* Left Column */}
          <div
            className={classNames(
              Styles.insuranceContainer,
              commonstyles.col5,
              commonstyles.colsm12
            )}
          >
            <div>
              {/* Insurance Heading */}
              <div>
                <p
                  className={classNames(
                    commonstyles.colorBlue,
                    commonstyles.fs24,
                    commonstyles.semiBold
                  )}
                >
                  {t("insurance")}
                </p>

                {/* Section 1: Medical Benefits */}
                <section>
                  <div className={Styles.leftColumnHeading}>
                    <p
                      className={classNames(
                        commonstyles.colorBlue,
                        commonstyles.fs18,
                        commonstyles.semiBold
                      )}
                    >
                      1- {t("medicalBenifits")}
                    </p>
                  </div>
                  <ul>
                    {item?.insuranceId?.icuCcuLimits && (
                      <li>{`IcuCcuLimits ${item?.insuranceId?.icuCcuLimits}`}</li>
                    )}
                    {item?.insuranceId?.accidentalEmergencyLimits && (
                      <li>
                        {`${t("accidentalEmergencyLimits")}: ${item?.insuranceId?.accidentalEmergencyLimits}`}
                      </li>
                    )}
                    {item?.insuranceId?.ambulanceCoverage && (
                      <li>{`${t("ambulanceCoverage")}: ${item?.insuranceId?.ambulanceCoverage}`}</li>
                    )}
                    {item?.insuranceId?.waitingPeriod && (
                      <li>
                        {`${t("waitingPeriod")}: ${item?.insuranceId?.waitingPeriod}`}
                      </li>
                    )}
                    {item?.insuranceId?.medExpensesHospitalizationCoverage && (
                      <li>{`${t("medExpensesHospitalizationCoverage")}: ${item?.insuranceId?.medExpensesHospitalizationCoverage}`}</li>
                    )}
                    {item?.insuranceId?.emergencyReturnHomeCoverage && (
                      <li>{`${t("emergencyReurnHomeCoverage")}: ${item?.insuranceId?.emergencyReturnHomeCoverage}`}</li>
                    )}
                  </ul>
                </section>

                {/* Section 2: Policy Documents */}
                <section>
                  <div className={Styles.leftColumnHeading}>
                    <p
                      className={classNames(
                        commonstyles.colorBlue,
                        commonstyles.fs18,
                        commonstyles.semiBold
                      )}
                    >
                      2- {t("policyDocuments")}
                    </p>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "50%",
                      fontSize: "14px",
                      color: "#0e54a3",
                      backgroundColor: "#E3EBED",
                      padding: "5px",
                      border: "1px dotted #0e54a3",
                      borderRadius: "8px",
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      handleDownload(item?.insuranceId?.policyDocument)
                    }
                  >
                    <p className={Styles.text}>{t("downloadPolicyDocument")}</p>
                    <FaDownload />
                  </div>
                </section>

                {/* Section 3: More Features */}
                <section>
                  <div className={Styles.leftColumnHeading}>
                    <p
                      className={classNames(
                        commonstyles.colorBlue,
                        commonstyles.fs18,
                        commonstyles.semiBold
                      )}
                    >
                      3- {t("moreFeatures")}
                    </p>
                  </div>
                  <p className={Styles.text}>{item?.insuranceId?.heading}</p>
                  <p className={Styles.text}>
                    {item?.insuranceId?.description}
                  </p>
                </section>
              </div>
            </div>
          </div>

          {/* Right Column */}

          <div
            className={classNames(
              Styles.insuranceContainer,
              commonstyles.col5,
              commonstyles.colsm12
            )}
          >
            <div className={Styles.policyDetails}>
              <p
                className={classNames(
                  commonstyles.colorBlue,
                  commonstyles.fs16
                )}
              >
                {t("insuranceDescription")}: {item?.insuranceId?.packageDescription}
              </p>
              <p
                className={classNames(
                  commonstyles.colorBlue,
                  commonstyles.fs16
                )}
              >
                {t("totalAmount")}: 12,504
              </p>

              <div className={Styles.downloadSection}>
                <label>
                  <p
                    className={classNames(
                      commonstyles.colorBlue,
                      commonstyles.fs16
                    )}
                  >
                    {t("insuranceFile")}
                  </p>
                </label>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "90%",
                    fontSize: "14px",
                    color: "#0e54a3",
                    backgroundColor: "#E3EBED",
                    padding: "5px",
                    border: "1px dotted #0e54a3",
                    borderRadius: "8px",
                    marginTop:"10px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleFileClick(item.insuranceFile)}
                >
                  <p className={Styles.text}>{t("downloadInsuranceFile")}</p>

                  <FaDownload />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: "100px" }}></div>

      <Footerr />
    </div>
  );
});

export default InsuranceBookingDetail;
