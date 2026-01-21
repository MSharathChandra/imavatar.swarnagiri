import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ServicesTab.css";

import TicketCard from "../../../components/TicketCard";
import { darshanTickets, sevaTickets } from "./mockdata";

function groupByCategory(list) {
  return list.reduce((acc, t) => {
    acc[t.category] = acc[t.category] || [];
    acc[t.category].push(t);
    return acc;
  }, {});
}

export default function ServicesTab() {
  const [activeTab, setActiveTab] = useState("darshan");
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  const data = activeTab === "darshan" ? darshanTickets : sevaTickets;

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return data;
    return data.filter((t) =>
      `${t.title} ${t.category}`.toLowerCase().includes(s),
    );
  }, [q, data]);

  const grouped = useMemo(() => groupByCategory(filtered), [filtered]);

  const onBook = (ticket) => {
    // navigate ONLY when CTA clicked
    navigate(`/services/book/${ticket.type}/${ticket.id}`, {
      state: { ticket },
    }); // RRv6 [web:152]
  };

  return (
    <div className="servicesPage">
      <div className="servicesSearchWrap">
        <span className="servicesSearchIcon">🔍</span>
        <input
          className="servicesSearchInput"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search for Sevas, Darshan and More"
        />
        <button
          className="servicesMicBtn"
          type="button"
          aria-label="Voice search"
        >
          🎙
        </button>
      </div>

      <div className="servicesTabs">
        <button
          className={
            activeTab === "darshan" ? "servicesTab active" : "servicesTab"
          }
          onClick={() => setActiveTab("darshan")}
          type="button"
        >
          Dharshan
        </button>
        <button
          className={
            activeTab === "seva" ? "servicesTab active" : "servicesTab"
          }
          onClick={() => setActiveTab("seva")}
          type="button"
        >
          Seva
        </button>
      </div>

      {Object.entries(grouped).map(([category, tickets]) => (
        <section key={category} className="ticketSection">
          <div className="ticketSectionTitle">{category}</div>

          <div className="ticketGrid">
            {tickets.map((t) => (
              <TicketCard key={t.id} ticket={t} onBook={onBook} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
