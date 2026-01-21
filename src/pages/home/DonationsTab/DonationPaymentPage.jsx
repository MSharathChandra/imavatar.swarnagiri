import React, { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { formatINR } from "../../../utils/donationEligibility";

const RAZORPAY_KEY = "rzp_test_RHNG06Qrvs16HF";

function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });
}

function saveDonationTicket(ticket) {
  const key = "donationTickets";
  const prev = JSON.parse(localStorage.getItem(key) || "[]");
  localStorage.setItem(key, JSON.stringify([ticket, ...prev]));
}

export default function DonationPaymentPage() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const donorName = state?.donorName || "";
  const mobile = state?.mobile || "";
  const amount = Number(state?.amount || 0);
  const slab = state?.slab || null;

  const isValid = useMemo(
    () => donorName && mobile && amount > 0 && slab,
    [donorName, mobile, amount, slab],
  );

  if (!isValid)
    return (
      <div style={{ padding: 24 }}>Missing data. Go back and try again.</div>
    );

  const makeTicketNo = () =>
    "DNT-" + Math.random().toString(36).slice(2, 10).toUpperCase();

  const payNow = async () => {
    const ok = await loadRazorpayScript();
    if (!ok) return alert("Razorpay SDK failed to load.");

    const options = {
      key: RAZORPAY_KEY,
      amount: Math.round(amount * 100), // paise [web:211]
      currency: "INR",
      name: "Swarnagiri Temple",
      description: `Donation ${slab.title}`,
      prefill: { name: donorName, contact: mobile },
      theme: { color: "#0f172a" },
      handler: function (response) {
        const ticket = {
          ticketType: "DONATION",
          ticketNo: makeTicketNo(),
          donorName,
          mobile,
          amount,
          slabId: slab.id,
          slabTitle: slab.title,
          eligibility: slab.eligibility, // snapshot
          paymentId: response.razorpay_payment_id,
          createdAt: new Date().toISOString(),
        };

        saveDonationTicket(ticket);

        navigate("/donations/ticket", { state: { ticket } });
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
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
          PAYMENT
        </div>
        <div
          style={{
            background: "#f6f6f6",
            borderRadius: 12,
            padding: 14,
            fontWeight: 1000,
          }}
        >
          Payable Amount:{" "}
          <span style={{ color: "#ff6b63" }}>₹{formatINR(amount)}</span>
        </div>

        <button onClick={payNow} style={{ ...primaryBtn, marginTop: 12 }}>
          PAY WITH RAZORPAY
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
