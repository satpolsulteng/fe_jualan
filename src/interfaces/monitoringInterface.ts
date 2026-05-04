// import { Pagination } from "@/interfaces/commonInterface";
export interface PaginationLink {
  url: string | null;
  label: string;
  page: number | null;
  active: boolean;
}

export interface Pagination<T> {
  current_page: number;
  data: T[];

  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;

  links: PaginationLink[];

  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface Examiner {
  name: string;
  role: string;
}

export interface ProcessStatus {
  status: "COMPLETED" | "IN_PROGRESS" | "PENDING" | "ERROR";
  label: string;
  examiners: Examiner[];
}

export interface UniversityItem {
  id: number;
  name: string;
  status: string;
  location: string | null;
  area: string | null;
  status_kerjasama: string;
  status_kirim: string;
  status_terhubung: string;
  status_final: string;
  status_distribusi: string;
  total_2025: number;
  total_kembali: number;
  total_lampiran: number;
  total_dibayarkan: number;
  total_dibayarkan_afirmasi: number;
  total_dibayarkan_prestasi: number;
  total_verifikasi: number;
  telah_ditransfer: number;
  telah_ditransfer_afirmasi: number;
  telah_ditransfer_prestasi: number;
  created_at: string;
  updated_at: string;
}

export interface UniversityArea {
  area: string;
  total_pt: number;
  total_negeri: string;
  total_swasta: string;
}

export interface MonitoringData {
  last_updated: string;
  contact: string;
  contact_arr: Record<string, string>;
  anggaran: {
    afirmasi: string;
    prestasi: string;
  };
  peserta: {
    calon: {
      afirmasi: number;
      prestasi: number;
    };
    penerima: {
      afirmasi: string;
      prestasi: string;
    };
  };
  status_universitas: {
    belum_terhubung: string;
    belum_kerjasama: string;
    belum_dikirim: string;
    telah_kembali: string;
    telah_dibayarkan: string;
  };
  universitas: Pagination<UniversityItem>;
  universitas_area: UniversityArea[];
  progress: {
    kesimpulan: string;
    jumlah: number;
  }[];
  monitoring_periode: DataPeriodePembayaran[];
  history?: any;
  reupload?: any;
}

export interface MonitoringPeriodeData {
  cpm: Pagination<CpmData>;
}

export interface DataPeriodePembayaran {
  id: number;
  bc_universitas_id: number;
  bc_universitas_name: string;
  name: string;
  status: string;
  metode_penyaluran: string;
  total_cpm: number;
  total_nominal: number;
  progress: Record<string, number> | null;
  created_at: string;
  updated_at: string;
}

export interface ParticipantData {
  nama: string;
  kode: string;
  jalur: string;
  fakultas: string;
  prodi: string;
  avatar: string;
}

export interface CpmGenapData {
  id: number;
  registration_id: string;
  name: string;
  nim: string;
  status_kemahasiswaan: string;
  keterangan_status: string | null;
  prodi_univ: string;
  kategori: string;
  ipk_ganjil_2025: string;
  nominal_ukt_univ: number;
  status_penerima: string;
  keterangan: string | null;
  keterangan_disdik: string | null;
  verifikasi_admin: string | null;
  periode: string;
  bc_periode_pembayaran_univ_id: number;
  status_verif: string;
  kesimpulan: string;
  status_login: string;
  created_at: string;
  updated_at: string;
  data_periode_pembayaran: DataPeriodePembayaran;
}

export interface Participant {
  no: number;
  peserta: ParticipantData;
  pemeriksaan: ProcessStatus;
  pembayaran: ProcessStatus;
  pembaruan_data: ProcessStatus;
  nominal_ukt: number;
  pemeriksaan_periode: number;
  pembayaran_periode: number;
}

export interface PeriodeItem {
  name: string;
  total_cpm: number;
  total_nominal: number;
  progress: Record<string, number>;
}

export interface CpmData {
  id: number;
  name: string;
  registration_id: string | null;
  universitas_name: string;
  track: string;
  ipk_ganjil_2025: string;
  status_penerima: string;
  program_studi_univ: string;
  prodi_univ: string;
  kategori: string;
  jalur_pendaftaran: string;
  track_detail: string | null;
  date: string;
  img_url: string | null;
  nominal_ukt: number;
  keterangan: string;
  keterangan_disdik: string;
  nominal_ukt_univ: number;
  status_pembayaran: string;
  status: string | null;
  created_at: string;
  updated_at: string;
}

export interface UniversityDetail {
  last_updated: string;
  universitas: UniversityItem;
  anggaran: {
    afirmasi: number;
    prestasi: number;
  };
  peserta: {
    afirmasi: number;
    prestasi: number;
  };
  calon_peserta: {
    afirmasi: number;
    prestasi: number;
  };
  periode: PeriodeItem[];
  data_cpm: any;
}

export interface MonitoringDownloadData {
  last_updated: string;
  anggaran: {
    afirmasi: string;
    prestasi: string;
  };
  calon_peserta: {
    afirmasi: string;
    prestasi: string;
  };
  peserta: {
    afirmasi: string;
    prestasi: string;
  };
  status_universitas: {
    belum_terhubung: string;
    belum_kerjasama: string;
    belum_dikirim: string;
    telah_kembali: string;
  };
  periode: PeriodeItem[];
  universitas: UniversityItem;
  data_cpm: CpmData[];
}

export interface MonitoringAreaData {
  location: Array<{ location: string }>;
  universitas: UniversityItem[];
  last_updated: string;
  contact: string;
  univ_rekap: {
    negeri: string | null;
    swasta: string | null;
  };
  anggaran: {
    afirmasi: string | null;
    prestasi: string | null;
  };
  peserta: {
    afirmasi: string | null;
    prestasi: string | null;
  };
  status_universitas: {
    belum_terhubung: string | null;
    belum_kerjasama: string | null;
    belum_dikirim: string | null;
    telah_kembali: string | null;
  };
}
