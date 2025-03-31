import { useEffect } from 'react';

const Home = () => {
  useEffect(() => {
    document.title = 'StreamSakura | watch anime online';
  }, []);

  return <p className='text-6xl font-bold'>Home page</p>;
};

export default Home;
