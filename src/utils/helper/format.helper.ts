const getByPath = (obj: any, path: string) =>
  path.split(".").reduce((acc, key) => acc?.[key], obj);

export function create_2dimension_array<T extends Record<string, any>>(
  data: T[],
  field1: string, // contoh: "bc_track.type"
  field2: string, // contoh: "bc_track.icon"
  valueField: string = "jumlah", // default field nilai
) {
  const result: Record<string, Record<string, number>> = {};

  data.forEach((item) => {
    const key1 = getByPath(item, field1);
    const key2 = getByPath(item, field2);
    const value = Number(getByPath(item, valueField)) || 0;

    if (key1 == null || key2 == null) return;

    const k1 = String(key1);
    const k2 = String(key2);

    if (!result[k1]) result[k1] = {};
    if (!result[k1][k2]) result[k1][k2] = 0;

    result[k1][k2] += value;
  });

  return result;
}

type SumFields = Record<string, number>;

export const create_3dimension_array = <T extends Record<string, any>>(
  data: T[],
  key1: string, // perguruan_tinggi
  key2: string, // status_bayar
  key3: string, // verifikasi_admin
  sumFields: (keyof T)[] = ["jumlah"], // ['jumlah', 'nominal']
  allKey: string = "Semua",
): Record<string, Record<string, Record<string, SumFields>>> => {
  const result: Record<string, Record<string, Record<string, SumFields>>> = {};

  const initSum = () =>
    Object.fromEntries(sumFields.map((f) => [String(f), 0])) as SumFields;

  data.forEach((item) => {
    const k1 = item[key1];
    const k2 = item[key2];
    const k3 = item[key3];

    if (k1 == null || k2 == null || k3 == null) return;

    const g1 = String(k1);
    const g2 = String(k2);
    const g3 = String(k3);

    // init level
    result[g1] ??= {};
    result[g1][g2] ??= {};
    result[g1][allKey] ??= {};
    result[allKey] ??= {};
    result[allKey][g2] ??= {};
    result[allKey][allKey] ??= {};

    // init leaf
    result[g1][g2][g3] ??= initSum();
    result[g1][allKey][g3] ??= initSum();
    result[allKey][g2][g3] ??= initSum();
    result[allKey][allKey][g3] ??= initSum();

    // sum
    sumFields.forEach((f) => {
      const val = Number(item[f]) || 0;
      result[g1][g2][g3][String(f)] += val;
      result[g1][allKey][g3][String(f)] += val;
      result[allKey][g2][g3][String(f)] += val;
      result[allKey][allKey][g3][String(f)] += val;
    });
  });

  return result;
};

export const formatAssociative = <T extends Record<string, any>>(
  data: T[],
  key: keyof T | string,
  keys?: (keyof T | string)[],
): Record<string, Partial<T>> => {
  if (!Array.isArray(data) || data.length === 0) return {};

  return data.reduce((acc: Record<string, Partial<T>>, item: T) => {
    const recordKey = item[key as keyof T];
    if (recordKey == null) return acc;

    const selectedKeys =
      keys && keys.length > 0
        ? keys
        : (Object.keys(item).filter((k) => k !== key) as (keyof T)[]);

    acc[String(recordKey)] = selectedKeys.reduce((obj, k) => {
      obj[k as keyof T] = item[k as keyof T];
      return obj;
    }, {} as Partial<T>);

    return acc;
  }, {});
};

export const create_options = (
  data: any[],
  isAll: boolean = true,
  isValueAsKey: boolean = true, // <-- default: value = key
  valueField: string = "id",
  labelField: string = "name",
  showCountForObject: boolean = false, // <-- tampilkan "(count)" di label jika object
) => {
  if (Array.isArray(data)) {
    return [
      ...(isAll ? [{ label: "Semua", value: "" }] : []),
      ...data.map((row: any) => ({
        label:
          typeof row === "object"
            ? String(row?.[labelField] ?? "")
            : String(row),
        value:
          typeof row === "object"
            ? String(row?.[valueField] ?? "")
            : String(row),
      })),
    ];
  } else if (data && typeof data === "object") {
    const entries = Object.entries(data);

    return [
      ...(isAll ? [{ label: "Semua", value: "" }] : []),
      ...entries.map(([key, val]) => {
        const safeKey = key ?? "";
        const safeVal = val ?? "";

        const label =
          safeKey === ""
            ? "Belum mengisi"
            : showCountForObject
              ? `${safeKey} (${safeVal})`
              : safeKey;

        const value = isValueAsKey ? String(safeKey) : String(safeVal);

        return { label, value };
      }),
    ];
  }

  return [];
};
