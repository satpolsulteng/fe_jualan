export interface SchoolCourseInterface {
  id: string;
  school_id: string;
  course_id: string;
  course: CourseInterface;
}

export interface SchoolPositionInterface {
  id: string;
  school_id: string;
  asnsmart_position_id: string;
  kebutuhan: number;
  pns: number;
  nonpns: number;
  total: number;
  kelebihan: number;
  kekurangan: number;
  status: string;
  asnsmart_position: PositionInterface;
}

export interface PositionInterface {
  id: string;
  name: string;
}

export interface CourseInterface {
  id: string;
  type: string;
  kode: string;
  name: string;
  curriculum_id: string;
  course_category_id: string;
  degree_10: number;
  degree_11: number;
  degree_12: number;
  grade: string;
}

export interface Level {
  [key: string]: string;
}
