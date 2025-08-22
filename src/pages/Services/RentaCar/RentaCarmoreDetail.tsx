import { useEffect, useState } from "react";
import classNames from "classnames";
import mStyle from "./moreDetail.module.css";
import commonstyles from "shared/utils/common.module.css";
import Footerr from "pages/Home/HomeNavBar/Footer";
import { OtherForm } from "shared/components";
import { useLocation } from "react-router-dom";
import { getSingle_CarDetail } from "shared/services";
import ServiceHeader from "shared/components/ServicesHeaders";
import { useTranslation } from "react-i18next";

const RentaCarmoreDetail = () => {
  const { t }: any = useTranslation();
  const [data, setData] = useState<any>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { state } = useLocation();
  let items = state.items;

  useEffect(() => {
    getSinglecar_Detail();
  }, []);

  useEffect(() => {
    if (data?.vehicleImages?.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === data.vehicleImages.length - 1 ? 0 : prevIndex + 1
        );
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [data?.vehicleImages]);

  const getSinglecar_Detail = () => {
    let params = {
      vehicleId: items?._id,
    };
    getSingle_CarDetail(params)
      .then((res: any) => {
        setData(res?.data?.vehicle);
      })
      .catch((err: any) => { })
      .finally(() => { });
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <div className={classNames(mStyle.maincontainer)}>
        <ServiceHeader
          headingBlue={t("bookNowWith")}
          headingOrange="MediTour"
          desc_width="70%"
          Mirroreffect={true}
        />

        <div className={mStyle.listItem}>
          <span
            className={mStyle.label}
            style={{
              fontSize: "24px",
            }}
          >
            {" "}
            {data?.vehicleName}
          </span>
          <span
            className={mStyle.value}
            style={{
              fontSize: "24px",
            }}
          >
            {" "}
            {`${data?.actualPricePerDay} / ${t("perDay")}`}
          </span>
        </div>
        <div
          className={classNames(
            commonstyles.flx,
            commonstyles.flxBetween,
            commonstyles.flxWrap,
            commonstyles.mb32,
            mStyle.maincardConatiner
          )}
        >
          <div
            className={classNames(
              commonstyles.col6,
              commonstyles.colsm12,
              commonstyles.colmd12,
              mStyle.displayimgcontainer
            )}
          >
            <img
              src={data?.vehicleImages?.[currentIndex]}
              alt="card img"
              className={mStyle.displayimg}
            />
            <div className={mStyle.dotsContainer}>
              {data?.vehicleImages?.map((_: any, index: number) => (
                <span
                  key={index}
                  className={classNames(mStyle.dot, {
                    [mStyle.activeDot]: index === currentIndex,
                  })}
                ></span>
              ))}
            </div>
          </div>
          <div
            className={classNames(
              commonstyles.col6,
              commonstyles.colsm12,
              commonstyles.colmd12
            )}
          >
            <div className={classNames(mStyle.rightcontainer)}>
              <div
                style={{
                  width: "100%",
                }}
              >
                <ul className={mStyle.list}>
                  <li className={mStyle.listItem}>
                    <span className={mStyle.label}>{t("vehicleType")}</span>
                    <span className={mStyle.value}>{data?.vehicleType}</span>
                  </li>
                  <li className={mStyle.listItem}>
                    <span className={mStyle.label}>{`${t("vehicleModel")} ${t(
                      "year"
                    )}`}</span>
                    <span className={mStyle.value}>{data?.vehicleModel}</span>
                  </li>

                  <li className={mStyle.listItem}>
                    <span className={mStyle.label}>{t("vehicleColor")}</span>
                    <span className={mStyle.value}>{data?.vehicleColour}</span>
                  </li>

                  <li className={mStyle.listItem}>
                    <span className={mStyle.label}>{t("registrationNo")}.</span>
                    <span className={mStyle.value}>
                      {data?.vehicleRegisterationNo}
                    </span>
                  </li>
                  <li className={mStyle.listItem}>
                    <span className={mStyle.label}>
                      {`${t("total")} ${t("seats")}`}
                    </span>
                    <span className={mStyle.value}>{data?.passengerSeats}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className={mStyle.bookingbuttoncontainer}>
            {items?.requestSent === true ? (
              <button className={classNames(mStyle.activeButton)}>
                {t("thisVehicalIsAlreadyBooked")}
              </button>
            ) : (
              <div>
                <p className={mStyle.bookingheading}>
                  {" "}
                  {t("enterBookingDetails")}
                </p>
              </div>
            )}
          </div>

          {items?.requestSent !== true && (
            <OtherForm items={items} type="BookNow" />
          )}
        </div>
      </div>

      <Footerr />
    </div>
  );
};

export default RentaCarmoreDetail;
