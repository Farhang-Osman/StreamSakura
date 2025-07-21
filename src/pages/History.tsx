import { TbPlayerPlayFilled } from 'react-icons/tb';
import { watchedEpisodes } from './Watch';
import { Link } from 'react-router-dom';

const History = () => {
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

  return (
    <div className='grid grid-cols-4 gap-2 pr-2'>
      {localData.map((i) => (
        <Link
          to={`/watch/${i.lastWatchedEpisode.episodeUrl}`}
          className='w-full bg-gray-200 rounded-sm transition duration-200 ease-in-out group'
          title={`Eps ${i.lastWatchedEpisode.episodeNumber}
${i.lastWatchedEpisode.episodeTitle}`}
        >
          <div className='text-center text-long'>{i.animeName}</div>
          <div className='overflow-hidden relative'>
            <img
              className='object-cover w-full transition duration-200 ease-in group-hover:scale-105 aspect-video group-hover:brightness-60'
              src={i.image}
              alt=''
            />
            <p className='flex absolute bottom-1 left-2 gap-2 items-center px-1 bg-gray-200 rounded-sm'>
              <p className='text-gray-500'>Eps</p>
              <p className='text-lg'>{i.lastWatchedEpisode.episodeNumber}</p>
            </p>
            <TbPlayerPlayFilled
              className='absolute top-1/2 left-1/2 z-10 text-3xl text-blue-300 opacity-0 transition-opacity duration-200 ease-in -translate-x-1/2 -translate-y-1/2 group-hover:opacity-100'
              title={'Play ' + i.animeName}
            />
          </div>

          <div className='flex gap-4 px-1 text-gray-500 rounded-sm cursor-pointer'>
            <p className='text-long'>{i.lastWatchedEpisode.episodeTitle}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default History;
