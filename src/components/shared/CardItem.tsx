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
}

export const CardItem: FC<CardItemProps> = ({ data }) => {
  const imageSrc = data.poster || '';
  return (
    <>
      <Link
        className='no-underline animate-fade hover:z-20 focus:z-20 active:z-20'
        to={`/watch/${data.id}`}
        title={data.title || data.japanese_title}
      >
        <div className='w-full rounded-lg transition duration-200 ease-in-out scale-100 cursor-pointer text2 group/title'>
          <div className='transition duration-200 ease-in-out'>
            <div className='rounded-lg overflow-hidden relative aspect-[3/4] shadow transition duration-200 ease-in-out  text-left'>
              <div className='whfull group'>
                <img
                  src={imageSrc}
                  alt=''
                  className='whfull animation1 group-hover:brightness-60'
                />
                <TbPlayerPlayFilled
                  className='absolute inset-0 top-1/2 left-1/2 z-10 text-3xl opacity-0 transition-opacity duration-300 ease-in -translate-x-1/2 -translate-y-1/2 group-hover:opacity-100'
                  title={'Play ' + (data.title || data.japanese_title)}
                />
                {data.tvInfo?.showType && (
                  <p className='absolute bottom-0 px-1 text-xs rounded-tr-sm bg3'>
                    {data.tvInfo?.showType}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className='pt-1 pl-2'>
            <h5
              className='text-sm font-bold transition duration-300 ease-in-out text-long'
              title={'Title: ' + (data.title || data.japanese_title)}
            >
              {data.title || data.japanese_title}
            </h5>
          </div>
        </div>
      </Link>
    </>
  );
};
