import { FaHistory } from 'react-icons/fa';
import { IoMdHome } from 'react-icons/io';
import ThemeSwitcher from '../ThemeSwitcher';
import { GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi';
import { useNavigate } from 'react-router-dom';
import { RiVipDiamondFill } from 'react-icons/ri';
import { BiSolidCameraMovie } from 'react-icons/bi';
import axios from 'axios';

const BottomNavBar = () => {
  const navigate = useNavigate();

  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

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
    <div className='fixed flex gap-4 items-center px-4 py-2 min-md:hidden justify-evenly bottom-0 left-0 right-0 z-50 w-full h-16 backdrop-blur-sm bg-[var(--color-bg1)]/75'>
      {/* <div className='flex flex-col'>
        <div className='flex flex-col items-center py-2 h-full hover:bg-gray-100 group hover:cursor-pointer'>
          <IoMdHome className='text-blue-500 group-hover:text-blue-700 size-6' />
          <h3>Home</h3>
        </div>
        <div className='flex flex-col items-center py-2 h-full hover:bg-gray-100 group hover:cursor-pointer'>
          <FaHistory className='text-blue-500 group-hover:text-blue-700 size-6' />
          <h3>History</h3>
        </div>
      </div> */}

      {/* <div className='absolute right-0 top-14 rounded-lg border bg2 animate-fade'> */}
      {/* <div className='flex flex-col items-center px-1 py-2 pt-1 max-md:gap-4 max-lg:gap-2'> */}
      {/* <ThemeSwitcher className='h-fit p-1 px-4 text-lg font-medium text-center rounded-lg cursor-pointer max-[900px]:px-1 max-[900px]:text-sm text2 bg2' /> */}

      <div className='flex flex-col justify-center items-center h-full text-lg cursor-pointer max-lg:text-sm text2'>
        <IoMdHome className='selected size-7' />
        <h3>Home</h3>
      </div>
      <div
        className='flex flex-col justify-center items-center h-full text-lg cursor-pointer max-lg:text-sm text2'
        onClick={() => handleRandomAnime()}
      >
        <GiPerspectiveDiceSixFacesRandom className='selected size-7' />
        <h3>Random</h3>
      </div>
      <div
        onClick={() => navigate('/special')}
        className='flex flex-col justify-center items-center h-full text-lg cursor-pointer max-lg:text-sm text2'
      >
        <RiVipDiamondFill className='selected size-7' />
        <p>Special</p>
      </div>
      <div
        onClick={() => navigate('/movie')}
        className='flex flex-col justify-center items-center h-full text-lg cursor-pointer max-lg:text-sm text2'
      >
        <BiSolidCameraMovie className='selected size-7' />
        <p>Movie</p>
      </div>
      <div
        onClick={() => navigate('/history')}
        className='flex flex-col justify-center items-center h-full text-lg cursor-pointer max-lg:text-sm text2'
      >
        <FaHistory className='selected size-6' />
        <h3>History</h3>
      </div>
      {/* </div> */}
      {/* </div> */}
    </div>
  );
};

export default BottomNavBar;
