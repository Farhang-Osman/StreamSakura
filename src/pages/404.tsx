import { useNavigate } from 'react-router-dom';
import punch_screen from '/src/assets/punch_screen.webp';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className='flex flex-col gap-2 items-center mt-4'>
      <p className='text-5xl font-extralight text2'>404 Error</p>
      <p className='text-5xl font-medium text2'>Not Found</p>
      <img src={punch_screen} alt='404 Error' />
      <button
        className='rounded-lg shadow cursor-pointer bg2 label'
        onClick={() => navigate('/home')}
      >
        <p className='text-2xl selected'>go to home</p>
      </button>
    </div>
  );
};

export default NotFound;
