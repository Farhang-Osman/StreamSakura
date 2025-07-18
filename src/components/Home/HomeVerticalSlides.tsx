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

interface HomeVerticalSlide {
  data: HomeAnimeInfo[] | undefined;
  loading: boolean;
  error?: string | null;
}

export const HomeVerticalSlide: FC<HomeVerticalSlide> = ({
  data = [],
  // loading = true,
}) => {
  const navigate = useNavigate();

  const handlePlayButtonCllick = (id: string) => {
    return navigate(`/watch/${id}`);
  };

  // const filteredData = data.filter(
  //   (item) =>
  //     item.title &&
  //     item.description &&
  //     item.cover !== item.image &&
  //     !item.genres.includes('Ecchi') &&
  //     !item.genres.includes('Hentai') &&
  //     !item.genres.includes('Romance') &&
  //     !item.genres.includes('Fantasy'),
  // );

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

    console.log('screenwidth >>> ', screenwidth);
    const slidePerView =
      screenwidth > 1250
        ? 6
        : screenwidth > 1000
          ? 5
          : screenwidth > 800
            ? 4
            : 3;

    return slidePerView;
  };

  return (
    <>
      <div className='bg-gray-300 rounded-sm'>
        <h2 className='mb-2 label'>trending</h2>
        <Swiper
          className='relative rounded-lg cursor-grab active:cursor-grabbing'
          spaceBetween={5}
          slidesPerView={useAdjustSlidesPerView()}
          // loop={true}
          // autoplay={{
          //   delay: 4000,
          //   disableOnInteraction: false,
          // }}
          // breakpoints={{
          //   1024: {
          //     slidesPerView: 2,
          //     spaceBetween: 20,
          //   },
          // }}
          // navigation={{
          //   nextEl: '.swiper-button-next',
          //   prevEl: '.swiper-button-prev',
          // }}
          // pagination={{
          //   el: '.swiper-pagination',
          //   clickable: true,
          //   dynamicBullets: true,
          //   type: 'bullets',
          // }}
          // freeMode={false}
          // virtual={true}
          // grabCursor={true}
          // keyboard={true}
          // centeredSlides={false}
        >
          {data.map((i) => (
            <SwiperSlide
              className='flex relative justify-start items-center'
              key={i.id}
              title={i.title || i.japanese_title}
            >
              <div className='w-full rounded-lg transition duration-200 ease-in-out scale-100 cursor-pointer group/title'>
                <div className='rounded-lg overflow-hidden relative aspect-[3/4] shadow-blue-900  transition duration-200 ease-in-out shadow-[2px_2px_10px] text-left'>
                  <div className='whfull group'>
                    <img
                      src={i.poster}
                      alt=''
                      className='whfull group-hover:brightness-60'
                    />
                    <TbPlayerPlayFilled
                      className='absolute inset-0 top-1/2 left-1/2 z-10 text-3xl text-blue-300 opacity-0 transition-opacity duration-300 ease-in -translate-x-1/2 -translate-y-1/2 group-hover:opacity-100'
                      title={'Play ' + (i.title || i.japanese_title)}
                    />
                  </div>
                </div>
                <h5
                  className='text-sm font-bold text-center text-blue-800 transition duration-300 ease-in-out text-long group-hover/title:text-blue-500'
                  title={'Title: ' + (i.title || i.japanese_title)}
                >
                  {i.title || i.japanese_title}
                </h5>
              </div>
            </SwiperSlide>
          ))}
          <div className='swiper-pagination'></div>
        </Swiper>
      </div>
    </>
  );
};
