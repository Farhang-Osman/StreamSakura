import { Link, useNavigate } from 'react-router-dom';
import punch_screen from '/src/assets/punch_screen.webp';
import { FC, useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { FaPlay, FaClosedCaptioning, FaMicrophone } from 'react-icons/fa';
import { SideBar } from '../components/shared/sideBar';
import { SiAnilist, SiMyanimelist } from 'react-icons/si';
import { TbStarFilled, TbStarHalfFilled } from 'react-icons/tb';

interface Episode {
  episode_no: number;
  id: string;
  title: string;
  japanese_title: string;
  filler: boolean;
}

interface totalEpisodes {
  totalEpisodes: number;
  episodes: Episode[];
}

export interface tvInfo {
  rating?: string | null;
  quality?: string;
  showType?: string;
  releaseDate?: string;
  duration?: string;
  sub?: string | null;
  dub?: string | null;
  eps?: string | null;
  episodeInfo?: {
    sub?: string;
    dub?: string;
  };
}
interface charactersVoiceActors {
  character: {
    id: string;
    poster: string;
    name: string;
    cast: string;
  };
  voiceActors: {
    id: string;
    poster: string;
    name: string;
  };
}
export interface recommendedAndRelatedData {
  data_id: string;
  id: string;
  title: string;
  japanese_title: string;
  poster: string;
  tvInfo: tvInfo;
  adultContent: boolean;
}
interface seasons {
  id: string;
  data_number: number;
  data_id: number;
  season: string;
  title: string;
  season_poster: string;
}
export interface animeInfo {
  data: {
    adultContent: boolean;
    data_id: number;
    id: string;
    anilistId: string;
    malId: string;
    title: string;
    japanese_title: string;
    synonyms: string;
    poster: string;
    showType: string;
    animeInfo: {
      Overview: string;
      Japanese: string;
      Synonyms: string;
      Aired: string;
      Premiered: string;
      Duration: string;
      Status: string;
      'MAL Score': string;
      Genres: string[];
      Studios: string;
      Producers: string[];
      tvInfo: tvInfo;
    };
    charactersVoiceActors: charactersVoiceActors[];
    recommended_data: recommendedAndRelatedData[];
    related_data: recommendedAndRelatedData[];
  };
  seasons: seasons[];
}
export interface watchedEpisodes {
  animeName: string;
  animeId: number;
  numberOfWatchedEpisodes: number[];
  image: string;
  lastWatchedEpisode: {
    episodeNumber: number;
    episodeTitle: string;
    episodeUrl: string;
  };
}

const BASE_URL = import.meta.env.VITE_BACKEND_URL;
const STREAMING_URL = import.meta.env.VITE_STREAMING_URL;

const Watch: FC = () => {
  const navigate = useNavigate();

  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [selectedEpisode, setSelectedEpisode] = useState(0);
  const [episodesLoading, setEpisodesLoading] = useState(true);
  const [isStreamLoading, setIsStreamLoading] = useState(true);
  const [episode, setEpisode] = useState<Episode>();
  const [isSubOrDub, setIsSubOrDub] = useState<'sub' | 'dub'>('sub');
  const [animeInfo, setAnimeInfo] = useState<animeInfo>({} as animeInfo);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const thePath = window.location.pathname;
  const Title = thePath.split('/').pop() as string;

  const origin = location.origin;
  const urlSearch = window.location.search.split('ep=')[1];
  const filteredUrlSearch =
    urlSearch !== undefined && urlSearch !== '' && !isNaN(Number(urlSearch))
      ? urlSearch
      : false;

  async function fetchEpisodes(animeTitleAndId: string) {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/episodes/${animeTitleAndId}`,
      );

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

  async function fetchAnimeInfo(animeTitleAndId: string) {
    try {
      const res = await axios.get(`${BASE_URL}/api/info`, {
        params: { id: animeTitleAndId },
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
    const reqAnimeEpisodes = async () => {
      const animeInfo: animeInfo = await fetchAnimeInfo(Title);
      setAnimeInfo(animeInfo);

      const totalEpisodes: totalEpisodes = await fetchEpisodes(Title);
      const animeEpisodes = totalEpisodes.episodes;
      // setEpisodes(animeEpisodes)
      setEpisodes(animeEpisodes);
      setEpisodesLoading(false);
    };
    reqAnimeEpisodes();
  }, []);

  // select episode number based on url and rewrite url without refreshing
  useEffect(() => {
    if (!episodesLoading && !filteredUrlSearch) {
      const epUrl = episodes[0].id;
      const epNumber = epUrl.split('ep=')[1];
      setSelectedEpisode(Number(epNumber));
      setEpisode(episodes[0]);
      history.replaceState({}, '', `${origin}/watch/${epUrl}`);
    } else if (!episodesLoading && filteredUrlSearch) {
      for (let i = 0; i < episodes.length; i++) {
        const epNumber = episodes[i].id.split('ep=')[1];
        const isLastIteration = i === episodes.length - 1;

        if (epNumber === filteredUrlSearch) {
          const epUrl = episodes[i].id;
          setSelectedEpisode(Number(filteredUrlSearch));
          setEpisode(episodes[i]);
          history.pushState({}, '', `${origin}/watch/${epUrl}`);
          break;
        } else if (isLastIteration) {
          const epUrl = episodes[0].id;
          const epNumber = epUrl.split('ep=')[1];
          setSelectedEpisode(Number(epNumber));
          setEpisode(episodes[0]);
          history.replaceState({}, '', `${origin}/watch/${epUrl}`);
          break;
        }
      }
    }
  }, [filteredUrlSearch, episodesLoading]);

  const handleLoad = () => {
    // Show loading for at least 0.5 second (even if content loads faster)
    setTimeout(() => {
      setIsStreamLoading(false);
    }, 500);
  };

  useEffect(() => {
    if (
      selectedEpisode !== 0 &&
      episode !== undefined &&
      animeInfo.data?.title &&
      animeInfo.data?.data_id
    ) {
      const animeId = animeInfo.data?.data_id;
      const watchedEpisodes = localStorage.getItem(
        `watchedEpisodes-${animeId}`,
      );

      if (watchedEpisodes) {
        const localData: watchedEpisodes = JSON.parse(watchedEpisodes);

        if (localData.numberOfWatchedEpisodes.includes(episode.episode_no)) {
          const listOfWatchedEpisodes: watchedEpisodes = {
            ...localData,
            lastWatchedEpisode: {
              episodeNumber: episode.episode_no,
              episodeTitle: episode.title,
              episodeUrl: episode.id,
            },
          };

          localStorage.setItem(
            `watchedEpisodes-${animeId}`,
            JSON.stringify(listOfWatchedEpisodes),
          );
        } else {
          const listOfWatchedEpisodes: watchedEpisodes = {
            ...localData,
            numberOfWatchedEpisodes: [
              ...localData.numberOfWatchedEpisodes,
              episode.episode_no,
            ],
            lastWatchedEpisode: {
              episodeNumber: episode.episode_no,
              episodeTitle: episode.title,
              episodeUrl: episode.id,
            },
          };

          localStorage.setItem(
            `watchedEpisodes-${animeId}`,
            JSON.stringify(listOfWatchedEpisodes),
          );
        }
      } else {
        const listOfWatchedEpisodes: watchedEpisodes = {
          animeName: animeInfo.data.title,
          animeId: animeId,
          numberOfWatchedEpisodes: [episode.episode_no],
          image: animeInfo.data?.poster,
          lastWatchedEpisode: {
            episodeNumber: episode.episode_no,
            episodeTitle: episode.title,
            episodeUrl: episode.id,
          },
        };
        localStorage.setItem(
          `watchedEpisodes-${animeId}`,
          JSON.stringify(listOfWatchedEpisodes),
        );
      }
    }
  }, [selectedEpisode, episode, animeInfo]);

  const containerRef = useRef<HTMLDivElement>(null);
  const onClickEp = (ep: Episode, element: HTMLElement) => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const containerHeight = container.clientHeight;
    const elementHeight = element.clientHeight;
    const scrollPosition =
      element.offsetTop - containerHeight / 2 + elementHeight / 2;

    container.scrollTo({
      top: scrollPosition,
      behavior: 'smooth',
    });

    const epNumber = Number(ep.id.split('ep=')[1]);
    setSelectedEpisode(epNumber);
    setEpisode(ep);
    setIsStreamLoading(true);
    const epUrl = ep.id;
    history.pushState({}, '', `${origin}/watch/${epUrl}`);
  };

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  const thereIsError = false;

  return thereIsError ? (
    <div className='flex flex-col gap-2 items-center mt-4'>
      <p className='text-xl font-medium'>No episodes found</p>
      <img src={punch_screen} alt='404 Error' />
      <button
        className='bg-gray-200 rounded-lg shadow cursor-pointer hover:bg-blue-200 label'
        onClick={() => navigate('/home')}
      >
        go to home
      </button>
    </div>
  ) : episodesLoading ? (
    <>
      <div className='grid grid-cols-10 gap-3 w-full animate-pulse'>
        <div className='relative col-span-7 mb-1 bg-gray-300 rounded-sm aspect-video max-xl:col-span-10'></div>
        <div className='grid col-span-3 gap-1 content-start p-1 w-full h-full bg-gray-300 rounded-sm max-xl:col-span-10 max-xl:h-72 aspect-square'>
          <div className='grid overflow-auto gap-1 p-1 px-3 scroll-smooth max-xl:gap-y-3 max-md:gap-1 max-xl:grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1'>
            {Array.from({ length: 15 }).map((_, index) => (
              <div
                key={index}
                className='flex gap-4 px-1 h-8 bg-gray-400 rounded-sm transition duration-100 ease-in-out'
              ></div>
            ))}
          </div>
        </div>
        <div className='flex flex-col col-span-7 gap-3 w-full bg-gray-300 rounded-sm max-xl:col-span-10 aspect-video'></div>
        <div className='grid grid-cols-1 col-span-3 gap-10 bg-gray-300 rounded-sm max-xl:gap-4 max-md:gap-10 max-xl:col-span-10 max-xl:grid-cols-2 max-md:grid-cols-1 h-fit'>
          <div className='flex overflow-x-hidden relative flex-col gap-2 rounded-lg h-[1200px]'>
            {Array.from({ length: 10 }).map((_, index) => (
              <div
                key={index}
                className='aspect-[5/1] relative rounded-lg bg-gray-400 min-h-28 max-h-28 w-full'
              >
                <div className='absolute left-0 w-1/5 h-full bg-gray-500 rounded-lg'></div>
              </div>
            ))}
          </div>
          <div className='flex overflow-x-hidden relative flex-col gap-2 rounded-lg h-[1200px]'>
            {Array.from({ length: 10 }).map((_, index) => (
              <div
                key={index}
                className='aspect-[5/1] relative rounded-lg bg-gray-400 min-h-28 max-h-28 w-full'
              >
                <div className='absolute left-0 w-1/5 h-full bg-gray-500 rounded-lg'></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  ) : (
    <div className='grid grid-cols-10 gap-4 w-full'>
      {/* watch screen */}
      <div className='relative col-span-7 mb-1 rounded-sm shadow aspect-video max-xl:col-span-10'>
        {isStreamLoading && (
          <div className='flex absolute inset-0 justify-center items-center bg-black rounded-sm'>
            <div className='w-12 h-12 rounded-full border-t-2 border-b-2 border-blue-500 animate-spin'></div>
          </div>
        )}
        <iframe
          src={`${STREAMING_URL}/stream/s-2/${selectedEpisode}/${isSubOrDub}`}
          className={`w-full h-full rounded-sm ${isStreamLoading ? 'opacity-0' : 'opacity-100'}`}
          allowFullScreen
          onLoad={handleLoad}
        ></iframe>
      </div>
      {/* list of episodes container */}
      <div className='grid col-span-3 gap-1 content-start p-1 w-full h-full bg-gray-300 rounded-sm shadow max-xl:col-span-10 max-xl:h-72 aspect-square'>
        <div className='px-1 text-gray-500 bg-gray-200 rounded-sm'>
          {`Episodes ${episodes[0].episode_no} - ${episodes[episodes.length - 1].episode_no}`}
        </div>
        <div
          ref={containerRef}
          className='grid overflow-auto gap-1 p-1 px-3 scroll-smooth max-xl:gap-y-3 max-md:gap-1 max-xl:grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1'
        >
          {episodes.map(({ ...ep }) =>
            selectedEpisode === Number(ep.id.split('ep=')[1]) ? (
              <button className='flex gap-4 items-center px-1 text-blue-500 bg-blue-100 rounded-sm border-2 border-blue-400 transition duration-100 ease-in-out cursor-pointer snap-center scale-103'>
                <FaPlay />
                <p>{ep.title}</p>
              </button>
            ) : (
              <button
                onClick={(e) => onClickEp(ep, e.currentTarget)}
                className='flex gap-4 px-1 text-gray-500 bg-gray-100 rounded-sm transition duration-100 ease-in-out cursor-pointer hover:bg-blue-200 hover:scale-103'
              >
                <p>{ep.episode_no}.</p>
                <p>{ep.title}</p>
              </button>
            ),
          )}
        </div>
      </div>
      {/* Source and anime info */}
      <div className='flex flex-col col-span-7 gap-4 w-full max-xl:col-span-10 aspect-video'>
        <div className='flex gap-2 justify-evenly items-center p-2 bg-gray-300 rounded-sm shadow'>
          <p className='flex flex-wrap gap-1 items-center p-1 px-4 bg-gray-100 rounded-sm'>
            you are watching Episode{' '}
            <p className='px-1 text-blue-500 bg-blue-100 rounded-sm border'>
              {episode?.episode_no}
            </p>
          </p>
          <div className='flex flex-wrap gap-4 max-sm:gap-2'>
            <button
              onClick={() => setIsSubOrDub('sub')}
              className={`flex gap-2 items-center p-1 px-4 rounded-sm ${isSubOrDub === 'sub' ? 'bg-blue-200 text-blue-500 border-2' : 'cursor-pointer bg-gray-100 hover:bg-blue-200'}`}
            >
              <FaClosedCaptioning /> sub
            </button>
            <button
              onClick={() => setIsSubOrDub('dub')}
              className={`flex gap-2 items-center p-1 px-4 rounded-sm ${isSubOrDub === 'dub' ? 'bg-blue-200 text-blue-500 border-2' : 'cursor-pointer bg-gray-100 hover:bg-blue-200'}`}
            >
              <FaMicrophone /> dub
            </button>
          </div>
        </div>

        <div className='flex w-full bg-gray-300 rounded-sm shadow'>
          <div className='w-1/4 max-md:w-2/5'>
            <img src={animeInfo.data?.poster} alt='' className='rounded-sm' />
          </div>
          <div className='flex flex-col gap-4 items-center p-2 w-3/4 max-sm:w-3/5 max-sm:gap-2'>
            <p className='px-1 text-xl text-blue-500 bg-gray-100 rounded-sm w-fit'>
              {animeInfo.data?.title || animeInfo.data?.japanese_title}
            </p>
            <p className='px-1 bg-gray-100 rounded-sm w-fit'>
              {animeInfo.data?.animeInfo?.Japanese}
            </p>

            <div className='flex flex-wrap gap-1 justify-center text-nowrap'>
              {animeInfo.data?.animeInfo.Genres && (
                <>
                  {animeInfo.data?.animeInfo.Genres.map((item) => (
                    <p className='overflow-hidden overflow-y-auto p-1 text-xs text-red-800 bg-gray-100 rounded-md'>
                      {item}
                    </p>
                  ))}
                </>
              )}
            </div>
            {isDescriptionExpanded ? (
              <p
                className='overflow-y-auto px-1 text-sm text-gray-500 bg-gray-200 rounded-sm max-h-30 scroll-smooth'
                dangerouslySetInnerHTML={{
                  __html: `${animeInfo.data?.animeInfo?.Overview}`,
                }}
                onClick={toggleDescription}
              />
            ) : (
              <p
                className='overflow-y-auto px-1 text-sm text-gray-500 bg-gray-200 rounded-sm max-h-30 scroll-smooth'
                dangerouslySetInnerHTML={{
                  __html: `${animeInfo.data?.animeInfo?.Overview.substring(0, 150)}...[click to show more]`,
                }}
                onClick={toggleDescription}
              />
            )}

            <div className='flex gap-2 justify-center items-center'>
              {animeInfo.data?.anilistId && (
                <a
                  href={`https://anilist.co/anime/${animeInfo.data?.anilistId}`}
                  target='_blank'
                  className='flex items-center px-8 h-6 bg-gray-100 rounded-sm'
                >
                  <SiAnilist className='size-6' />
                </a>
              )}
              {animeInfo.data?.malId && (
                <a
                  href={`https://myanimelist.net/anime/${animeInfo.data?.malId}`}
                  target='_blank'
                  className='flex items-center px-8 h-6 bg-gray-100 rounded-sm'
                >
                  <SiMyanimelist className='size-10' />
                </a>
              )}
            </div>

            <div className='flex flex-wrap gap-2 justify-center'>
              <p className='px-1 text-sm bg-gray-100 rounded-sm'>
                {animeInfo.data?.showType}
              </p>
              <p className='px-1 text-sm bg-gray-100 rounded-sm'>
                {animeInfo.data?.animeInfo?.Premiered.split('-')[1]}
              </p>
              <p className='flex gap-1 items-center px-1 text-sm bg-gray-100 rounded-sm'>
                {Number(animeInfo.data?.animeInfo?.['MAL Score']) >= 7.5 ? (
                  <TbStarFilled />
                ) : (
                  <TbStarHalfFilled />
                )}
                {animeInfo.data?.animeInfo?.['MAL Score']}
              </p>
              <p className='px-1 text-sm bg-gray-100 rounded-sm'>
                {' '}
                Rating: {animeInfo.data?.animeInfo?.tvInfo.rating}
              </p>
              <p className='px-1 text-sm bg-gray-100 rounded-sm'>
                {animeInfo.data?.animeInfo?.Status}
              </p>
            </div>
          </div>
        </div>

        {animeInfo.seasons.length !== 0 && (
          <div className='flex flex-col gap-4 pt-1 pb-4 text-center bg-gray-300 rounded-sm shadow h-fit'>
            <p className='place-self-center w-3/4 bg-gray-200 shadow label'>
              Seasons
            </p>
            <div className='flex relative flex-wrap gap-2 justify-center'>
              {animeInfo.seasons.map((item) => (
                <div className='relative cursor-pointer'>
                  {item.title === animeInfo.data?.title ? (
                    <>
                      <img
                        src={animeInfo.data?.poster}
                        alt=''
                        className='object-cover relative w-40 max-sm:w-30 rounded-sm aspect-[3/4] brightness-75 scale-106'
                      />
                      <p className='absolute top-0 place-content-center w-full h-full text-lg font-medium text-center text-white'>
                        {item.season}
                      </p>
                    </>
                  ) : (
                    <Link to={`/watch/${item.id}`} target='_blank'>
                      <img
                        src={item.season_poster}
                        alt=''
                        className='object-cover w-40 max-sm:w-30 rounded-sm aspect-[3/4] brightness-50'
                      />
                      <p className='absolute top-0 place-content-center w-full h-full text-lg font-medium text-center text-gray-300 hover:text-white'>
                        {item.season}
                      </p>
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* related and recommendations */}
      <div className='grid grid-cols-1 col-span-3 gap-6 max-xl:gap-4 max-md:gap-6 max-xl:col-span-10 max-xl:grid-cols-2 max-md:grid-cols-1 h-fit'>
        <SideBar animeData={animeInfo.data?.related_data} title={'RELATED'} />
        <SideBar
          animeData={animeInfo.data?.recommended_data}
          title={'RECOMMENDED'}
        />
      </div>
    </div>
  );
};

export default Watch;
