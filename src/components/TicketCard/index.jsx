import React, { useMemo, useState } from "react";
import "./TicketCard.css";

const labelMap = {
  overview: "OVERVIEW",
  location: "LOCATION",
  guidelines: "GUIDELINES",
  bahumanas: "BAHUMANAS",
};

export default function TicketCard({ ticket, onBook }) {
  const [activeInfoTab, setActiveInfoTab] = useState("overview");

  const activeText = useMemo(() => {
    return ticket?.info?.[activeInfoTab] || "";
  }, [ticket, activeInfoTab]);

  return (
    <div className="ticketCard">
      <div className="ticketCardTop">
        <div className="ticketThumb">
          <div className="ticketTag">{ticket.tag}</div>
          <div className="ticketThumbFill" />
        </div>

        <div className="ticketMain">
          <div className="ticketTitleRow">
            <div className="ticketTitle">{ticket.title}</div>
            <div className="ticketPrice">₹{ticket.price}</div>
          </div>

          <div
            className="ticketSubTabs"
            role="tablist"
            aria-label="Ticket info tabs"
          >
            {Object.keys(labelMap).map((k) => (
              <button
                key={k}
                type="button"
                className={
                  activeInfoTab === k ? "ticketSubTab active" : "ticketSubTab"
                }
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveInfoTab(k);
                }}
              >
                {labelMap[k]}
              </button>
            ))}
          </div>

          <button
            type="button"
            className="ticketCTA"
            onClick={(e) => {
              e.stopPropagation();
              onBook(ticket);
            }}
          >
            BOOK THIS {ticket.type === "darshan" ? "DARSHAN" : "SEVA"}{" "}
            <span className="ticketArrow">›</span>
          </button>
        </div>
      </div>

      <div className="ticketCardBottom">
        <div className="ticketQuote">“{activeText}”</div>

        <div className="ticketMetaRow">
          <div className="ticketMeta">🕒 {ticket.time}</div>
          <div className="ticketMeta">👤 {ticket.people}</div>
          <div className="ticketDays">{ticket.daysLabel}</div>
        </div>
      </div>
    </div>
  );
}
