import { useEffect } from 'react';

const Home = () => {
  useEffect(() => {
    document.title = 'StreamSakura | watch anime online';
  }, []);

  return (
    <div className='flex flex-col gap-4 mx-auto my-0 max-w-full'>
      home carousal
    </div>
  );
};

export default Home;
