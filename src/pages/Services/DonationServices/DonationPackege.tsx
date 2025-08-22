import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import classNames from "classnames";
import commonstyles from "shared/utils/common.module.css";
import Footerr from "pages/Home/HomeNavBar/Footer";
import dstyle from "./DonationPackeg.module.css";
import { CiLocationOn } from "react-icons/ci";
import { IoMdArrowForward } from "react-icons/io";
import { FcDonate } from "react-icons/fc";
import { getDonation_Package } from "shared/services";
import { useDispatch, useSelector } from "react-redux";
import { setObj } from "shared/redux";
import { IoCloseSharp } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import ServiceHeader from "shared/components/ServicesHeaders";
import { useDirection } from "shared/utils/DirectionContext";
const DonationPackeg = () => {
  const { t }: any = useTranslation();
  const { state } = useLocation();
  const [data, setData] = useState<any>([]);
  const item = state.items;
  const dispatch = useDispatch();
  const [errorDonation, seterrorDonation] = useState<any>("");
  const [showModal, setShowModal] = useState(false);
  const [donateAmount, setdonateAmount] = useState<any>("");
  const { isRtl } = useDirection();
  const { isLoggedIn } = useSelector((state: any) => state.root.common);
  const handleShowMore = () => {
    if (isLoggedIn) {
      setShowModal(true);
    } else {
      navigate("/user/login", {
        state: {
          state: state,
          loginFrom: "donationPackage",
        },
        replace: true,
      });
    }
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  useEffect(() => {
    Packages_Details();
  }, []);
  const Packages_Details = () => {
    let params = {
      packageId: item?._id,
    };
    getDonation_Package(params)
      .then((res: any) => {
        setData(res.data.package);
      })
      .catch((err: any) => {})
      .finally(() => {});
  };
  const navigate = useNavigate();
  const handleContinueClick = () => {
    let isValid = true;

    if (!donateAmount.trim()) {
      seterrorDonation(t("pleaseEnterAmount"));
      isValid = false;
    } else if (donateAmount.trim() === "0") {
      seterrorDonation(t("minimumAmountIs1"));
      isValid = false;
    } else {
      seterrorDonation("");
    }

    if (isValid) {
      dispatch(setObj(item));
      navigate("/services/paymentDetail", {
        state: { actualAmount: donateAmount, serviceName: "donation" },
      });
    }
  };

  return (
    <div>
      <ServiceHeader
        headingBlue={t("GivetheGiftofHealing")}
        headingOrange={t("MakesaDifference")}
        content={t("Yourcontributionhelps_")}
        desc_width="80%"
      />

      <div className={classNames(commonstyles.container, commonstyles.mb32)}>
        <p className={classNames(dstyle.title)}>{t("packageDetails")}</p>
        <div className={dstyle.imagesContainer}>
          {item?.images.map((img: any, index: any) => (
            <img
              key={index}
              src={img}
              alt={`Image ${index + 1}`}
              className={dstyle.image}
            />
          ))}
        </div>
        <div className={classNames(dstyle.textbox, commonstyles.mt8)}>
          <div>
            <img
              className={dstyle.roundimg}
              src={item?.donationId?.logo}
              alt="Donation Logo"
            />
          </div>
          <div>
            <p className={classNames(dstyle.subtitle)}>
              {item?.donationId?.name}
            </p>
            <span
              className={classNames(commonstyles.flx, commonstyles.fs14)}
              style={{ color: "#7d7d7d" }}
            >
              <span>
                <CiLocationOn size={16} />
              </span>
              <span> {`${item?.donationId?.location?.address}`}</span>
            </span>
          </div>
        </div>
        <div className={commonstyles.mt24}>
          <p className={dstyle.subtitle}>{item?.donationTitle}</p>
          <p>
            <span
              className={classNames(commonstyles.fs14)}
              style={{ color: "#131313" }}
            >
              {t("targetAudience")}:{" "}
            </span>
            <span
              className={classNames(commonstyles.fs12)}
              style={{ color: "#7d7d7d" }}
            >
              {data?.targetAudience}
            </span>
          </p>
          <p>
            <span
              className={classNames(commonstyles.fs14, commonstyles.colorBlue)}
              style={{ color: "#131313" }}
            >
              {t("amount")}:{" "}
            </span>
            <span
              className={classNames(commonstyles.fs12)}
              style={{ color: "#7d7d7d" }}
            >
              {data?.requiredAmount}
            </span>
          </p>
          <p>
            <span
              className={classNames(commonstyles.fs14, commonstyles.colorBlue)}
              style={{ color: "#131313" }}
            >
              {t("days")}:{" "}
            </span>
            <span
              className={classNames(commonstyles.fs12)}
              style={{ color: "#7d7d7d" }}
            >
              {data?.totalDays}
            </span>
          </p>
        </div>

        <div>
          <p className={dstyle.subtitle}>{t("description")}</p>
          <p
            className={classNames(commonstyles.fs12)}
            style={{ color: "#7d7d7d" }}
          >
            {data?.description}
          </p>
        </div>
        <div
          className={dstyle.showMoreContainer}
          style={{
            marginBottom: "32px",
          }}
        >
          <button
            onClick={handleShowMore}
            className={dstyle.showMoreButton}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
            }}
          >
            {t("donate")}
            <span
              className={dstyle.icon}
              style={
                isRtl
                  ? {
                      fontSize: "16px",
                      transform: "rotate(180deg)",
                    }
                  : {
                      fontSize: "16px",
                    }
              }
            >
              <IoMdArrowForward />
            </span>
          </button>
        </div>

        {showModal && (
          <div className={classNames(dstyle.modal)}>
            <div className={classNames(dstyle.modalContent)}>
              <div
                style={{
                  marginLeft: "auto",
                }}
              >
                <IoCloseSharp
                  className={classNames(dstyle.modalCloseButton)}
                  onClick={handleCloseModal}
                  style={{
                    color: "#7d7d7d",
                    fontSize: "20px",
                    cursor: "pointer",
                  }}
                >
                  {t("close")}
                </IoCloseSharp>
              </div>

              <div
                className={classNames(commonstyles.fs16, commonstyles.semiBold)}
                style={{
                  marginBottom: "10px",
                }}
              >
                <p>{t("pleaseEnterAmount")}</p>
                <span
                  style={{
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  {t("toDonate")}!.
                </span>
              </div>

              <FcDonate className={classNames(dstyle.donateicon)} />
              <div className={classNames(dstyle.inputarea)}>
                <input
                  placeholder={t("enterAmount")}
                  className={dstyle.amount}
                  value={donateAmount}
                  type="text"
                  style={{ width: "200px" }}
                  onChange={(text: any) => setdonateAmount(text.target.value)}
                />

                <span
                  className={classNames(
                    commonstyles.fs12,
                    commonstyles.colorBlue
                  )}
                >
                  PKR
                </span>
              </div>
              {errorDonation ? (
                <div className={classNames(commonstyles.error)}>
                  *{errorDonation}
                </div>
              ) : null}
              <div
                className={dstyle.showMoreContainer}
                style={{
                  margin: "10px 0",
                }}
              >
                <button
                  onClick={() => {
                    handleShowMore();
                    handleContinueClick();
                  }}
                  className={dstyle.showMoreButton}
                >
                  {t("continue")}
                  <span
                    className={dstyle.icon}
                    style={
                      isRtl
                        ? {
                            transform: "rotate(180deg)",
                          }
                        : {}
                    }
                  >
                    <IoMdArrowForward />
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footerr />
    </div>
  );
};

export default DonationPackeg;
