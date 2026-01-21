import { FC, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
// import { Anime } from '../../hooks/animeInterface';
// import { TbCards } from 'react-icons/tb';
// import { FaPlay, FaStar } from 'react-icons/fa';
// import { FaClock } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { HomeAnimeInfo } from '../../pages/Home';
import { TbPlayerPlayFilled } from 'react-icons/tb';
import { ImFire } from 'react-icons/im';

interface HomeVerticalSlide {
  data: HomeAnimeInfo[] | undefined;
  isLoading: boolean;
  error?: string | null;
}

export const HomeVerticalSlide: FC<HomeVerticalSlide> = ({
  data = [],
  isLoading,
}) => {
  const navigate = useNavigate();

  const useAdjustSlidesPerView = (): number => {
    const [screenwidth, setScreenWidth] = useState<number>(window.innerWidth);

    useEffect(() => {
      const handleResize = () => {
        setScreenWidth(window.innerWidth);
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    const slidePerView =
      screenwidth > 1250
        ? 6
        : screenwidth > 1000
          ? 5
          : screenwidth > 800
            ? 4
            : screenwidth > 480
              ? 3
              : 2;

    return slidePerView;
  };

  return (
    <>
      <div className='rounded-lg shadow'>
        <div className='flex gap-4 justify-center items-center mb-2 label border1 text1'>
          <ImFire />
          <h3>Trending</h3>
          <ImFire />
        </div>
        {isLoading && (
          <div className='flex overflow-hidden gap-4 w-full animate-pulse'>
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className='flex gap-1 w-full h-60 max-md:h-40'>
                <p className='w-8 bg-gray-400 rounded-lg aspect-square'></p>
                <div className='aspect-[3/4] bg-gray-400 rounded-lg'></div>
              </div>
            ))}
          </div>
        )}
        <Swiper
          className='relative cursor-grab active:cursor-grabbing'
          spaceBetween={5}
          slidesPerView={useAdjustSlidesPerView()}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          pagination={{
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true,
            type: 'bullets',
          }}
          freeMode={false}
          virtual={true}
          grabCursor={true}
          keyboard={true}
          // centeredSlides={true}
        >
          {data.map((i) => (
            <SwiperSlide
              className='flex relative justify-start items-center mb-6 animate-fade'
              key={i.id}
              title={'Play ' + (i.title || i.japanese_title)}
            >
              <div className='flex gap-1 pr-2 text2'>
                <h3 className='px-1 font-serif text-2xl font-bold rounded-sm bg2 h-fit'>
                  {i.number}
                </h3>
                <div className='grid gap-1 w-full rounded-lg transition duration-200 ease-in-out scale-100 cursor-pointer'>
                  <div className='rounded-lg w-full h-full group overflow-hidden relative aspect-[3/4] shadow transition duration-200 ease-in-out text-left'>
                    <img
                      src={i.poster}
                      alt=''
                      onClick={() => navigate(`/watch/${i.id}`)}
                      className='w-full h-full group-hover:brightness-60'
                    />
                    <TbPlayerPlayFilled className='absolute inset-0 top-1/2 left-1/2 z-10 text-3xl opacity-0 transition-opacity duration-300 ease-in -translate-x-1/2 -translate-y-1/2 group-hover:opacity-100' />
                  </div>

                  <h5
                    className='font-bold text-center transition duration-300 ease-in-out text-long'
                    title={'Title: ' + (i.title || i.japanese_title)}
                  >
                    {i.title || i.japanese_title}
                  </h5>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className='swiper-pagination'></div>
        </Swiper>
      </div>
    </>
  );
};
