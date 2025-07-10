import { FC, useEffect, useState } from 'react';
import { tvInfo } from './Watch';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { CardItem2 } from '../components/shared/CardItem2';

interface searchResults {
  data: [
    {
      id: string;
      title: string;
      japanese_title: string;
      poster: string;
      duration: string;
      tvInfo: tvInfo;
    },
  ];
  totalPage: number;
}

interface filters {
  type?: 'all' | 'movie' | 'tv' | 'ova' | 'ona' | 'special' | 'music';
  status?: 'all' | 'finished_airing' | 'currently_airing' | 'not_yet_aired';
  rated?: 'all' | 'g' | 'pg' | 'pg_13' | 'r' | 'r_plus' | 'rx';
  score?: 'all' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  season?: 'all' | 'spring' | 'summer' | 'fall' | 'winter';
  language?: 'all' | 'sub' | 'dub' | 'sub_dub';
  genres?: string;
  sort?:
    | 'default'
    | 'name_az'
    | 'recently_added'
    | 'recently_updated'
    | 'score'
    | 'name_az'
    | 'released_date'
    | 'most_watched';
  page?: number;
  sy?: number;
  sm?: number;
  sd?: number;
  ey?: number;
  em?: number;
  ed?: number;
  keyword?: string;
}

const genres = {
  // 12, 33, 34 <<< unknown genres
  1: 'Action',
  2: 'Adventure',
  3: 'Cars',
  4: 'Comedy',
  5: 'Dementia',
  6: 'Demons',
  7: 'Mystery',
  8: 'Drama',
  9: 'Ecchi', //
  10: 'Fantasy',
  11: 'Game',
  13: 'Historical',
  14: 'Horror',
  15: 'Kids',
  16: 'Magic',
  17: 'Martial arts',
  18: 'Mecha',
  19: 'Music', //
  20: 'Parody',
  21: 'Samurai',
  22: 'Romance',
  23: 'School',
  24: 'Sci-Fi',
  25: 'Shoujo',
  26: 'Shoujo Ai', //
  27: 'Shounen',
  28: 'Shounen Ai', //
  29: 'Space',
  30: 'Sports',
  31: 'Super Power',
  32: 'Vampire',
  35: 'Harem', //
  36: 'Slice of Life',
  37: 'Supernatural',
  38: 'Military',
  39: 'Police',
  40: 'Psychological',
  41: 'Thriller',
  42: 'Seinen',
  43: 'Josei',
  44: 'Isekai',
};

const Search: FC = () => {
  const location = useLocation();

  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  const [resp, setResp] = useState<searchResults>();
  const [filterParams, setFilterParams] = useState<filters>();
  const [selectedgGenres, setSelectedgGenres] = useState<string>();

  async function fetchFilterResults(filterParams: filters) {
    try {
      const res = await axios.get(`${BASE_URL}/api/filter`, {
        params: filterParams,
      });

      console.log(res.data.results);

      if (res.status !== 200 || res.status >= 400) {
        throw new Error(`Server Error: ${res.status}`);
      } else if (Object.keys(res.data.results).length === 0) {
        navigate('/404');
      }

      return res.data.results;
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchSearchResults(query: string) {
    try {
      const res = await axios.get(`${BASE_URL}/api/search`, {
        params: { keyword: query },
      });

      if (res.status !== 200 || res.status >= 400) {
        throw new Error(`Server Error: ${res.status}`);
      } else if (Object.keys(res.data.results).length === 0) {
        navigate('/404');
      }

      return res.data.results;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get('q');

    const fetchResults = async () => {
      if (q === '') {
        const res = await fetchSearchResults('a');
        setResp(res);
      } else {
        const res = await fetchSearchResults(q as string);
        setResp(res);
      }
    };
    fetchResults();
  }, [location]);

  const handleGenres = (genreNumber: string) => {
    if (selectedgGenres === undefined) {
      setSelectedgGenres(genreNumber);
    } else {
      const genresList: string[] = selectedgGenres.split(',');
      const genreIndex = genresList.indexOf(genreNumber);

      if (genreIndex !== -1) {
        genresList.splice(genreIndex, 1);
        console.log('genresList.splice(genreIndex, 1)');
        setSelectedgGenres(genresList.join(','));
      } else {
        genresList.push(genreNumber);
        console.log('>>>  genresList.push(genreNumber)  <<<');
        setSelectedgGenres(genresList.join(','));
      }
    }
    // setSelectedgGenres(selectedgGenres ? [selectedgGenres, g].join(',') : g);
  };
  useEffect(() => {
    console.log('genres', selectedgGenres);
  }, [selectedgGenres]);

  // console.log('genres ', selectedgGenres);

  return (
    <div className='flex'>
      <div className='flex flex-col w-1/5 h-full bg-gray-300 rounded-sm'>
        <h3 className='text-center label'>Filters</h3>
        <div>
          <div className='flex'>
            <p>type: </p>
            <p>all</p>
          </div>
          <div className='flex'>
            <p>status: </p>
            <p>all</p>
          </div>
          <div className='flex'>
            <p>rated: </p>
            <p>all</p>
          </div>
          <div className='flex'>
            <p>score: </p>
            <p>all</p>
          </div>
          <div className='flex'>
            <p>season: </p>
            <p>all</p>
          </div>
          <div className='flex'>
            <p>language: </p>
            <p>all</p>
          </div>
          <div className='flex'>
            <p>start date: </p>
            <p>all</p>
          </div>
          <div className='flex'>
            <p>end date: </p>
            <p>all</p>
          </div>
          <div className='flex'>
            <p>sort: </p>
            <p>all</p>
          </div>
        </div>
      </div>
      <div className='relative w-3/5 transition card-grid-layout duration-0'>
        {resp?.data.map((anime) => (
          <CardItem2
            key={anime.id}
            anime={{
              id: anime.id,
              image: anime.poster,
              englishTitle: anime.title,
              japaneseTitle: anime.japanese_title,
              type: anime.tvInfo.showType,
            }}
          />
        ))}
      </div>
      <div className='flex flex-col gap-2 p-1 w-1/5 h-full bg-gray-300 rounded-sm'>
        <h3 className='text-center label'>Genres</h3>

        <ul className='flex flex-wrap gap-2 justify-center'>
          {Object.entries(genres).map(([id, name]) => (
            <li
              onClick={() => handleGenres(id)}
              key={id}
              className='px-1 hover:cursor-pointer bg-gray-200 rounded-sm border w-fit'
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Search;
