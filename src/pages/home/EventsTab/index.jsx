import React from "react";

export default function ServicesTab() {
  return (
    <div
      style={{
        padding: 24,
        background: "#f4f4f4",
        minHeight: "50vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center", // vertical center
        alignItems: "center", // horizontal center
        textAlign: "center",
      }}
    >
      <h2 style={{ margin: 0, color: "#0f172a", fontWeight: 1000 }}>
        Events/Festivals
      </h2>

      <div
        style={{
          marginTop: 18,
          background: "#fff",
          borderRadius: 18,
          padding: 22,
          boxShadow: "0 12px 24px rgba(0,0,0,0.08)",
          border: "1px solid #f1f1f1",
          width: "min(720px, 100%)",
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "6px 12px",
            borderRadius: 999,
            background: "#fff7f5",
            border: "1px solid #ffd3cf",
            color: "#ff6b63",
            fontWeight: 1000,
            letterSpacing: 0.6,
            textTransform: "uppercase",
            fontSize: 12,
          }}
        >
          Coming Soon
        </div>

        {/* <div
          style={{
            marginTop: 10,
            fontSize: 22,
            fontWeight: 1000,
            color: "#ff6b63",
          }}
        >
          Coming Soon
        </div> */}

        <div
          style={{
            marginTop: 8,
            color: "#6b7280",
            fontWeight: 800,
            lineHeight: 1.5,
          }}
        >
          This section will be available soon.
        </div>
      </div>
    </div>
  );
}
