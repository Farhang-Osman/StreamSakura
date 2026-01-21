import { FC } from 'react';
import { Link } from 'react-router-dom';
// import { Anime } from '../../hooks/animeInterface';
import {
  // TbStarFilled,
  // TbStarHalfFilled,
  TbPlayerPlayFilled,
} from 'react-icons/tb';
import { HomeAnimeInfo } from '../../pages/Home';

interface CardItemProps {
  data: HomeAnimeInfo;
  loading?: boolean;
}

export const CardItem: FC<CardItemProps> = ({ data }) => {
  const imageSrc = data.poster || '';
  return (
    <>
      <Link
        className='no-underline animate-slideUp hover:z-20 focus:z-20 active:z-20'
        to={`/watch/${data.id}`}
        title={data.title || data.japanese_title}
      >
        <div className='w-full rounded-lg transition duration-200 ease-in-out scale-100 cursor-pointer group/title'>
          <div className='transition duration-200 ease-in-out hover:-translate-y-2.5'>
            <div className='rounded-lg overflow-hidden relative aspect-[3/4]  animate-slideUp transition duration-200 ease-in-out shadow text-left'>
              <div className='w-full h-full group'>
                <img
                  src={imageSrc}
                  alt=''
                  className='w-full h-full transition duration-200 group-hover:brightness-60'
                />
                <TbPlayerPlayFilled
                  className='absolute inset-0 top-1/2 left-1/2 z-10 text-3xl text-blue-300 opacity-0 transition-opacity duration-300 ease-in -translate-x-1/2 -translate-y-1/2 group-hover:opacity-100'
                  title={'Play ' + (data.title || data.japanese_title)}
                />
              </div>
            </div>
          </div>
          <div className='pt-1 pl-2'>
            <h5
              className='text-sm font-bold text-blue-800 transition duration-300 ease-in-out text-long group-hover/title:text-blue-500'
              title={'Title: ' + (data.title || data.japanese_title)}
            >
              {data.title || data.japanese_title}
            </h5>
          </div>
          <div>
            <div></div>
            <div className='flex justify-evenly'>
              {data.tvInfo?.showType && (
                <p className='px-1 text-xs text-blue-800 bg-gray-200 rounded-sm'>
                  {data.tvInfo?.showType}
                </p>
              )}
              {/* {anime.releaseDate && (
                <p className='px-1 text-xs text-blue-800 bg-gray-200 rounded-sm'>
                  {anime.releaseDate}
                </p>
              )}
              {anime.rating && (
                <p className='flex items-center px-1 text-xs text-blue-800 bg-gray-200 rounded-sm'>
                  {anime.rating >= 75 ? <TbStarFilled /> : <TbStarHalfFilled />}
                  {anime.rating}
                </p>
              )} */}
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};
