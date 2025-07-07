import { FC, useEffect, useState } from 'react';
import { tvInfo } from './Watch';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { CardItem2 } from '../components/shared/CardItem2';

interface searchResults {
  data: [
    {
      id: string;
      title: string;
      japanese_title: string;
      poster: string;
      duration: string;
      tvInfo: tvInfo;
    },
  ];
  totalPage: number;
}

const Search: FC = () => {
  const location = useLocation();

  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  const [resp, setResp] = useState<searchResults>();

  async function fetchSearchResults(query: string) {
    try {
      const res = await axios.get(`${BASE_URL}/api/search`, {
        params: { keyword: query },
      });

      if (res.status !== 200 || res.status >= 400) {
        throw new Error(`Server Error: ${res.status}`);
      } else if (Object.keys(res.data.results).length === 0) {
        navigate('/404');
      }

      return res.data.results;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get('q');

    const fetchResults = async () => {
      if (q === '') {
        const res = await fetchSearchResults('a');
        setResp(res);
      } else {
        const res = await fetchSearchResults(q as string);
        setResp(res);
      }
    };
    fetchResults();
  }, [location]);

  return (
    <div>
      <p>totalPage: {resp?.totalPage}</p>
      <div className='relative transition card-grid-layout duration-0'>
        {resp?.data.map((anime) => (
          <CardItem2
            key={anime.id}
            anime={{
              id: anime.id,
              image: anime.poster,
              englishTitle: anime.title,
              japaneseTitle: anime.japanese_title,
              type: anime.tvInfo.showType,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Search;
