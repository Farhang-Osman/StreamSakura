import { useEffect, useState } from 'react';
import { HomeCarousel } from '../components/Home/HomeCarousel';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { tvInfo } from './Watch';
import { HomeVerticalSlide } from '../components/Home/HomeVerticalSlides';
import { SideBar } from '../components/shared/sideBar';
import { GiTv } from 'react-icons/gi';
import { CardGrid } from '../components/Cards/CardGrid';
import { IoCheckmarkDoneCircle } from 'react-icons/io5';

export interface spotlights {
  id: string;
  data_id?: number;
  poster: string;
  title?: string;
  japanese_title?: string;
  description?: string;
  tvInfo?: tvInfo;
}

export interface HomeAnimeInfo {
  id: string;
  data_id?: number;
  poster?: string;
  title?: string;
  japanese_title?: string;
  description?: string;
  number?: number;
  tvInfo?: tvInfo;
  adultContent?: boolean;
}

interface HomeInterface {
  success: true;
  results: {
    spotlights?: spotlights[];
    trending?: HomeAnimeInfo[];
    topTen?: {
      today?: HomeAnimeInfo;
      week?: HomeAnimeInfo;
      month?: HomeAnimeInfo;
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
  // useEffect(() => {
  //   document.title = 'StreamSakura | watch anime online';
  // }, []);

  const navigate = useNavigate();

  const BASE_URL = import.meta.env.VITE_BACKEND_URL;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [homeData, setHomeData] = useState<HomeInterface | undefined>();
  const [activeTab, setActiveTab] = useState((): string => {
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

    return 'topUpcoming';
  });

  useEffect(() => {
    const time = new Date().getTime();
    const tabData = JSON.stringify({ tab: activeTab, timestamp: time });
    localStorage.setItem('home tab', tabData);
  }, [activeTab]);

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

  const renderCardGrid = (
    data: HomeAnimeInfo[],
    // hasNextPage?: boolean,
    // onLoadMore?: void,
    isLoading: boolean,
  ) => (
    <div>
      <CardGrid
        data={data}
        hasNextPage={false}
        onLoadMore={() => {}}
        isLoading={isLoading}
      />
    </div>
  );

  return (
    <div className='flex flex-col gap-4 mx-auto my-0'>
      <HomeCarousel
        data={homeData?.results?.spotlights}
        isLoading={isLoading}
        // error={state}
      />
      <HomeVerticalSlide
        data={homeData?.results?.trending}
        isLoading={isLoading}
        // error={state}
      />
      {/* <EpisodeCard /> */}
      <div className='flex gap-4 max-lg:flex-col'>
        <div className='flex flex-col gap-4 min-lg:mt-3 min-lg:flex-4/5'>
          <div className='flex flex-wrap gap-2 justify-center w-full'>
            <h3
              className={`${activeTab === 'topUpcoming' ? 'bg3' : 'border border-[var(--color-bg3)]'}
             label  transition-colors duration-100 ease-in-out text1 cursor-pointer`}
              title='Top Upcoming Tab'
              onClick={() => setActiveTab('topUpcoming')}
            >
              Top Upcoming
            </h3>
            <div
              className={`${activeTab === 'mostPopular' ? 'bg3' : 'border border-[var(--color-bg3)]'}
            label  transition-colors duration-100 ease-in-out text1 cursor-pointer`}
              title='Most Popular Tab'
              onClick={() => setActiveTab('mostPopular')}
            >
              Most Popular
            </div>
            <div
              className={`${activeTab === 'mostFavorite' ? 'bg3' : 'border border-[var(--color-bg3)]'}
            label  transition-colors duration-100 ease-in-out text1 cursor-pointer`}
              title='Most Favorite Tab'
              onClick={() => setActiveTab('mostFavorite')}
            >
              Most Favorite
            </div>
          </div>
          <div>
            {activeTab === 'topUpcoming' &&
              renderCardGrid(
                homeData?.results?.topUpcoming as HomeAnimeInfo[],
                isLoading,
              )}
            {activeTab === 'mostPopular' &&
              renderCardGrid(
                homeData?.results?.mostPopular as HomeAnimeInfo[],
                isLoading,
              )}
            {activeTab === 'mostFavorite' &&
              renderCardGrid(
                homeData?.results?.mostFavorite as HomeAnimeInfo[],
                isLoading,
              )}
          </div>
        </div>
        <div className='grid grid-cols-1 gap-8 max-lg:grid-cols-2 max-lg:gap-4 max-md:grid-cols-1 max-md:gap-8 h-fit'>
          <SideBar
            animeData={homeData?.results?.topAiring || []}
            title='Top Airing'
            icon={<GiTv className='size-9' />}
            isLoading={isLoading}
          />

          <SideBar
            animeData={homeData?.results?.latestCompleted || []}
            title='Latest Completed'
            icon={<IoCheckmarkDoneCircle className='size-9' />}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
