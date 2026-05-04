import { ChartData } from "@/interfaces/commonInterface";

export const create_chart = <T>(
  dataObject: ChartData | Record<string, any>
): ChartData => {
  const data: T[] = [];
  const label: string[] = [];

  Object.entries(dataObject).forEach(([k, v]) => {
    data.push(v as T);
    label.push(k);
  });

  return { data: data as number[], label };
};
