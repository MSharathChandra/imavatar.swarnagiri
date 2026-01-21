// src/pages/home/Home.jsx  (or wherever your Home component lives)
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";

// Swiper core + required modules styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import "./Home.css";

import slide1 from "../assets/dashboard/carousel/swarnagiri.png";
import slide2 from "../assets/dashboard/carousel/Sree-Venkateswara-Swamy-Devasthanam-Swarnagiri-20.jpg";

const slides = [
  {
    title: "OM NAMO VENKATESAYA",
    subtitle: "Book a Darshan Now",
    imageUrl: slide1,
    ctaText: "BOOK A DARSHAN NOW",
    ctaHref: "/darshan-booking",
  },
  {
    title: "SEVA BOOKINGS",
    subtitle: "Reserve Sevas in advance",
    imageUrl: slide2,
    ctaText: "BOOK SEVA",
    ctaHref: "/seva-booking",
  },
  // You can easily add more slides here later
];

export default function Home() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="home">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={800}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={true}
        onSwiper={(swiper) => {
          if (swiper.navigation) {
            swiper.navigation.prevEl = prevRef.current;
            swiper.navigation.nextEl = nextRef.current;
            swiper.navigation.update();
          }
        }}
        style={{
          "--swiper-navigation-color": "white",
          "--swiper-navigation-size": "60px",
        }}
        className="heroSwiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="heroSlide">
              <img
                className="heroImg"
                src={slide.imageUrl}
                alt={slide.title}
                loading="lazy"
              />
              <div className="heroOverlay" />
              <div className="heroContent">
                <h1 className="heroTitle">{slide.title}</h1>
                <p className="heroSubtitle">{slide.subtitle}</p>
                <a className="heroBtn" href={slide.ctaHref}>
                  {slide.ctaText}
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
