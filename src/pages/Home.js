import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "./Home.css";
// import TabsBar from "./home/TabsBar.jsx";

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
];

export default function Home() {
  return (
    <div className="home">
      <Carousel
        showThumbs={false}
        showStatus={false}
        infiniteLoop
        autoPlay
        interval={4500}
        swipeable
        emulateTouch
      >
        {slides.map((s) => (
          <div key={s.title} className="heroSlide">
            <img className="heroImg" src={s.imageUrl} alt={s.title} />

            <div className="heroOverlay" />

            <div className="heroContent">
              <h1 className="heroTitle">{s.title}</h1>
              <p className="heroSubtitle">{s.subtitle}</p>

              <a className="heroBtn" href={s.ctaHref}>
                {s.ctaText}
              </a>
            </div>
          </div>
        ))}
      </Carousel>
      {/* <TabsBar /> */}
    </div>
  );
}
