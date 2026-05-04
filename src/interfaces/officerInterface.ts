export interface OfficerInterface {
  id: string;
  name: string;
  address: string;
  school_id: string;
  education: string;
  studi: string;
  ijazah_url: string;
  sk_pembagian_tugas_url: string;
  asnsmart_department_sub_id: string;
  asnsmart_education: Education;
  asnsmart_position: Position;
  start_at: string;
  type_ptk: string;
  type_officer: string;
  nip: string;
  gender: string;
  asnsmart_officer_training: Officer_training[];
}

export interface Officer_training {
  id: string;
  name: string;
  asnsmart_officer_id: string;
  date: string;
  file_path: string;
  file_url: string;
  asnsmart_officer: OfficerInterface;
}

export interface Education {
  [key: string]: string;
}

export interface Position {
  [key: string]: string;
}

export interface Officer_department_sub {
  [key: string]: string;
}
