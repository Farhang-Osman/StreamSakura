import { useNavigate } from 'react-router-dom';
import punch_screen from '/src/assets/punch_screen.webp';
import { FC, useEffect, useState } from 'react';
import axios from 'axios';

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

  // select episode number based on url
  useEffect(() => {
    if (!episodesLoading && !filteredUrlSearch) {
      const epUrl = episodes.length !== 0 ? episodes[0].id : '';
      const episodeNumber = epUrl.split('ep=')[1];
      setSelectedEpisode(Number(episodeNumber));
      console.log('<><><><>', episodeNumber);
    } else if (!episodesLoading && filteredUrlSearch) {
      setSelectedEpisode(Number(filteredUrlSearch));
      console.log('<><><><>', filteredUrlSearch);
    }
  }, [filteredUrlSearch, episodesLoading]);

  const thereIsError = false;

  return thereIsError ? (
    <div className='flex items-center flex-col gap-2 mt-4'>
      <p className='font-medium text-xl'>No episodes found</p>
      <img src={punch_screen} alt='404 Error' />
      <button
        className='cursor-pointer bg-gray-200 hover:bg-blue-200 rounded-lg label'
        onClick={() => navigate('/home')}
      >
        go to home
      </button>
    </div>
  ) : episodesLoading ? (
    <>
      <p className='text-3xl text-center w-full'>episodesLoading...</p>
    </>
  ) : (
    <div className='bg-gray-400'>
      <div className='w-full aspect-video'>
        <iframe
          src={`${STREAMING_URL}/stream/s-2/${selectedEpisode}/sub`}
          className='w-full h-full'
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default Watch;
