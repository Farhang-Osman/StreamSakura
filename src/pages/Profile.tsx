import { CgProfile } from 'react-icons/cg';
import { SiAnilist } from 'react-icons/si';
import { useAuth } from '../client/useAuth';

const Profile = () => {
  const { login } = useAuth();

  return (
    <div className='flex flex-col gap-16 items-center p-2'>
      <div className='flex flex-col items-center'>
        <CgProfile className='text-blue-800 size-24' />
        <p className='px-1 text-lg text-blue-600 bg-gray-200 rounded-sm'>
          guest
        </p>
      </div>
      <div className='flex flex-col gap-2 justify-center items-center'>
        <p className='px-1 text-sm text-blue-800 bg-gray-200 rounded-sm'>
          Please log in to view your AniList profile
        </p>
        <a
          onClick={login}
          className='flex gap-2 items-center bg-gray-200 rounded-t-lg cursor-pointer hover:bg-blue-200 label'
        >
          <h3>Log in with</h3>
          <SiAnilist className='size-8' />
        </a>
      </div>
    </div>
  );
};

export default Profile;
