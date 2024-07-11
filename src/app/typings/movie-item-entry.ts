export interface MovieItemEntry {
  id: string;
  title: string;
  duration: string;
  directors: string[];
  mainActors: string[];
  datePublished: string;
  ratingValue: number;
  bestRating: number;
  worstRating: number;
  genres: { id: string; title: string }[];
}
