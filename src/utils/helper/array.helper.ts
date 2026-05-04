import { Count } from "@/interfaces/commonInterface";

export const pluck = (data: any[], valueKey: string, keyKey: string) =>
  Object.fromEntries(data.map((item) => [item[keyKey], item[valueKey]]));

export const pluck_number = (
  data: Record<string, any>[],
  valueKey: string,
  keyKey: string
) => Object.fromEntries(data.map((item) => [item[keyKey], item[valueKey]]));

export const array_merge = (
  arr: string[],
  arr_value: any,
  default_value: any = 0
) => {
  if (!Array.isArray(arr) || arr.length === 0) return {};
  return {
    ...Object.fromEntries(arr.map((a) => [a, default_value])),
    ...arr_value,
  };
};

export function sortByValue(data: Count, ascending: boolean = true): Count {
  return Object.fromEntries(
    Object.entries(data).sort(([, a], [, b]) => (ascending ? a - b : b - a))
  );
}

export const sortDataByMaxValue = (
  data: Record<string, Record<string, number | string>>
) => {
  return Object.fromEntries(
    Object.entries(data)
      .filter(([key]) => key !== null) // Hilangkan entry dengan key null jika tidak ingin diurutkan
      .map(([key, value]) => ({
        name: key,
        ...value,
        max_value: Math.max(...Object.values(value).map(Number)), // Hitung max_value
      }))
      .sort((a, b) => b.max_value - a.max_value) // Urutkan berdasarkan max_value
      .map(({ name, max_value, ...rest }) => [name, rest]) // Buat ulang sebagai object
  );
};

export function sumFields<T extends Record<string, any>, K extends keyof T>(
  arr: T[],
  fields: K[]
): Record<K, number> {
  const acc = {} as Record<K, number>;

  // Initialize semua field = 0
  fields.forEach((f) => {
    acc[f] = 0;
  });

  // Loop sekali untuk semua field
  arr.forEach((item) => {
    fields.forEach((f) => {
      acc[f] += Number(item[f]) || 0;
    });
  });

  return acc;
}

export const convertArrayToRecord = (data: any[], keyField: string) => {
  return data.reduce((acc: Record<string, any>, item: any) => {
    const key = item[keyField];
    if (key !== undefined && key !== null) {
      acc[key] = item;
    }
    return acc;
  }, {} as Record<string, any>);
};

export function pickFieldFromRecord<
  T extends Record<string, any>,
  K extends keyof T[keyof T]
>(
  rec: Record<string, T[keyof T]>,
  field: K,
  {
    compact = true,
    unique = false,
  }: { compact?: boolean; unique?: boolean } = {}
): Array<NonNullable<T[keyof T][K]>> {
  let out = Object.values(rec).map((item: any) => item?.[field]) as Array<any>;
  if (compact)
    out = out.filter((v) => v !== undefined && v !== null && v !== "");
  if (unique) out = Array.from(new Set(out));
  return out as Array<NonNullable<T[keyof T][K]>>;
}

export const sumAssocValues = (data: Record<string, number>): number => {
  return Object.values(data).reduce((a, b) => a + b, 0);
};

export const sumNestedAssoc = (
  data: Record<string, Record<string, number>>
): Record<string, number> => {
  return Object.fromEntries(
    Object.entries(data).map(([key, val]) => [key, sumAssocValues(val)])
  );
};
