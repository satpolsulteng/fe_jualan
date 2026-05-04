const getValueByPath = (obj: any, path: string) => {
  return path.split(".").reduce((acc, key) => acc?.[key], obj);
};

export const groupByKey = <T>(
  data: T[],
  keyPath: string
): Record<string, T[]> => {
  return data.reduce((acc, item) => {
    const groupKey = getValueByPath(item, keyPath);

    if (groupKey == null) return acc;

    const k = String(groupKey);

    if (!acc[k]) acc[k] = [];
    acc[k].push(item);

    return acc;
  }, {} as Record<string, T[]>);
};

export const groupByKeyNestedAssoc = <
  T extends Record<string, any>,
  K extends keyof T,
  V extends keyof T
>(
  data: T[],
  groupKey: K, // contoh: "type"
  valueKey: K, // contoh: "status"
  sumField: V // contoh: "jumlah"
): Record<string, Record<string, number>> => {
  return data.reduce((acc, item) => {
    const g = item[groupKey];
    const v = item[valueKey];

    if (g == null || v == null) return acc;

    const gKey = String(g);
    const vKey = String(v);
    const val = Number(item[sumField]) || 0;

    if (!acc[gKey]) acc[gKey] = {};
    acc[gKey][vKey] = (acc[gKey][vKey] ?? 0) + val;

    return acc;
  }, {} as Record<string, Record<string, number>>);
};

export const sumByKey = <T extends Record<string, any>>(
  data: T[],
  key: keyof T
) => data.reduce((acc, item) => acc + Number(item[key] || 0), 0);

export const groupAndSumGrouped = <T extends Record<string, any>>(
  grouped: Record<string, T[]>,
  sumField: keyof T
) =>
  Object.fromEntries(
    Object.entries(grouped).map(([k, v]) => [k, sumByKey(v, sumField)])
  );

export const groupAndSumByKey = <T extends Record<string, any>>(
  data: T[],
  groupField: keyof T,
  sumField: keyof T
) => groupAndSumGrouped(groupByKey(data, String(groupField)), sumField);

export const sumArrayByField = <T extends Record<string, any>>(
  data: T[],
  groupField: keyof T,
  sumField: keyof T
): Record<string, number> => {
  return data.reduce((acc: Record<string, number>, item) => {
    const key = item[groupField];
    const val = item[sumField];

    if (key == null) return acc;

    const k = String(key);
    acc[k] = (acc[k] || 0) + (Number(val) || 0);

    return acc;
  }, {});
};
