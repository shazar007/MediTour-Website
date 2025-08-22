import { useEffect, useState } from "react";
import commonstyles from "shared/utils/common.module.css";
import classNames from "classnames";
import hstyle from "./Hotel.module.css";
import sliderimg1 from "assets/images/hotelslider1.png";
import sliderimg2 from "assets/images/hotelslider2.png";
import sliderimg3 from "assets/images/hotelslider3.png";

const Hotelfirstpage = () => {
  const images = [sliderimg1, sliderimg2, sliderimg3];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={classNames(commonstyles.container)}>
      <div
        className={classNames(
          commonstyles.flx,
          commonstyles.flxBetween,
          commonstyles.flxWrap,
          commonstyles.mb32
        )}
      ></div>

      <div className={hstyle.carousel}>
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index}`}
            className={classNames(hstyle.image, {
              [hstyle.active]: index === currentIndex,
            })}
            style={{
              display: index === currentIndex ? "block" : "none",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Hotelfirstpage;
