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
    | 'recently_added'
    | 'recently_updated'
    | 'score'
    | 'name_az'
    | 'released_date'
    | 'most_watched';
  page?: number;
  sy?: 'Year' | number;
  sm?: 'Month' | number;
  sd?: 'Day' | number;
  ey?: 'Year' | number;
  em?: 'Month' | number;
  ed?: 'Day' | number;
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
  const [filterParams, setFilterParams] = useState<filters | undefined>();
  const [selectedgGenres, setSelectedgGenres] = useState<string>();

  async function fetchFilterResults(filterParams: filters | undefined) {
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

      setResp(res.data.results);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get('q');

    const fetchResults = async () => {
      if (q === '') {
        fetchFilterResults({ keyword: undefined });
      } else {
        fetchFilterResults({ keyword: q as string });
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
        setSelectedgGenres(genresList.join(','));
      } else {
        genresList.push(genreNumber);
        setSelectedgGenres(genresList.join(','));
      }
    }
    // setSelectedgGenres(selectedgGenres ? [selectedgGenres, g].join(',') : g);
  };

  useEffect(() => {
    setFilterParams({ ...filterParams, genres: selectedgGenres });
    console.log('genres', selectedgGenres);
    console.log('filterParams', filterParams);
  }, [selectedgGenres]);

  useEffect(() => {
    console.log('2nd filterParams', filterParams);
    console.log('filterParams?.type ', filterParams?.type);
  }, [filterParams]);

  const handleFilters = (type: string, value: any) => {
    if (type === 'type') {
      if (value === 'all') {
        setFilterParams({ ...filterParams, type: undefined });
      } else if (value === 'default') {
        setFilterParams({ ...filterParams, type: undefined });
        console.log(`else if (value === 'default'`, 'the value is ', value);
      } else {
        setFilterParams({ ...filterParams, type: value });
      }
    } else if (type === 'status') {
      if (value === 'all') {
        setFilterParams({ ...filterParams, status: undefined });
      } else if (value === 'default') {
        setFilterParams({ ...filterParams, status: undefined });
        console.log(`else if (value === 'default'`, 'the value is ', value);
      } else {
        setFilterParams({ ...filterParams, status: value });
      }
    } else if (type === 'score') {
      if (value === 'all') {
        setFilterParams({ ...filterParams, score: undefined });
      } else if (value === 'default') {
        setFilterParams({ ...filterParams, score: undefined });
        console.log(`else if (value === 'default'`, 'the value is ', value);
      } else {
        setFilterParams({ ...filterParams, score: value });
      }
    } else if (type === 'season') {
      if (value === 'all') {
        setFilterParams({ ...filterParams, season: undefined });
      } else if (value === 'default') {
        setFilterParams({ ...filterParams, season: undefined });
        console.log(`else if (value === 'default'`, 'the value is ', value);
      } else {
        setFilterParams({ ...filterParams, season: value });
      }
    } else if (type === 'language') {
      if (value === 'all') {
        setFilterParams({ ...filterParams, language: undefined });
      } else if (value === 'default') {
        setFilterParams({ ...filterParams, language: undefined });
        console.log(`else if (value === 'default'`, 'the value is ', value);
      } else {
        setFilterParams({ ...filterParams, language: value });
      }
    } else if (type === 'sort') {
      if (value === 'all') {
        setFilterParams({ ...filterParams, sort: undefined });
      } else if (value === 'default') {
        setFilterParams({ ...filterParams, sort: undefined });
        console.log(`else if (value === 'default'`, 'the value is ', value);
      } else {
        setFilterParams({ ...filterParams, sort: value });
      }
    }

    // for Start Date and End Date
    if (type === 'sy') {
      if (value === 'Year') {
        setFilterParams({ ...filterParams, sy: undefined });
      } else {
        setFilterParams({ ...filterParams, sy: value });
      }
    } else if (type === 'sm') {
      if (value === 'Month') {
        setFilterParams({ ...filterParams, sm: undefined });
      } else {
        setFilterParams({ ...filterParams, sm: value });
      }
    } else if (type === 'sd') {
      if (value === 'Day') {
        setFilterParams({ ...filterParams, sd: undefined });
      } else {
        setFilterParams({ ...filterParams, sd: value });
      }
    } else if (type === 'ey') {
      if (value === 'Year') {
        setFilterParams({ ...filterParams, ey: undefined });
      } else {
        setFilterParams({ ...filterParams, ey: value });
      }
    } else if (type === 'em') {
      if (value === 'Month') {
        setFilterParams({ ...filterParams, em: undefined });
      } else {
        setFilterParams({ ...filterParams, em: value });
      }
    } else if (type === 'ed') {
      if (value === 'Day') {
        setFilterParams({ ...filterParams, ed: undefined });
      } else {
        setFilterParams({ ...filterParams, ed: value });
      }
    }
  };

  return (
    <div className='flex'>
      <div className='flex flex-col w-1/5 h-full bg-gray-300 rounded-sm'>
        <h3 className='text-center label'>Filters</h3>
        <div>
          <div className='flex'>
            <p>type: </p>
            {/* {filterParams?.type === undefined ? <p>all</p> : <p>any</p>} */}
            <select
              name='type'
              id='type'
              onChange={(e) => handleFilters('type', e.target.value)}
            >
              <option value='all'>all</option>
              <option value='movie'>movie</option>
              <option value='tv'>tv</option>
              <option value='ova'>ova</option>
              <option value='ona'>ona</option>
              <option value='special'>special</option>
              <option value='music'>music</option>
            </select>
          </div>
          <div className='flex'>
            <p>status: </p>
            <select
              name='status'
              id='status'
              onChange={(e) => handleFilters('status', e.target.value)}
            >
              <option value='all'>all</option>
              <option value='finished_airing'>finished_airing</option>
              <option value='currently_airing'>currently_airing</option>
              <option value='not_yet_aired'>not_yet_aired</option>
            </select>
          </div>
          <div className='flex'>
            <p>rated: </p>
            <select
              name='rated'
              id='rated'
              onChange={(e) => handleFilters('rated', e.target.value)}
            >
              <option value='all'>all</option>
              <option value='G'>G</option>
              <option value='PG'>PG</option>
              <option value='PG_13'>PG_13</option>
              <option value='R'>R</option>
              <option value='r_plus'>r_plus</option>
              <option value='RX'>RX</option>
            </select>
          </div>
          <div className='flex'>
            <p>score: </p>
            <select
              name='score'
              id='score'
              onChange={(e) => handleFilters('score', e.target.value)}
            >
              <option value='all'>all</option>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
              <option value='6'>6</option>
              <option value='7'>7</option>
              <option value='8'>8</option>
              <option value='9'>9</option>
              <option value='10'>10</option>
            </select>
          </div>
          <div className='flex'>
            <p>season: </p>
            <select
              name='season'
              id='season'
              onChange={(e) => handleFilters('season', e.target.value)}
            >
              <option value='all'>all</option>
              <option value='spring'>spring</option>
              <option value='summer'>summer</option>
              <option value='fall'>fall</option>
              <option value='winter'>winter</option>
            </select>
          </div>
          <div className='flex'>
            <p>language: </p>
            <select
              name='language'
              id='language'
              onChange={(e) => handleFilters('language', e.target.value)}
            >
              <option value='all'>all</option>
              <option value='sub'>sub</option>
              <option value='dub'>dub</option>
              <option value='sub_dub'>sub_dub</option>
            </select>
          </div>
          <div className='flex'>
            <p>start date: </p>
            <select
              name='sy'
              id='sy'
              onChange={(e) => handleFilters('sy', e.target.value)}
            >
              <option key='Year' value='Year'>
                Year
              </option>
              {Array.from(
                { length: new Date().getFullYear() - 1916 },
                (_, i) => new Date().getFullYear() - i,
              ).map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <select
              name='sm'
              id='sm'
              onChange={(e) => handleFilters('sm', e.target.value)}
            >
              <option key='Month' value='Month'>
                Month
              </option>
              {Array.from({ length: 12 }, (_, i) => i + 1).map((Month) => (
                <option key={Month} value={Month}>
                  {Month}
                </option>
              ))}
            </select>
            <select
              name='sd'
              id='sd'
              onChange={(e) => handleFilters('sd', e.target.value)}
            >
              <option key='Day' value='Day'>
                Day
              </option>
              {Array.from({ length: 31 }, (_, i) => i + 1).map((Day) => (
                <option key={Day} value={Day}>
                  {Day}
                </option>
              ))}
            </select>
          </div>
          <div className='flex'>
            <p>end date: </p>
            <select
              name='ey'
              id='ey'
              onChange={(e) => handleFilters('ey', e.target.value)}
            >
              <option key='Year' value='Year'>
                Year
              </option>
              {Array.from(
                { length: new Date().getFullYear() - 1916 },
                (_, i) => new Date().getFullYear() - i,
              ).map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <select
              name='em'
              id='em'
              onChange={(e) => handleFilters('em', e.target.value)}
            >
              <option key='Month' value='Month'>
                Month
              </option>
              {Array.from({ length: 12 }, (_, i) => i + 1).map((Month) => (
                <option key={Month} value={Month}>
                  {Month}
                </option>
              ))}
            </select>
            <select
              name='ed'
              id='ed'
              onChange={(e) => handleFilters('ed', e.target.value)}
            >
              <option key='Day' value='Day'>
                Day
              </option>
              {Array.from({ length: 31 }, (_, i) => i + 1).map((Day) => (
                <option key={Day} value={Day}>
                  {Day}
                </option>
              ))}
            </select>
          </div>
          <div className='flex'>
            <p>sort: </p>
            <select
              name='sort'
              id='sort'
              onChange={(e) => handleFilters('sort', e.target.value)}
            >
              <option value='default'>default</option>
              <option value='recently_added'>recently_added</option>
              <option value='recently_updated'>recently_updated</option>
              <option value='score'>score</option>
              <option value='name_az'>name_az</option>
              <option value='released_date'>released_date</option>
              <option value='most_watched'>most_watched</option>
            </select>
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
              className='px-1 bg-gray-200 rounded-sm border hover:cursor-pointer w-fit'
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
      <button
        className='bg-red-300 hover:cursor-pointer'
        onClick={() => {
          if (filterParams) fetchFilterResults(filterParams);
        }}
      >
        apply
      </button>
    </div>
  );
};

export default Search;
