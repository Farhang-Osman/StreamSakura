import { useEffect, useState } from 'react';
import { HomeAnimeInfo } from './Home';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CardItem } from '../components/shared/CardItem';

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
            <CardItem data={i} />
          ))}
        </>
      )}
    </div>
  );
};

export default Movie;
