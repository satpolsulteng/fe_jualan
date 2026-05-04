export interface BeraniCerdasInterface {
  id: string;
  name: string;
  nik: string;
  gender: string;
  ppdb_track_status: string;
  type_help: string;
  grade: string;
  email: string;
  phone: string;
  phone_parent: string;
  distrik: string;
  sub_distrik: string;
  rt: string;
  ukt: number;
  rw: string;
  address: string;
  home_number: string;
  birthplace: string;
  birthday: string;
  province: string;
  status_dinsos: string;
  status_disdik: string;
  city: string;
  prodi: string;
  universitas: string;
  ppdb_track: PpdbTrackInterface;
  ppdb_dukcapil: PpdbDukcapilInterface[];
  ppdb_dukcapil_one: PpdbDukcapilInterface;
}

export interface PeriodeInterface {
  id: string;
  name: string;
  ppdb_user_count: number;
  ppdb_user_verval_bermasalah_count: number;
  ppdb_user_verval_count: number;
  ppdb_user_verval_valid_count: number;
  status: string;
  announcement: string;
  status_bank: string;
  status_transfer_bank: string;
  status_univ: string;
}

export interface PpdbTrackInterface {
  id: number;
  name: string;
}

export interface PpdbDukcapilInterface {
  id: number;
  name: string;
  keterangan: string;
}
