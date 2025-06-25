import { useNavigate } from 'react-router-dom';
import punch_screen from '/src/assets/punch_screen.webp';
import { FC, useEffect, useState } from 'react';
import axios from 'axios';
import { FaPlay } from 'react-icons/fa';

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

const BASE_URL = import.meta.env.VITE_BACKEND_URL;
const STREAMING_URL = import.meta.env.VITE_STREAMING_URL;

const Watch: FC = () => {
  const navigate = useNavigate();

  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [selectedEpisode, setSelectedEpisode] = useState(0);
  const [episodesLoading, setEpisodesLoading] = useState(true);

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
  useEffect(() => {
    const reqAnimeEpisodes = async () => {
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
      history.replaceState({}, '', `${origin}/watch/${epUrl}`);
    } else if (!episodesLoading && filteredUrlSearch) {
      for (let i = 0; i < episodes.length; i++) {
        const epNumber = episodes[i].id.split('ep=')[1];
        const isLastIteration = i === episodes.length - 1;

        if (epNumber === filteredUrlSearch) {
          const epUrl = episodes[i].id;
          setSelectedEpisode(Number(filteredUrlSearch));
          history.replaceState({}, '', `${origin}/watch/${epUrl}`);
          break;
        } else if (isLastIteration) {
          const epUrl = episodes[0].id;
          const epNumber = epUrl.split('ep=')[1];
          setSelectedEpisode(Number(epNumber));
          history.replaceState({}, '', `${origin}/watch/${epUrl}`);
          break;
        }
      }
    }
  }, [filteredUrlSearch, episodesLoading]);

  const thereIsError = false;

  return thereIsError ? (
    <div className='flex flex-col gap-2 items-center mt-4'>
      <p className='text-xl font-medium'>No episodes found</p>
      <img src={punch_screen} alt='404 Error' />
      <button
        className='bg-gray-200 rounded-lg cursor-pointer hover:bg-blue-200 label'
        onClick={() => navigate('/home')}
      >
        go to home
      </button>
    </div>
  ) : episodesLoading ? (
    <>
      <p className='w-full text-3xl text-center'>episodesLoading...</p>
    </>
  ) : (
    <div className='flex gap-3 p-1 max-xl:flex-col max-xl:h-[45rem]'>
      <div className='mb-1 w-full aspect-video'>
        <iframe
          src={`${STREAMING_URL}/stream/s-2/${selectedEpisode}/sub`}
          className='w-full h-full rounded-sm'
          allowFullScreen
        ></iframe>
      </div>
      <div className='grid gap-1 p-1 bg-gray-300 rounded-sm min-xl:max-w-3/10 min-xl:min-w-1/4 max-xl:h-72 aspect-square'>
        <div className='px-1 text-gray-500 bg-gray-200 rounded-sm'>
          {`Episodes ${episodes[0].episode_no} - ${episodes[episodes.length - 1].episode_no}`}
        </div>
        <div className='grid overflow-auto gap-1 p-1 px-2 max-xl:gap-y-3 max-md:gap-1 max-xl:grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1'>
          {episodes.map(({ ...ep }) =>
            selectedEpisode === Number(ep.id.split('ep=')[1]) ? (
              <button className='flex gap-4 items-center px-1 text-blue-500 bg-blue-100 rounded-sm border-2 border-blue-400 transition duration-100 ease-in-out cursor-pointer hover:scale-105'>
                <FaPlay />
                <p>{ep.title}</p>
              </button>
            ) : (
              <button
                onClick={() =>
                  setSelectedEpisode(Number(ep.id.split('ep=')[1]))
                }
                className='flex gap-4 px-1 text-gray-500 bg-gray-100 rounded-sm transition duration-100 ease-in-out cursor-pointer hover:scale-105'
              >
                <p>{ep.episode_no}.</p>
                <p>{ep.title}</p>
              </button>
            ),
          )}
        </div>
      </div>
    </div>
  );
};

export default Watch;
