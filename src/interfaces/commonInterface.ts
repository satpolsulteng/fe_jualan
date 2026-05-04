export interface Pagination {
  current_page: number;
  data: any;
  last_page: number;
  total: number;
  from: number;
  to: number;
}

export interface StoragePhoto {
  user_photo: string;
  admin_photo: string;
}

export interface RequirementStatus {
  [key: string]: string;
}

export interface UserUploadType {
  [key: string]: {
    title?: string;
    label?: string;
    sub_label?: string;
  };
}

export interface PaginationInterface {
  current_page: number;
  last_page: number;
  total: number;
  from: number;
  to: number;
}

export interface PaginationData {
  data: [];
  current_page: number;
  last_page: number;
  total: number;
  from: number;
  to: number;
}

export interface Datatable {
  data: any;
  current_page: number;
  last_page: number;
  total: number;
  from: number;
  to: number;
}

export interface CommentInterface {
  id: string;
  category: string;
  users_id: string;
  description: string;
  post_id: string;
  created_at: string;
}

export interface ViewInterface {
  id: string;
  category: string;
  users_id: string;
  post_id: string;
}

export interface Option {
  label: string;
  value: string | number;
}

export interface ChartData {
  data: number[];
  label: string[];
  map?: any;
}

export const dataChart: ChartData = {
  data: [],
  label: [],
};

export interface Count {
  [key: string]: number;
}

export interface DataArray {
  [key: string]: string;
}

export interface DataArrayArr {
  [key: string]: {
    [key: string]: string;
  };
}

export interface Category {
  id: string;
  name: string;
}

export interface FormatImport {
  id: string;
  type: string;
  geojson: string;
  filename: string;
}
