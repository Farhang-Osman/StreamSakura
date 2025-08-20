import { useEffect, useState } from 'react';
import { HomeAnimeInfo } from './Home';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CardItem } from '../components/shared/CardItem';

const Movie = () => {
  useEffect(() => {
    document.title = 'Movie | Stream Sakura';
  }, []);

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
    <>
      {isLoading ? (
        <div className='search-card-grid-layout'>
          {Array.from({ length: 30 }).map((_, index) => (
            <div
              key={index}
              className='bg-gray-300 animate-pulse shadow rounded-lg aspect-[3/4]'
            ></div>
          ))}
        </div>
      ) : (
        <div className='search-card-grid-layout'>
          {animeInfo.map((i) => (
            <CardItem data={i} key={i.id} />
          ))}
        </div>
      )}
    </>
  );
};

export default Movie;
