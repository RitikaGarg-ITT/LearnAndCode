export interface Article {
  article_id: number;
  source_id: number;
  title: string;
  description: string;
  content: string;
  url: string;
  image_url: string;
  category_id: number;
  published_at: string;
  likes?: number;
  dislikes?: number;
}
