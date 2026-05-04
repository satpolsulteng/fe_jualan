import { SchoolInterface } from "./schoolInterface";

// Tipe data untuk form
export interface PpdbUser {
  id: string;
  file_64?: string | null;
  name: string;
  nisn: string;
  nik: string;
  education: string;
  school_origin: string;
  graduation_year: string;
  birthday: string;
  birthplace: string;
  gender: string;
  email: string;
  phone: string;
  phone_parent: string;
  province: string;
  city?: string | null;
  distrik: string;
  sub_distrik: string;
  rt: string;
  rw: string;
  address: string;
  home_number: string;
  lat: number;
  lng: number;
  img_url?: string;
  status_reregistration: string;
  ppdb_track_status?: string;
  rank_track: string;
  rank_max: string;
  status_dinas: string;
}

export interface User {
  id: string;
  email: string;
  role: string;
  username: string;
}

export interface City {
  id: string;
  name: string;
}

export interface PpdbUserRegistration {
  id: string;
  name: string;
  ppdb_registration_id: string;
  ppdb_track: PpdbTrack;
  address: string;
  ppdb_track_id: string;
  ppdb_track_status: string;
  school: SchoolInterface;
  school_id: string;
  point: string;
  lat: string;
  lng: string;
}

export interface PpdbTrack {
  id: number;
  name: string;
}

export interface UploadFile {
  file_64: string;
}

export interface PpdbUserStatus {
  date: string;
  registration_number: string;
  school: string;
  track: string;
  status_dinsos: string;
}

export interface PpdbUserLog {
  name: string;
  status: string;
  date: string;
  description: string;
  file_url: string;
  type: string;
  storage: Storage;
  updated_at: string;
  created_at: string;
}

export interface Storage {
  file_url: string;
  updated_at: string;
  created_at: string;
}
