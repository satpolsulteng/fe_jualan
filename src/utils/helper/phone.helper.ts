export const normalizePhoneNumber = (
  phone: string | number | null | undefined
): string => {
  if (!phone) return "";
  let p = phone
    .toString()
    .trim()
    .replace(/[^0-9+]/g, "");
  if (p.startsWith("+62")) return p.replace("+", "");
  if (p.startsWith("62")) return p;
  if (p.startsWith("0")) return "62" + p.slice(1);
  return p;
};
