import React from "react";
import { NavLink } from "react-router-dom";
import "./TabsBar.css";

const tabs = [
  { label: "HOME", to: "" }, // index route
  { label: "SERVICES", to: "services" },
  { label: "DONATIONS", to: "donations" },
  { label: "EVENTS", to: "events" },
  { label: "EXCLUSIVE STORE", to: "store" },
  { label: "FAQ'S", to: "faqs" },
];

export default function TabsBar() {
  return (
    <div className="tabsWrap">
      {tabs.map((t) => (
        <NavLink
          key={t.label}
          to={t.to}
          end={t.to === ""} // ensures HOME is active only on index
          className={({ isActive }) =>
            isActive ? "tabItem active" : "tabItem"
          }
        >
          {t.label}
        </NavLink>
      ))}
    </div>
  );
}
