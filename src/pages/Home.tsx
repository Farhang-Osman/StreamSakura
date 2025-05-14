import { useEffect, useState } from 'react';
import { GiTv } from 'react-icons/gi';
import { GrAnnounce } from 'react-icons/gr';
import { getNextSeason } from '../hooks/useTime';
import {
  fetchPopularAnime,
  fetchTopAiringAnime,
  fetchTopAnime,
  fetchTrendingAnime,
  fetchUpcomingSeason,
} from '../hooks/useApi';
import { CardGrid } from '../components/Cards/CardGrid';
import { HomeCarousel } from '../components/Home/HomeCarousel';
import { HomeSideBar } from '../components/Home/HomeSideBar';
import { Anime } from '../hooks/animeInterface';

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
    topAiring: [] as Anime[],
    Upcoming: [] as Anime[],
    error: null as string | null,
    loading: {
      trending: true,
      popular: true,
      topRated: true,
      topAiring: true,
    },
  });

  useEffect(() => {
    const fetchCount = 21;
    const fetchData = async () => {
      try {
        setState((prevState) => ({ ...prevState, error: null }));
        const [trending, popular, topRated, topAiring, Upcoming] =
          await Promise.all([
            fetchTrendingAnime(1, fetchCount),
            fetchPopularAnime(1, fetchCount),
            fetchTopAnime(1, fetchCount),
            fetchTopAiringAnime(1, 6),
            fetchUpcomingSeason(1, 6),
          ]);
        setState((prevState) => ({
          ...prevState,
          trendingAnime: trending,
          popularAnime: popular,
          topAnime: topRated,
          topAiring: topAiring,
          Upcoming: Upcoming,
        }));
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
            topAiring: false,
            Upcoming: false,
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
      <div className='flex gap-8 max-lg:gap-12 max-lg:flex-col'>
        <div className='flex flex-col gap-4 min-lg:flex-4/5'>
          <div className='flex flex-wrap gap-2 justify-center w-full'>
            <h3
              className={` label ${activeTab === 'trending' ? 'bg-blue-300' : 'bg-gray-200 hover:bg-blue-200'}
             transition-colors duration-100 ease-in-out cursor-pointer`}
              title='Trending Tab'
              onClick={() => handleTabClick('trending')}
            >
              TRENDING
            </h3>
            <div
              className={`${activeTab === 'popular' ? 'bg-blue-300' : 'bg-gray-200 hover:bg-blue-200'}
            label transition-colors duration-100 ease-in-out cursor-pointer`}
              title='Popular Tab'
              onClick={() => handleTabClick('popular')}
            >
              POPULAR
            </div>
            <div
              className={`${activeTab === 'topRated' ? 'bg-blue-300' : 'bg-gray-200 hover:bg-blue-200'}
            label transition-colors duration-100 ease-in-out cursor-pointer`}
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
        <div className='grid grid-cols-1 gap-10 max-lg:grid-cols-2 max-md:grid-cols-1 h-fit'>
          <HomeSideBar
            animeData={state.topAiring}
            title='TOP AIRING'
            icon={<GiTv className='size-9' />}
          />
          <HomeSideBar
            animeData={state.Upcoming}
            title={`UPCOMING ${getNextSeason()}`}
            icon={<GrAnnounce className='size-9' />}
          />
        </div>
      </div>
      <p>window.innerWidth={window.innerWidth}</p>
    </div>
  );
};

export default Home;
