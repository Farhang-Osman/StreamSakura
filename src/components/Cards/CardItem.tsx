import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Anime } from '../../index';
import {
  TbStarFilled,
  TbStarHalfFilled,
  TbPlayerPlayFilled,
} from 'react-icons/tb';

export const CardItem: FC<{ anime: Anime }> = ({ anime }) => {
  const imageSrc = anime.image || '';

  return (
    <>
      <Link
        className='no-underline animate-slideUp hover:z-20 focus:z-20 active:z-20'
        to={`/watch/${anime.id}`}
        title={anime.title.english || anime.title.romaji}
      >
        <div className='w-full rounded-lg transition duration-200 ease-in-out scale-100 cursor-pointer group/title'>
          <div className='transition duration-200 ease-in-out hover:-translate-y-2.5'>
            <div className='rounded-lg overflow-hidden relative aspect-[3/4] shadow-blue-900 animate-slideUp transition duration-200 ease-in-out shadow-[2px_2px_10px] text-left'>
              <div className='whfull group'>
                <img
                  src={imageSrc}
                  alt=''
                  className='whfull animation1 group-hover:brightness-60'
                />
                <TbPlayerPlayFilled
                  className='absolute inset-0 top-1/2 left-1/2 z-10 text-3xl text-blue-300 opacity-0 transition-opacity duration-300 ease-in -translate-x-1/2 -translate-y-1/2 group-hover:opacity-100'
                  title={'Play ' + (anime.title.english || anime.title.romaji)}
                />
              </div>
            </div>
          </div>
          <div className='pt-1 pl-2'>
            <h5
              className='text-sm text-blue-800 font-bold transition duration-300 ease-in-out text-long group-hover/title:text-blue-500'
              title={'Title: ' + (anime.title.english || anime.title.romaji)}
            >
              {anime.title.english || anime.title.romaji}
            </h5>
          </div>
          <div>
            <div></div>
            <div className='flex justify-evenly'>
              {anime.type && (
                <p className='px-1 text-xs bg-gray-200 text-blue-800 rounded-sm'>
                  {anime.type}
                </p>
              )}
              {anime.releaseDate && (
                <p className='px-1 text-xs bg-gray-200 text-blue-800 rounded-sm'>
                  {anime.releaseDate}
                </p>
              )}
              {anime.rating && (
                <p className='flex items-center px-1 text-xs bg-gray-200 text-blue-800 rounded-sm'>
                  {anime.rating >= 75 ? <TbStarFilled /> : <TbStarHalfFilled />}
                  {anime.rating}
                </p>
              )}
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};
