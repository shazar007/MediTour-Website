import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, Autoplay } from "swiper/modules";
import { useDirection } from "shared/utils/DirectionContext";
import { countryData } from "shared/utils";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/autoplay";
import "./ImageSwiper.css";

const ImageSwiper = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [isMounted, setIsMounted] = useState(false);
  const { isRtl } = useDirection();

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  return (
    <div
      className="image-swiper"
      dir={isRtl ? "rtl" : "ltr"}
      {...({ rtl: isRtl } as any)}
    >
      {/* Main Swiper */}
      <Swiper
        modules={[Navigation, Thumbs, Autoplay]}
        spaceBetween={10}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
          reverseDirection: isRtl,
        }}
        loop
        navigation={false}
        pagination={false}
        thumbs={{ swiper: thumbsSwiper }}
        className="main-swiper"
      >
        {countryData.map((i, index) => (
          <SwiperSlide key={index} className="swiper-slide-centered">
            <img
              src={i?.img}
              alt={`Slide ${index}`}
              className="main-images_"
              loading="lazy"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {isMounted && (
        <Swiper
          onSwiper={setThumbsSwiper}
          modules={[Thumbs]}
          spaceBetween={6}
          slidesPerView={6}
          loop={true}
          watchSlidesProgress
          watchOverflow={true}
          dir={isRtl ? "rtl" : "ltr"} // Important for correct direction
          className="thumbs-swipers_"
        >
          {countryData.map((i, index) => (
            <SwiperSlide key={index}>
              <img
                src={i?.img}
                alt={`Thumbnail ${index}`}
                className="thumbnail_"
                loading="eager"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default ImageSwiper;
