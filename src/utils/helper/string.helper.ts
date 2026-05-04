export const cutText = (text: string, length: number) => {
  if (text.split(" ").length > 1) {
    const split = text.substring(0, length).split(" ");
    split.pop();
    return split.join(" ") + "...";
  }
  return text;
};

export const showMore = (string: string, length: number) =>
  string.length > length ? string.substring(0, length) + "..." : string;

export const capitalizeFirstLetter = (string: string) =>
  string ? string.charAt(0).toUpperCase() + string.slice(1) : "";

export const onlyNumber = (string: string) =>
  string ? string.replace(/\D/g, "") : "";
