import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export * from "./date.helper";
export * from "./number.helper";
export * from "./string.helper";
export * from "./array.helper";
export * from "./group.helper";
export * from "./format.helper";
export * from "./chart.helper";
export * from "./color.helper";
export * from "./phone.helper";
