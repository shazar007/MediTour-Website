import { useEffect, useState } from "react";
import classNames from "classnames";
import commonstyles from "shared/utils/common.module.css";
import style from "./InsuranceBB.module.css";
import { CustomModal, PrimaryButton, RingLoader } from "shared/components";
import {
  insuranceAcceptRequest,
  insuranceSingleREQUEST,
} from "shared/services/Insurance";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ImgPicker from "shared/components/Img-picker";
import { setInsuranceRequestFlag } from "shared/redux";
import { useDispatch } from "react-redux";
import Downloader from "shared/components/Downloader";
import { useTranslation } from "react-i18next";

export default function RequestDetail() {
  const { t, i18n }: any = useTranslation();
  const [loading, setLoading] = useState(false);
  const { state } = useLocation();

  const id = state?.selectedItem?._id;
  const [error, setError] = useState("");
  const [data, setData] = useState<any>([]);
  const [url, setURL] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchRequestDetails = () => {
    let requestId = state?.selectedItem?._id;
    insuranceSingleREQUEST(requestId)
      .then((res: any) => {
        setData(res?.data?.request);
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  const handleimageURL = (url: any) => {
    setURL(url);
    setError("");
  };
  const RequestAccepted = () => {
    setModalVisible(false);
    setLoading(true);
    let params = {
      requestId: id,
      insuranceFile: url,
    };
    insuranceAcceptRequest(params)
      .then((res: any) => {
        navigate("/insurance/request");
        dispatch(setInsuranceRequestFlag(true));
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  const handleModalOpen = () => {
    if (id === undefined && url === undefined) {
      console.error("ID is undefined");
      return;
    }
    if (id && url) {
      setModalVisible(true);
    } else {
      setError(t("pleaseAddInsuranceFile"));
    }
  };

  useEffect(() => {
    fetchRequestDetails();
  }, [url]);

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
        <p className={classNames(commonstyles.fs24, commonstyles.semiBold)}>
          {t("requestDetails")}
        </p>
        <div className={classNames(commonstyles.outerContainer)}>
          <div className={classNames(commonstyles.flx)} style={{ gap: "8px" }}>
            <p className={classNames(commonstyles.fs16, commonstyles.semiBold)}>
              {data?.userId?.name}
            </p>{" "}
            <p className={style.title} style={{ color: "#0E54A3" }}>
              {data?.userId?.mrNo}{" "}
            </p>
          </div>
          <div className={style.DetailCard}>
            <div className={classNames(commonstyles.flxBetween)}>
              <div className={style.w20}>
                <p className={style.title}>{t("email")} </p>
              </div>{" "}
              <div className={style.w20}>
                <p className={style.title}>{t("phoneNumber")} </p>
              </div>{" "}
              <div className={style.w20}>
                {" "}
                <p className={style.title}>{t("location")} </p>
              </div>{" "}
              <div className={style.w20}>
                {" "}
                <p className={style.title}>{t("gender")}</p>
              </div>{" "}
              <div className={style.w20}>
                {" "}
                <p className={style.title}>{t("CNICFile")} </p>
              </div>
            </div>{" "}
            <div
              style={{ borderBottom: "0.5px solid #7d7d7d", margin: "6px 0" }}
            ></div>
            <div className={classNames(commonstyles.flxBetween)}>
              <div className={style.w20}>
                <p className={style.values}>{data?.userId?.email}</p>
              </div>{" "}
              <div className={style.w20}>
                <p className={style.values}>{data?.userId?.phone}</p>
              </div>{" "}
              <div className={style.w20}>
                <p className={style.values}>{data?.userId?.address?.address}</p>
              </div>
              <div className={style.w20}>
                <p className={style.values}>{data?.userId?.gender}</p>
              </div>{" "}
              <div className={style.w20}>
                <p className={style.values}>
                  {" "}
                  <Downloader link={""} />
                </p>
              </div>{" "}
            </div>{" "}
          </div>
          <p
            className={classNames(
              commonstyles.fs16,
              commonstyles.semiBold,
              style.mt24
            )}
          >
            {t("packageDetails")}
          </p>
          <div
            className={classNames(style.DetailCard, commonstyles.flxBetween)}
          >
            <div className={classNames(commonstyles.col4)}>
              <div
                className={classNames(commonstyles.fs12, commonstyles.medium)}
              >
                <p className={style.colorBlack}>{t("packageName")}</p>
                <p>{data?.insuranceId?.packageName}</p>
              </div>
              <div
                className={classNames(
                  commonstyles.fs12,
                  commonstyles.medium,
                  style.mt24
                )}
              >
                <p className={style.colorBlack}>{t("medicalBenifits")}</p>
                <p>
                  ICCU {t("limits")}-{data?.insuranceId?.icuCcuLimits}{" "}
                  {t("accidentalEmergencyLimits")}-
                  {data?.insuranceId?.accidentalEmergencyLimits}{" "}
                  {t("ambulanceCoverage")}-
                  {data?.insuranceId?.ambulanceCoverage} {t("waitingPeriod")}-
                  {data?.insuranceId?.waitingPeriod}{" "}
                </p>
              </div>
              <div
                className={classNames(
                  commonstyles.fs12,
                  style.mt24,
                  commonstyles.medium
                )}
              >
                <p className={style.colorBlack}>{t("pricePerYear")}</p>
                <p> {data?.insuranceId?.perYear}/-</p>
              </div>
            </div>

            <div className={classNames(commonstyles.col5)}>
              <div
                className={classNames(commonstyles.fs12, commonstyles.medium)}
              >
                <p className={style.colorBlack}>{t("packageDescription")}</p>
                <p>{data?.insuranceId?.description}</p>
              </div>
              <div
                className={classNames(
                  commonstyles.fs12,
                  style.mt24,
                  commonstyles.medium
                )}
              >
                <p className={style.colorBlack}>{t("policyDocuments")}</p>
                <p>{t("policyDocumentName")} </p>
              </div>
              <div
                className={classNames(
                  commonstyles.fs12,
                  style.mt24,
                  commonstyles.medium
                )}
              >
                <p className={style.colorBlack}> {t("moreFeatures")}</p>
                <p>
                  {t("heading")}- {data?.insuranceId?.heading} <br />{" "}
                  {t("description")}- {data?.insuranceId?.description}
                </p>
              </div>
            </div>
          </div>
          <div>
            <p
              className={classNames(
                commonstyles.fs16,
                commonstyles.semiBold,
                style.mt24
              )}
            >
              {t("insuredPersonFile")}
            </p>
            <p
              className={classNames(commonstyles.fs12, commonstyles.semiBold)}
              style={{ color: "#7d7d7d" }}
            >
              {t("toProceedPleasUpload_")}
            </p>
          </div>
          <div className={style.filecard2}>
            <ImgPicker
              placeholder={t("selectFiles")}
              setData={handleimageURL}
            />
          </div>
          {error && <div style={{ color: "red" }}>*{error}</div>}
          <div style={{ width: "204px", margin: "56px 0 24px 0" }}>
            <PrimaryButton
              disabled={loading}
              children={
                loading ? <RingLoader color={"#fff"} size={35} /> : t("share")
              }
              colorType={"New_blue"}
              onClick={handleModalOpen}
            />
          </div>

          <CustomModal showModal={modalVisible}>
            <div className={style.modalContent}>
              <p>Are you sure?</p>
              <p>you want to share this file</p>
              <div className={style.modalActions}>
                <button
                  className={style.cancelButton}
                  onClick={() => setModalVisible(false)}
                >
                  No
                </button>
                <button
                  className={style.acceptButton}
                  onClick={RequestAccepted}
                >
                  Yes
                </button>
              </div>
            </div>
          </CustomModal>
        </div>
      </div>
    </div>
  );
}
