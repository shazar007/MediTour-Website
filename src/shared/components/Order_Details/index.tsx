import classNames from "classnames";
import commonstyles from "shared/utils/common.module.css";
import Style from "./styles.module.css";
import { useSelector } from "react-redux";
import Medicine_Table from "../Tables/MedicineTable";
import PhysiotheristsEmpty from "../PhsiotheristEmpty";
import { Avatar } from "@mui/material";
import Gender from "assets/images/bi_gender-female (2).png";
import Blood from "assets/images/healthicons_blood-ab-p-outline.png";
import Age from "assets/images/stock-vector-age-icon-design-vector-illustration-arrow-symbol-age-limit-concept-2148368669 1.png";
import Preference from "assets/images/material-symbols_temp-preferences-eco-outline.png";
import Phone from "assets/images/mingcute_birthday-2-line.png";
import Time from "assets/images/Icon Time Lg.png";
import TableNew from "../A_New_Components/Table_new";
import dayjs from "dayjs";
import "dayjs/locale/ur";
import { useTranslation } from "react-i18next";
import { CiLocationOn } from "react-icons/ci";

const Order_Details = (props: any) => {
  const { t, i18n }: any = useTranslation();
  const { data, title, tableData } = props;
  const { systemType } = useSelector((state: any) => state.root.common);
  const isRTL = ["ur", "ar", "ps", "fa"].includes(i18n.language);
  const lang = i18n.language.split("-")[0];
  const formattedDate = data?.createdAt
    ? isRTL
      ? dayjs(data.createdAt).locale(lang).format("DD MMMM YYYY, hh:mm A")
      : dayjs(data.createdAt).format("DD-MM-YYYY hh:mm A")
    : "N/A";

  const resultDetail = [
    t("testCode"),
    t("testName"),
    t("actualPrice"),
    t("discount"),
    t("discountedPrice"),
  ];

  function splitCamelCaseAndCapitalize(str = "") {
    if (!str) return str;
    return str
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/\b\w/g, (match) => match.toUpperCase());
  }

  const formattedPreference = splitCamelCaseAndCapitalize(
    data?.preference || " "
  );
  const handleDownloadReport = (fileUrl: string) => {
    if (!fileUrl) {
      alert(t("noReportsAvailableToDownload"));
      return;
    }

    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = "Lab-Report.pdf"; // You can give a default name
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      className={
        ["ur", "ar", "ps", "pr"].includes(i18n.language)
          ? commonstyles.pl36
          : commonstyles.pr36
      }
    >
      <div
        className={classNames(
          commonstyles.flxBetween,
          commonstyles.flxWrap,
          commonstyles.mb32
        )}
      >
        <div className={classNames(commonstyles.flx)}>
          <p className={Style.heading}>
            {title} {t("details")}
          </p>
        </div>
      </div>

      <div className={Style.TableOuter}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div className={classNames(commonstyles.flx)} style={{ gap: "12px" }}>
            <Avatar
              src={data?.userId?.userImage}
              sx={{ width: 56, height: 56 }}
            />
            <div>
              <p className={Style.name}>{data?.customerName}</p>
              <p className={Style.ID}>MR No: {data?.MR_NO}</p>
            </div>
          </div>
          {title === "Result" && (
            <button
              className={Style.Download}
              onClick={() => handleDownloadReport(data.results)}
            >
              {t("downloadReports")}
            </button>
          )}
        </div>
        <div className={Style.InfoCard}>
          <div className={classNames(commonstyles.flxBetween)}>
            <p className={Style.Subheading}>{t("basicInformation")}</p>
          </div>
          <div className={Style.infoWrapper}>
            {[
              { img: Gender, label: "gender", value: data?.userId?.gender },
              { img: Blood, label: "blood", value: data?.userId?.bloodGroup },
              {
                img: Age,
                label: "age",
                value: data?.userId?.dateOfBirth
                  ? dayjs().diff(
                      dayjs(data.userId.dateOfBirth, [
                        "YYYY-MM-DD ",
                        "YYYY/MM/DD",
                        "DD-MM-YYYY",
                        "DD/MM/YYYY",
                      ]),
                      "year"
                    ) + " years"
                  : "N/A",
              },

              {
                img: Preference,
                label: "preference",
                value: formattedPreference,
              },
              {
                img: Phone,
                label: "phone",
                value: <span dir="ltr">{data?.userId?.phone}</span>,
              },
              {
                img: Time,
                label: "orderAt",
                value: formattedDate,
              },
            ].map((item, index) => (
              <div className={Style.w15} key={index}>
                <div
                  className={commonstyles.flx}
                  style={{ gap: "8px", alignItems: "start" }}
                >
                  <img
                    src={item.img}
                    alt={`${t(item.label)} icon`}
                    className={Style.Icon}
                  />
                  <div>
                    <p className={Style.tag}>{t(item.label)}</p>
                    <p className={Style.value}>{item.value}</p>
                  </div>
                </div>
              </div>
            ))}
            <div className={Style.w40}>
              <div
                className={commonstyles.flx}
                style={{ gap: "8px", alignItems: "start" }}
              >
                <CiLocationOn color="#7d7d7d7" />
                <div>
                  <p className={Style.tag}>{t("address")}</p>
                  <p className={Style.value}>
                    {data?.currentLocation?.address}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className={Style.AllTests}>{t("allTests")}</p>
        <div>
          {systemType === "laboratory" ? (
            data?.items && data?.items.length > 0 ? (
              <TableNew
                titles={resultDetail}
                data={tableData}
                headerWidth="20%"
                itemWidth="20%"
                height="35vh"
              />
            ) : (
              <div>
                <PhysiotheristsEmpty />
              </div>
            )
          ) : data?.medicineIds && data?.medicineIds.length > 0 ? (
            <Medicine_Table data={data?.medicineIds} />
          ) : (
            <div>
              <PhysiotheristsEmpty />
            </div>
          )}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "end",
          }}
        >
          <div>
            <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
              <p className={Style.amountstext}>{t("amount")}</p>
              {["ur", "ar", "ps", "pr"].includes(i18n.language) ? (
                <p className={Style.amountstext}>-/{data?.grandTotal}</p>
              ) : (
                <p className={Style.amountstext}>{data?.grandTotal}/-</p>
              )}
            </div>{" "}
            <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
              <p className={Style.amountstext}>{t("discount")}</p>
              {["ur", "ar", "ps", "pr"].includes(i18n.language) ? (
                <p className={Style.amountstext}>-/{data?.discount}</p>
              ) : (
                <p className={Style.amountstext}>{data?.discount}/-</p>
              )}
            </div>{" "}
            <div
              style={{
                display: "flex",
                gap: "16px",
                alignItems: "center",
                borderTop: "0.5px solid #7d7d7d",
              }}
            >
              <p className={Style.TotalAnountText}>{t("grandTotal")}</p>
              {["ur", "ar", "ps", "pr"].includes(i18n.language) ? (
                <p className={Style.amountstext}>-/{data?.totalAmount}</p>
              ) : (
                <p className={Style.amountstext}>{data?.totalAmount}/-</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order_Details;
