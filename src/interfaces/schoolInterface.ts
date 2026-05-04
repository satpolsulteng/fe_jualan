import { ReportDisasterSchool } from "./reportInterface";

export interface SchoolInterface {
  id: number;
  name: string;
  url: string;
  npsn: string;
  address: string;
  status: string;
  school_websekolah: SchoolWebsekolahInterface;
  distance: number;
  city: CityInterface;
  latitude: string;
  longitude: string;
  accreditation: string;
  report_disaster_school: ReportDisasterSchool;
  updated_at: string;
}

export interface MonthInterface {
  id: string;
  name: string;
}

export interface SchoolPositionInterface {
  id: number;
  school_id: string;
  asnsmart_position_id: string;
  asnsmart_position: AsnsmartPositionInterface;
  kekurangan: string;
  kelebihan: string;
  status: string;
}

export interface SchoolRecommendationInterface {
  lat?: number;
  lng?: number;
  is_smkswasta?: boolean;
  is_sma_swasta?: boolean;
  is_smk_negeri?: boolean;
  is_smk_swasta?: boolean;
}

export interface AsnsmartPositionInterface {
  id: string;
  name: string;
}

export interface SchoolWebsekolahInterface {
  id: number;
  name: string;
  url: string;
  head_name: string;
  head_position: string;
  logo_url: string;
}

export interface CityInterface {
  id: string;
  name: string;
  asnsmart_department_city: DepartmentCityInterface;
  teacher_count: number;
}

export interface DepartmentCityInterface {
  id: string;
  asnsmart_department_id: string;
  city_id: string;
  asnsmart_department: DepartmentInterface;
  city: CityInterface;
}

export interface DepartmentInterface {
  id: string;
  name: string;
  name_alias: string;
  asnsmart_organization_id: string;
  asnsmart_department_city: DepartmentCityInterface[];
  type: string;
  teacher_count: number;
}

export interface ReportInterface {
  id: number;
  name: string;
  about: string;
  address: string;
  asnsmart_department_sub_id: string;
  city_id: string;
  grade: string;
  kecamatan: string;
  npsn: string;
  school_websekolah: SchoolWebsekolahInterface;
  status: string;
  status_report: string;
  created_at: string;
  updated_at: string;
}

export interface SchoolRekapInterface {
  id?: string;
  school_id?: string;
  grade?: string;
  curriculum?: string;
  grade_id?: string;
  laki_laki?: number;
  perempuan?: number;
  islam?: number;
  kristen?: number;
  katolik?: number;
  hindu?: number;
  budha?: number;
  konghucu?: number;
  pk_l?: number;
  pk_p?: number;
  pm_l?: number;
  pm_p?: number;
  do_l?: number;
  do_p?: number;
  sakit?: number;
  izin?: number;
  alpa?: number;
}
