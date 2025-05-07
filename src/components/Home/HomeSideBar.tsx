import { FC } from 'react';
import { Anime } from '../../hooks/animeInterface';
import { Link } from 'react-router-dom';
import { TbStarFilled, TbStarHalfFilled } from 'react-icons/tb';

export const HomeSideBar: FC<{ animeData: Anime[] }> = ({ animeData }) => {
  return (
    <div className='flex relative flex-col gap-2 mx-2 mt-2 rounded-lg'>
      {animeData.map((anime: Anime) => (
        <Link className='' to={`/watch/${anime.id}`} key={anime.id}>
          <div className='group relative aspect-[5/1] animate-slideUp min-h-28 max-h-28 w-full'>
            <div className='absolute right-0 w-3/4 h-full transition grayscale-80 group-hover:grayscale-0'>
              <div className='absolute w-full h-full bg-gradient-to-l from-transparent to-white from-25%'></div>
              <img
                className='object-cover w-full h-full rounded-lg'
                src={anime.cover || anime.image}
                alt=''
              />
            </div>
            <div className='flex overflow-hidden relative gap-4 h-full rounded-lg'>
              <img
                className='rounded-lg transition duration-100 ease-out group-hover:translate-x-3'
                src={anime.image}
                alt=''
              />
              <div className='flex flex-col justify-between'>
                <div className='flex flex-col justify-between py-1 h-full'>
                  <h5 className='pr-1 rounded-lg backdrop-blur-lg transition duration-100 ease-out w-fit group-hover:translate-x-3'>
                    {anime.title.english || anime.title.romaji}
                  </h5>
                  <div className='flex gap-1'>
                    {anime.type && (
                      <p className='px-1 text-xs rounded-sm bg-neutral-200 text-neutral-500'>
                        {anime.type}
                      </p>
                    )}
                    {anime.releaseDate && (
                      <p className='px-1 text-xs rounded-sm bg-neutral-200 text-neutral-500'>
                        {anime.releaseDate}
                      </p>
                    )}
                    {anime.rating && (
                      <p className='flex items-center px-1 text-xs rounded-sm bg-neutral-200 text-neutral-500'>
                        {anime.rating >= 75 ? (
                          <TbStarFilled />
                        ) : (
                          <TbStarHalfFilled />
                        )}
                        {anime.rating}
                      </p>
                    )}
                  </div>
                </div>
                <div className='flex gap-1 text-nowrap'>
                  {anime.genres && (
                    <>
                      {anime.genres.map((item) => (
                        <p className='px-1 text-xs rounded-md rounded-br-none rounded-bl-none bg-neutral-200 text-neutral-500'>
                          {item}
                        </p>
                      ))}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};
