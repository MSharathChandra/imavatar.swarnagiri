import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { formatINR } from "../../../utils/donationEligibility";

export default function DonationSummaryPage() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const donorName = state?.donorName || "";
  const mobile = state?.mobile || "";
  const amount = Number(state?.amount || 0);
  const slab = state?.slab || null;

  const [agreed, setAgreed] = useState(false);

  const isValid = useMemo(
    () => donorName && mobile && amount > 0 && slab,
    [donorName, mobile, amount, slab],
  );

  if (!isValid) {
    return (
      <div style={{ padding: 24 }}>
        Missing data. Go back to Donations page and try again.
      </div>
    );
  }

  const proceedPayment = () => {
    if (!agreed) return;
    navigate("/donations/payment", {
      state: { donorName, mobile, amount, slab },
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
      <div style={card}>
        <div
          style={{
            fontWeight: 1000,
            color: "#0f172a",
            marginBottom: 10,
            fontSize: 18,
          }}
        >
          SUMMARY
        </div>

        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
        >
          <Box label="Donor Name" value={donorName} />
          <Box label="Mobile" value={mobile} />
          <Box label="Donation Amount" value={`₹${formatINR(amount)}`} />
          <Box label="Slab" value={slab.title} />
        </div>

        <EligibilityTable eligibility={slab.eligibility} />

        <label
          style={{
            display: "flex",
            gap: 10,
            alignItems: "center",
            marginTop: 14,
            fontWeight: 900,
            color: "#555",
          }}
        >
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
          />
          I agree Terms and Conditions.
        </label>

        <button
          onClick={proceedPayment}
          disabled={!agreed}
          style={{
            ...primaryBtn,
            opacity: agreed ? 1 : 0.5,
            cursor: agreed ? "pointer" : "not-allowed",
            marginTop: 12,
          }}
        >
          PROCEED TO PAYMENT
        </button>
      </div>
    </div>
  );
}

function Box({ label, value }) {
  return (
    <div style={{ background: "#f4f4f4", borderRadius: 12, padding: 12 }}>
      <div
        style={{
          fontSize: 12,
          fontWeight: 1000,
          color: "#8d8d8d",
          marginBottom: 6,
        }}
      >
        {label}
      </div>
      <div style={{ fontWeight: 1000, color: "#0f172a" }}>{value}</div>
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
const primaryBtn = {
  width: "100%",
  border: "none",
  borderRadius: 14,
  padding: "14px 16px",
  background: "#0f172a",
  color: "#fff",
  fontWeight: 1000,
};
