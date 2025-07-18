import { FaHistory } from 'react-icons/fa';
import { IoMdHome } from 'react-icons/io';

const SideNavBar = () => {
  return (
    <div className='fixed left-0 top-16 z-50 w-20 h-full bg-gray-300 bg'>
      <div className='flex flex-col'>
        <div className='flex flex-col items-center py-2 h-full hover:bg-gray-100 group hover:cursor-pointer'>
          <IoMdHome className='text-blue-500 group-hover:text-blue-700 size-6' />
          <h3>Home</h3>
        </div>
        <div className='flex flex-col items-center py-2 h-full hover:bg-gray-100 group hover:cursor-pointer'>
          <FaHistory className='text-blue-500 group-hover:text-blue-700 size-6' />
          <h3>History</h3>
        </div>
      </div>
    </div>
  );
};

export default SideNavBar;
