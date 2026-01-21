// src/mock/donationSlabs.js
// Annadanam Donation Slabs (MOCK).
// NOTE: Replace min/max + eligibility text once you provide the real slab table from the PDF.

export const donationSlabs = [
  {
    id: "annadanam_slab_005",
    category: "ANNADANAM",
    title: "₹500 - ₹1000",
    minAmount: 500,
    maxAmount: 1000,
    currency: "INR",
    limited: true,
    maxDonors: 250,
    remaining: 117,
    eligibility: [
      { label: "Acknowledgement Receipt", value: "Yes" },
      {
        label: "Yearly Privileges for Accommodation",
        value: ["4 days accommodation in a year (₹5000 tariff)"],
      },
      {
        label: "Yearly Privileges",
        value: [
          "2 Darshans through Donor Darshan (for 5 persons)",
          "1 Darshan through Suprabatham seva (for 5 persons)",
          "1 Darshan through Kalyanam seva (for 5 persons)",
        ],
      },
      {
        label: "One Time Privileges",
        value: [
          "1 Darshan through Astadala pada padma Archana (for 5 persons)",
          "2 Veda Ashirvachanam",
        ],
      },
      {
        label: "One Time Prasadam",
        value: ["5 Kalyanam and 25 Laddus and 10 Vedas"],
      },
      {
        label: "One Time Bahumanams",
        value: [
          "1 Gold Coin - 5g (22 kt)",
          "1 Silver Coin - 20g",
          "1 Srivari Vastram and 1 Blouse Piece",
        ],
      },
      {
        label: "Note (Yearly Privileges)",
        value:
          "Yearly privileges for Companies/Firms/other entities: 10 years; for Individuals: 20 years.",
      },
    ],
  },

  {
    id: "annadanam_slab_001",
    category: "ANNADANAM",
    title: "₹1000 - ₹10,000 (General Contribution)",
    minAmount: 1000,
    maxAmount: 10000,
    currency: "INR",
    limited: false,
    eligibility: [
      { label: "Acknowledgement Receipt", value: "Yes" },
      {
        label: "Donor Recognition",
        value: ["Name recorded in temple donation register (if opted)."],
      },
      {
        label: "Prasadam",
        value: ["Standard prasadam as per temple policy (if applicable)."],
      },
      {
        label: "Note",
        value:
          "This is a mock slab; eligibility will be updated from final temple slab list.",
      },
    ],
  },

  {
    id: "annadanam_slab_002",
    category: "ANNADANAM",
    title: "₹10,001 - ₹50,000",
    minAmount: 10001,
    maxAmount: 50000,
    currency: "INR",
    limited: false,
    eligibility: [
      { label: "Acknowledgement Receipt", value: "Yes" },
      { label: "One Time Privileges", value: ["(To be updated from PDF)"] },
      { label: "Prasadam", value: ["(To be updated from PDF)"] },
    ],
  },

  {
    id: "annadanam_slab_003",
    category: "ANNADANAM",
    title: "₹50,001 - ₹1,00,000",
    minAmount: 50001,
    maxAmount: 100000,
    currency: "INR",
    limited: false,
    eligibility: [
      { label: "Acknowledgement Receipt", value: "Yes" },
      { label: "Yearly Privileges", value: ["(To be updated from PDF)"] },
      { label: "One Time Privileges", value: ["(To be updated from PDF)"] },
    ],
  },

  {
    id: "annadanam_slab_004",
    category: "ANNADANAM",
    title: "₹1,00,001 - ₹5,00,000",
    minAmount: 100001,
    maxAmount: 500000,
    currency: "INR",
    limited: true,
    maxDonors: 500,
    remaining: 312,
    eligibility: [
      { label: "Acknowledgement Receipt", value: "Yes" },
      {
        label: "Yearly Privileges for Accommodation",
        value: ["(To be updated from PDF)"],
      },
      { label: "Yearly Privileges", value: ["(To be updated from PDF)"] },
      { label: "One Time Privileges", value: ["(To be updated from PDF)"] },
      { label: "One Time Prasadam", value: ["(To be updated from PDF)"] },
    ],
  },

  {
    id: "annadanam_slab_006",
    category: "ANNADANAM",
    title: "₹10,00,001 - ₹25,00,000",
    minAmount: 1000001,
    maxAmount: 2500000,
    currency: "INR",
    limited: true,
    maxDonors: 100,
    remaining: 42,
    eligibility: [
      { label: "Acknowledgement Receipt", value: "Yes" },
      { label: "Special Privileges", value: ["(To be updated from PDF)"] },
      { label: "Accommodation", value: ["(To be updated from PDF)"] },
      { label: "Note", value: "Mock slab." },
    ],
  },

  {
    id: "annadanam_slab_007",
    category: "ANNADANAM",
    title: "₹25,00,001 and above",
    minAmount: 2500001,
    maxAmount: 999999999,
    currency: "INR",
    limited: true,
    maxDonors: 25,
    remaining: 9,
    eligibility: [
      { label: "Acknowledgement Receipt", value: "Yes" },
      { label: "Top Tier Privileges", value: ["(To be updated from PDF)"] },
      {
        label: "Note",
        value: "Mock slab; will be replaced with official privileges list.",
      },
    ],
  },
];
