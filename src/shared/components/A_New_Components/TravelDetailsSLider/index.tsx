import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, Autoplay } from "swiper/modules"; // Import Autoplay
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/autoplay";
import "./traveldetailsSlider.css";
import { useTranslation } from "react-i18next";
import { useDirection } from "shared/utils/DirectionContext";
interface ImageSwiperProps {
  imageData: [];
}
const ImageSwiperTravel: React.FC<ImageSwiperProps> = ({ imageData }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
   const { t, i18n }: any = useTranslation();
    const { isRtl } = useDirection();

  return (
    <div className="image-swiper" 
     dir={isRtl ? "rtl" : "ltr"}
      {...({ rtl: isRtl } as any)}
    
    >
      <Swiper
        modules={[Navigation, Thumbs, Autoplay]} // Add Autoplay module
        spaceBetween={10}
        autoplay={{
          delay: 2500,
          // delay: 2500000000000,
          disableOnInteraction: false,
        }}
        loop={true}
        navigation={false}
        pagination={true}
        thumbs={{ swiper: thumbsSwiper }}
        className="main-swiper"
         dir={isRtl ? "rtl" : "ltr"}
      >
        {imageData.map((i, index) => (
          <SwiperSlide
            key={index}
            style={{
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            }}
             dir={isRtl ? "rtl" : "ltr"}
          >
            <img src={i} alt={`Slide ${index}`} className="main-image" />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        modules={[Thumbs]}
        spaceBetween={10}
        slidesPerView={6}
        watchSlidesProgress
        className="thumbs-swiper"
      >
        {imageData.map((i, index) => (
          <SwiperSlide key={index}>
            <img src={i} alt={`Thumbnail ${index}`} className="thumbnail" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageSwiperTravel;
