export interface Episode {
  id: string;
  title: string;
  description: string | null;
  number: number;
  image: string;
  imageHash: string;
  airDate: string | null;
}

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
  releaseDate: number;
  totalEpisodes: number;
  rating: number;
  duration: number;
  genres: string[];
  episodes: Episode[];
  type: string;
}
