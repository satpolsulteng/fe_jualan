import { SchoolInterface } from "./schoolInterface";

export interface StudentInterface {
  id: string;
  name: string;
  nisn: string;
  class: string;
  gender: string;
  school: SchoolInterface;
}
