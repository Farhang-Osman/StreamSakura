import { FC, useEffect, useState } from 'react';
import { tvInfo } from './Watch';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

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

  // const params = new URLSearchParams(location.search);
  // console.log(params.get('q'));

  // const test = async () => {
  //   return await fetchSearchResults(params.get('q') as string);
  // };
  // console.log(test());

  console.log(resp);

  return (
    <div>
      <p className='text-6xl'>search page</p>
      <div className='flex gap-4'>
        {resp?.data.map((item) => (
          <div>
            <p>id: {item.id}</p>
            <p className='text-2xl'>{item.japanese_title}</p>
            <img src={item.poster} alt='' />
          </div>
        ))}
      </div>

      <p>totalPage: {resp?.totalPage}</p>
    </div>
  );
};

export default Search;
