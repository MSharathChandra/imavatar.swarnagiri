export const TICKET_INFO_TABS = [
  "overview",
  "location",
  "guidelines",
  "bahumanas",
];

export const darshanTickets = [
  {
    id: "d-daily-50",
    type: "darshan",
    category: "DAILY DARSHAN",
    tag: "DARSHAN",
    title: "Dakshina Q Entry",
    price: 50,
    time: "06:00 AM - 08:30 PM",
    people: "1 PERSON PER TICKET",
    daysLabel: "M T W T F S S",
    info: {
      overview:
        "General entry for devotees. Reporting 15 mins before the slot.",
      location: "Reporting point: Main Entrance, Swarnagiri Temple.",
      guidelines:
        "Carry ID proof. Maintain queue discipline. No prohibited items.",
      bahumanas: "Laddu prasadam as per availability at counter.",
    },
  },
  {
    id: "d-daily-100",
    type: "darshan",
    category: "DAILY DARSHAN",
    tag: "DARSHAN",
    title: "Special Entry Darshan",
    price: 100,
    time: "06:00 AM - 08:30 PM",
    people: "1 PERSON PER TICKET",
    daysLabel: "M T W T F S S",
    info: {
      overview: "Faster entry for devotees. Reporting 15 mins before the slot.",
      location: "Reporting point: Special Entry Gate.",
      guidelines: "Bring booking QR. Follow allotted time slot strictly.",
      bahumanas: "One small prasadam pack (subject to availability).",
    },
  },

  {
    id: "d-3days-150",
    type: "darshan",
    category: "WEEKLY (3 DAYS)",
    tag: "DARSHAN",
    title: "3-Day Darshan Pass",
    price: 150,
    time: "Valid for 3 days",
    people: "1 PERSON PER PASS",
    daysLabel: "M T W",
    info: {
      overview:
        "Access darshan for 3 selected days. Choose slots while booking.",
      location: "Reporting: Pass holders entry counter.",
      guidelines: "One pass = one devotee. Non-transferable.",
      bahumanas: "Prasadam may vary based on day.",
    },
  },

  {
    id: "d-week-300",
    type: "darshan",
    category: "WEEKLY",
    tag: "DARSHAN",
    title: "Weekly Darshan Pass",
    price: 300,
    time: "Valid for 7 days",
    people: "1 PERSON PER PASS",
    daysLabel: "M T W T F S S",
    info: {
      overview: "Weekly darshan access. Pick available slots during booking.",
      location: "Reporting: Weekly Pass Gate.",
      guidelines: "Keep QR ready. Follow temple instructions.",
      bahumanas: "Subject to availability at counter.",
    },
  },
];

export const sevaTickets = [
  {
    id: "s-archana-50",
    type: "seva",
    category: "SEVA",
    tag: "SEVA",
    title: "Archana Seva",
    price: 50,
    time: "Slot-based",
    people: "1 PERSON",
    daysLabel: "M T W T F S S",
    info: {
      overview: "Archana performed by priest. Report 15 mins early.",
      location: "Reporting: Seva Desk, Temple Office.",
      guidelines: "Dress code applies. Carry ID if required.",
      bahumanas: "Prasadam after completion (as available).",
    },
  },
];
