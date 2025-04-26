import { useEffect, useState } from 'react';
import axios from 'axios';
import { Anime, CardGrid } from '../index';
import { HomeCarousel } from '../index';

const log: boolean = false;

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

const Home = () => {
  const [activeTab, setActiveTab] = useState(() => {
    const time = Date.now();
    const savedData = localStorage.getItem('home tab');
    if (savedData) {
      const { tab, timestamp } = JSON.parse(savedData);
      if (time - timestamp < 300000) {
        return tab;
      } else {
        localStorage.removeItem('home tab');
      }
    }

    return 'trending';
  });

  useEffect(() => {
    document.title = 'StreamSakura | watch anime online';
  }, []);

  useEffect(() => {
    const time = new Date().getTime();
    const tabData = JSON.stringify({ tab: activeTab, timestamp: time });
    localStorage.setItem('home tab', tabData);
  }, [activeTab]);

  const [state, setState] = useState({
    trendingAnime: [] as Anime[],
    popularAnime: [] as Anime[],
    topAnime: [] as Anime[],
    error: null as string | null,
    loading: {
      trending: true,
      popular: true,
      topRated: true,
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
            popular: false,
            topRated: false,
          },
        }));
      }
    };

    fetchData();
  }, []);

  const renderCardGrid = (
    animeData: Anime[],
    isloading: boolean,
    hasError: boolean,
  ) => (
    <div>
      {isloading || hasError ? (
        <div></div>
      ) : (
        <CardGrid
          animeData={animeData}
          hasNextPage={false}
          onLoadMore={() => {}}
        />
      )}
    </div>
  );

  const handleTabClick = (tabName: string): void => {
    return setActiveTab(tabName);
  };

  return (
    <div className='flex flex-col gap-4 mx-auto my-0'>
      <HomeCarousel
        data={state.trendingAnime}
        loading={state.loading.trending}
        error={state.error}
      />
      {/* <EpisodeCard /> */}
      <div className='flex flex-col gap-8 w-full'>
        <div className='flex flex-wrap gap-2 justify-center w-full'>
          <div
            className={`${activeTab === 'trending' ? 'bg-blue-700' : 'bg-gray-900 hover:bg-blue-900'}
            relative m-0 p-4 text-white transition-colors duration-100 ease-in-out text-sm border-none font-bold rounded-lg cursor-pointer`}
            title='Trending Tab'
            onClick={() => handleTabClick('trending')}
          >
            TRENDING
          </div>
          <div
            className={`${activeTab === 'popular' ? 'bg-blue-700' : 'bg-gray-900 hover:bg-blue-900'}
            relative m-0 p-4 text-white transition-colors duration-100 ease-in-out text-sm border-none font-bold rounded-lg cursor-pointer`}
            title='Popular Tab'
            onClick={() => handleTabClick('popular')}
          >
            POPULAR
          </div>
          <div
            className={`${activeTab === 'topRated' ? 'bg-blue-700' : 'bg-gray-900 hover:bg-blue-900'}
            relative m-0 p-4 text-white transition-colors duration-100 ease-in-out text-sm border-none font-bold rounded-lg cursor-pointer`}
            title='Top Rated Tab'
            onClick={() => handleTabClick('topRated')}
          >
            TOP RATED
          </div>
        </div>
        <div>
          {activeTab === 'trending' &&
            renderCardGrid(
              state.trendingAnime,
              state.loading.trending,
              !!state.error,
            )}
          {activeTab === 'popular' &&
            renderCardGrid(
              state.popularAnime,
              state.loading.popular,
              !!state.error,
            )}
          {activeTab === 'topRated' &&
            renderCardGrid(
              state.topAnime,
              state.loading.topRated,
              !!state.error,
            )}
        </div>
      </div>
      <p>window.innerWidth={window.innerWidth}</p>
    </div>
  );
};

export default Home;
