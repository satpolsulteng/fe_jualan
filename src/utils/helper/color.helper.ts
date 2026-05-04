export const colorDisaster = (status: string) => {
  switch (status) {
    case "Tinggi":
      return "#FF006E";
    case "Sedang":
      return "#FFBE0B";
    case "Rendah":
    case "Sangat rendah":
      return "#00B400";
    default:
      return "gray";
  }
};

export const colorPutusSekolah = (status: string) => {
  switch (status) {
    case "Sangat tinggi":
      return "#FF006E";
    case "Tinggi":
      return "#FFBE0B";
    case "Sedang":
    case "Rendah":
      return "#00B400";
    default:
      return "gray";
  }
};
