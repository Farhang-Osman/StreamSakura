import { CgProfile } from 'react-icons/cg';
import { SiAnilist } from 'react-icons/si';
import { IoLogOutOutline } from 'react-icons/io5';
import { useAuth } from '../client/useAuth';
import { useEffect } from 'react';

const Profile = () => {
  const { isLoggedIn, userData, username, login, logout } = useAuth();

  useEffect(() => {
    document.title = 'Profile | Stream Sakura';
  }, []);

  return (
    <div>
      {isLoggedIn && userData ? (
        <div className='flex flex-col gap-2 items-center'>
          <img
            className='size-28'
            src={userData.avatar.large}
            alt={`${username}'s avatar`}
          />
          <p className='px-1 mb-2 text-lg text-blue-600 bg-gray-200 rounded-sm'>
            <b>{username}</b>
          </p>
          <p className='px-1 text-blue-800 bg-gray-200 rounded-sm'>
            anime watched: <b>{userData.statistics.anime.count}</b>
          </p>
          <p className='px-1 text-blue-800 bg-gray-200 rounded-sm'>
            total episodes watched:{' '}
            <b>{userData.statistics.anime.episodesWatched}</b>
          </p>
          <p className='px-1 text-blue-800 bg-gray-200 rounded-sm'>
            total minutes watched: <b>{userData.statistics.anime.meanScore}</b>
          </p>
          <p className='px-1 text-blue-800 bg-gray-200 rounded-sm'>
            average score: <b>{userData.statistics.anime.minutesWatched}</b>
          </p>
          <a
            onClick={logout}
            className='flex gap-2 items-center mt-2 bg-gray-200 rounded-t-lg shadow cursor-pointer hover:bg-blue-200 label'
          >
            <h3>Log out</h3>
            <IoLogOutOutline className='size-8' />
          </a>
        </div>
      ) : (
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
              className='flex gap-2 items-center bg-gray-200 rounded-t-lg shadow cursor-pointer hover:bg-blue-200 label'
            >
              <h3>Log in with</h3>
              <SiAnilist className='size-8' />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
