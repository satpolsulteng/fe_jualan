
import { CpmGenapData } from "@/interfaces/monitoringInterface";

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


export interface CpmData {
  id: number;
  name: string;
  registration_id: string | null;
  universitas_name: string;
  bc_track_id: string;
  bc_track_name: string;
  bc_track_category: string;
  track: string;
  track_detail: string | null;
  date: string;
  img_url: string | null;
  nominal_ukt: number | null;
  fakultas: string | null;
  program_studi: string | null;
  status: string | null;
  created_at: string;
  updated_at: string;
}

export interface AdminData {
  id: number;
  name: string;
  position: string;
  type: string;
  created_at: string;
  updated_at: string;
}

export interface PeriodeData {
  id: number;
  name: string;
  type: string;
  status: string;
  announcement: string;
  url: string | null;
  rekap_cpm: string | null;
  rekap_dana: string | null;
  date_send: string | null;
  data_back: string | null;
  created_at: string;
  updated_at: string;
}

export interface LandingRekapData {
  dana_tersalurkan: number;
  jumlah_mahasiswa: number;
}

export interface LandingPageData {
  data_cpm: Pagination<CpmData>;
  data_periode: PeriodeData[];
  rekap: LandingRekapData;
  contact_arr: Record<string, string>;
}

export interface AdminListData {
  data_admin: Pagination<AdminData>;
}

export interface CpmDetailPeriode {
  [key: string]: {
    title: string;
    status: string;
    date: string;
    log: {
      name: string;
      description: string;
      date: string;
    }[];
    log_univ: {
      name: string;
      description: string;
      date: string;
    };
  };
}

export interface CpmDetailData {
  data_cpm: CpmData;
  data_cpm_genap: CpmGenapData;
  data_periode: CpmDetailPeriode;
}

export type UniversityStatus =
  | "Belum terhubung"
  | "Sudah terhubung"
  | "Belum kerjasama"
  | "Sudah kerjasama"
  | "Belum kembali"
  | "Telah kembali"
  | "Belum dibayarkan"
  | "Telah dibayarkan";
