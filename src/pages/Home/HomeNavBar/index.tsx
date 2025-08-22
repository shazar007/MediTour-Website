import { lazy, Suspense, useEffect } from "react";
import styles from "./homeNavBar.module.css";
import commonstyles from "shared/utils/common.module.css";
import classNames from "classnames";
import FAQ from "assets/images/FAQSImg.webp";
import cosmetic from "assets/images/Treaments/CosmeticandPlasticSurgery.webp";
import Aesthetic from "assets/images/Treaments/Aesthetic.webp";
import Hair from "assets/images/Treaments/HairTransplant.webp";
import StemCell from "assets/images/Treaments/STEMCell.webp";
import Fertility from "assets/images/Treaments/Fertility.webp";
import BariatricSurgery from "assets/images/Treaments/BariatricSurgery.webp";
import Erectile from "assets/images/Treaments/ErectileDysfunction.webp";
import GenderSelection from "assets/images/Treaments/GenderSelection.webp";
import DentalIcon from "assets/images/Treaments/DentalIcon.webp";
import Cardio from "assets/images/Treaments/Cardio.webp";
import Ortho from "assets/images/Treaments/Ortho.webp";
import Organ from "assets/images/Treaments/Organ.webp";
import { useNavigate } from "react-router-dom";
import medi1 from "assets/images/medi.webp";
import medi2 from "assets/images/medi2.webp";
import Laptop from "assets/images/Laptop.webp";
import { IoArrowForwardCircleSharp } from "react-icons/io5";
import { IoMdArrowRoundForward } from "react-icons/io";
import { cardData, logos_data, treatmentsData } from "shared/utils";

import { useTranslation } from "react-i18next";
import { useDirection } from "shared/utils/DirectionContext";
import CustomLoader from "shared/components/New_Loader/Loader";

const HomeMianSlider = lazy(() => import("./MainSlider/index"));
const FAQS = lazy(() => import("shared/components/FAQs"));
const Footerr = lazy(() => import("./Footer"));
const ContactUs = lazy(() => import("./ContactUs"));
const LogoSlider = lazy(
  () => import("shared/components/A_New_Components/LogoSlider")
);
const TourismSlider = lazy(
  () => import("shared/components/A_New_Components/TourismSlider")
);
const TopTreatment = lazy(() => import("./HomeSlider/TopTreatments"));

const HomePage = () => {
  const { t }: any = useTranslation();
  const { isRtl } = useDirection();

  const navigate = useNavigate();

  const handleGoAboutUs = () => {
    navigate("/ExploreAll");
  };

  const HandleGoFAQS = () => {
    navigate("/FAQs");
  };

  const handleGoDetails = (title: any, ind: number) => {
    treatmentsData?.map((item: any, index: any) => {
      if (item?.mainTitle === title) {
        navigate("/treatment/Details", {
          state: {
            item: item?.list[ind],
            list: item.list,
            mainIndex: index,
            mainTitle: item.mainTitle,
            type: "main speciality",
            description: item?.description,
          },
        });
      }
    });
  };

  const treatmentData = [
    {
      id: 0,
      title: t("asthetic"),
      indexes: 0,
      img: Aesthetic,
      itemTitle: "AESTHETIC TREATMENTS",
    },
    {
      id: 1,
      title: t("bariatricSurgery"),
      indexes: 0,

      img: BariatricSurgery,
      itemTitle: "BARIATRIC SURGERY",
    },
    {
      id: 2,
      title: t("cardiology"),
      img: Cardio,
      itemTitle: "CARDIOVASCULAR & METABOLIC",
      indexes: 0,
    },
    {
      id: 3,
      title: t("cosmeticAndSurgery"),
      indexes: 0,
      img: cosmetic,
      itemTitle: "COSMETIC SURGERY",
    },
    {
      id: 4,
      title: t("dental"),
      img: DentalIcon,
      itemTitle: "DENTAL",
      indexes: 0,
    },
    {
      id: 5,
      title: t("erectileDysfunction"),
      img: Erectile,
      indexes: 0,
      itemTitle: "STEM CELL",
    },
    {
      id: 6,
      title: t("fertility"),
      img: Fertility,
      itemTitle: "FERTILITY",
      indexes: 4,
    },
    {
      id: 7,
      title: t("genderSelection"),
      img: GenderSelection,
      itemTitle: "FERTILITY",
      indexes: 4,
    },
    {
      id: 8,
      title: t("hairTransplant"),
      img: Hair,
      itemTitle: "TRANSPLANTS",
      indexes: 3,
    },
    {
      id: 9,
      title: t("orthopedic"),
      img: Ortho,
      itemTitle: "ORTHOPEDICS",
      indexes: 0,
    },
    {
      id: 10,
      title: t("organTransplant"),
      img: Organ,
      itemTitle: "TRANSPLANTS",
      indexes: 0,
    },
    {
      id: 11,
      title: t("stemCell"),
      img: StemCell,
      itemTitle: "STEM CELL",
      indexes: 0,
    },
  ];
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className={classNames(styles.mainouter)}>
      {" "}
      <Suspense
        fallback={
          <div>
            <CustomLoader />
          </div>
        }
      >
        <HomeMianSlider />
      </Suspense>
      <div className={styles.TreatmentContainer}>
        <div className={styles.medicalCardsOuter}>
          {treatmentData?.map((i: any, index: number) => (
            <div
              key={index}
              className={classNames(styles.medicalCard)}
              onClick={() => handleGoDetails(i?.itemTitle, i?.indexes)}
            >
              <img
                alt={`treatmentData ${index + 1}`}
                src={i?.img}
                className={styles.medicalIcons}
                loading="lazy"
              />
              <p
                className={classNames(
                  styles.mt16,
                  styles.itemTitle,
                  styles.textCenter
                )}
                style={
                  isRtl
                    ? {
                        lineHeight: "22px",
                      }
                    : undefined
                }
              >
                {i?.title}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className={classNames(styles.TourismPakContainer)}>
        <div className={styles.sliderMiancontainer}>
          <Suspense fallback={<div>Loading...</div>}>
            <TourismSlider />
          </Suspense>
        </div>
        <div className={styles.TourismTextContainer} style={{ flexGrow: 1 }}>
          <h1
            style={
              isRtl
                ? {
                    textAlign: "start",
                  }
                : undefined
            }
          >
            <span
              className={styles.tourtext}
              style={
                isRtl
                  ? {
                      letterSpacing: "0",
                      textAlign: "start",
                      lineHeight: "1.5",
                    }
                  : undefined
              }
            >
              {t("medical")}
            </span>{" "}
            <span
              className={styles.pakistantext}
              style={
                isRtl
                  ? {
                      letterSpacing: "0",
                      textAlign: "start",
                    }
                  : undefined
              }
            >
              {t("tourism")}
            </span>
          </h1>

          <p
            className={styles.tourparagraph}
            style={{ lineHeight: isRtl ? "28px" : "" }}
          >
            {t("tourismContent")}
          </p>
          <button className={styles.WhyPakistan} onClick={handleGoAboutUs}>
            <span>{t("explore")}</span>
            <div className={styles.iconOuter}>
              <IoMdArrowRoundForward
                className={styles.Iconm2}
                style={isRtl ? { transform: "rotate(-180deg)" } : undefined}
              />
            </div>
          </button>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          width: "100%",
          marginTop: "-56px",
          margin: "96px 0",
        }}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <LogoSlider clientsContent={logos_data} />
        </Suspense>
      </div>
      <div>
        <div>
          <p
            className={classNames(
              commonstyles.fs32,
              commonstyles.semiBold,
              styles.textcenter
            )}
          >
            <span className={styles.colorBlue}>{t("top")} </span>
            <span className={styles.colororange}>{t("treatments")}</span>
          </p>
          <div className={styles.center}>
            <p
              className={classNames(
                styles.whychoose,
                commonstyles.col10,
                commonstyles.colsm12,
                styles.mxsm20
              )}
            >
              {t("topTreatmentContent")}
            </p>
          </div>
        </div>
        <div style={{ marginTop: "50px" }}>
          <Suspense fallback={<div>Loading...</div>}>
            <TopTreatment />
          </Suspense>
        </div>
      </div>
      <div className={styles.peopleContainer22}>
        <p
          className={classNames(
            commonstyles.fs32,
            commonstyles.semiBold,
            commonstyles.mb24
          )}
          style={{
            textAlign: "center",
            marginTop: "80px",
          }}
        >
          <span className={styles.colorBlue}>{t("whyPeople")} </span>
          <span className={styles.colororange}>{t("chooseUs")}</span>
        </p>
        <p className={classNames(styles.whychoose, styles.mt8)}>
          {t("whyPeopleContent")}
        </p>

        <div className={classNames(styles.flxBetween, commonstyles.mt56)}>
          {cardData.map((item, index) => {
            const isLast = index === cardData.length - 1;

            return (
              <div
                key={index}
                className={classNames(
                  isLast ? styles.PeoplesCard : styles.PeoplesCardDots,
                  !isLast && (isRtl ? styles.borderLeft : styles.borderRight)
                )}
              >
                <p
                  className={classNames(
                    commonstyles.fs32,
                    commonstyles.semiBold,
                    styles.colororange
                  )}
                >
                  {item.value}
                </p>
                <p
                  className={classNames(
                    commonstyles.fs16,
                    commonstyles.medium,
                    styles.mt8
                  )}
                >
                  {t(item.labelKey)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.peopleContainer} style={{ marginTop: "80px" }}>
        <div className={styles.Frequently}>
          <p className={classNames(commonstyles.fs32, commonstyles.semiBold)}>
            <span className={styles.colorBlue}>{t("frequently")} </span>
            <span className={styles.colororange}> {t("askedQuestion")}</span>
          </p>
        </div>
        <div className={styles.flxxcenter}>
          <p
            className={classNames(
              styles.tourparagraph,
              styles.mt24,
              commonstyles.col8,
              commonstyles.colsm12,
              commonstyles.colmd12
            )}
            style={{ textAlign: "center" }}
          >
            {t("askedContent")}
          </p>
        </div>
        <div className={classNames(styles.flxFAQ, commonstyles.mt56)}>
          <div
            className={classNames(
              commonstyles.col6,
              commonstyles.colsm12,
              commonstyles.colmd12,
              styles.wmdd100
            )}
          >
            <img alt="FAQ" src={FAQ} className={styles.FAQIMG} />
          </div>{" "}
          <div
            className={classNames(
              commonstyles.col6,
              commonstyles.colsm12,
              commonstyles.colmd12,
              styles.wmdd100
            )}
          >
            <Suspense fallback={<div>Loading...</div>}>
              <FAQS />
            </Suspense>
            <button className={styles.About} onClick={HandleGoFAQS}>
              {" "}
              <p>{t("seeAll")}..</p>
              <IoArrowForwardCircleSharp
                className={styles.Iconnns}
                style={isRtl ? { transform: "rotate(-180deg)" } : undefined}
              />
            </button>
          </div>
        </div>
      </div>{" "}
      <div className={styles.bgcolor}>
        <Suspense fallback={<div>Loading...</div>}>
          <ContactUs />
        </Suspense>
        <div>
          <div
            className={classNames(
              styles.flxBetween,
              styles.mt100,
              styles.textsmCenter
            )}
            style={{ alignItems: "center" }}
          >
            <div
              className={classNames(
                commonstyles.col5,
                commonstyles.colmd12,
                commonstyles.colsm12
              )}
            >
              <p className={classNames(styles.allViewtext)}>
                <span className={styles.colorBlue}>{t("weAreOn")}</span>
                <span className={classNames(styles.colororange)}>
                  {" "}
                  {t("allView")}
                </span>
              </p>
              <p
                className={classNames(
                  styles.mt24,
                  styles.whychoose22,
                  styles.allViewtext
                )}
              >
                {t("weAreOnAllViewContent")}
              </p>
              <div
                className={classNames(
                  commonstyles.flxBetween,
                  commonstyles.col10,
                  commonstyles.colsm12,
                  commonstyles.mt56
                )}
              >
                <a
                  href="https://play.google.com/store/apps/details?id=com.meditourapp&hl=en_US"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.mediBox}
                >
                  <img alt="medi1" src={medi1} className={styles.medi} />
                  <p className={commonstyles.fs16}>MediTour</p>
                </a>
                <a
                  href="https://apps.apple.com/us/app/meditour-global/id6738271103"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.mediBox}
                >
                  <img alt="medi2" src={medi2} className={styles.medi} />
                  <p className={commonstyles.fs16}>MediTour</p>
                </a>
              </div>
            </div>
            <div
              className={classNames(
                commonstyles.col5,
                commonstyles.colmd12,
                commonstyles.colsm12
              )}
            >
              <img alt="Laptop" src={Laptop} className={styles.Laptop} />
            </div>
          </div>
        </div>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <Footerr />
      </Suspense>
    </div>
  );
};

export default HomePage;
