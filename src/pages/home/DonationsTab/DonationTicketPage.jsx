import React, { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import { formatINR } from "../../../utils/donationEligibility";

function downloadDonationTicketPDF(ticket) {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const w = doc.internal.pageSize.getWidth();
  const h = doc.internal.pageSize.getHeight();
  const m = 10;
  let y = m;

  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, w, h, "F");
  doc.setFillColor(255, 255, 255);
  doc.rect(m, m, w - 2 * m, h - 2 * m, "F");

  doc.setFillColor(255, 107, 99);
  doc.rect(m, m, w - 2 * m, 12, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont(undefined, "bold");
  doc.setFontSize(16);
  doc.text("SWARNAGIRI TEMPLE", w / 2, m + 8, { align: "center" });

  y = m + 20;
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(14);
  doc.text("DONATION TICKET", w / 2, y, { align: "center" });
  y += 8;

  doc.setDrawColor(220, 220, 220);
  doc.line(m + 5, y, w - m - 5, y);
  y += 7;

  const line = (label, value) => {
    doc.setFontSize(10);
    doc.setFont(undefined, "bold");
    doc.setTextColor(90, 90, 90);
    doc.text(label, m + 8, y);
    doc.setFont(undefined, "normal");
    doc.setTextColor(40, 40, 40);
    doc.text(String(value || "-"), m + 55, y);
    y += 6;
  };

  line("Ticket No:", ticket.ticketNo);
  line("Donor Name:", ticket.donorName);
  line("Mobile:", ticket.mobile);
  line("Donation Amount:", `₹${formatINR(ticket.amount)}`);
  line("Slab:", ticket.slabTitle);
  line("Payment ID:", ticket.paymentId);
  line("Booked On:", new Date(ticket.createdAt).toLocaleString());

  y += 2;
  doc.line(m + 5, y, w - m - 5, y);
  y += 8;

  doc.setFont(undefined, "bold");
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(12);
  doc.text("Privileges / Donor Eligibility", m + 8, y);
  y += 7;

  doc.setFont(undefined, "normal");
  doc.setTextColor(60, 60, 60);
  doc.setFontSize(9);

  ticket.eligibility.forEach((row) => {
    const val = Array.isArray(row.value) ? row.value.join(" | ") : row.value;
    const text = `${row.label}: ${val}`;
    const lines = doc.splitTextToSize(text, w - 2 * m - 16);
    lines.forEach((ln) => {
      if (y > h - m - 18) {
        doc.addPage();
        y = m + 12;
      }
      doc.text(ln, m + 8, y);
      y += 5;
    });
    y += 2;
  });

  doc.save(`Donation_Ticket_${ticket.ticketNo}.pdf`);
}

function EligibilityTable({ eligibility }) {
  if (!eligibility?.length) return null;

  return (
    <div
      style={{
        border: "1px solid #eee",
        borderRadius: 12,
        overflow: "hidden",
        marginTop: 12,
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "300px 1fr",
          background: "#0f172a",
          color: "#fff",
          fontWeight: 1000,
        }}
      >
        <div style={{ padding: 14 }}>Privileges</div>
        <div style={{ padding: 14 }}>Donor Eligibility</div>
      </div>

      {eligibility.map((row, idx) => (
        <div
          key={idx}
          style={{
            display: "grid",
            gridTemplateColumns: "300px 1fr",
            borderTop: "1px solid #eee",
            background: idx % 2 === 0 ? "#fff" : "#fafafa",
          }}
        >
          <div style={{ padding: 14, fontWeight: 1000, color: "#0f172a" }}>
            {row.label}
          </div>
          <div style={{ padding: 14, color: "#333" }}>
            {Array.isArray(row.value) ? (
              <ul style={{ margin: 0, paddingLeft: 18 }}>
                {row.value.map((v, i) => (
                  <li key={i} style={{ marginBottom: 6 }}>
                    {v}
                  </li>
                ))}
              </ul>
            ) : (
              row.value
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function DonationTicketPage() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const ticket = state?.ticket || null;

  // fallback: if user refreshes, they lose router state, so show last stored ticket
  const stored = useMemo(() => {
    if (ticket) return null;
    const arr = JSON.parse(localStorage.getItem("donationTickets") || "[]");
    return arr?.[0] || null;
  }, [ticket]);

  const t = ticket || stored;

  if (!t) {
    return (
      <div style={{ padding: 24 }}>
        No ticket found. Go to Donations page.
        <div style={{ marginTop: 10 }}>
          <button onClick={() => navigate("/donations")} style={primaryBtn}>
            GO TO DONATIONS
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: 24,
        background: "#f4f4f4",
        minHeight: "calc(100vh - 80px)",
      }}
    >
      <div style={card}>
        <div
          style={{
            fontWeight: 1000,
            color: "#0f172a",
            marginBottom: 10,
            fontSize: 18,
          }}
        >
          DONATION TICKET
        </div>

        <div style={{ color: "#777", fontWeight: 900 }}>
          Ticket: {t.ticketNo} • Amount: ₹{formatINR(t.amount)} • Payment:{" "}
          {t.paymentId}
        </div>

        <button
          onClick={() => downloadDonationTicketPDF(t)}
          style={{ ...primaryBtn, marginTop: 12 }}
        >
          DOWNLOAD PDF
        </button>

        <EligibilityTable eligibility={t.eligibility} />

        <button
          onClick={() => navigate("/donations")}
          style={{ ...primaryBtn, marginTop: 14, background: "#ff6b63" }}
        >
          MAKE ANOTHER DONATION
        </button>
      </div>
    </div>
  );
}

const card = {
  background: "#fff",
  borderRadius: 18,
  padding: 16,
  boxShadow: "0 12px 24px rgba(0,0,0,0.08)",
};
const primaryBtn = {
  width: "100%",
  border: "none",
  borderRadius: 14,
  padding: "14px 16px",
  background: "#0f172a",
  color: "#fff",
  fontWeight: 1000,
};
