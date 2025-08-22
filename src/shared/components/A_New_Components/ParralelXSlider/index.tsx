import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "./styles.css";
import { EffectCoverflow, Pagination } from "swiper/modules";

const videos = [
  { src: "https://www.w3schools.com/html/mov_bbb.mp4" },
  { src: "https://www.w3schools.com/html/mov_bbb.mp4" },
  { src: "https://www.w3schools.com/html/mov_bbb.mp4" },
  { src: "https://www.w3schools.com/html/mov_bbb.mp4" },
  { src: "https://www.w3schools.com/html/mov_bbb.mp4" },
  { src: "https://www.w3schools.com/html/mov_bbb.mp4" },
  { src: "https://www.w3schools.com/html/mov_bbb.mp4" },
];

export default function ParallaxCarousel() {
  const swiperRef = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const swiperInstance = swiperRef.current?.swiper;
    if (swiperInstance) {
      swiperInstance.on("slideChange", () => {
        setActiveIndex(swiperInstance.realIndex);
      });
    }
  }, []);

  return (
    <Swiper
      ref={swiperRef}
      effect="coverflow"
      grabCursor={true}
      centeredSlides={true}
      centerInsufficientSlides={true}
      loop={true}
      slidesPerView={3}
      initialSlide={4}
      watchSlidesProgress={true}
      coverflowEffect={{
        rotate: 0,
        stretch: 0,
        depth: 200,
        modifier: 2.5,
        slideShadows: false,
      }}
      modules={[EffectCoverflow, Pagination]}
      className="mySwiper"
    >
      {videos.map((vid, index) => (
        <SwiperSlide key={index} className="custom-slide">
          <video
            key={index}
            src={vid.src}
            muted
            loop
            playsInline
            controls={index === activeIndex} // Show controls only on active slide
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
