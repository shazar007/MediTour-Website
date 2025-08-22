import classNames from "classnames";
import { useState } from "react";
import commonstyles from "shared/utils/common.module.css";
import style from "./Myself.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { DeleteModal, InputField } from "shared/components";
import File from "assets/images/filePicker.png";
import {
  insruanceFamilyDeletefun,
  INSURANCE_INDIVIDUAL_DELETE,
} from "shared/services";
import { useTranslation } from "react-i18next";

const TravelPackageDetails = () => {
  const { t, i18n }: any = useTranslation();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const item = state?.item;
  const type = state?.type;

  const handleDownload = (fileUrl: string) => {
    if (!fileUrl) {
      console.error("File URL is not available.");
      return;
    }

    const downloadLink = document.createElement("a");
    downloadLink.href = fileUrl;
    downloadLink.download = "insurance_file.pdf";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };
  const handleDownloading = (fileUrl: string) => {
    if (!fileUrl) {
      console.error("File URL is not available.");
      return;
    }

    const downloadLink = document.createElement("a");
    downloadLink.href = fileUrl;
    downloadLink.download = "insurance_file.pdf";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };
  const onCanelModal = () => {
    setModalVisible(false);
  };
  if (loading) {
    return <div>Loading...</div>;
  }

  const onDel = () => {
    setLoading(true);
    let insuranceParams;
    if (type == "familyType") {
      insuranceParams = insruanceFamilyDeletefun(item?._id);
    } else {
      insuranceParams = INSURANCE_INDIVIDUAL_DELETE(item?._id);
    }
    insuranceParams
      .then((res: any) => {
        if (type == "familyTrip") {
          navigate("/insurance/Travel/Single/singleTrip");
        } else {
          navigate("/insurance/Travel/Family/:value");
        }
        setModalVisible(false);
      })
      .catch((err: any) => {})
      .finally(() => setLoading(false));
  };
  return (
    <div className={classNames(commonstyles.col12)}>
      <div
        className={
          ["ur", "ar", "ps", "pr"].includes(i18n.language)
            ? commonstyles.pl36
            : commonstyles.pr36
        }
      >
        {" "}
        <div className={commonstyles.flxEnd}>
          <button
            onClick={() => setModalVisible(true)}
            className={style.Delete}
          >
            {t("delete")}
          </button>
        </div>
        <div className={commonstyles.outerContainer}>
          <div>
            <img
              alt="packageLogotravel"
              src={item?.packageLogo}
              style={{
                height: "140px",
                width: "100%",
                borderRadius: "12px",
              }}
            />
          </div>{" "}
          <p
            className={classNames(
              commonstyles.fs14,
              commonstyles.medium,
              commonstyles.mt24
            )}
          >
            {item?.packageName}
          </p>
          <div className={classNames(commonstyles.flx, style.gap24)}>
            <div className={style.col4}>
              <InputField
                placeholder="Medical Cover"
                value={item?.medicalCover}
              />
            </div>
            <div className={style.col4}>
              <InputField
                placeholder="Package Discription"
                value={item?.packageDescription}
              />{" "}
            </div>{" "}
            <div className={style.col4}>
              <InputField
                placeholder="Covering Upto"
                value={item?.coveringUpto}
              />
            </div>
          </div>
          <div className={classNames(commonstyles.flx, style.gap24)}>
            {" "}
            <div className={style.col4}>
              <InputField
                placeholder="Package Category"
                value={item?.packageCategory}
              />
            </div>
            <div className={style.col4}>
              <InputField
                placeholder="Trip Cancellation"
                value={item?.tripCancellation}
              />
            </div>
            <div className={style.col4}>
              <InputField
                placeholder="Luggage Arrival Delay"
                value={item?.luggageArrivalDelay}
              />
            </div>
          </div>
          <p
            className={classNames(
              commonstyles.fs14,
              commonstyles.medium,
              commonstyles.mt24
            )}
          >
            {t("medicalBenifits")}
          </p>
          <div className={classNames(commonstyles.flx, style.gap24)}>
            <div className={commonstyles.col6}>
              <InputField
                placeholder="Ad & Coverage"
                value={item?.adndCoverage}
              />
            </div>
            <div className={style.col6}>
              <InputField
                placeholder="Med Expenses Hospitalization Coverage"
                value={item?.medExpensesHospitalizationCoverage}
              />
            </div>
          </div>
          <div className={classNames(commonstyles.flx, style.gap24)}>
            <div className={style.col6}>
              <InputField
                placeholder="Emergency Return Home Coverage"
                value={item?.emergencyReturnHomeCoverage}
              />
            </div>
            <div className={style.col6}>
              <InputField
                placeholder="Repatriation Coverage"
                value={item?.repatriationCoverage}
              />
            </div>
          </div>
          <div
            className={classNames(
              commonstyles.col10,
              commonstyles.flxBetween,
              style.mt8,
              style.gap40
            )}
          >
            {item?.medicineDeliveryCoverage && (
              <div className={commonstyles.col12}>
                <InputField
                  placeholder="Medicine Delivery Coverage"
                  value={item?.medicineDeliveryCoverage}
                />
              </div>
            )}
            {item?.repatriationIllnessInjuryCoverage && (
              <div className={commonstyles.col12}>
                <InputField
                  placeholder="Repatriation Illness Injury Coverage"
                  value={item?.repatriationIllnessInjuryCoverage}
                />
              </div>
            )}
          </div>
          <div className={style.mt24}>
            <p
              className={classNames(
                commonstyles.fs14,
                commonstyles.medium,
                commonstyles.mt24
              )}
            >
              {t("policyDocuments")}
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                margin: "10px 0",
                borderWidth: "1px",
                borderStyle: "dashed",
                borderColor: "#000",
                borderRadius: "8px",
                padding: "4px",
                // Set cursor to pointer
              }}
              onClick={() => handleDownload(item?.policyDocument)}
            >
              <img
                src={File}
                alt="Document"
                style={{
                  width: "20%",
                  height: "100px",
                  objectFit: "contain",
                }}
              />
              <p
                style={{
                  fontSize: "14px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                Police Docoment.pdf
              </p>
            </div>
          </div>
          <div className={style.mt24}>
            <p
              className={classNames(
                commonstyles.fs14,
                commonstyles.medium,
                commonstyles.mt24
              )}
            >
              {t("claimProcess")}
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                margin: "10px 0",
                borderWidth: "1px",
                borderStyle: "dashed",
                borderColor: "#000",
                borderRadius: "8px",
                padding: "4px",
                // Set cursor to pointer
              }}
              onClick={() => handleDownloading(item?.claimProcess)}
            >
              <img
                src={File}
                alt="Document"
                style={{
                  width: "20%",
                  height: "100px",
                  objectFit: "contain",
                }}
              />
              <p
                style={{
                  fontSize: "14px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                Claim Process.pdf
              </p>
            </div>
          </div>
          <div className={commonstyles.mt56}>
            <p
              className={classNames(
                commonstyles.fs14,
                commonstyles.medium,
                commonstyles.mt24
              )}
            >
              {t("moreFeatures")}
            </p>
            <div className={classNames(commonstyles.flx, style.gap24)}>
              <div className={classNames(style.col6)}>
                <InputField
                  placeholder="Flight Delay"
                  value={item?.flightDelay}
                />
              </div>
              <div className={classNames(style.col6)}>
                <InputField
                  placeholder="Baggage Loss"
                  value={item?.baggageLoss}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <DeleteModal
        modalVisible={isModalVisible}
        handleCancel={onCanelModal}
        handleDelete={onDel}
        loading={loading}
      />
    </div>
  );
};

export default TravelPackageDetails;
