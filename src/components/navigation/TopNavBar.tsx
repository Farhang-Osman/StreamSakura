import { useState } from 'react';
import { BiSolidCameraMovie } from 'react-icons/bi';
import { FaDiscord } from 'react-icons/fa';
import { GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi';
import { ImSearch } from 'react-icons/im';
import { RiVipDiamondFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

import blossomSvg from '/cherry-blossom-svgrepo-com-optimized.svg';

const TopNavBar = () => {
  const navigate = useNavigate();

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

  return (
    <div className='flex fixed top-0 right-0 bottom-0 left-0 justify-around w-full h-16 bg-gray-300'>
      <div className='flex gap-2 items-center h-full'>
        <div className='flex items-center bg-[#bf0477] px-4 rounded-sm'>
          <div className='h-full text-xl'>
            <p className='text-[#ffbcd8]'>stream</p>
            <p className='text-[#fdd0b1]'>sakura</p>
          </div>
          <img src={blossomSvg} className='size-15' />
        </div>
        <p>theme</p>
      </div>
      <div className='flex justify-center justify-self-center items-center'>
        <search className='flex gap-2 justify-center items-center px-1 text-xl bg-gray-200 rounded-sm appearance-none'>
          <ImSearch className='text-blue-500 size-6 hover:text-blue-700' />
          <input
            type='text'
            placeholder='search anime'
            className='py-1 placeholder-blue-300 focus:outline-none'
            value={search}
            onChange={handleInputChange}
            // onClick={() => navigate(`/search/${search}`)}
            onKeyDown={handleKeyDownOnInput}
          />
          <ImSearch
            className='w-10 text-blue-500 size-6 hover:text-blue-700 hover:cursor-pointer'
            onClick={() => navigate(`/search?q=${search}`)}
          />
        </search>
      </div>
      <div className='flex gap-8 items-center'>
        <div className='flex flex-col items-center hover:cursor-pointer'>
          <GiPerspectiveDiceSixFacesRandom className='text-blue-500 size-9' />
          <h3 className='text-sm'>Random</h3>
        </div>
        <div className='flex flex-col items-center hover:cursor-pointer'>
          <RiVipDiamondFill className='text-blue-500 size-9' />
          <p>Special</p>
        </div>
        <div className='flex flex-col items-center hover:cursor-pointer'>
          <BiSolidCameraMovie className='text-blue-500 size-9' />
          <p>Movie</p>
        </div>
        <div className='flex flex-col items-center hover:cursor-pointer'>
          <FaDiscord className='text-blue-500 size-9' />
          <p>Dicord</p>
        </div>
      </div>
    </div>
  );
};

export default TopNavBar;
