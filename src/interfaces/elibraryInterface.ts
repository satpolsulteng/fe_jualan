import { Category } from "./commonInterface";
import { OfficerInterface } from "./officerInterface";

export interface Journal {
  id: string;
  school_id: string;
  title: string;
  slug: string;
  img_url: string;
  file_url: string;
  description: string;
  asnsmart_officer_name: string;
  created_at: string;
  category: Category;
}

export interface AnalysisBook {
  id: string;
  title: string;
  slug: string;
  img_url: string;
  file_url: string;
  created_at: string;
  category: Category;
  officer: OfficerInterface;
}
