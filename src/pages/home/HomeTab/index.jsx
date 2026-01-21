import React from "react";
import "./HoeTab.css";

// top 4 cards
import sevaImg from "../../../assets/dashboard/cardsimages/seva.png";
import darshanImg from "../../../assets/dashboard/cardsimages/dharshan.png";
import prasadImg from "../../../assets/dashboard/cardsimages/ladoo.png";
import hundiImg from "../../../assets/dashboard/cardsimages/seva.png";

// NEW 3 cards images (replace paths with your real files)
import sevaDipImg from "../../../assets/dashboard/cardsimages/dharshan.png";
import donationImg from "../../../assets/dashboard/cardsimages/seva.png";
// import sevakuluImg from "../../../assets/dashboard/cardsimages/seva.png";

const cardsTop = [
  { title: "Seva", img: sevaImg, to: "/services" },
  { title: "Darshan", img: darshanImg, to: "/services" },
  { title: "Prasad", img: prasadImg, to: "/services/prasad" },
  { title: "Hundi", img: hundiImg, to: "/services/hundi" },
];

const cardsBottom = [
  { title: "Seva Electronic DIP", img: sevaDipImg, to: "/seva-electronic-dip" },
  { title: "Donation", img: donationImg, to: "/donations" },
  // { title: "Sevakulu", img: sevakuluImg, to: "/sevakulu" },
];

export default function HomeTab() {
  return (
    <div className="homeShell">
      {/* ... your language + search here ... */}

      {/* Row 1 (4 cards) */}
      <div className="cardsRow4">
        {cardsTop.map((c) => (
          <a key={c.title} href={c.to} className="homeCard">
            <img className="cardImg" src={c.img} alt={c.title} />
            <div className="cardGradient" />
            <div className="cardTitle">{c.title}</div>
          </a>
        ))}
      </div>

      {/* Row 2 (3 cards) */}
      <div className="cardsRow3">
        {cardsBottom.map((c) => (
          <a key={c.title} href={c.to} className="homeCard homeCardBigTitle">
            <img className="cardImg" src={c.img} alt={c.title} />
            <div className="cardGradient" />
            <div className="cardTitle">{c.title}</div>
          </a>
        ))}
      </div>
    </div>
  );
}
