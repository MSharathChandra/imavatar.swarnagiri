import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

import { FaFacebookF, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { FiTwitter, FiInstagram } from "react-icons/fi";

// Put image at: src/assets/Footer/image.png
import footerBg from "../assets/Footer/image.png";

const quickLinks = [
  { label: "Places of Worship", to: "/worship-places" },
  { label: "Spiritual Guides", to: "/spiritual-guides" },
  { label: "Partner With Us", to: "/partner" },
  { label: "About Us", to: "/about" },
  { label: "Contact Us", to: "/contact" },
];

const worshipPlacesLeft = [
  "Delhi",
  "Mumbai",
  "Chennai",
  "Bangalore",
  "Jaipur",
  "Hyderabad",
  "Nagpur",
];
const worshipPlacesRight = [
  "Surat",
  "Kolkata",
  "Visakhapatnam",
  "Ahmedabad",
  "Pune",
  "Kanpur",
];

const guidesLeft = [
  "Delhi",
  "Mumbai",
  "Chennai",
  "Bangalore",
  "Jaipur",
  "Hyderabad",
];
const guidesRight = [
  "Surat",
  "Kolkata",
  "Visakhapatnam",
  "Ahmedabad",
  "Pune",
  "Nagpur",
];

function SocialIcon({ href, children, label }) {
  return (
    <a
      className="socialBtn"
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
    >
      {children}
    </a>
  );
}

export default function Footer() {
  return (
    <footer className="footerOuter">
      {/* background image layer (grayscale) */}
      <div
        className="footerBg"
        style={{ backgroundImage: `url(${footerBg})` }}
      />

      {/* dark overlay + content */}
      <div className="footerOverlay">
        <div className="footerContainer">
          <div className="footerGrid">
            {/* Column 1 */}
            <div className="footerCol">
              <div className="footerH">Quick Links</div>
              <div className="footerList">
                {quickLinks.map((x) => (
                  <Link key={x.label} to={x.to} className="footerItem">
                    {x.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Column 2 */}
            <div className="footerCol">
              <div className="footerH">Worship Places in</div>
              <div className="twoList">
                <div className="listCol">
                  {worshipPlacesLeft.map((t) => (
                    <div key={t} className="footerText">
                      {t}
                    </div>
                  ))}
                </div>
                <div className="listCol">
                  {worshipPlacesRight.map((t) => (
                    <div key={t} className="footerText">
                      {t}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Column 3 */}
            <div className="footerCol">
              <div className="footerH">Spiritual Guides in</div>
              <div className="twoList">
                <div className="listCol">
                  {guidesLeft.map((t) => (
                    <div key={t} className="footerText">
                      {t}
                    </div>
                  ))}
                </div>
                <div className="listCol">
                  {guidesRight.map((t) => (
                    <div key={t} className="footerText">
                      {t}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Column 4 */}
            <div className="footerCol rightCol">
              <div className="brandRow">
                <div className="brandMark">▦</div>
                <div className="brandName">ImAvatar</div>
              </div>

              <div className="contactLine">
                <span className="contactLabel">Phone: </span>
                <a className="contactValue" href="tel:+917837912345">
                  +91 78379 12345
                </a>
              </div>

              <div className="contactLine">
                <span className="contactLabel">Mail: </span>
                <a className="contactValue" href="mailto:admin@imavatar.com">
                  admin@imavatar.com
                </a>
              </div>

              <div className="spacer10" />

              <div className="addrLine">
                IMAVATAR TECHNOLOGIES PRIVATE LIMITED
              </div>
              <div className="addrLine">
                2ND FLOOR, IMAVATAR TECHNOLOGIES PVT. LTD,
              </div>
              <div className="addrLine">PLOT NO.29, KAVURI HILLS,</div>
              <div className="addrLine">
                MADHAPUR, HYDERABAD, TELANGANA - 500033
              </div>

              <div className="spacer18" />

              <div className="socialRow">
                <SocialIcon href="https://facebook.com" label="Facebook">
                  <FaFacebookF size={16} color="#111" />
                </SocialIcon>
                <SocialIcon href="https://twitter.com" label="Twitter">
                  <FiTwitter size={16} color="#111" />
                </SocialIcon>
                <SocialIcon href="https://instagram.com" label="Instagram">
                  <FiInstagram size={16} color="#111" />
                </SocialIcon>
                <SocialIcon href="https://linkedin.com" label="LinkedIn">
                  <FaLinkedinIn size={16} color="#111" />
                </SocialIcon>
                <SocialIcon href="https://youtube.com" label="YouTube">
                  <FaYoutube size={16} color="#111" />
                </SocialIcon>
              </div>
            </div>
          </div>

          <div className="divider" />

          <div className="copy">
            Copyrights to 2026. All rights reserved. ImAvatar Technologies
            Private Limited
          </div>

          <div className="bottomLinks">
            <Link to="/terms" className="bottomLinkText">
              User Terms
            </Link>
            <Link to="/partner-terms" className="bottomLinkText">
              Partner Terms &amp; Conditions
            </Link>
            <Link to="/privacy" className="bottomLinkText">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
