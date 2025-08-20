import { watchedEpisodes } from './Watch';
import { Link, useNavigate } from 'react-router-dom';
import { TiDelete } from 'react-icons/ti';
import { FaPlayCircle } from 'react-icons/fa';
import { useEffect } from 'react';

const History = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'History | Stream Sakura';
  }, []);

  function getParsedLocalStorageValues(partialKey: string) {
    try {
      return Object.keys(localStorage)
        .filter((key) => key.includes(partialKey))
        .map((key) => {
          const value = localStorage.getItem(key);
          return value ? JSON.parse(value) : null;
        })
        .filter((value) => value !== null);
    } catch (error) {
      console.error('Error parsing localStorage values:', error);
      return [];
    }
  }

  // Usage:
  const localData: watchedEpisodes[] =
    getParsedLocalStorageValues('watchedEpisodes');

  console.log(localData);

  const handleDelete = (animeId: number) => {
    localStorage.removeItem(`watchedEpisodes-${animeId}`);
    console.log(`watchedEpisodes-${animeId}`);
    navigate(`/history`);
  };

  return (
    <div className='grid relative grid-cols-4 gap-4 pr-2'>
      {localData.map((i) => (
        <div className='relative w-full rounded-sm shadow cursor-pointer bg2 animate-fade group'>
          <TiDelete
            title='Delete from history ?'
            className='absolute right-1 top-6 z-10 text-4xl bg-transparent opacity-0 transition-opacity duration-200 ease-in text2 group-hover:opacity-100'
            onClick={() => handleDelete(i.animeId)}
          />
          <Link
            to={`/watch/${i.lastWatchedEpisode.episodeUrl}`}
            title={`Play ${i.animeName}
Eps ${i.lastWatchedEpisode.episodeNumber}
${i.lastWatchedEpisode.episodeTitle}`}
            key={i.animeId}
          >
            <div className='text-center text-long text2'>{i.animeName}</div>
            <div className='overflow-hidden relative'>
              <img
                className='object-cover w-full transition duration-200 ease-in group-hover:scale-105 aspect-video group-hover:brightness-60'
                src={i.image}
                alt=''
              />
              <p className='flex absolute bottom-1 left-2 gap-2 items-center px-1 rounded-sm bg2'>
                <p>Eps</p>
                <p className='text-lg text2'>
                  {i.lastWatchedEpisode.episodeNumber}
                </p>
              </p>
              <FaPlayCircle className='absolute top-1/2 left-1/2 z-10 text-4xl text2 opacity-0 transition-opacity duration-200 ease-in -translate-x-1/2 -translate-y-1/2 group-hover:opacity-100' />
            </div>

            <div className='flex gap-4 px-1 rounded-sm'>
              <p className='text-long'>{i.lastWatchedEpisode.episodeTitle}</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default History;
