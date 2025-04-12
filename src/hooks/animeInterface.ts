export interface Anime {
  id: string;
  title: {
    romaji: string;
    english: string;
    native: string;
    userPreferred: string;
  };
  cover: string;
  image: string;
  description: string;
  status: string;
  totalEpisodes: number;
  rating: number;
  duration: number;
  genres: string[];
  type: string;
}
