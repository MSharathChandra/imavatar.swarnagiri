import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { donationSlabs } from "./donationSlabs";
import {
  formatINR,
  getDonationSlabForAmount,
} from "../../../utils/donationEligibility";

export default function DonationsTab() {
  const navigate = useNavigate();

  const [donorName, setDonorName] = useState("");
  const [mobile, setMobile] = useState("");
  const [amount, setAmount] = useState("");

  const [selectedSlabId, setSelectedSlabId] = useState(donationSlabs?.[0]?.id);
  const selectedSlab = useMemo(
    () => donationSlabs.find((s) => s.id === selectedSlabId) || null,
    [selectedSlabId],
  );

  const matchedSlab = useMemo(
    () => getDonationSlabForAmount(amount, donationSlabs),
    [amount],
  );

  const canGoSummary =
    donorName.trim().length > 0 &&
    mobile.trim().length > 0 &&
    Number(amount) > 0 &&
    !!matchedSlab;

  const goSummary = () => {
    if (!canGoSummary) return;

    navigate("/donations/summary", {
      state: {
        donorName,
        mobile,
        amount: Number(amount),
        slab: matchedSlab, // pass slab object
      },
    });
  };

  return (
    <div
      style={{
        padding: 24,
        background: "#f4f4f4",
        minHeight: "calc(100vh - 80px)",
      }}
    >
      <div
        style={{
          fontSize: 28,
          fontWeight: 1000,
          fontStyle: "italic",
          color: "#0f172a",
        }}
      >
        DONATIONS
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 450px",
          gap: 18,
          marginTop: 16,
        }}
      >
        {/* LEFT: slabs list */}
        <div style={card}>
          <div style={{ fontWeight: 1000, color: "#0f172a", marginBottom: 10 }}>
            DONATION SLABS
          </div>

          <div style={{ display: "grid", gap: 10 }}>
            {donationSlabs.map((s) => {
              const active = s.id === selectedSlabId;
              return (
                <button
                  key={s.id}
                  onClick={() => setSelectedSlabId(s.id)}
                  style={{
                    textAlign: "left",
                    borderRadius: 14,
                    border: active ? "2px solid #ff6b63" : "1px solid #e7e7e7",
                    background: active ? "#fff7f5" : "#fff",
                    padding: 12,
                    cursor: "pointer",
                  }}
                >
                  <div style={{ fontWeight: 1000, color: "#0f172a" }}>
                    {s.title}
                  </div>
                  <div style={{ color: "#777", fontWeight: 900, marginTop: 4 }}>
                    Range: ₹{formatINR(s.minAmount)} - ₹{formatINR(s.maxAmount)}
                  </div>
                  {s.limited && (
                    <div
                      style={{
                        color: "#9a3412",
                        fontWeight: 1000,
                        marginTop: 6,
                      }}
                    >
                      Limited: {s.remaining}/{s.maxDonors} remaining
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {selectedSlab && (
            <>
              <button
                onClick={() => setAmount(String(selectedSlab.minAmount))}
                style={{
                  marginTop: 12,
                  width: "100%",
                  border: "none",
                  borderRadius: 14,
                  padding: "12px 14px",
                  background: "#0f172a",
                  color: "#fff",
                  fontWeight: 1000,
                  cursor: "pointer",
                }}
              >
                USE THIS SLAB (AUTOFILL ₹{formatINR(selectedSlab.minAmount)})
              </button>

              <div
                style={{ marginTop: 12, color: "#0f172a", fontWeight: 1000 }}
              >
                Eligibility preview
              </div>

              <EligibilityTable eligibility={selectedSlab.eligibility} />
            </>
          )}
        </div>

        {/* RIGHT: details form */}
        <div style={card}>
          <div style={{ fontWeight: 1000, color: "#0f172a", marginBottom: 10 }}>
            DONOR DETAILS
          </div>

          <input
            value={donorName}
            onChange={(e) => setDonorName(e.target.value)}
            placeholder="FULL NAME"
            style={inputStyle}
          />
          <input
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="MOBILE"
            style={inputStyle}
          />
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="DONATION AMOUNT (INR)"
            style={inputStyle}
          />

          {Number(amount) > 0 && !matchedSlab && (
            <div style={{ marginTop: 8, color: "#b91c1c", fontWeight: 1000 }}>
              No slab matches this amount. Choose a slab on the left or change
              amount.
            </div>
          )}

          {matchedSlab && (
            <div
              style={{
                marginTop: 10,
                background: "#fff7ed",
                border: "1px solid #fed7aa",
                padding: 12,
                borderRadius: 12,
              }}
            >
              <div style={{ fontWeight: 1000, color: "#9a3412" }}>
                Matched slab: {matchedSlab.title}
              </div>
              <div style={{ color: "#9a3412", fontWeight: 900, marginTop: 4 }}>
                Range: ₹{formatINR(matchedSlab.minAmount)} - ₹
                {formatINR(matchedSlab.maxAmount)}
              </div>
            </div>
          )}

          <button
            onClick={goSummary}
            disabled={!canGoSummary}
            style={{
              ...primaryBtn,
              opacity: canGoSummary ? 1 : 0.5,
              cursor: canGoSummary ? "pointer" : "not-allowed",
              marginTop: 14,
            }}
          >
            REVIEW DONATION
          </button>
        </div>
      </div>
    </div>
  );
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

const card = {
  background: "#fff",
  borderRadius: 18,
  padding: 16,
  boxShadow: "0 12px 24px rgba(0,0,0,0.08)",
};
const inputStyle = {
  width: "100%",
  height: 56,
  border: "none",
  outline: "none",
  borderRadius: 14,
  background: "#f4f4f4",
  padding: "0 16px",
  fontWeight: 1000,
  letterSpacing: 0.6,
  color: "#444",
  textTransform: "uppercase",
  marginTop: 10,
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
