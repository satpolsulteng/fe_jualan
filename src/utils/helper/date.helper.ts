import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import localizedFormat from "dayjs/plugin/localizedFormat";
import "dayjs/locale/id";

dayjs.extend(duration);
dayjs.extend(localizedFormat);

export const getDateNow = () => {
  const date = new Date();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return { date, month, year };
};

export const formatDate = (date: string, format: string) => {
  if (!date || date === "-") return "-";
  return dayjs(date).locale("id").format(format);
};

export const diffSmart = (start: string, end: string): string => {
  const startDate = dayjs(start);
  const endDate = dayjs(end);

  let diffSeconds = Math.abs(startDate.diff(endDate, "second"));
  const dur = dayjs.duration(diffSeconds, "seconds");

  const days = Math.floor(dur.asDays());
  const hours = Math.floor(dur.asHours());
  const minutes = Math.floor(dur.asMinutes());
  const seconds = Math.floor(dur.asSeconds());

  if (days >= 1) return `${days} hari`;
  if (hours >= 1) return `${hours} jam`;
  if (minutes >= 1) return `${minutes} menit`;
  return `${seconds} detik`;
};

export const tgl_indo = (
  tanggal: string,
  keterangan: string = "Tanggal tidak ditemukan",
  withTime: boolean = false,
) => {
  if (!tanggal) return keterangan;

  let date = new Date(tanggal);
  const bulan = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const formattedDate = `${date.getDate()} ${
    bulan[date.getMonth()]
  } ${date.getFullYear()}`;

  return withTime ? `${formattedDate} ${jam_indo(tanggal)}` : formattedDate;
};

export const jam_indo = (tanggal: string): string => {
  if (!tanggal) return "-";
  const date = new Date(tanggal);
  return `${String(date.getHours()).padStart(2, "0")}:${String(
    date.getMinutes(),
  ).padStart(2, "0")}`;
};

export const timeAgo = (time: string) => {
  const date = new Date((time || "").replace(/-/g, "/").replace(/[TZ]/g, " "));
  const diff = (new Date().getTime() - date.getTime()) / 1000;
  const dayDiff = Math.floor(diff / 86400);

  if (isNaN(dayDiff) || dayDiff < 0 || dayDiff >= 31) {
    return dayjs(time).format("MMMM DD, YYYY");
  }

  return (
    (dayDiff === 0 &&
      ((diff < 60 && "just now") ||
        (diff < 120 && "1 minute ago") ||
        (diff < 3600 && Math.floor(diff / 60) + " minutes ago") ||
        (diff < 7200 && "1 hour ago") ||
        (diff < 86400 && Math.floor(diff / 3600) + " hours ago"))) ||
    (dayDiff === 1 && "Yesterday") ||
    (dayDiff < 7 && dayDiff + " days ago") ||
    (dayDiff < 31 && Math.ceil(dayDiff / 7) + " weeks ago")
  );
};
