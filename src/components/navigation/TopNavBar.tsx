import { useState } from 'react';
import { BiSolidCameraMovie } from 'react-icons/bi';
import { FaDiscord, FaHistory } from 'react-icons/fa';
import { GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi';
import { ImSearch } from 'react-icons/im';
import { RiVipDiamondFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

import blossomSvg from '/cherry-blossom-svgrepo-com-optimized.svg';
import axios from 'axios';
import ThemeSwitcher from '../ThemeSwitcher';

const TopNavBar = () => {
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  const [search, setSearch] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearch(newValue);
  };

  const handleKeyDownOnInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      navigate(`/search?q=${search}`);
    }
  };

  const handleRandomAnime = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/random`);
      console.log(JSON.stringify(res.data.results.id));

      window.location.pathname = `/watch/${res.data.results.id}`;
    } catch (error) {
      return error;
    }
  };

  return (
    <div className='flex fixed top-0 right-0 bottom-0 left-0 z-50 justify-between w-full h-16 backdrop-blur-sm bg-[var(--color-bg1)]/75'>
      <div className='flex gap-2 items-center h-full'>
        <a
          onClick={() => navigate('/home')}
          className='flex h-full cursor-pointer pl-10 pr-4 items-center bg-[#bf0477] rounded-r-sm'
        >
          <div className='h-full text-xl'>
            <p className='text-[#ffbcd8] border-b-2 border-dotted'>stream</p>
            <p className='text-[#fdd0b1]'>sakura</p>
          </div>
          <img src={blossomSvg} className='size-15' />
        </a>

        <ThemeSwitcher />
      </div>
      <div className='flex justify-center justify-self-center items-center'>
        <search className='flex justify-center items-center px-1 text-xl rounded-md appearance-none bg2'>
          <input
            type='text'
            placeholder='search anime'
            className='px-1 py-1 placeholder-[var(--color-bg1))] text2 border-r-2 border-[var(--color-bg1)] focus:outline-none'
            value={search}
            onChange={handleInputChange}
            // onClick={() => navigate(`/search/${search}`)}
            onKeyDown={handleKeyDownOnInput}
          />
          <ImSearch
            className='w-10 cursor-pointer size-6 text2'
            onClick={() => navigate(`/search?q=${search}`)}
          />
        </search>
      </div>
      <div className='flex gap-8 items-center pt-1'>
        <div
          className='flex flex-col items-center px-1 h-full text2 group hover:cursor-pointer'
          onClick={() => handleRandomAnime()}
        >
          <GiPerspectiveDiceSixFacesRandom className='selected size-9' />
          <h3>Random</h3>
        </div>
        <div
          onClick={() => navigate('/special')}
          className='flex flex-col items-center px-1 h-full text2 group hover:cursor-pointer'
        >
          <RiVipDiamondFill className='selected size-9' />
          <p>Special</p>
        </div>
        <div
          onClick={() => navigate('/movie')}
          className='flex flex-col items-center px-1 h-full text2 group hover:cursor-pointer'
        >
          <BiSolidCameraMovie className='selected size-9' />
          <p>Movie</p>
        </div>
        <div className='flex flex-col items-center px-1 h-full text2 group hover:cursor-pointer'>
          <FaDiscord className='selected size-9' />
          <p>Dicord</p>
        </div>
        <div
          onClick={() => navigate('/history')}
          className='flex flex-col justify-center items-center px-1 h-full text2 group hover:cursor-pointer'
        >
          <FaHistory className='selected size-8' />
          <h3>History</h3>
        </div>
      </div>
    </div>
  );
};

export default TopNavBar;
