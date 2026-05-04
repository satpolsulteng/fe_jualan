
// export const shortenNumber = (num: number): string => {
//   if (num >= 1_000_000_000)
//     return (num / 1_000_000_000).toFixed(1).replace(".0", "") + "M";
//   if (num >= 1_000_000)
//     return (num / 1_000_000).toFixed(1).replace(".0", "") + "jt";
//   return num.toString();
// };

export function shortenNumber(
  input: number | bigint | string,
  suffix: "long" | "short" = "long",
): string {
  const units = [
    { value: 1_000_000n, long: "Juta", short: "Jt" },
    { value: 1_000_000_000n, long: "Miliar", short: "M" },
    { value: 1_000_000_000_000n, long: "Triliun", short: "T" },
    { value: 1_000_000_000_000_000n, long: "Kuadriliun", short: "Qd" },
    { value: 1_000_000_000_000_000_000n, long: "Kuintiliun", short: "Qi" },
  ];

  if (
    input == null ||
    (typeof input === "number" && !isFinite(input)) ||
    (typeof input === "string" && !input.trim())
  )
    return "0";

  const num =
    typeof input === "bigint"
      ? input
      : typeof input === "string"
        ? BigInt(input)
        : BigInt(Math.floor(input));

  let chosen = null;

  for (const u of units) {
    if (num >= u.value) chosen = u;
  }

  if (!chosen) return Number(num).toLocaleString("id-ID");

  const scaled = Number(num) / Number(chosen.value);
  const value = Math.floor(scaled * 100) / 100;

  return (
    value.toLocaleString("id-ID", {
      maximumFractionDigits: 2,
    }) +
    " " +
    (suffix === "long" ? chosen.long : chosen.short)
  );
}
export const formatNumberK = (num: number) => {
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
  if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
  return num.toString();
};

export const number_format = (number: string | number) =>
  number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

export const formatCurrency = (number: number) => {
  if (!number) return 0;
  const formattedNumber = number.toString().replace(/\D/g, "");
  const rest = formattedNumber.length % 3;
  let currency = formattedNumber.substr(0, rest);
  const thousand = formattedNumber.substr(rest).match(/\d{3}/g);
  if (thousand) currency += (rest ? "." : "") + thousand.join(".");
  return currency;
};

export const formatBytes = (bytes: number, decimals: number = 2): string => {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB", "PB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(decimals))} ${sizes[i]
    }`;
};

export const toNumber = (v: any, fb = 0) => {
  const n = parseFloat(String(v));
  return Number.isFinite(n) ? n : fb;
};

type RekapItem = Record<string, any>;

export const getTotalRekap = (
  data: Record<string, number> | RekapItem[],
  field: string = "jumlah",
): number => {
  // Case 1: associative object { key: number }
  if (!Array.isArray(data)) {
    return Object.values(data).reduce(
      (acc, curr) => acc + (Number(curr) || 0),
      0,
    );
  }

  // Case 2: array of object [{ jumlah | field, ... }]
  return data.reduce((acc, item) => {
    const val = item?.[field];
    return acc + (Number(val) || 0);
  }, 0);
};

export const getMaxValues = (data: Record<string, number>) =>
  Math.max(...Object.values(data));
