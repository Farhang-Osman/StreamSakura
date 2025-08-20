import { useEffect } from 'react';

const TOS = () => {
  useEffect(() => {
    document.title = 'terms of service | Stream Sakura';
  }, []);

  return <p className='text-6xl font-bold'>TOS page</p>;
};

export default TOS;
