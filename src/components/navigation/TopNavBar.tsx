import { useState } from 'react';
import { BiSolidCameraMovie } from 'react-icons/bi';
import { FaHistory } from 'react-icons/fa';
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
    <div className='flex fixed gap-2 max-md:h-14 top-0 right-0 bottom-0 items-center left-0 z-50 justify-between w-full h-16 backdrop-blur-sm bg-[var(--color-bg1)]/75'>
      <div className='items-center h-full w-fit'>
        <a
          onClick={() => navigate('/home')}
          className='flex h-full w-full cursor-pointer pl-10 max-lg:px-2 pr-4 items-center bg-[#bf0477] rounded-r-sm'
        >
          <div className='content-center h-full text-xl max-md:text-lg'>
            <p className='text-[#ffbcd8] border-b-2 border-dotted'>stream</p>
            <p className='text-[#fdd0b1]'>sakura</p>
          </div>
          <img src={blossomSvg} className='w-full size-15 min-w-12' />
        </a>
      </div>

      <ThemeSwitcher className='p-1 px-4 mr-auto text-lg font-medium text-center rounded-lg cursor-pointer h-fit max-md:hidden max-md:px-1 max-sm:text-sm text2 bg2' />
      <div className='flex m-auto px-8 max-md:px-0 justify-center justify-self-center items-center max-[900px]:max-w-72'>
        <search className='flex justify-center items-center px-1 w-full text-xl rounded-md appearance-none max-sm:text-lg bg2'>
          <input
            type='text'
            placeholder='search anime'
            className='px-1 py-1 w-full text2 placeholder:text-sm border-r-2 border-[var(--color-bg1)] focus:outline-none'
            value={search}
            onChange={handleInputChange}
            onKeyDown={handleKeyDownOnInput}
          />
          <ImSearch
            className='w-10 cursor-pointer text2'
            onClick={() => navigate(`/search?q=${search}`)}
          />
        </search>
      </div>
      <ThemeSwitcher className='py-1 mr-auto text-sm font-medium text-center rounded-lg cursor-pointer h-fit min-md:hidden text2 bg2' />
      <div className='flex gap-4 items-center pt-1 max-md:hidden max-lg:gap-2'>
        <div
          className='flex flex-col justify-center items-center px-1 h-full text-lg cursor-pointer max-lg:text-sm text2 group'
          onClick={() => handleRandomAnime()}
        >
          <GiPerspectiveDiceSixFacesRandom className='selected size-7' />
          <h3>Random</h3>
        </div>
        <div
          onClick={() => navigate('/special')}
          className='flex flex-col justify-center items-center px-1 h-full text-lg cursor-pointer max-lg:text-sm text2 group'
        >
          <RiVipDiamondFill className='selected size-7' />
          <p>Special</p>
        </div>
        <div
          onClick={() => navigate('/movie')}
          className='flex flex-col justify-center items-center px-1 h-full text-lg cursor-pointer max-lg:text-sm text2 group'
        >
          <BiSolidCameraMovie className='selected size-7' />
          <p>Movie</p>
        </div>
        <div
          onClick={() => navigate('/history')}
          className='flex flex-col justify-center items-center px-1 h-full text-lg cursor-pointer max-lg:text-sm text2 group'
        >
          <FaHistory className='selected size-6' />
          <h3>History</h3>
        </div>
      </div>
    </div>
  );
};

export default TopNavBar;
