import Carousel from "react-multi-carousel";
import classNames from "classnames";
import "react-multi-carousel/lib/styles.css";
import style from "./homeslider.module.css";
import FERTILITY from "assets/SliderTreamnets/Fertility.webp";
import STEMCELL from "assets/SliderTreamnets/Stemcell.webp";
import COSMETICSURGERY from "assets/SliderTreamnets/COSMETICSURGERY.webp";
import BARIATRICSURGERY from "assets/SliderTreamnets/BARIATRIC SURGERY.webp";
import Hair from "assets/SliderTreamnets/TRANSPLANTS.webp";
import AESTHETICTREATMENTS from "assets/SliderTreamnets/AESTHETICTREATMENTS.webp";
import CARDIOVASCULARMATABOLIC from "assets/SliderTreamnets/CARDIOVASCULARMATABOLIC.webp";
import ORTHOPEDICS from "assets/SliderTreamnets/ORTHOPEDICS.webp";
import GYNECOLOGISTS from "assets/SliderTreamnets/GYNECOLOGISTS.webp";
import CANCER from "assets/SliderTreamnets/cancer.webp";
import DENTAL from "assets/SliderTreamnets/DENTAL.webp";
import OPTHALMOLOGY from "assets/SliderTreamnets/OPTHALMOLOGY.webp";
import LUNGS from "assets/SliderTreamnets/Lungs.webp";
import PEDIATRICS from "assets/SliderTreamnets/PEDIATRICS.webp";
import PSYCHIATRY from "assets/SliderTreamnets/PSYCHIATRY.webp";
import UROLOGY from "assets/SliderTreamnets/UROLOGY.webp";
import ENT from "assets/SliderTreamnets/ENT.webp";
import { useTranslation } from "react-i18next";

const responsive = {
  lgdesktop: {
    breakpoint: { max: 3000, min: 1441 },
    items: 4,
    slidesToSlide: 1,
  },
  desktop: {
    breakpoint: { max: 1440, min: 1041 },
    items: 4,
    slidesToSlide: 1,
  },
  Laptop: {
    breakpoint: { max: 1040, min: 769 },
    items: 4,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 768, min: 481 },
    items: 2,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 480, min: 320 },
    items: 1,
    slidesToSlide: 1,
  },
};

const TopTreatment = () => {
  const { t }: any = useTranslation();

  const sliderItems = [
    {
      imageUrl: STEMCELL,
      Heading: t("stemCell").toUpperCase(),
    },
    {
      imageUrl: FERTILITY,
      Heading: t("fertility").toUpperCase(),
    },
    {
      imageUrl: COSMETICSURGERY,
      Heading: t("cosmeticSurgery").toUpperCase(),
    },
    {
      imageUrl: BARIATRICSURGERY,
      Heading: t("bariatricSurgery").toUpperCase(),
    },
    {
      imageUrl: Hair,
      Heading: t("hairTransplant").toUpperCase(),
    },
    {
      imageUrl: AESTHETICTREATMENTS,
      Heading: `${t("asthetic").toUpperCase()} ${t(
        "treatments"
      ).toUpperCase()}`,
    },
    {
      imageUrl: CARDIOVASCULARMATABOLIC,
      Heading: t("cardioAndMetaolic").toUpperCase(),
    },
    {
      imageUrl: ORTHOPEDICS,
      Heading: t("orthopedic").toUpperCase(),
    },
    {
      imageUrl: GYNECOLOGISTS,
      Heading: t("Gynecologist").toUpperCase(),
    },
    {
      imageUrl: CANCER,
      Heading: t("cancer").toUpperCase(),
    },
    {
      imageUrl: DENTAL,
      Heading: t("dental").toUpperCase(),
    },
    {
      imageUrl: OPTHALMOLOGY,
      Heading: t("ophthalmology").toUpperCase(),
    },
    {
      imageUrl: LUNGS,
      Heading: t("lungs").toUpperCase(),
    },
    {
      imageUrl: PEDIATRICS,
      Heading: t("pediatric").toUpperCase(),
    },
    {
      imageUrl: PSYCHIATRY,
      Heading: t("psychiatry").toUpperCase(),
    },
    {
      imageUrl: UROLOGY,
      Heading: t("urology").toUpperCase(),
    },
    {
      imageUrl: ENT,
      Heading: t("ent").toUpperCase(),
    },
  ];
  return (
    <div className="parent">
      <Carousel
        responsive={responsive}
        autoPlay={true}
        swipeable={true}
        draggable={true}
        centerMode={true}
        showDots={false}
        infinite={true}
        dotListClass="custom-dot-list-style"
      >
        {sliderItems.map((item, index) => (
          <div className={style.slider} key={index}>
            <img
              src={item.imageUrl}
              alt={`sliderItems1 ${index + 1}`}
              className={style.imgs}
            />
            <div className={classNames(style.headingouter)}>
              <p className={classNames(style.heading)}>{item.Heading}</p>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default TopTreatment;
