import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import commonstyles from "shared/utils/common.module.css";
import classNames from "classnames";
import { insuranceGetAllIndividualINSURANCE } from "shared/services/Insurance";
import style from "./Myself.module.css";
import { DeleteModal, InputField } from "shared/components";
import File from "assets/images/filePicker.png";
import {
  INSURANCE_FAMILY_Delete,
  INSURANCE_FAMILY_TRAVELER_DELETE,
  INSURANCE_SINGLE_Delete,
} from "shared/services";
import { useTranslation } from "react-i18next";

export default function MyselfDetail() {
  const { t, i18n }: any = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const { state } = useLocation();
  const [isModalVisible, setModalVisible] = useState(false);
  const item = state?.item;
  const type = state?.type;

  const onDel = () => {
    setLoading(true);
    let deletePromise;
    if (type == "family") {
      deletePromise = INSURANCE_FAMILY_Delete(item?._id);
    } else if (type == "parent") {
      deletePromise = INSURANCE_FAMILY_TRAVELER_DELETE(item?._id);
    } else {
      deletePromise = INSURANCE_SINGLE_Delete(item?._id);
    }
    deletePromise
      .then((res: any) => {
        //
        setModalVisible(false);
        if (type == "family") {
          navigate("/insurance/MyFamilyMian");
        } else if (type == "parent") {
          navigate("/insurance/ParentsMian");
        } else {
          navigate("/insurance/MySelfMian");
        }
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  const fetchIndividualInsurances = () => {
    setLoading(true);
    insuranceGetAllIndividualINSURANCE()
      .then((res: any) => {})
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchIndividualInsurances();
  }, []);

  const handleGoBack = () => {
    if (type == "family") {
      navigate("/insurance/MyFamilyMian");
    } else if (type == "parent") {
      navigate("/insurance/ParentsMian");
    } else {
      navigate("/insurance/MySelfMian");
    }
  };

  if (loading) {
    return <div></div>;
  }

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
        <div className={commonstyles.flxBetween}>
          <p className={classNames(commonstyles.fs24, commonstyles.semiBold)}>
            {`${t("health")} / ${t("mySelf")}`} /
            {`${item?.hospitalizationLimit?.startLimit ?? t("notAvailable")}-${
              item?.hospitalizationLimit?.endLimit ?? t("notAvailable")
            }`}
          </p>

          <button
            onClick={() => setModalVisible(true)}
            className={style.Delete}
          >
            {t("delete")}
          </button>
        </div>
        <div className={commonstyles.outerContainer}>
          <img
            alt="PackageLogo"
            src={item?.packageLogo}
            style={{
              height: "140px",
              width: "100%",
              borderRadius: "12px",
            }}
          />
          <p
            className={classNames(
              commonstyles.fs20,
              commonstyles.medium,
              commonstyles.mt24
            )}
          >
            {item?.heading}
          </p>

          <div className={classNames(commonstyles.flx, style.gap24)}>
            <div className={style.col4}>
              <InputField
                placeholder={t("ageCriteria")}
                value={`${t("startAge")}: ${
                  item?.ageCriteria
                    ? item?.ageCriteria?.startAge
                    : item?.spouseAgeCriteria?.startAge
                }, ${t("endAge")}: ${
                  item?.ageCriteria
                    ? item?.ageCriteria?.endAge
                    : item?.spouseAgeCriteria?.endAge
                }`}
              />
            </div>
            <div className={style.col4}>
              <InputField
                placeholder={`${t("selectHospitalizationLimit")} (PKR)`}
                value={`${t("startLimit")}: ${
                  item?.hospitalizationLimit?.startLimit ?? t("notAvailable")
                }, ${t("endLimit")}: ${
                  item?.hospitalizationLimit?.endLimit ?? t("notAvailable")
                }`}
              />
            </div>{" "}
            <div className={style.col4}>
              <InputField
                placeholder={t("hospitalizationPerPerson")}
                value={`${t("startLimit")}: ${
                  item?.hospitalizationLimit?.startLimit || t("notAvailable")
                }, ${t("endLimit")}: ${
                  item?.hospitalizationLimit?.endLimit || t("notAvailable")
                }`}
              />
            </div>
          </div>
          <div className={classNames(commonstyles.flx, style.gap24)}>
            {" "}
            <div className={classNames(style.col4)}>
              <InputField
                placeholder={t("dailyRoom&BoardLimit")}
                value={item?.dailyRoomAndBoardLimit}
              />
            </div>
            <div className={style.col4}>
              <InputField placeholder="ICU / CCU" value={item?.icuCcuLimits} />
            </div>
            <div className={style.col4}>
              <InputField
                placeholder={t("claimPayoutRatio")}
                value={item?.claimPayoutRatio}
              />
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
              {t("hospital")}
            </p>
            <div className={style.flexWrap}>
              {item?.hospitals?.map((hospital: any) => (
                <div className={style.cardss} key={hospital}>
                  <img
                    alt="HospitalLogo"
                    style={{ width: "100%", height: "90px" }}
                    src={hospital?.logo}
                  />
                  <p
                    className={classNames(
                      commonstyles.fs14,
                      commonstyles.semiBold
                    )}
                  >
                    {hospital?.name}
                  </p>
                </div>
              ))}
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
              {t("laboratory")}
            </p>
            <div className={style.flexWrap}>
              {item?.laboratories.map((laboratory: any) => (
                <div className={style.cardss} key={laboratory}>
                  <img
                    alt="LabLogo"
                    style={{ width: "100%", height: "90px" }}
                    src={laboratory?.logo}
                  />
                  <p
                    className={classNames(
                      commonstyles.fs14,
                      commonstyles.semiBold
                    )}
                  >
                    {laboratory?.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <p
            className={classNames(
              commonstyles.fs14,
              commonstyles.medium,
              commonstyles.mt24
            )}
          >
            {t("medicalBenefits")}
          </p>
          <div className={classNames(commonstyles.flx, style.gap24)}>
            <div className={style.col4}>
              <InputField placeholder="ICU / CCU" value={item?.icuCcuLimits} />
            </div>
            <div className={style.col4}>
              <InputField
                placeholder={t("additionalLimitsAccidentalEmergencies")}
                value={item?.accidentalEmergencyLimits}
              />
            </div>
            <div className={style.col4}>
              <InputField
                placeholder={t("ambulanceServicesCoverage")}
                value={item?.ambulanceCoverage}
              />
            </div>
          </div>

          <div className={classNames(commonstyles.flx, style.gap24)}>
            {" "}
            <div className={style.col4}>
              <InputField
                placeholder={t("coverageOfSpecializedInvestigation")}
                value={item?.specializedInvestigationCoverage}
              />
            </div>
            <div className={style.col4}>
              <InputField
                placeholder={t("waitingPeriod")}
                value={item?.waitingPeriod}
              />
            </div>
            <div className={style.col4}>
              <InputField
                placeholder={t("maternity")}
                value={item?.maternity}
              />
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
                {t("policyDocuments")}.pdf
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
                className={classNames(
                  commonstyles.fs14,
                  commonstyles.medium,
                  commonstyles.mt24
                )}
              >
                {t("claimProcess")}.pdf
              </p>
            </div>
          </div>
          <div className={commonstyles.mt24}>
            <p className={classNames(commonstyles.fs14, commonstyles.medium)}>
              {t("moreFeatures")}
            </p>
            <div className={classNames(commonstyles.flx, style.gap24)}>
              <div className={classNames(style.col6)}>
                <InputField
                  placeholder={t("waitingPeriod")}
                  value={item?.waitingPeriod}
                />
              </div>
              <div className={classNames(style.col6)}>
                <InputField
                  placeholder={t("waitingPeriod")}
                  value={item?.waitingPeriod}
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
        title={`${t("package").toLowerCase()}?`}
      />
    </div>
  );
}
