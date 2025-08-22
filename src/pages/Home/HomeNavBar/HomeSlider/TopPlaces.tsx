import Carousel from "react-multi-carousel";
import classNames from "classnames";
import "react-multi-carousel/lib/styles.css";
import style from "./homeslider.module.css";
import SWAT from "assets/images/Sawat.jpg";
import HUNZA from "assets/images/hunza.jpg";
import SKARDU from "assets/images/skardu.jpg";
import UMBRELLA from "assets/images/umbrella.jpg";
import NATHIA from "assets/images/nathiaGali.jpg";
import SALT from "assets/images/slat.jpg";
import FAIRY from "assets/images/fairyMedows.jpg";
import GILGIT from "assets/images/gilgit.png";
import PishinValley from "assets/images/Pishin-Valley-Balochistan.jpg";

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

const sliderItems = [
  {
    imageUrl: SWAT,
    Heading: "SWAT VALLEY",
    text: "Lorem Ipsum is simply dummy text of the printing an...",
  },
  {
    imageUrl: HUNZA,
    Heading: "HUNZA VALLEY",
    text: "Lorem Ipsum is simply dummy text of the printing an...",
  },
  {
    imageUrl: SKARDU,
    Heading: "SKARDU",
    text: "Lorem Ipsum is simply dummy text of the printing an...",
  },
  {
    imageUrl: UMBRELLA,
    Heading: "UMBRELLA WATERFALL",
    text: "Lorem Ipsum is simply dummy text of the printing an...",
  },
  {
    imageUrl: NATHIA,
    Heading: "NATHIA GALI",
    text: "Lorem Ipsum is simply dummy text of the printing an...",
  },
  {
    imageUrl: SALT,
    Heading: "KHEWRA - SALT MINE",
    text: "Lorem Ipsum is simply dummy text of the printing an...",
  },
  {
    imageUrl: FAIRY,
    Heading: "FAIRY MEADOWS ",
    text: "Lorem Ipsum is simply dummy text of the printing an...",
  },
  {
    imageUrl: GILGIT,
    Heading: "GILGIT BALTISTAN",
    text: "Lorem Ipsum is simply dummy text of the printing an...",
  },
  {
    imageUrl: PishinValley,
    Heading: "Pishin Valley",
    text: "Lorem Ipsum is simply dummy text of the printing an...",
  },
];

const TopPlaces = () => {
  return (
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
            alt={`sliderItems ${index + 1}`}
            className={style.imgs}
          />
          <div className={classNames(style.headingouter)}>
            <p className={classNames(style.heading)}>{item.Heading}</p>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default TopPlaces;
