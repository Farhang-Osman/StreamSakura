import { FC } from 'react';
import { Anime } from '../../hooks/animeInterface';
import { Link } from 'react-router-dom';
import { TbStarFilled, TbStarHalfFilled } from 'react-icons/tb';

export const HomeSideBar: FC<{ animeData: Anime[] }> = ({ animeData }) => {
  return (
    <div className='flex relative flex-col gap-2 mx-2 mt-2 rounded-lg'>
      {animeData.map((anime: Anime) => (
        <Link className='' to={`/watch/${anime.id}`} key={anime.id}>
          <div className='relative aspect-[5/1]'>
            <img
              className='object-cover absolute w-full h-full rounded-lg pl-50'
              src={anime.cover}
              alt=''
            />
            <div className='flex relative z-10 w-full h-full rounded-lg'>
              <img className='rounded-lg' src={anime.image} alt='' />
              <div className='flex flex-col gap-1 ml-2'>
                <h5 className=''>
                  {anime.title.english || anime.title.romaji}
                </h5>
                <div className='flex gap-2 mt-0.5'>
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
                <div className='flex bottom-0 gap-2'>
                  {anime.genres && (
                    <>
                      {anime.genres.map((item) => (
                        <p className='px-1 text-xs rounded-sm bg-neutral-200 text-neutral-500'>
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
