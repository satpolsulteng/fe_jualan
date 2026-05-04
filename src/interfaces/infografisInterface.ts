export interface RecapCityItem {
  total_cpm: number;
  total_dana: number;
}

export type RecapCity = Record<string, RecapCityItem>;

export interface RecapTotal {
  "Total Dana Dibayarkan": string;
  "Total Pengembalian Dana": string;
  "Total Akun yang telah dibayarkan": string;
}

export interface RecapTrack {
  Jenis: Record<string, string>;
  Detail: Record<string, string>;
  Kategori: Record<string, string>;
}

export interface RecapProgress {
  Terverifikasi: string;
  "Belum diperiksa": string;
  "Perlu Perbaikan Data": string;
  "Tidak Lolos Verifikasi": string;
}

export type DetailProgress = Record<string, Record<string, string>>;

export interface UniversityKategori {
  total_cpm: number;
  total_dana: number;
}

export interface UniversityRecap {
  kategori: Record<string, UniversityKategori>;
}

export interface UniversityProgress {
  "Berkas Sah": string;
  "Perbaikan Data": string;
  "Belum diperiksa": string;
  "Tidak Memenuhi Syarat": string;
}

export interface UniversityItem {
  rekap: UniversityRecap;
  progress: UniversityProgress;
}

export type University = Record<string, UniversityItem>;

export interface InfographicsRecap {
  rekap_city: RecapCity;
  rekap_total: RecapTotal;
  rekap_track: RecapTrack;
  rekap_progress: RecapProgress;
  detail_progress: DetailProgress;
  "Perguruan Tinggi": University;
}

export interface InfographicsData {
  data_infografis: InfographicsRecap;
}
