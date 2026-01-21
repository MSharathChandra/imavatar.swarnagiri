import React, { useMemo, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import jsPDF from "jspdf";
import "./TicketFlow.css";

const RAZORPAY_KEY = "rzp_test_RHNG06Qrvs16HF";

function DevoteeCard({ index, value, onChange, onRemove, canRemove }) {
  const onField = (k) => (e) => onChange({ ...value, [k]: e.target.value });

  return (
    <div className="devoteeCard">
      <div className="devoteeCardTop">
        <div className="devoteePill">DEVOTEE #{index + 1}</div>

        {canRemove && (
          <button
            type="button"
            className="devoteeClose"
            aria-label="Remove devotee"
            onClick={onRemove}
          >
            ×
          </button>
        )}
      </div>

      <div className="devoteeGrid">
        <input
          className="field"
          placeholder="FULL NAME"
          value={value.fullName}
          onChange={onField("fullName")}
        />
        <input
          className="field"
          placeholder="GOTHRAM"
          value={value.gothram}
          onChange={onField("gothram")}
        />
        <input
          className="field"
          placeholder="AGE"
          value={value.age}
          onChange={onField("age")}
        />
        <input
          className="field"
          placeholder="AADHAAR"
          value={value.aadhaar}
          onChange={onField("aadhaar")}
        />
      </div>
    </div>
  );
}

function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function TicketFlow() {
  const { state } = useLocation();
  const { type, ticketId } = useParams();

  const ticket = useMemo(() => state?.ticket || null, [state]);

  const [step, setStep] = useState(1);
  const [maxStep, setMaxStep] = useState(1);

  const [devotees, setDevotees] = useState([
    { fullName: "", gothram: "", age: "", aadhaar: "" },
  ]);

  const [mobile, setMobile] = useState("");
  const [hundi, setHundi] = useState(0);
  const [agreed, setAgreed] = useState(false);
  const [paymentId, setPaymentId] = useState(null); // Store Razorpay payment_id

  const bookingDate = "20 Jun 2026";
  const bookingTime = "05:00 AM - 05:30 AM";

  const ticketPrice = Number(ticket?.price ?? 0);
  const memberCount = devotees.length;

  const payable = useMemo(() => {
    const h = Number(hundi || 0);
    return ticketPrice * memberCount + h;
  }, [ticketPrice, memberCount, hundi]);

  const addMember = () => {
    setDevotees((p) => [
      ...p,
      { fullName: "", gothram: "", age: "", aadhaar: "" },
    ]);
  };

  const removeMember = (idx) => {
    setDevotees((p) => p.filter((_, i) => i !== idx));
  };

  const goToStep = (next) => {
    if (next <= maxStep) setStep(next);
  };

  const continueFromDetails = () => {
    setMaxStep(2);
    setStep(2);
  };

  const continueFromSummary = () => {
    if (!agreed) {
      alert("Please agree to Terms and Conditions.");
      return;
    }
    setMaxStep(3);
    setStep(3);
  };

  const openRazorpay = async () => {
    const ok = await loadRazorpayScript();
    if (!ok) {
      alert("Razorpay SDK failed to load. Check internet / adblock.");
      return;
    }

    const options = {
      key: RAZORPAY_KEY,
      amount: Math.round(Number(payable) * 100), // paise
      currency: "INR",
      name: "Swarnagiri Temple",
      description: `${type} - ${ticket?.title || ticketId}`,
      prefill: {
        contact: mobile || "",
        name: devotees?.[0]?.fullName || "",
      },
      theme: { color: "#0f172a" },
      handler: function (response) {
        console.log("Payment success:", response);
        setPaymentId(response.razorpay_payment_id);
        setMaxStep(4);
        setStep(4);
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const downloadTicketPDF = () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 10;
    let yPos = margin;

    // Background color
    doc.setFillColor(15, 23, 42); // dark blue
    doc.rect(0, 0, pageWidth, pageHeight, "F");

    // White content box
    doc.setFillColor(255, 255, 255);
    doc.rect(
      margin,
      margin,
      pageWidth - 2 * margin,
      pageHeight - 2 * margin,
      "F",
    );

    // Top decorative bar
    doc.setFillColor(255, 107, 99); // coral
    doc.rect(margin, margin, pageWidth - 2 * margin, 12, "F");

    // Temple Name (in coral bar)
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    doc.setFont(undefined, "bold");
    doc.text("SWARNAGIRI TEMPLE", pageWidth / 2, margin + 8, {
      align: "center",
    });

    yPos = margin + 18;

    // Title
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(16);
    doc.setFont(undefined, "bold");
    doc.text("SEVA TICKET", pageWidth / 2, yPos, { align: "center" });
    yPos += 10;

    // Separator line
    doc.setDrawColor(200, 200, 200);
    doc.line(margin + 5, yPos, pageWidth - margin - 5, yPos);
    yPos += 6;

    // Seva details
    doc.setFontSize(11);
    doc.setFont(undefined, "normal");
    doc.setTextColor(80, 80, 80);

    const details = [
      ["Seva Name:", ticket?.title || ticketId],
      ["Date:", bookingDate],
      ["Time:", bookingTime],
      [
        "Ticket ID:",
        `TKT-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      ],
      ["Payment ID:", paymentId || "PENDING"],
    ];

    details.forEach(([label, value]) => {
      doc.setFont(undefined, "bold");
      doc.text(label, margin + 8, yPos);
      doc.setFont(undefined, "normal");
      doc.text(value, margin + 50, yPos);
      yPos += 7;
    });

    yPos += 4;
    doc.line(margin + 5, yPos, pageWidth - margin - 5, yPos);
    yPos += 8;

    // Devotees table header
    doc.setFillColor(240, 240, 240);
    doc.rect(margin + 5, yPos - 4, pageWidth - 2 * margin - 10, 6, "F");
    doc.setFont(undefined, "bold");
    doc.setFontSize(10);
    doc.text("Devotee Name", margin + 8, yPos);
    doc.text("Gothram", margin + 90, yPos);
    doc.text("Age", pageWidth - margin - 20, yPos, { align: "right" });

    yPos += 8;

    // Devotees list
    doc.setFont(undefined, "normal");
    doc.setFontSize(10);
    devotees.forEach((devotee, idx) => {
      doc.text(devotee.fullName || "-", margin + 8, yPos);
      doc.text(devotee.gothram || "-", margin + 90, yPos);
      doc.text(devotee.age || "-", pageWidth - margin - 20, yPos, {
        align: "right",
      });
      yPos += 6;
    });

    yPos += 6;
    doc.line(margin + 5, yPos, pageWidth - margin - 5, yPos);
    yPos += 8;

    // Cost breakdown
    doc.setFont(undefined, "bold");
    doc.setFontSize(11);
    doc.text("Cost Breakdown", pageWidth / 2, yPos, { align: "center" });
    yPos += 8;

    doc.setFont(undefined, "normal");
    doc.setFontSize(10);
    const costDetails = [
      [
        `${ticket?.title || ticketId} (${memberCount}x)`,
        `₹${ticketPrice * memberCount}`,
      ],
      Number(hundi) > 0 ? ["Hundi", `₹${Number(hundi)}`] : null,
    ].filter(Boolean);

    costDetails.forEach(([label, amount]) => {
      doc.text(label, margin + 8, yPos);
      doc.text(amount, pageWidth - margin - 8, yPos, { align: "right" });
      yPos += 6;
    });

    yPos += 2;
    doc.line(margin + 5, yPos, pageWidth - margin - 5, yPos);
    yPos += 6;

    // Total (highlighted)
    doc.setFillColor(255, 107, 99);
    doc.rect(margin + 5, yPos - 3, pageWidth - 2 * margin - 10, 8, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont(undefined, "bold");
    doc.setFontSize(12);
    doc.text("Total Amount Payable", margin + 8, yPos + 2);
    doc.text(`₹${payable}`, pageWidth - margin - 8, yPos + 2, {
      align: "right",
    });

    yPos += 12;
    doc.setTextColor(80, 80, 80);

    // Contact info
    doc.setFontSize(9);
    doc.text("Contact: " + mobile, margin + 8, yPos);
    yPos += 5;

    // Footer
    yPos = pageHeight - margin - 10;
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(
      "This ticket is valid for one-time entry. Please present this ticket at the temple entrance.",
      pageWidth / 2,
      yPos,
      { align: "center", maxWidth: pageWidth - 2 * margin - 10 },
    );

    doc.save(`Swarnagiri_Ticket_${new Date().getTime()}.pdf`);
  };

  return (
    <div className="flowPage">
      {/* Step buttons */}
      <div className="flowSteps">
        <button
          className={step === 1 ? "flowStep active" : "flowStep"}
          onClick={() => goToStep(1)}
        >
          Devotee Details
        </button>

        {maxStep >= 2 && (
          <button
            className={step === 2 ? "flowStep active" : "flowStep"}
            onClick={() => goToStep(2)}
          >
            Summary
          </button>
        )}

        {maxStep >= 3 && (
          <button
            className={step === 3 ? "flowStep active" : "flowStep"}
            onClick={() => goToStep(3)}
          >
            Payment
          </button>
        )}

        {maxStep >= 4 && (
          <button
            className={step === 4 ? "flowStep active" : "flowStep"}
            onClick={() => goToStep(4)}
          >
            Download
          </button>
        )}
      </div>

      {/* STEP 1 */}
      {step === 1 && (
        <div className="flowTwoCol">
          <div className="flowLeft">
            <div className="pageTitle">DEVOTEE INFORMATION</div>

            {devotees.map((d, idx) => (
              <DevoteeCard
                key={idx}
                index={idx}
                value={d}
                onChange={(next) =>
                  setDevotees((prev) =>
                    prev.map((x, i) => (i === idx ? next : x)),
                  )
                }
                canRemove={idx !== 0}
                onRemove={() => removeMember(idx)}
              />
            ))}

            <button className="addMemberBtn" type="button" onClick={addMember}>
              + ADD ANOTHER MEMBER
            </button>

            <div className="contactCard">
              <div className="contactTitle">PRIMARY CONTACT</div>
              <input
                className="field fieldFull"
                placeholder="MOBILE NUMBER"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </div>
          </div>

          <div className="flowRight">
            <div className="summaryCard">
              <div className="summaryTitle">
                {(ticket?.title || ticketId || "").toUpperCase()}
              </div>

              <div className="summaryRow">
                <div className="summaryLabel">TOTAL</div>
                <div className="summaryAmount">₹{payable}</div>
              </div>

              <div className="summarySmall">
                ({memberCount} member{memberCount > 1 ? "s" : ""}) + hundi ₹
                {Number(hundi || 0)}
              </div>

              <button
                className="reviewBtn"
                type="button"
                onClick={continueFromDetails}
              >
                REVIEW BOOKING <span className="arrow">›</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <div className="flowSingle">
          <div className="summaryPanel">
            <div className="sumGrid2">
              <div className="sumField">
                <div className="sumLabel">Seva Name</div>
                <div className="sumValue">{ticket?.title || ticketId}</div>
              </div>

              <div className="sumField">
                <div className="sumLabel">Date</div>
                <div className="sumValue">{bookingDate}</div>
              </div>

              <div className="sumField">
                <div className="sumLabel">Time</div>
                <div className="sumValue">{bookingTime}</div>
              </div>

              <div className="sumField">
                <div className="sumLabel">Hundi</div>
                <input
                  className="sumInput"
                  value={hundi}
                  onChange={(e) => setHundi(e.target.value)}
                  placeholder="0"
                />
              </div>
            </div>

            <div className="tableCard">
              <div className="tableHead">
                <div>Sr. No.</div>
                <div>Visitor Name</div>
                <div className="tRight">Age</div>
              </div>

              {devotees.map((d, idx) => (
                <div className="tableRow" key={idx}>
                  <div>{idx + 1}</div>
                  <div>{d.fullName || "-"}</div>
                  <div className="tRight">{d.age || "-"}</div>
                </div>
              ))}
            </div>

            <div className="tableCard">
              <div className="tableHead">
                <div>Sr. No.</div>
                <div>Particulars</div>
                <div className="tRight">Cost</div>
              </div>

              <div className="tableRow">
                <div>1</div>
                <div>{ticket?.title || ticketId}</div>
                <div className="tRight">{ticketPrice * memberCount}</div>
              </div>

              {Number(hundi) > 0 && (
                <div className="tableRow">
                  <div>2</div>
                  <div>Hundi</div>
                  <div className="tRight">{Number(hundi)}</div>
                </div>
              )}

              <div className="tableTotalRow">
                <div />
                <div className="tBold">Total Amount Payable</div>
                <div className="tRight tBold">{payable}</div>
              </div>
            </div>

            <label className="termsRow">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
              />
              <span>I agree Terms and Conditions.</span>
            </label>

            <button
              className="primaryBtn"
              onClick={continueFromSummary}
              disabled={!agreed}
              style={{
                opacity: agreed ? 1 : 0.5,
                cursor: agreed ? "pointer" : "not-allowed",
              }}
            >
              PROCEED TO PAYMENT
            </button>
          </div>
        </div>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <div className="flowSingle">
          <div className="panel">
            <div className="panelTitle">PAYMENT</div>
            <div className="panelBody">
              Payable amount: <b>₹{payable}</b>
            </div>

            <button className="primaryBtn" onClick={openRazorpay}>
              PAY WITH RAZORPAY
            </button>
          </div>
        </div>
      )}

      {/* STEP 4 */}
      {step === 4 && (
        <div className="flowSingle">
          <div className="panel">
            <div className="panelTitle">✓ PAYMENT SUCCESSFUL</div>
            <div
              className="panelBody"
              style={{ textAlign: "center", color: "#27ae60" }}
            >
              Thank you! Your ticket has been booked.
              <br />
              <br />
              <b>Payment ID:</b> {paymentId}
            </div>
            <button className="primaryBtn" onClick={downloadTicketPDF}>
              📥 DOWNLOAD TICKET (PDF)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
