import { FC, useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Anime } from '../../index';
import { FaCalendarAlt, FaPlay, FaStar } from 'react-icons/fa';
import { TbCards } from 'react-icons/tb';

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
              className='text-sm font-bold transition duration-300 ease-in-out text-long group-hover/title:text-fuchsia-500'
              title={'Title: ' + (anime.title.english || anime.title.romaji)}
            >
              {anime.title.english || anime.title.romaji}
            </h5>
          </div>
          <div>
            <div></div>
            <div className='flex justify-evenly pt-1'>
              {anime.type && (
                <p className='px-1 text-xs font-bold rounded-sm bg-neutral-200 text-neutral-500'>
                  {anime.type}
                </p>
              )}
              {anime.releaseDate && (
                <p className='flex items-center px-1 text-xs rounded-sm border-none bg-neutral-200 text-neutral-500'>
                  <FaCalendarAlt />
                  {anime.releaseDate}
                </p>
              )}
              {(anime.totalEpisodes || anime.episodes) && (
                <p className='flex items-center px-1 text-xs rounded-sm bg-neutral-200 text-neutral-500'>
                  <TbCards />
                  {anime.totalEpisodes || anime.episodes}
                </p>
              )}
              {anime.rating && (
                <p className='flex items-center px-1 text-xs rounded-sm bg-neutral-200 text-neutral-500'>
                  <FaStar />
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
