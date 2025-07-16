import { useEffect, useState } from 'react';
// import { GiTv } from 'react-icons/gi';
// import { GrAnnounce } from 'react-icons/gr';
// import { getNextSeason } from '../hooks/useTime';
// import {
//   fetchPopularAnime,
//   fetchTopAiringAnime,
//   fetchTopAnime,
//   fetchTrendingAnime,
//   fetchUpcomingSeason,
// } from '../hooks/useApi';
import { CardGrid, CardGridProps } from '../components/Cards/CardGrid';
import { HomeCarousel } from '../components/Home/HomeCarousel';
// import { HomeSideBar } from '../components/Home/HomeSideBar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { tvInfo } from './Watch';
// import { Anime } from '../hooks/animeInterface';

interface spotlights {
  id: string;
  data_id?: number;
  poster: string;
  title?: string;
  japanese_title?: string;
  description?: string;
  tvInfo?: {
    showType?: string;
    duration?: string;
    releaseDate?: string;
    quality?: string;
    episodeInfo?: [object];
  };
}

interface HomeAnimeInfo {
  id: string;
  data_id?: number;
  poster?: string;
  title?: string;
  japanese_title?: string;
  description?: string;
  tvInfo?: tvInfo;
  adultContent?: boolean;
}

interface HomeInterface {
  success: true;
  results: {
    spotlights?: spotlights[];
    trending?: [
      {
        id?: string;
        data_id?: number;
        number?: number;
        poster?: string;
        title?: string;
        japanese_title?: string;
      },
    ];
    topTen?: {
      today?: {
        id?: string;
        data_id?: number;
        number: string;
        title?: string;
        japanese_title?: string;
        poster?: string;
        tvInfo?: tvInfo;
      };
      week?: {
        id?: string;
        data_id?: number;
        number: string;
        title?: string;
        japanese_title?: string;
        poster?: string;
        tvInfo?: tvInfo;
      };
      month?: {
        id?: string;
        data_id?: number;
        number: string;
        title?: string;
        japanese_title?: string;
        poster?: string;
        tvInfo?: tvInfo;
      };
    };
    today?: [
      schedule?: [
        {
          id?: string;
          data_id?: number;
          title?: string;
          japanese_title?: string;
          releaseDate?: string;
          time?: string;
          episode_no?: number;
        },
      ],
    ];
    topAiring?: HomeAnimeInfo[];
    mostPopular?: HomeAnimeInfo[];
    mostFavorite?: HomeAnimeInfo[];
    latestCompleted?: HomeAnimeInfo[];
    latestEpisode?: HomeAnimeInfo[];
    topUpcoming?: HomeAnimeInfo[];
    recentlyAdded?: HomeAnimeInfo[];
    genres?: string[];
  };
}

const Home = () => {
  // const [activeTab, setActiveTab] = useState(() => {
  //   const time = Date.now();
  //   const savedData = localStorage.getItem('home tab');
  //   if (savedData) {
  //     const { tab, timestamp } = JSON.parse(savedData);
  //     if (time - timestamp < 300000) {
  //       return tab;
  //     } else {
  //       localStorage.removeItem('home tab');
  //     }
  //   }

  //   return 'trending';
  // });

  // useEffect(() => {
  //   document.title = 'StreamSakura | watch anime online';
  // }, []);

  // useEffect(() => {
  //   const time = new Date().getTime();
  //   const tabData = JSON.stringify({ tab: activeTab, timestamp: time });
  //   localStorage.setItem('home tab', tabData);
  // }, [activeTab]);

  // const [state, setState] = useState({
  //   trendingAnime: [] as Anime[],
  //   popularAnime: [] as Anime[],
  //   topAnime: [] as Anime[],
  //   topAiring: [] as Anime[],
  //   Upcoming: [] as Anime[],
  //   error: null as string | null,
  //   loading: {
  //     trending: true,
  //     popular: true,
  //     topRated: true,
  //     topAiring: true,
  //   },
  // });

  // useEffect(() => {
  //   const fetchCount = 21;
  //   const fetchData = async () => {
  //     try {
  //       setState((prevState) => ({ ...prevState, error: null }));
  //       const [trending, popular, topRated, topAiring, Upcoming] =
  //         await Promise.all([
  //           fetchTrendingAnime(1, fetchCount),
  //           fetchPopularAnime(1, fetchCount),
  //           fetchTopAnime(1, fetchCount),
  //           fetchTopAiringAnime(1, 6),
  //           fetchUpcomingSeason(1, 6),
  //         ]);
  //       setState((prevState) => ({
  //         ...prevState,
  //         trendingAnime: trending,
  //         popularAnime: popular,
  //         topAnime: topRated,
  //         topAiring: topAiring,
  //         Upcoming: Upcoming,
  //       }));
  //     } catch {
  //       setState((prevState) => ({
  //         ...prevState,
  //         error: 'An unexpected error occurred',
  //       }));
  //     } finally {
  //       setState((prevState) => ({
  //         ...prevState,
  //         loading: {
  //           trending: false,
  //           popular: false,
  //           topRated: false,
  //           topAiring: false,
  //           Upcoming: false,
  //         },
  //       }));
  //     }
  //   };

  //   fetchData();
  // }, []);

  // const renderCardGrid = (
  //   animeData: Anime[],
  //   isloading: boolean,
  //   hasError: boolean,
  // ) => (
  //   <div>
  //     {isloading || hasError ? (
  //       <div></div>
  //     ) : (
  //       <CardGrid
  //         animeData={animeData}
  //         hasNextPage={false}
  //         onLoadMore={() => {}}
  //       />
  //     )}
  //   </div>
  // );

  // const handleTabClick = (tabName: string): void => {
  //   return setActiveTab(tabName);
  // };

  const navigate = useNavigate();

  const BASE_URL = import.meta.env.VITE_BACKEND_URL;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [homeData, setHomeData] = useState<HomeInterface | undefined>();
  const [activeTab, setActiveTab] = useState<string>();

  async function fetchHomeData(): Promise<void> {
    try {
      setIsLoading(true);
      const res = await axios.get(`${BASE_URL}/api`);

      if (res.status !== 200 || res.status >= 400) {
        throw new Error(`Server Error: ${res.status}`);
      } else if (Object.keys(res.data.results).length === 0) {
        navigate('/404');
      }

      setIsLoading(false);
      setHomeData(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchHomeData();
  }, []);

  const HomeCarouselData = homeData?.results?.spotlights as spotlights[];

  const mostPopularData = homeData?.results?.mostPopular as HomeAnimeInfo[];
  const mostFavoriteData = homeData?.results?.mostFavorite as HomeAnimeInfo[];

  const renderCardGrid = (
    id: string | undefined,
    title: string | undefined,
    japanese_title: string | undefined,
    cover: string | undefined,
    type: string | undefined,
    hasNextPage?: any,
    onLoadMore?: any,
  ) => (
    <div>
      {isLoading ? (
        <div></div>
      ) : (
        <CardGrid
          key={id}
          id={id}
          title={title}
          japanese_title={japanese_title}
          cover={cover}
          type={type}
          hasNextPage={false}
          onLoadMore={() => {}}
        />
      )}
    </div>
  );

  return (
    <div className='flex flex-col gap-4 mx-auto my-0'>
      {isLoading !== true &&
        HomeCarouselData.map((item) => (
          <HomeCarousel
            id={item.id}
            title={item.title}
            japanese_title={item.japanese_title}
            cover={item.poster}
            description={item.description}
            duration={item.tvInfo?.duration}
            type={item.tvInfo?.showType}
            loading={isLoading}
            // error={state}
          />
        ))}
      {/* <EpisodeCard /> */}
      <div className='flex gap-8 max-lg:gap-12 max-lg:flex-col'>
        <div className='flex flex-col gap-4 min-lg:flex-4/5'>
          <div className='flex flex-wrap gap-2 justify-center w-full'>
            {/* <h3
              className={` label ${activeTab === 'trending' ? 'bg-blue-300' : 'bg-gray-200 hover:bg-blue-200'}
             transition-colors duration-100 ease-in-out cursor-pointer`}
              title='Trending Tab'
              onClick={() => setActiveTab('trending')}
            >
              TRENDING
            </h3> */}
            <div
              className={`${activeTab === 'MostPopular' ? 'bg-blue-300' : 'bg-gray-200 hover:bg-blue-200'}
            label transition-colors duration-100 ease-in-out cursor-pointer`}
              title='Popular Tab'
              onClick={() => setActiveTab('MostPopular')}
            >
              MostPopular
            </div>
            <div
              className={`${activeTab === 'MostFavorite' ? 'bg-blue-300' : 'bg-gray-200 hover:bg-blue-200'}
            label transition-colors duration-100 ease-in-out cursor-pointer`}
              title='Most Favorite Tab'
              onClick={() => setActiveTab('MostFavorite')}
            >
              Most Favorite
            </div>
          </div>
          <div>
            {/* {activeTab === 'trending' &&
              renderCardGrid(
                state.trendingAnime,
                state.loading.trending,
                !!state.error,
              )} */}
            {activeTab === 'MostPopular' &&
              mostPopularData.map((item) =>
                renderCardGrid(
                  item.id,
                  item.title,
                  item.japanese_title,
                  item.poster,
                  item.tvInfo?.showType,
                ),
              )}
            {activeTab === 'MostFavorite' &&
              mostFavoriteData.map((item) =>
                renderCardGrid(
                  item.id,
                  item.title,
                  item.japanese_title,
                  item.poster,
                  item.tvInfo?.showType,
                ),
              )}
          </div>
        </div>
        <div className='grid grid-cols-1 gap-10 max-lg:grid-cols-2 max-md:grid-cols-1 h-fit'>
          {/* <HomeSideBar
            animeData={state.topAiring}
            title='TOP AIRING'
            icon={<GiTv className='size-9' />}
          />
          <HomeSideBar
            animeData={state.Upcoming}
            title={`UPCOMING ${getNextSeason()}`}
            icon={<GrAnnounce className='size-9' />}
          /> */}
        </div>
      </div>
      <p>window.innerWidth={window.innerWidth}</p>
    </div>
  );
};

export default Home;
