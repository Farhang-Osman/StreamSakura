import { FC, useEffect, useState } from 'react';
import axios from 'axios';

const log: boolean = true;

function endUrlWithSlash(url: string) {
  return url.endsWith('/') ? url : `${url}/`;
}

const BASE_URL = endUrlWithSlash(import.meta.env.VITE_BACKEND_URL as string);

// Axios instance
const axiosInstance = axios.create({
  baseURL: undefined,
  timeout: 10000,
  headers: {
    'X-API-Key': '', // Assuming your API expects the key in this header
  },
});

// interface FetchOptions {
//   type?: string;
//   season?: string;
//   format?: string;
//   sort?: string[];
//   genres?: string[];
//   id?: string;
//   year?: string;
//   status?: string;
// }

async function fetchFromProxy(url: string) {
  try {
    // Proceed with the network request
    const response = await axiosInstance.get(url, {});

    // After obtaining the response, verify it for errors or empty data
    if (
      response.status !== 200 ||
      (response.data.statusCode && response.data.statusCode >= 400)
    ) {
      const errorMessage = response.data.message || 'Unknown server error';
      throw new Error(
        `Server error: ${
          response.data.statusCode || response.status
        } ${errorMessage}`,
      );
    }

    if (log) {
      console.log(url);
      console.log('response.data', response.data);
      console.log('response.data.currentPage', response.data.currentPage);
      console.log('response.data.hasNextPage', response.data.hasNextPage);
    }

    return response.data.results; // Return the newly fetched data
  } catch (error) {
    console.log(error);
    throw error; // Rethrow the error for the caller to handle
  }
}

async function fetchList(
  type: string,
  page: number = 1,
  perPage: number = 16,
  // options: FetchOptions = {},
) {
  // let cacheKey: string;
  let url: string;
  const params = new URLSearchParams({
    page: page.toString(),
    perPage: perPage.toString(),
  });

  if (
    ['TopRated', 'Trending', 'Popular', 'TopAiring', 'Upcoming'].includes(type)
  ) {
    url = `${BASE_URL}meta/anilist/${type.toLowerCase()}`;

    // if (type === 'TopRated') {
    //   options = {
    //     type: 'ANIME',
    //     sort: ['["SCORE_DESC"]'],
    //   };
    //   url = `${BASE_URL}meta/anilist/advanced-search?type=${options.type}&sort=${options.sort}&`;
    // } else if (type === 'Popular') {
    //   options = {
    //     type: 'ANIME',
    //     sort: ['["POPULARITY_DESC"]'],
    //   };
    //   url = `${BASE_URL}meta/anilist/advanced-search?type=${options.type}&sort=${options.sort}&`;
    // } else if (type === 'Upcoming') {
    //   const season = getNextSeason(); // This will set the season based on the current month
    //   options = {
    //     type: 'ANIME',
    //     season: season,
    //     year: year.toString(),
    //     status: 'NOT_YET_RELEASED',
    //     sort: ['["POPULARITY_DESC"]'],
    //   };
    //   url = `${BASE_URL}meta/anilist/advanced-search?type=${options.type}&status=${options.status}&sort=${options.sort}&season=${options.season}&year=${options.year}&`;
    // } else if (type === 'TopAiring') {
    //   const season = getCurrentSeason(); // This will set the season based on the current month
    //   options = {
    //     type: 'ANIME',
    //     season: season,
    //     year: year.toString(),
    //     status: 'RELEASING',
    //     sort: ['["POPULARITY_DESC"]'],
    //   };
    //   url = `${BASE_URL}meta/anilist/advanced-search?type=${options.type}&status=${options.status}&sort=${options.sort}&season=${options.season}&year=${options.year}&`;
    // }
  } else {
    url = `${BASE_URL}meta/anilist/${type.toLowerCase()}`;
    // params already defined above
  }

  return fetchFromProxy(`${url}?${params.toString()}`);
}

const fetchTrendingAnime = (page: number, perPage: number) =>
  fetchList('Trending', page, perPage);

interface Anime {
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
interface HomeCarousalProps {
  data: Anime[];
  loading: boolean;
  error: string | null;
}

const HomeCarousal: FC<HomeCarousalProps> = ({
  data = [],
  // loading,
  // error,
}) => {
  return (
    <>
      {data.map(
        ({
          id,
          title,
          cover,
          image,
          description,
          status,
          rating,
          genres,
          totalEpisodes,
          duration,
          type,
        }) => (
          <div>
            id={id}
            title={title.english}
            cover= {cover}
            image= {image}
            description= {description}
            status= {status}
            rating= {rating}
            genres= {genres}
            totalEpisodes= {totalEpisodes}
            duration= {duration}
            type= {type}
          </div>
        ),
      )}
    </>
  );
};

const Home = () => {
  useEffect(() => {
    document.title = 'StreamSakura | watch anime online';
  }, []);

  const [state, setState] = useState({
    trendingAnime: [] as Anime[],
    error: null as string | null,
    loading: {
      trending: true,
    },
  });

  useEffect(() => {
    const fetchCount = 21;
    const fetchData = async () => {
      try {
        setState((prevState) => ({ ...prevState, error: null }));
        const [trending] = await Promise.all([
          fetchTrendingAnime(1, fetchCount),
        ]);
        setState((prevState) => ({ ...prevState, trendingAnime: trending }));
      } catch {
        setState((prevState) => ({
          ...prevState,
          error: 'An unexpected error occurred',
        }));
      } finally {
        setState((prevState) => ({
          ...prevState,
          loading: {
            trending: false,
          },
        }));
      }
    };

    fetchData();
  }, []);

  return (
    <div className='flex flex-col gap-4 mx-auto my-0 max-w-full'>
      <HomeCarousal
        data={state.trendingAnime}
        loading={state.loading.trending}
        error={state.error}
      />
    </div>
  );
};

export default Home;
