import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "./ImageSwipper.css";
import { HotelDetailSlier } from "shared/utils";

const HotelSlider = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  return (
    <div className="image-swiper">
      <Swiper
        modules={[Navigation, Thumbs]}
        spaceBetween={10}
        loop={true}
        navigation={true}
        pagination={true}
        thumbs={{ swiper: thumbsSwiper }}
        className="main-swiper"
      >
        {HotelDetailSlier.map((i, index) => (
          <SwiperSlide
            key={index}
            style={{
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            }}
          >
            <img src={i?.img} alt={`Slide ${index}`} className="main-image" />
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
        {HotelDetailSlier.map((i, index) => (
          <SwiperSlide key={index}>
            <img
              src={i?.img}
              alt={`Thumbnail ${index}`}
              className="thumbnail"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HotelSlider;
