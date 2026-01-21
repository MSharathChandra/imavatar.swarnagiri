import { NavLink, Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <header className="navHeader">
      <div className="navWrap">
        {/* Left: brand + dropdown */}
        <div className="navLeft">
          <Link to="/" className="brand">
            imavatar
          </Link>

          <div className="homeDropdown">
            <span className="pin" aria-hidden="true">
              {/* simple location pin */}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 22s7-5.1 7-12a7 7 0 1 0-14 0c0 6.9 7 12 7 12Z"
                  stroke="#777"
                  strokeWidth="1.8"
                />
                <path
                  d="M12 13.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Z"
                  stroke="#777"
                  strokeWidth="1.8"
                />
              </svg>
            </span>
            <span className="homeText">Home</span>
            <span className="caret" aria-hidden="true">
              ▾
            </span>
          </div>
        </div>

        {/* Center: menu */}
        <nav className="navCenter">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "navItem active" : "navItem"
            }
          >
            Home
          </NavLink>
          <NavLink to="/worship-places" className="navItem">
            Worship Places
          </NavLink>
          <NavLink to="/spiritual-guides" className="navItem">
            Spiritual Guides
          </NavLink>
          <NavLink to="/store" className="navItem">
            Store
          </NavLink>
          <NavLink to="/partner" className="navItem">
            Partner With Us
          </NavLink>
          <NavLink to="/media" className="navItem">
            Media
          </NavLink>
        </nav>

        {/* Right: login */}
        <div className="navRight">
          <Link to="/login" className="loginBtn">
            Login
          </Link>
        </div>
      </div>
    </header>
  );
}
