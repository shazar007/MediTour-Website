import { useEffect, useState } from "react";
import classNames from "classnames";
import commonstyles from "shared/utils/common.module.css";
import styles from "./Insuredperson.module.css";
import { Avatar } from "@mui/material";
import { useLocation } from "react-router-dom";
import { insuranceGETINSURANCEDETAILS } from "shared/services/Insurance";
import "./InsuredpersonFile.css";
import Gender from "assets/images/bi_gender-female (2).png";
import Blood from "assets/images/healthicons_blood-ab-p-outline.png";
import Age from "assets/images/stock-vector-age-icon-design-vector-illustration-arrow-symbol-age-limit-concept-2148368669 1.png";
import Phone from "assets/images/mingcute_birthday-2-line.png";
import Address from "assets/images/mi_location.png";
import CustomLoader from "shared/components/New_Loader/Loader";
import dayjs from "dayjs";
import { RxDownload } from "react-icons/rx";
import { useTranslation } from "react-i18next";
import { FaRegClock } from "react-icons/fa6";

interface insuranceDetails {
  packageName: string;
  perYear: string;
}
export default function InsuredpersonDetail() {
  const { t, i18n }: any = useTranslation();
  const locations = useLocation();
  const { state } = locations;
  const id = state?._id;

  const [detail, setdetail] = useState<any>(null);
  const [insuranceID, setInsuranceID] = useState<insuranceDetails | null>(null);

  const [loading, setLoading] = useState(false);

  const handleImageClick = (url: any) => {
    const a = document.createElement("a");
    a.href = url;
    a.target = "_blank";
    a.download = "Download ";
    a.click();
  };
  const fetchdetails = () => {
    setLoading(true);
    const insuranceId = id || "";
    insuranceGETINSURANCEDETAILS(insuranceId)
      .then((res: any) => {
        setdetail(res?.data?.insured);
        setInsuranceID(res?.data?.insured?.insuranceId);
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchdetails();
  }, []);

  return (
    <>
      {loading ? (
        <CustomLoader />
      ) : (
        <div className={classNames(commonstyles.col12)}>
          <div
            className={
              ["ur", "ar", "ps", "pr"].includes(i18n.language)
                ? commonstyles.pl36
                : commonstyles.pr36
            }
          >
            <div className={classNames(commonstyles.outerContainer)}>
              <div className={classNames(styles.flx, styles.gap12)}>
                <Avatar
                  src={state?.userId?.userImage}
                  className={styles.profile}
                />
                <div>
                  <p className={styles.name}>{state?.userId?.name}</p>
                </div>
              </div>
              <div className={styles.Outers}>
                <p
                  className={classNames(
                    commonstyles.fs14,
                    commonstyles.semiBold,
                    commonstyles.mb24
                  )}
                >
                  {t("basicInformation")}
                </p>
                <div className={styles.wrapper}>
                  {[
                    {
                      img: Gender,
                      label: t("gender"),
                      value: state?.userId?.gender,
                    },
                    {
                      img: Blood,
                      label: t("blood"),
                      value: state?.userId?.bloodGroup,
                    },
                    {
                      img: Age,
                      label: t("age"),
                      value: state?.userId?.dateOfBirth
                        ? dayjs().diff(
                            dayjs(state?.userId?.dateOfBirth, [
                              "YYYY-MM-DD ",
                              "YYYY/MM/DD",
                              "DD-MM-YYYY",
                              "DD/MM/YYYY",
                            ]),
                            "year"
                          ) + `${t("years").toLowerCase()}`
                        : "N/A",
                    },

                    {
                      img: Phone,
                      label: t("phone"),
                      value: state?.userId?.phone,
                    },
                    {
                      img: <FaRegClock color="#7d7d7d" />,
                      label: t("orderAt"),
                      value: state?.userId?.createdAt
                        ? dayjs(state?.userId?.createdAt).format(
                            "DD-MM-YYYY hh:mm A"
                          )
                        : "N/A",
                    },

                    {
                      img: Address,
                      label: t("address"),
                      value: state?.userId?.address?.address,
                    },
                  ].map((item, index) => (
                    <div className={styles.w15} key={index}>
                      <div
                        className={commonstyles.flx}
                        style={{ gap: "8px", alignItems: "start" }}
                      >
                        <FaRegClock color="#7d7d7d" className={styles.Icon} />
                        <div>
                          <p className={styles.tag}>{item.label}</p>
                          <p className={styles.value}>{item.value}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.Outers}>
                <div className={styles.wrapper}>
                  <div className={styles.w20}>
                    <p className={styles.tag}>{t("packageName")}</p>
                  </div>{" "}
                  <div className={styles.w20}>
                    <p className={styles.tag}>{t("packageAmount")}</p>
                  </div>{" "}
                  <div className={styles.w20}>
                    <p className={styles.tag}>{t("packageDuration")}</p>
                  </div>{" "}
                  <div className={styles.w20}>
                    <p className={styles.tag}>
                      {t("insuredPerson")} {t("filePackage")}
                    </p>
                  </div>
                </div>
                <div
                  style={{
                    borderBottom: "0.5px solid #7d7d7d",
                    marginTop: "12px",
                  }}
                ></div>
                <div className={styles.wrapper}>
                  <div className={styles.w20}>
                    <p className={styles.value}>{insuranceID?.packageName}</p>
                  </div>{" "}
                  <div className={styles.w20}>
                    <p className={styles.value}>{detail?.amount}</p>
                  </div>{" "}
                  <div className={styles.w20}>
                    <p className={styles.value}>{insuranceID?.perYear}</p>
                  </div>
                  <div
                    className={styles.w20}
                    style={{
                      marginTop: "8px",
                      display: "flex",
                      gap: "12px",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    <RxDownload
                      color="#FF7631"
                      className="upload-icon"
                      onClick={() => handleImageClick(detail?.insuranceFile)}
                    />
                    <p
                      style={{
                        color: "#FF7631",
                        fontSize: "12px",
                      }}
                    >
                      {t("fileName")}.png
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
