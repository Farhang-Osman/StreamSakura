import { FC } from 'react';
import { recommendedAndRelatedData } from '../../pages/Watch';
import { Link } from 'react-router-dom';
import { HomeAnimeInfo } from '../../pages/Home';
// import { TbStarFilled, TbStarHalfFilled } from 'react-icons/tb';

export const SideBar: FC<{
  animeData: recommendedAndRelatedData[] | HomeAnimeInfo[] | [];
  title: string;
  icon?: React.ReactNode;
  isLoading?: boolean;
}> = ({ animeData, title, icon, isLoading }) => {
  return (
    <div className='flex flex-col rounded-lg border-4 border-gray-300 h-fit'>
      <div className='flex gap-2 items-center p-2 text-blue-800 bg-gray-300'>
        {icon}
        <h3 className='bg-gray-200 label'>{title}</h3>
      </div>
      <div className='flex overflow-x-hidden relative flex-col gap-2 rounded-lg h-[1200px]'>
        {isLoading && (
          <>
            {Array.from({ length: 10 }).map((_, index) => (
              <div
                key={index}
                className='aspect-[5/1] relative animate-pulse rounded-lg bg-gray-300 min-h-28 max-h-28 w-full'
              >
                <div className='absolute left-0 w-1/5 h-full bg-gray-400 rounded-lg'></div>
              </div>
            ))}
          </>
        )}

        {animeData.map((anime: recommendedAndRelatedData | HomeAnimeInfo) => (
          <Link
            className=''
            to={`/watch/${anime.id}`}
            target='_blank'
            key={anime.data_id}
          >
            <div className='group relative aspect-[5/1] animate-fade min-h-28 max-h-28 w-full'>
              <div className='absolute right-0 w-3/4 h-full'>
                <div className='absolute w-full h-full bg-gradient-to-l from-transparent to-white to-85% group-hover:to-100% group-hover:from-75%'></div>
                <img
                  className='object-cover w-full h-full rounded-lg'
                  src={anime.poster}
                  alt=''
                />
              </div>
              <div className='flex overflow-hidden relative gap-4 h-full rounded-lg'>
                <img
                  className='rounded-lg transition duration-200 ease-in-out group-hover:translate-x-2'
                  src={anime.poster}
                  alt=''
                />
                <div className='flex flex-col justify-between'>
                  <div className='flex flex-col justify-between py-1 h-full'>
                    <h5 className='pr-1 font-medium text-blue-800 rounded-lg backdrop-blur-3xl transition duration-200 ease-out group-hover:text-blue-500 w-fit'>
                      {anime.title || anime.japanese_title}
                    </h5>
                    <div className='flex gap-1'>
                      {anime.tvInfo?.showType && (
                        <p className='px-1 text-xs text-blue-800 bg-gray-200 rounded-sm'>
                          {anime.tvInfo?.showType}
                        </p>
                      )}
                      {/* {anime.releaseDate && (
                      <p className='px-1 text-xs text-blue-800 bg-gray-200 rounded-sm'>
                        {anime.releaseDate}
                      </p>
                    )}
                    {anime.rating && (
                      <p className='flex items-center px-1 text-xs text-blue-800 bg-gray-200 rounded-sm'>
                        {anime.rating >= 75 ? (
                          <TbStarFilled />
                        ) : (
                          <TbStarHalfFilled />
                        )}
                        {anime.rating}
                      </p>
                    )} */}
                    </div>
                  </div>
                  {/* <div className='flex gap-1 text-nowrap'>
                  {anime.genres && (
                    <>
                      {anime.genres.map((item) => (
                        <p className='px-1 text-xs text-blue-800 bg-gray-200 rounded-md rounded-br-none rounded-bl-none'>
                          {item}
                        </p>
                      ))}
                    </>
                  )}
                </div> */}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
