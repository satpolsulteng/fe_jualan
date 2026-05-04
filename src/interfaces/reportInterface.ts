import { SchoolInterface } from "./schoolInterface";

export interface Category {
  id: string;
  name: string;
}

export interface ReportProblem {
  id: string;
  name: string;
  title: string;
  slug: string;
  background: string;
  description: string;
  description_raw: string;
  author_id: string;
  date: string;
  viewer: number;
  status: string;
  img_url: string;
  school: SchoolInterface;
  created_at: string;
  category: Category;
}

export interface PublicComplaint {
  id: string;
  report_id: string;
  timestamp: string;
  name: string;
  category: string;
  school_name: string;
  background: string;
  chronology: string;
  proof: string;
  impact: string;
  title: string;
  followup: string;
  url: string;
  public_complaint_status: PublicComplaintStatus;
}

export interface PublicComplaintStatus {
  id: string;
  name: string;
  status: string;
}

export interface ReportDisaster {
  id: string;
  description: string;
  school_id: string;
  report_disaster_school_detail: ReportDisasterSchoolDetail[];
  report_disaster_school_detail_one: ReportDisasterSchoolDetail;
}

export interface KrbStatus {
  id: string;
  name: string;
  category: string;
  wide: string;
  percen: string;
  status: string;
}

export interface KrbDisasterSchool {
  id: string;
  category: string;
  school_id: string;
  school: SchoolInterface;
}

export interface ReportDisasterSchool {
  id: string;
  school_id: string;
  progress: number;
  count: number;
  percen: number;
  status_report: string;
  school: SchoolInterface;
  created_at: string;
}

export interface ReportDisasterSchoolDetail {
  id: string;
  report_disaster_id: string;
  report_disaster_school_id: string;
  status: string;
}
