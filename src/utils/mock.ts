import { UserUploadType } from "@/interfaces/commonInterface";

export const optionAll = { label: "--- Tampilkan Semua ---", value: "" };

export const default_school_icon =
  "https://service.websekolah.sekolahkukeren.id/storage/school_logo/default.jpg";
export const default_school_icon_gray =
  "http://127.0.0.1:7773/storage/school_logo/default_gray.jpg";

export const optionJenjang = [
  { label: "Semua jenjang", value: "Semua jenjang" },
  { label: "SMA", value: "SMA" },
  { label: "SMK", value: "SMK" },
  { label: "SLB", value: "SLB" },
];

export const FormGeneralWaliMock: UserUploadType = {
  ktp_wali: { label: "KTP Wali", sub_label: "File .pdf Maksimal 2 Mb" },
  kartu_keluarga: {
    title: "Kartu Keluarga",
    label: "Kartu Keluarga",
    sub_label: "File .pdf Maksimal 2 Mb",
  },
  ktp: {
    title: "KTP orang tua",
    label: "KTP orang tua",
    sub_label: "File .pdf Maksimal 2 Mb",
  },
  home_image: {
    title: "Foto tampak depan rumah",
    label: "Foto tampak depan rumah",
    sub_label: "File .pdf Maksimal 2 Mb",
  },
  ukt_image: {
    title: "Bukti/Lampiran Nominal UKT Jurusan Yang di Daftar",
    label: "Bukti/Lampiran Nominal UKT Jurusan Yang di Daftar",
    sub_label: "File .pdf Maksimal 2 Mb",
  },
  stjm: {
    title: "Dokumen Surat Pertanyaan Tanggung Jawab Mutlak",
    label: "Surat Pernyataan Tanggung Jawab Mutlak (SPTJM)",
    sub_label: "File .pdf Maksimal 2 Mb",
  },
  ijazah: {
    title: "Ijazah SMP/ Sederajat / Paket B / Ijazah luar negeri",
    label: "Ijazah SMP/ Sederajat / Paket B / Ijazah luar negeri",
    sub_label: "File .pdf Maksimal 2 Mb",
  },
  raport: {
    title: "Dokumen Persyaratan Khusus Jalur Prestasi Nilai Rapor",
    label:
      "Scan Nilai Rapor dari semester 1 (satu) s/d 5 (lima). digabungkan dalam 1 file .pdf",
    sub_label: "File .pdf Maksimal 2 Mb",
  },
};

export const UserUploadMock = {
  general: {
    text: "General",
    // items: FormGeneralMock,
  },
};

export const FormGeneralMuridMock: UserUploadType = {
  ijazah: {
    title: "Ijazah",
    label: "Ijazah SMP/ Sederajat / Paket B / Ijazah luar negeri",
    sub_label: "File .pdf Maksimal 2 Mb",
  },
  akta_kelahiran: {
    label: "Akta kelahiran",
    sub_label: "File .pdf Maksimal 2 Mb",
  },
};

export const FormGeneralMock = {
  ...FormGeneralMuridMock,
  ...FormGeneralWaliMock,
};

export const convertArrayToRecord = (data: any[], keyField: string) => {
  return data.reduce((acc: Record<string, any>, item: any) => {
    const key = item[keyField];
    if (key !== undefined && key !== null) {
      acc[key] = item;
    }
    return acc;
  }, {}); // <-- penting: initial value {}
};

export const optionMonth = [
  { label: "Januari", value: "1" },
  { label: "Februari", value: "2" },
  { label: "Maret", value: "3" },
  { label: "April", value: "4" },
  { label: "Mei", value: "5" },
  { label: "Juni", value: "6" },
  { label: "Juli", value: "7" },
  { label: "Agustus", value: "8" },
  { label: "September", value: "9" },
  { label: "Oktober", value: "10" },
  { label: "November", value: "11" },
  { label: "Desember", value: "12" },
];

type CategoryKey =
  | "mahasiswa"
  | "prestasi"
  | "afirmasi"
  | "transkip"
  | "nonakademik";

export const category: Record<CategoryKey, string[]> = {
  mahasiswa: [
    "Beasiswa Mahasiswa Baru S1/D IV Jalur SNBP (Seleksi Nasional Berdasarkan Prestasi)",
    "Beasiswa Mahasiswa Baru S1/D IV Jalur SNBT (Seleksi Nasional Berdasarkan Tes)",
    "Beasiswa Mahasiswa Baru S1/D IV Jalur Mandiri Negeri/Swasta",
    "Beasiswa Mahasiswa Baru S1/D IV Jalur Prestasi Nonakademik",
    "Beasiswa Mahasiswa Baru S1/D IV Jalur Afirmasi",
    "Beasiswa Mahasiswa Aktif Jalur Prestasi Akademik",
    "Beasiswa Mahasiswa Aktif Jalur Prestasi Nonakademik",
    "Beasiswa Mahasiswa Aktif Jalur Afirmasi",
    "Beasiswa Bantuan Biaya Pendidikan Mahasiswa",
  ],
  prestasi: [
    "Beasiswa Mahasiswa Baru S1/D IV Jalur SNBP (Seleksi Nasional Berdasarkan Prestasi)",
    "Beasiswa Mahasiswa Baru S1/D IV Jalur SNBT (Seleksi Nasional Berdasarkan Tes)",
    "Beasiswa Mahasiswa Baru S1/D IV Jalur Mandiri Negeri/Swasta",
    "Beasiswa Mahasiswa Aktif Jalur Prestasi Akademik",
  ],
  afirmasi: [
    "Beasiswa Mahasiswa Baru S1/D IV Jalur Afirmasi",
    "Beasiswa Mahasiswa Aktif Jalur Afirmasi",
    "Beasiswa Peserta Didik Dari Keluarga Tidak Mampu (SMA/SMK/SLB)",
    "Beasiswa Bantuan Biaya Pendidikan Mahasiswa",
  ],
  transkip: [
    "Beasiswa Mahasiswa Baru S1/D IV Jalur SNBT (Seleksi Nasional Berdasarkan Tes)",
    "Beasiswa Mahasiswa Baru S1/D IV Jalur Mandiri Negeri/Swasta",
    "Beasiswa Mahasiswa Aktif Jalur Prestasi Akademik",
    "Beasiswa Mahasiswa Aktif Jalur Afirmasi",
    "Beasiswa Bantuan Biaya Pendidikan Mahasiswa",
  ],
  nonakademik: [
    "Beasiswa Mahasiswa Baru S1/D IV Jalur Prestasi Nonakademik",
    "Beasiswa Mahasiswa Aktif Jalur Prestasi Nonakademik",
    "Beasiswa Cerdas Istimewa dan/atau Bakat Istimewa (SMA/SMK/SLB)",
  ],
};

export const optionDisaster = [
  { label: "Gempa", value: "gempa" },
  { label: "Tsunami", value: "tsunami" },
  { label: "Gerakan tanah", value: "gerakan_tanah" },
  { label: "Longsor", value: "longsor" },
  { label: "Banjir", value: "banjir" },
];

export const optionStatusProblemMonitoring = [
  optionAll,
  { label: "Selesai", value: "Selesai" },
  { label: "Belum selesai", value: "Belum selesai" },
];

export const dataChart = {
  data: [],
  label: [],
};

export const optionAkreditas = [
  optionAll,
  { label: "A", value: "A" },
  { label: "B", value: "B" },
  { label: "C", value: "C" },
  { label: "Belum terakreditasi", value: "Belum terakreditasi" },
];
export const optionGender = [
  optionAll,
  { label: "Laki-laki", value: "L" },
  { label: "Perempuan", value: "P" },
];

interface DataItem {
  title: string;
  bgColor: string;
  textColor: string;
  icon: string;
  date: string;
  description: string;
}

interface SidebarItem {
  text: string;
  href?: any;
  data?: any; // Replace 'any' with a more specific type if possible
}

// Define the structure of the sidebar menu
interface MenuSidebar {
  [key: string]: {
    text: string;
    items: Record<string, SidebarItem>;
  };
}

// Define the structure of dataSMA
type DataReport = Record<string, DataItem>;

export const dataSMA: DataReport = {
  "monthly-report": {
    title: "Laporan Bulanan Sekolah",
    bgColor: "#2D8CFF",
    textColor: "white",
    icon: "lucide:file-chart-column",
    date: "20 September 2024",
    description:
      "Informasi bulanan tentang data guru, siswa, tenaga kependidikan, dan kurikulum.",
  },
  // "problem-monitoring": {
  //   title: "Monitoring Masalah",
  //   bgColor: "#FFE004",
  //   textColor: "black",
  //   icon: "lucide:file-chart-column",
  //   date: "20 September 2024",
  //   description:
  //     "Percepat respons dalam menangani setiap masalah yang terjadi di sekolah",
  // },
  // "analysis-book": {
  //   title: "Buku Hasil Analisis",
  //   bgColor: "#F87B5E",
  //   textColor: "white",
  //   icon: "lucide:file-chart-column",
  //   date: "20 September 2024",
  //   description:
  //     "Menyajikan analisis untuk mendukung pengambilan keputusan yang tepat.",
  // },
  // "statistics-book": {
  //   title: "Karya Ilmiah",
  //   bgColor: "#2D8CFF",
  //   textColor: "white",
  //   icon: "lucide:file-chart-column",
  //   date: "20 September 2024",
  //   description:
  //     "menyajikan karya ilmiah pendidikan untuk mendukung pengambilan keputusan.",
  // },
  "school-dataset": {
    title: "Dataset Sekolah & Siswa",
    bgColor: "#2D8CFF",
    textColor: "white",
    icon: "lucide:file-chart-column",
    date: "20 September 2024",
    description:
      "Menyediakan informasi lengkap tentang data sekolah dan profil siswa.",
  },
  "school-chart": {
    title: "Grafik Sekolah",
    bgColor: "#2D8CFF",
    textColor: "white",
    icon: "lucide:file-chart-column",
    date: "20 September 2024",
    description:
      "Menyajikan data visual tentang jumlah sekolah, akreditasi, dan izin operasional.",
  },
  "student-chart": {
    title: "Grafik Siswa",
    bgColor: "#2D8CFF",
    textColor: "white",
    icon: "lucide:file-chart-column",
    date: "20 September 2024",
    description:
      "Menyajikan data visual tentang Persentasi Siswa dan Pertumbuhan Siswa",
  },
};

export const dataSMK: DataReport = {
  "monthly-report": {
    title: "Laporan Bulanan Sekolah",
    bgColor: "#2D8CFF",
    textColor: "white",
    icon: "lucide:file-chart-column",
    date: "20 September 2024",
    description:
      "Informasi bulanan tentang data guru, siswa, tenaga kependidikan, dan kurikulum.",
  },
  // "problem-monitoring": {
  //   title: "Monitoring Masalah",
  //   bgColor: "#FFE004",
  //   textColor: "black",
  //   icon: "lucide:file-chart-column",
  //   date: "20 September 2024",
  //   description:
  //     "Percepat respons dalam menangani setiap masalah yang terjadi di sekolah",
  // },
  "school-dataset": {
    title: "Dataset Sekolah & Siswa",
    bgColor: "#2D8CFF",
    textColor: "white",
    icon: "lucide:file-chart-column",
    date: "20 September 2024",
    description:
      "Menyediakan informasi lengkap tentang data sekolah dan profil siswa.",
  },
  "student-chart": {
    title: "Grafik Siswa",
    bgColor: "#2D8CFF",
    textColor: "white",
    icon: "lucide:file-chart-column",
    date: "20 September 2024",
    description:
      "Menyajikan data visual tentang Persentasi Siswa dan Pertumbuhan Siswa",
  },
};

export const dataGTK: DataReport = {
  "ptk-dataset": {
    title: "Dataset PTK",
    bgColor: "#2D8CFF",
    textColor: "white",
    icon: "lucide:file-chart-column",
    date: "20 September 2024",
    description:
      "Menyediakan informasi lengkap tentang data Pendidik dan Tenaga Kependidikan",
  },
  "retirement-projection": {
    title: "Proyeksi Pensiun",
    bgColor: "#2D8CFF",
    textColor: "white",
    icon: "lucide:file-chart-column",
    date: "20 September 2024",
    description:
      "Melihat proyeksi berapa lama lagi pendidik dan tenaga kependidikan akan memasuki masa purnabakti.",
  },
  "teacher-chart": {
    title: "Grafik Guru",
    bgColor: "#2D8CFF",
    textColor: "white",
    icon: "lucide:file-chart-column",
    date: "20 September 2024",
    description:
      "Menyajikan data visual tentang jumlah Pendidik dan Tenaga Kependidikan",
  },
};

export const FormMahasiswaMock: UserUploadType = {
  kartu_keluarga: {
    title: "Kartu Keluarga",
    label: "Kartu Keluarga",
    sub_label: "File .pdf Maksimal 2 Mb",
  },
  ktp: {
    title: "KTP orang tua",
    label: "KTP orang tua",
    sub_label: "File .pdf Maksimal 2 Mb",
  },
  ktp_cpm: {
    title:
      "KTP Calon Penerima Manfaat / KIS (Kartu Induk Siswa) / Surat Keterangan KTP Sementara",
    label:
      "KTP Calon Penerima Manfaat / KIS (Kartu Induk Siswa) / Surat Keterangan KTP Sementara",
    sub_label: "File .pdf Maksimal 2 Mb",
  },
  norek: {
    title: "Scan Halaman Depan Buku Tabungan Format PDF",
    label: "Scan Halaman Depan Buku Tabungan Format PDF",
    sub_label: "File .pdf Maksimal 2 Mb",
  },
  pembayaran: {
    title: "Scan Bukti Pembayaran UKT Format PDF",
    label: "Scan Bukti Pembayaran UKT Format PDF",
    sub_label: "File .pdf Maksimal 2 Mb",
  },
  auto_debet: {
    title: "Scan Bukti Pembayaran UKT Format PDF",
    label: "Scan Bukti Pembayaran UKT Format PDF",
    sub_label: "File .pdf Maksimal 2 Mb",
  },
  aktif_siswa: {
    title:
      "Surat Keterangan dari Kepala Sekolah yang menyatakan bahwa siswa masih aktif belajar di SMA/SMK/SLB",
    label:
      "Surat Keterangan dari Kepala Sekolah yang menyatakan bahwa siswa masih aktif belajar di SMA/SMK/SLB",
    sub_label: "",
  },
  aktif_kuliah: {
    title: "Kartu Tanda Mahasiswa dan Surat keterangan aktif kuliah",
    label: "Kartu Tanda Mahasiswa dan Surat keterangan aktif kuliah",
    sub_label: "",
  },
  aktif_kuliah_snbp: {
    title:
      "Bukti diterima di perguruan tinggi melalui Jalur Seleksi Nasional Berdasarkan Prestasi (SNBP)",
    label:
      "Bukti diterima di perguruan tinggi melalui Jalur Seleksi Nasional Berdasarkan Prestasi (SNBP)",
    sub_label: "",
  },
  aktif_kuliah_snbt: {
    title:
      "Bukti keterangan diterima di perguruan tinggi melalui Jalur Seleksi Nasional Berdasarkan Tes (SNBT)",
    label:
      "Bukti keterangan diterima di perguruan tinggi melalui Jalur Seleksi Nasional Berdasarkan Tes (SNBT)",
    sub_label: "",
  },
  aktif_kuliah_mandiri: {
    title:
      "Bukti keterangan diterima di perguruan tinggi melalui Jalur Mandiri Negeri/Swasta",
    label:
      "Bukti keterangan diterima di perguruan tinggi melalui Jalur Mandiri Negeri/Swasta",
    sub_label: "",
  },
  aktif_kuliah_baru: {
    title:
      "Surat keterangan lulus seleksi penerimaan mahasiswa baru (SNBP/SNBT/Mandiri)",
    label:
      "Surat keterangan lulus seleksi penerimaan mahasiswa baru (SNBP/SNBT/Mandiri)",
    sub_label: "",
  },
  finish: {
    title: "Surat keterangan proses penyelesaian studi",
    label: "Surat keterangan proses penyelesaian studi",
    sub_label: "",
  },
  akreditas: {
    title: "Salinan akreditasi program studi",
    label: "Salinan akreditasi program studi",
    sub_label: "File .pdf Maksimal 2 Mb",
  },
  commitment: {
    title:
      "Surat pernyataan bersedia mempertahankan prestasi akademik yang ditandatangani di atas materai Rp. 10.000",
    label:
      "Surat pernyataan bersedia mempertahankan prestasi akademik yang ditandatangani di atas materai Rp. 10.000",
    sub_label: "File .pdf Maksimal 2 Mb",
  },
  tidak_beasiswa: {
    title: "Surat pernyataan tidak menerima beasiswa lain",
    label: "Surat pernyataan tidak menerima beasiswa lain",
    sub_label: "File .pdf Maksimal 2 Mb",
  },
  surat_permohonan: {
    title: "Surat Permohonan Beasiswa ke Gubernur",
    label: "Surat Permohonan Beasiswa ke Gubernur",
    sub_label: "File .pdf Maksimal 2 Mb",
  },
  surat_keabsahan: {
    title: "Surat Pernyataan keaslian dokumen",
    label: "Surat Pernyataan keaslian dokumen",
    sub_label: "File .pdf Maksimal 2 Mb",
  },
  ukt_image: {
    title: "Bukti/Lampiran Nominal UKT Jurusan Yang di Daftar",
    label: "Bukti/Lampiran Nominal UKT Jurusan Yang di Daftar",
    sub_label: "File .pdf Maksimal 2 Mb",
  },
  transkip: {
    title: "KHS/Transkip terakhir legalisir",
    label: "KHS/Transkip terakhir legalisir",
  },
  sertifikat: {
    title: "Sertifikat / Piagam Kejuaraan",
    label: "Sertifikat / Piagam Kejuaraan",
  },
  afirmasi: {
    title:
      "Dokumen DTKS, P3KE/DTSEN, atau Surat Keterangan Tidak mampu dari lurah/Kepala Desa",
    label:
      "Dokumen DTKS, P3KE/DTSEN, atau Surat Keterangan Tidak mampu dari lurah/Kepala Desa",
  },
  home_image: {
    title: "Foto tampak depan rumah",
    label: "Foto tampak depan rumah",
    sub_label: "File .pdf Maksimal 2 Mb",
  },
};

export const dataSiswa: DataReport = {
  "proyeksi-sma": {
    title: "Proyeksi",
    bgColor: "#2D8CFF",
    textColor: "white",
    icon: "lucide:file-chart-column",
    date: "20 September 2024",
    description:
      "Menyediakan informasi lengkap tentang data Pendidik dan Tenaga Kependidikan",
  },
};

export const dataSPAB: DataReport = {
  "disaster-map": {
    title: "Peta Rawan Bencana",
    bgColor: "#2D8CFF",
    textColor: "white",
    icon: "lucide:file-chart-column",
    date: "20 September 2024",
    description:
      "menunjukkan area berisiko tinggi untuk mendukung kesiapsiagaan dan mitigasi bencana.",
  },
  "disaster-rekap": {
    title: "Rekap Kesiapsiagaan",
    bgColor: "#2D8CFF",
    textColor: "white",
    icon: "lucide:file-chart-column",
    date: "20 September 2024",
    description:
      "menunjukkan area berisiko tinggi untuk mendukung kesiapsiagaan dan mitigasi bencana.",
  },
  "disaster-report": {
    title: "Laporan Siaga Bencana",
    bgColor: "#2D8CFF",
    textColor: "white",
    icon: "lucide:file-chart-column",
    date: "20 September 2024",
    description:
      "menyajikan informasi cepat dan akurat tentang kesiapsiagaan Sekolah menghadapi bencana.",
  },
  // "disaster-certification": {
  //   title: "Sertifikasi Kebencanaan",
  //   bgColor: "#2D8CFF",
  //   textColor: "white",
  //   icon: "lucide:file-chart-column",
  //   date: "20 September 2024",
  //   description:
  //     "Data PTK yang memiliki kompetensi dalam penanganan dan mitigasi bencana.",
  // },
};

export const dataTeacher: DataReport = {
  "disaster-report": {
    title: "Laporan Bulanan Sekolah",
    bgColor: "#2D8CFF",
    textColor: "white",
    icon: "lucide:file-chart-column",
    date: "20 September 2024",
    description:
      "menunjukkan area berisiko tinggi untuk mendukung kesiapsiagaan dan mitigasi bencana.",
  },
};
export const dataPPID: DataReport = {
  "public-complaint": {
    title: "Laporan Masyarakat",
    bgColor: "#2D8CFF",
    textColor: "white",
    icon: "lucide:file-chart-column",
    date: "20 September 2024",
    description:
      "menunjukkan area berisiko tinggi untuk mendukung kesiapsiagaan dan mitigasi bencana.",
  },
  "school-report": {
    title: "Laporan Sekolah",
    bgColor: "#2D8CFF",
    textColor: "white",
    icon: "lucide:file-chart-column",
    date: "20 September 2024",
    description:
      "menunjukkan area berisiko tinggi untuk mendukung kesiapsiagaan dan mitigasi bencana.",
  },
  news: {
    title: "Berita Sekolah",
    bgColor: "#2D8CFF",
    textColor: "white",
    icon: "lucide:file-chart-column",
    date: "20 September 2024",
    description:
      "menunjukkan area berisiko tinggi untuk mendukung kesiapsiagaan dan mitigasi bencana.",
  },
  video: {
    title: "Video Sekolah",
    bgColor: "#2D8CFF",
    textColor: "white",
    icon: "lucide:file-chart-column",
    date: "20 September 2024",
    description:
      "menunjukkan area berisiko tinggi untuk mendukung kesiapsiagaan dan mitigasi bencana.",
  },
  storage: {
    title: "Storage",
    bgColor: "#2D8CFF",
    textColor: "white",
    icon: "lucide:file-chart-column",
    date: "20 September 2024",
    description:
      "menunjukkan area berisiko tinggi untuk mendukung kesiapsiagaan dan mitigasi bencana.",
  },
  "karya-ilmiah": {
    title: "Karya Ilmiah",
    bgColor: "#2D8CFF",
    textColor: "white",
    icon: "lucide:file-chart-column",
    date: "20 September 2024",
    description:
      "menunjukkan area berisiko tinggi untuk mendukung kesiapsiagaan dan mitigasi bencana.",
  },
  "website-sekolah": {
    title: "Website Sekolah",
    bgColor: "#2D8CFF",
    textColor: "white",
    icon: "lucide:file-chart-column",
    date: "20 September 2024",
    description:
      "menunjukkan area berisiko tinggi untuk mendukung kesiapsiagaan dan mitigasi bencana.",
  },
  "sekolah-terkini": {
    title: "Sekolah Terkini",
    bgColor: "#2D8CFF",
    textColor: "white",
    icon: "lucide:file-chart-column",
    date: "20 September 2024",
    description:
      "menunjukkan area berisiko tinggi untuk mendukung kesiapsiagaan dan mitigasi bencana.",
  },
};
export const dataSPMB: DataReport = {
  "rekap-data": {
    title: "Rekap Data Penerimaan Peserta Didik Baru",
    bgColor: "#2D8CFF",
    textColor: "white",
    icon: "lucide:file-chart-column",
    date: "",
    description:
      "Menampilkan rekap data penerimaan peserta didik baru sebagai dasar perencanaan dan pengambilan keputusan.",
  },
  "quota-recap": {
    title: "Kuota Final Penerimaan Peserta Didik Baru",
    bgColor: "#2D8CFF",
    textColor: "white",
    icon: "lucide:file-chart-column",
    date: "",
    description:
      "Menampilkan Kuota Final penerimaan peserta didik baru sebagai dasar perencanaan dan pengambilan keputusan.",
  },
  "sisa-kuota": {
    title: "Sisa Kuota Penerimaan Peserta Didik baru",
    bgColor: "#2D8CFF",
    textColor: "white",
    icon: "lucide:file-chart-column",
    date: "20 September 2024",
    description:
      "menunjukkan area berisiko tinggi untuk mendukung kesiapsiagaan dan mitigasi bencana.",
  },
  // proyeksi: {
  //   title: "Proyeksi Penerimaan Peserta Didik Baru",
  //   bgColor: "#2D8CFF",
  //   textColor: "white",
  //   icon: "lucide:file-chart-column",
  //   date: "20 September 2024",
  //   description:
  //     "menunjukkan area berisiko tinggi untuk mendukung kesiapsiagaan dan mitigasi bencana.",
  // },
  // infografis: {
  //   title: "Infografis Penerimaan Peserta Didik Baru",
  //   bgColor: "#2D8CFF",
  //   textColor: "white",
  //   icon: "lucide:file-chart-column",
  //   date: "20 September 2024",
  //   description:
  //     "menunjukkan area berisiko tinggi untuk mendukung kesiapsiagaan dan mitigasi bencana.",
  // },
  // "list-announcement": {
  //   title: "List Data Calon Peserta Didik Yang Dinyatakan Lulus",
  //   bgColor: "#2D8CFF",
  //   textColor: "white",
  //   icon: "lucide:file-chart-column",
  //   date: "20 September 2024",
  //   description:
  //     "menunjukkan area berisiko tinggi untuk mendukung kesiapsiagaan dan mitigasi bencana.",
  // },
  // "list-empty-quota": {
  //   title: "List Data Calon Peserta Didik Yang Mengisi Kuota Kosong",
  //   bgColor: "#2D8CFF",
  //   textColor: "white",
  //   icon: "lucide:file-chart-column",
  //   date: "20 September 2024",
  //   description:
  //     "menunjukkan area berisiko tinggi untuk mendukung kesiapsiagaan dan mitigasi bencana.",
  // },
  // "rekap-tahapan": {
  //   title: "Detail Rekap Tahapan",
  //   bgColor: "#2D8CFF",
  //   textColor: "white",
  //   icon: "lucide:file-chart-column",
  //   date: "20 September 2024",
  //   description:
  //     "menunjukkan area berisiko tinggi untuk mendukung kesiapsiagaan dan mitigasi bencana.",
  // },
  // "map-data": {
  //   title: "Data Peta",
  //   bgColor: "#2D8CFF",
  //   textColor: "white",
  //   icon: "lucide:file-chart-column",
  //   date: "20 September 2024",
  //   description:
  //     "menunjukkan area berisiko tinggi untuk mendukung kesiapsiagaan dan mitigasi bencana.",
  // },
};
export const dataBeraniCerdas: DataReport = {
  // infografis: {
  //   title: "Infografis Penerimaan Beasiswa Berani Cerdas",
  //   bgColor: "#2D8CFF",
  //   textColor: "white",
  //   icon: "lucide:file-chart-column",
  //   date: "20 September 2024",
  //   description:
  //     "menunjukkan area berisiko tinggi untuk mendukung kesiapsiagaan dan mitigasi bencana.",
  // },
  // "verification-progress": {
  //   title: "Progress Pemeriksaan Berani Cerdas",
  //   bgColor: "#2D8CFF",
  //   textColor: "white",
  //   icon: "lucide:file-chart-column",
  //   date: "20 September 2024",
  //   description:
  //     "menunjukkan area berisiko tinggi untuk mendukung kesiapsiagaan dan mitigasi bencana.",
  // },
  // "dataset-peserta": {
  //   title: "Dataset Peserta",
  //   bgColor: "#2D8CFF",
  //   textColor: "white",
  //   icon: "lucide:file-chart-column",
  //   date: "20 September 2024",
  //   description:
  //     "Menyediakan informasi lengkap tentang data Pendidik dan Tenaga Kependidikan",
  // },
  // "data-rekap": {
  //   title: "Data Rekap",
  //   bgColor: "#2D8CFF",
  //   textColor: "white",
  //   icon: "lucide:file-chart-column",
  //   date: "20 September 2024",
  //   description:
  //     "Menyediakan informasi lengkap tentang data Pendidik dan Tenaga Kependidikan",
  // },
  "monitor-pelaksanaan": {
    title: "Monitor Pelaksanaan",
    bgColor: "#2D8CFF",
    textColor: "white",
    icon: "lucide:file-chart-column",
    date: "20 September 2024",
    description:
      "Menyediakan informasi lengkap tentang data Pendidik dan Tenaga Kependidikan",
  },
  infografis: {
    title: "Infografis",
    bgColor: "#2D8CFF",
    textColor: "white",
    icon: "lucide:file-chart-column",
    date: "20 September 2024",
    description:
      "Menyediakan informasi lengkap tentang data Pendidik dan Tenaga Kependidikan",
  },
  "data-analitik": {
    title: "Data Analitik",
    bgColor: "#2D8CFF",
    textColor: "white",
    icon: "lucide:file-chart-column",
    date: "20 September 2024",
    description:
      "Menyediakan informasi lengkap tentang data Pendidik dan Tenaga Kependidikan",
  },
};

export const menu_executive = {
  text: "Nusacita",
  items: {
    // storage: {
    //   text: "Storage",
    //   data: dataBeraniCerdas,
    // },
    // "dataset-peserta": {
    //   text: "Dataset Peserta",
    //   data: dataBeraniCerdas,
    // },
    // "dataset-univercity": {
    //   text: "Dataset Universitas",
    //   data: dataBeraniCerdas,
    // },
    "dataset-periode": {
      text: "Dataset Periode",
      data: dataBeraniCerdas,
      href: "/executive/dataset-periode",
    },
    // "dataset-cpm": {
    //   text: "Dataset CPM",
    //   data: dataBeraniCerdas,
    //   href: "/executive/dataset-cpm",
    // },

    // "dataset-admin": {
    //   text: "Dataset Admin",
    //   data: dataBeraniCerdas,
    // },
    // "data-analitik": {
    //   text: "Data Analitik",
    //   data: dataBeraniCerdas,
    // },
  },
};

export const menu_dukcapil = {
  text: "Dukcapil",
  items: {
    dashboard: {
      text: "Dashboard",
      data: dataBeraniCerdas,
      href: "/dukcapil",
    },
    verify: {
      text: "Verifikasi NIK",
      data: dataBeraniCerdas,
      href: "/dukcapil/verify",
    },
  },
};

export const menu_superadmin = {
  text: "Superadmin",
  items: {
    dashboard: {
      text: "Dashboard",
      data: dataBeraniCerdas,
      href: "/superadmin",
    },
    leaderboard: {
      text: "Leaderboard",
      data: dataBeraniCerdas,
      href: "/superadmin/leaderboard",
    },
    "status-verif": {
      text: "Status Verifikasi",
      data: dataBeraniCerdas,
      href: "/superadmin/status-verif",
    },
    "status-verval": {
      text: "Status Verval",
      data: dataBeraniCerdas,
      href: "/superadmin/status-verval",
    },
    "export-excel": {
      text: "Eksport Excel",
      data: dataBeraniCerdas,
      href: "/superadmin/export-excel",
    },
    "user-admin": {
      text: "Admin Unit Kerja",
      data: dataBeraniCerdas,
      href: "/superadmin/user-admin",
    },
    "user-cpm": {
      text: "User CPM",
      data: dataBeraniCerdas,
      href: "/superadmin/user-cpm",
    },
    universitas: {
      text: "Universitas",
      data: dataBeraniCerdas,
      href: "/superadmin/universitas",
    },
    "universitas-monitoring": {
      text: "Monitoring Universitas",
      data: dataBeraniCerdas,
      href: "/superadmin/universitas-monitoring",
    },
  },
};

export const menu_universitas = {
  text: "Universitas",
  items: {
    dashboard: {
      text: "Dashboard",
      data: dataBeraniCerdas,
      href: "/universitas",
    },
    // fakultas: {
    //   text: "Fakultas",
    //   data: dataBeraniCerdas,
    //   href: "/universitas/fakultas",
    // },
    // user: {
    //   text: "Admin Fakultas",
    //   data: dataBeraniCerdas,
    //   href: "/universitas/user",
    // },
    // "requirement-universitas": {
    //   text: "Persyaratan Umum",
    //   data: dataBeraniCerdas,
    //   href: "/verification/universitas",
    // },
    // "requirement-periode": {
    //   text: "Verifikasi",
    //   data: dataBeraniCerdas,
    //   href: "/verification/periode",
    // },
    // mahasiswa: {
    //   text: "Mahasiswa",
    //   data: dataBeraniCerdas,
    // },
  },
};

export const menu_kesra = {
  text: "Kesra",
  items: {
    // dashboard: {
    //   text: "Dashboard",
    //   data: dataBeraniCerdas,
    //   href: "/kesra",
    // },
    verification: {
      text: "Verifikasi",
      data: dataBeraniCerdas,
      href: "/verification/periode",
    },
    // periode: {
    //   text: "Periode",
    //   data: dataBeraniCerdas,
    //   href: "/kesra/periode",
    // },
    universitas: {
      text: "Universitas",
      data: dataBeraniCerdas,
      href: "/kesra/universitas",
    },
  },
};

export const menu_city = {
  text: "Kab/Kota",
  items: {
    dashboard: {
      text: "Dashboard",
      data: dataBeraniCerdas,
    },
    periode: {
      text: "Periode",
      data: dataBeraniCerdas,
      href: "/verification/periode",
    },
  },
};

export const menu_csreuload = {
  text: "CS Reupload",
  items: {
    dashboard: {
      text: "CS Reuload",
      data: dataBeraniCerdas,
      href: "/csreupload",
    },
  },
};

export const menu_disdik = {
  text: "Disdik",
  items: {
    dashboard: {
      text: "Dashboard",
      data: dataBeraniCerdas,
      href: "/disdik",
    },
    "requirement-periode": {
      text: "Periode",
      data: dataBeraniCerdas,
      href: "/verification/periode",
    },
    "requirement-universitas": {
      text: "Persyaratan Umum",
      data: dataBeraniCerdas,
      href: "/verification/universitas",
    },
  },
};

export const menu_dinsos = {
  text: "Dinsos",
  items: {
    dashboard: {
      text: "Dashboard",
      data: dataBeraniCerdas,
    },
    "requirement-periode": {
      text: "Periode",
      data: dataBeraniCerdas,
      href: "/verification/periode",
    },
  },
};

export const menu_helpdesk = {
  text: "Helpdesk",
  items: {
    dashboard: {
      text: "Data Bermasalah",
      data: dataBeraniCerdas,
      href: "/helpdesk",
    },
    tickets: {
      text: "Tiket Pengaduan",
      data: dataBeraniCerdas,
      href: "/helpdesk/tickets",
    },
  },
};

export const getMenuSidebar = (role: string): MenuSidebar => {
  return {
    executive: menu_executive,
    dukcapil: menu_dukcapil,
    kesra: menu_kesra,
    csreupload: menu_csreuload,
    beasiswa_city: menu_city,
    disdik: menu_disdik,
    dinsos: menu_dinsos,
    superadmin: menu_superadmin,
    universitas: menu_universitas,
    helpdesk: menu_helpdesk,
  };
};

// const { user } = useAuth();
export const menuSidebar = getMenuSidebar("admin");
