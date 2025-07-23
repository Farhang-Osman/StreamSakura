import React, { useEffect, useState } from 'react';
import { HomeAnimeInfo } from './Home';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { TbPlayerPlayFilled } from 'react-icons/tb';

const Movie = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [animeInfo, setAnimeInfo] = useState<HomeAnimeInfo[]>(
    [] as HomeAnimeInfo[],
  );

  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  async function fetchHomeData(): Promise<void> {
    try {
      setIsLoading(true);
      const res = await axios.get(`${BASE_URL}/api/movie`);

      if (res.status !== 200 || res.status >= 400) {
        throw new Error(`Server Error: ${res.status}`);
      } else if (Object.keys(res.data.results).length === 0) {
        navigate('/404');
      }

      setIsLoading(false);
      console.log(JSON.stringify(res.data.results.data));
      // setHomeData(res.data);
      setAnimeInfo(res.data.results.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchHomeData();
  }, []);

  return (
    <div className='search-card-grid-layout'>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {animeInfo.map((i) => (
            <Link
              className='no-underline animate-slideUp hover:z-20 focus:z-20 active:z-20'
              to={`/watch/${i.id}`}
              title={i.title || i.japanese_title}
            >
              <div className='w-full rounded-lg transition duration-200 ease-in-out scale-100 cursor-pointer group/title'>
                <div className='transition duration-200 ease-in-out hover:-translate-y-2.5'>
                  <div className='rounded-lg overflow-hidden relative aspect-[3/4] shadow-blue-900 animate-slideUp transition duration-200 ease-in-out shadow-[2px_2px_10px] text-left'>
                    <div className='whfull group'>
                      <img
                        src={i.poster || ''}
                        alt=''
                        className='whfull animation1 group-hover:brightness-60'
                      />
                      <TbPlayerPlayFilled
                        className='absolute inset-0 top-1/2 left-1/2 z-10 text-3xl text-blue-300 opacity-0 transition-opacity duration-300 ease-in -translate-x-1/2 -translate-y-1/2 group-hover:opacity-100'
                        title={'Play ' + (i.title || i.japanese_title)}
                      />
                    </div>
                  </div>
                </div>
                <div className='pt-1 pl-2'>
                  <h5
                    className='text-sm text-blue-800 font-bold transition duration-300 ease-in-out text-long group-hover/title:text-blue-500'
                    title={'Title: ' + (i.title || i.japanese_title)}
                  >
                    {i.title || i.japanese_title}
                  </h5>
                </div>
                <div>
                  <div></div>
                  <div className='flex justify-evenly'>
                    {i.tvInfo?.showType && (
                      <p className='px-1 text-xs bg-gray-200 text-blue-800 rounded-sm'>
                        {i.tvInfo?.showType}
                      </p>
                    )}
                    {/* {anime.releaseDate && (
                      <p className='px-1 text-xs bg-gray-200 text-blue-800 rounded-sm'>
                        {anime.releaseDate}
                      </p>
                    )}
                    {anime.rating && (
                      <p className='flex items-center px-1 text-xs bg-gray-200 text-blue-800 rounded-sm'>
                        {anime.rating >= 75 ? <TbStarFilled /> : <TbStarHalfFilled />}
                        {anime.rating}
                      </p>
                    )} */}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </>
      )}
    </div>
  );
};

export default Movie;
