import { useNavigate } from 'react-router-dom';
import punch_screen from '/src/assets/punch_screen.webp';

const Watch = () => {
  const navigate = useNavigate();

  return (
    <div className='flex items-center flex-col gap-2 mt-4'>
      <p className='font-medium text-xl'>No episodes found</p>
      <img src={punch_screen} alt='404 Error' />
      <button
        className='cursor-pointer bg-gray-200 hover:bg-blue-200 rounded-lg label'
        onClick={() => navigate('/home')}
      >
        go to home
      </button>
    </div>
  );
};

export default Watch;
