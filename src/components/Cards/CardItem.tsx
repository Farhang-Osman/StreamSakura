import { FC, useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Anime } from '../../index';
import { FaPlay } from 'react-icons/fa';

export const CardItem: FC<{ anime: Anime }> = ({ anime }) => {
  const imageSrc = anime.image || '';

  return (
    <>
      <Link
        className='no-underline animate-slideUp hover:z-20 focus:z-20 active:z-20'
        to={`/watch/${anime.id}`}
        title={anime.title.english || anime.title.romaji}
      >
        <div className='w-full rounded-lg transition duration-200 ease-in-out scale-100 cursor-pointer'>
          <div className='transition duration-200 ease-in-out max-sm:hover:translate-y-2.5 max-sm:active:translate-y-2.5 max-sm:focus:translate-y-2.5'>
            <div className='rounded-lg overflow-hidden relative aspect-[3/4] shadow-blue-900 animate-slideUp transition duration-200 ease-in-out shadow-[2px_2px_10px] text-left'>
              <div className='whfull group'>
                <img
                  src={imageSrc}
                  alt=''
                  className='whfull animation1 group-hover:brightness-60'
                />
                <FaPlay
                  className='absolute inset-0 top-1/2 left-1/2 z-10 text-3xl text-white opacity-0 transition-opacity duration-300 ease-in -translate-x-1/2 -translate-y-1/2 group-hover:opacity-100'
                  title={'Play ' + (anime.title.english || anime.title.romaji)}
                />
              </div>
            </div>
          </div>
          <div className='p-2'>
            <h5
              className='text-sm font-bold text-long'
              title={'Title: ' + (anime.title.english || anime.title.romaji)}
            >
              {anime.title.english || anime.title.romaji}
            </h5>
          </div>
          <div>
            <div></div>
            <div></div>
          </div>
        </div>
      </Link>
    </>
  );
};
