// src/utils/donationEligibility.js
export function getDonationSlabForAmount(amount, slabs) {
  const amt = Number(amount || 0);
  return slabs.find((s) => amt >= s.minAmount && amt <= s.maxAmount) || null;
}

export function formatINR(n) {
  const x = Number(n || 0);
  return x.toLocaleString("en-IN");
}
