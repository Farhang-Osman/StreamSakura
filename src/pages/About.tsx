import { useEffect } from 'react';

const About = () => {
  useEffect(() => {
    document.title = 'About | Stream Sakura';
  }, []);

  return <p className='text-6xl font-bold'>About page</p>;
};

export default About;
