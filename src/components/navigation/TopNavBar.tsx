import { useState } from 'react';
import { ImSearch } from 'react-icons/im';
import { useNavigate } from 'react-router-dom';

const TopNavBar = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearch(newValue);
  };

  const handleKeyDownOnInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      navigate(`/search?${search}`);
    }
  };

  return (
    <div className='flex fixed top-0 right-0 bottom-0 left-0 justify-between w-full h-16 bg-gray-200'>
      <div className=''>logo</div>
      <div className='flex justify-center items-center'>
        <search className='flex justify-center items-center'>
          <input
            type='text'
            placeholder='search anime'
            className='border p-1 px-2 rounded-sm'
            value={search}
            onChange={handleInputChange}
            // onClick={() => navigate(`/search/${search}`)}
            onKeyDown={handleKeyDownOnInput}
          />
          <ImSearch />
        </search>
      </div>
      <div>profile</div>
    </div>
  );
};

export default TopNavBar;
