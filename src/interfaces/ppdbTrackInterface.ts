export interface Ppdb_tracks {
  id: number;
  icon: string;
  color: string;
  name: string;
  is_end: string;
  description: string;
  short_description: string;
  created_at: string;
  updated_at: string;
}

export interface PpdbUserRequirement {
  status: string;
  // Tambahkan properti lain yang mungkin ada di dalam objek ini
}

export interface DocumentType {
  file_url: string;
  status?: string | null;
  description?: string | null;
}

export interface DocumentTypeSpesifik {
  file_url?: string | null;
  status?: string | null;
  description?: string | null;
}

// export interface Ppdb_requirement {
//   track: string;
//   ijazah: DocumentType;
//   akta_kelahiran: DocumentType;
//   ktp_wali: DocumentType;
//   kartu_keluarga: DocumentType;
//   stjm: DocumentType;
//   agreement: string;
//   // Zonasi
//   home_image: DocumentType;
//   home_sign: string;
//   // Afirmasi
//   afirmasi: DocumentType;
//   // Perpindahan
//   perpindahan: DocumentType;
//   // Prestasi
//   raport: DocumentType;
//   sertifikat: DocumentType;
// }

export interface Ppdb_requirement {
  track: string;
  ijazah: DocumentType;
  akta_kelahiran: DocumentType;
  ktp_wali: DocumentType;
  kartu_keluarga: DocumentType;
  stjm: DocumentType;
  raport: DocumentType;
  agreement: string;
  is_special: string;
  home_image: DocumentTypeSpesifik;
  home_sign?: string | null;
  afirmasi: DocumentTypeSpesifik;
  perpindahan: DocumentTypeSpesifik;
  // sertifikat: DocumentTypeSpesifik;
  ppdb_special_quota_id?: string | null;
  lat: number;
  lng: number;
  city: string;
  ukt: string;
  universitas: string;
  point: number;
  province: string;
  distrik: string;
  sub_distrik: string;
  rt: string;
  rw: string;
  address: string;
  home_number: string;
  // semester_1: number;
  // semester_2: number;
  // semester_3: number;
  // semester_4: number;
  // semester_5: number;
  aktif_kuliah: DocumentTypeSpesifik;
  akreditas: DocumentTypeSpesifik;
  finish: DocumentTypeSpesifik;
  khs: DocumentTypeSpesifik;
  ukt_image: DocumentTypeSpesifik;
  tidak_beasiswa: DocumentTypeSpesifik;
  transkip: DocumentTypeSpesifik;
  sertifikat: DocumentTypeSpesifik;
  snbp: DocumentTypeSpesifik;
  commitment: DocumentTypeSpesifik;
  snbt: DocumentTypeSpesifik;
}

export interface Ppdb_status {
  id: number;
  date: string;
  description: string;
  hidden: string;
  is_end: string;
  name: string;
  ppdb_track_id: number;
  ppdb_user_id: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface Ppdb_requirement_status {
  status: boolean;
  track_id: string;
  track_name: string;
}

export interface Ppdb_user_registration_check {
  status: string;
  // Tambahkan properti lain yang mungkin ada di dalam objek ini
}
