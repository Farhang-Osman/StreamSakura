import { FC } from 'react';
import { recommendedAndRelatedData } from '../../pages/Watch';
import { Link } from 'react-router-dom';
// import { TbStarFilled, TbStarHalfFilled } from 'react-icons/tb';

export const SideBar: FC<{
  animeData: recommendedAndRelatedData[];
  title: string;
  icon?: React.ReactNode;
}> = ({ animeData, title, icon }) => {
  return (
    <div className='flex flex-col gap-2 h-fit'>
      <div className='flex gap-2 items-center text-blue-800'>
        {icon}
        <h3 className='bg-gray-200 label'>{title}</h3>
      </div>
      <div className='flex relative flex-col gap-2 mt-2 rounded-lg'>
        {animeData.map((anime: recommendedAndRelatedData) => (
          <Link className='' to={`/watch/${anime.id}`} key={anime.data_id}>
            <div className='group relative aspect-[5/1] animate-slideUp min-h-28 max-h-28 w-full'>
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
                  className='rounded-lg transition duration-200 ease-in-out group-hover:translate-x-3'
                  src={anime.poster}
                  alt=''
                />
                <div className='flex flex-col justify-between'>
                  <div className='flex flex-col justify-between py-1 h-full'>
                    <h5 className='pr-1 font-medium text-blue-800 rounded-lg backdrop-blur-3xl transition duration-200 ease-out group-hover:text-blue-500 w-fit'>
                      {anime.title || anime.japanese_title}
                    </h5>
                    <div className='flex gap-1'>
                      {anime.tvInfo.showType && (
                        <p className='px-1 text-xs text-blue-800 bg-gray-200 rounded-sm'>
                          {anime.tvInfo.showType}
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
