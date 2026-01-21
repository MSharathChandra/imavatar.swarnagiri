import React from "react";
import "./AnnouncementBar.css";

const HINDI_TEXT =
  "बहुत शीघ्र आप अपने पसंदीदा तीर्थ क्षेत्रों, धार्मिक स्थलों और आध्यात्मिक व धार्मिक विशेषज्ञों (पंडित, वास्तु ज्ञानी, ज्योतिषी आदि) से सीधे जुड़ सकेंगे। \u00A0\u00A0";

export default function AnnouncementBar() {
  return (
    <div className="abRoot">
      {/* LEFT FIXED STRIP */}
      <div className="abLeft">
        <span className="abLeftText">
          ●●● IMAVATAR COMMERCIAL LAUNCH IN JULY 2022! ●●●
        </span>
      </div>

      {/* RIGHT INFINITE MARQUEE */}
      <div className="abRight">
        <div className="abTrack" aria-label="Announcement marquee">
          <div className="abItem">{HINDI_TEXT}</div>
          <div className="abItem" aria-hidden="true">
            {HINDI_TEXT}
          </div>
        </div>
      </div>
    </div>
  );
}
