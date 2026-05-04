export interface NewsInterface {
  id: number;
  name: string;
  title: string;
  slug: string;
  school_name: string;
  img_url: string;
  description_raw: string;
  viewer: number;
  created_at: string;
}

export interface VideoInterface {
  id: number;
  name: string;
  school_id: string;
  school_name: string;
  is_school: string;
  type: string;
  title: string;
  description: string;
  category: string;
  category_id: string;
  views: number;
  youtube_id: string;
  duration: string;
  published_at: string;
}

export interface JournalInterface {
  id: number;
  name: string;
}
