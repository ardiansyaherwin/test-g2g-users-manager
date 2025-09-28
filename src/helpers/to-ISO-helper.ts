import { Timestamp } from "firebase/firestore";

export const toISO = (t: Timestamp | string | undefined) => {
  if (!t) return "";
  if (typeof t === "string") return t;
  return t.toDate().toISOString();
}
export const escapeCSV = (v: string) => {
  return /[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v;
}