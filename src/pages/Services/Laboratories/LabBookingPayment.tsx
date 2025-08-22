import { useState } from "react";
import Footerr from "pages/Home/HomeNavBar/Footer";
import style from "./LabPayment.module.css";
import classNames from "classnames";
import { useLocation } from "react-router-dom";
import cardbranch from "assets/images/labcardzBranches.png";
import LabBookingForm from "./LabBookingform";
import { useTranslation } from "react-i18next";
import { FaRegClock } from "react-icons/fa6";

const LabBookingPayment = () => {
  const { t }: any = useTranslation();
  const { state } = useLocation();

  const [selectedPreference, setSelectedPreference] = useState(
    state.selectedPreference || ""
  );

  let lab = state.LabData;
  let Tests = state?.selectedItems;
  const totalAmount = Tests.reduce(
    (sum: number, item: any) => sum + Number(item.userAmount),
    0
  );

  return (
    <>
      <div className={classNames(style.maincontainer)}>
        <div className={style.cardWrapper}>
          <div className={classNames(style.cardboady)}>
            <div className={style.cardImageContainer}>
              <img src={lab?.logo} alt="LabLogo" className={style.cardImage} />
            </div>

            <div className={style.carddatacolumn}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <p className={style.cardname}>{lab?.name}</p>
                <p className={style.phc}>PHC {t("verified")}</p>
              </div>

              <div className={classNames(style.datadetails)}>
                <div className={style.datadetailsrow}>
                  <FaRegClock color="#7d7d7d" className={style.cardIcon} />

                  <p className={style.cardicontext}>24/7</p>
                </div>

                <div className={style.datadetailsrow}>
                  <img
                    src={cardbranch}
                    alt="BranchLab"
                    className={style.cardIcon}
                  />

                  <p className={style.cardicontext}>
                    {state?.LabData?.subLabs?.length || "0"} {t("branches")}
                  </p>
                </div>
              </div>

              <div className={style.detailbottom}>
                <div>
                  <div className={style.bottomtext}>
                    <span>{state?.LabData?.tests?.length || "0"}</span>
                    <span> {t("test")}</span>
                  </div>

                  <div className={style.cardicontext}>{t("total")}</div>
                </div>
              </div>
            </div>

            <div className={style.secoundcolumn}>
              <div className={style.cardsperator}></div>

              <div className={style.secoundcolumncontent}>
                <p className={style.description}>{t("testDetails")}</p>

                <div className={style.testListContainer}>
                  {Tests.map((item: any, index: number) => (
                    <div className={style.testItem} key={index}>
                      <ul className={style.bulletWrapper}>
                        <li className={style.bulletItem}>
                          {item?.testNameId?.name}
                        </li>
                      </ul>
                      <button className={style.pricebutton}>
                        {item?.userAmount}
                      </button>
                    </div>
                  ))}
                </div>

                <div className={style.cardsfooter}>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: "16px",
                    }}
                  >
                    <p className={style.totaltext}>{t("total")}</p>
                    <p className={style.totalvalue}>Rs: {totalAmount}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            marginTop: "16px",
          }}
        >
          <LabBookingForm
            selectedPreference={selectedPreference}
            actualAmount={totalAmount}
            serviceName={"Lab"}
            labId={lab?._id}
          />
        </div>
      </div>

      <Footerr />
    </>
  );
};

export default LabBookingPayment;
