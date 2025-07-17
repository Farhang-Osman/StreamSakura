import { FC } from 'react';
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

  return (
    <>
      <div className='bg-gray-300'>
        <h2 className='label'>trending</h2>
        <Swiper
          className='relative max-w-full h-96 rounded-lg max-lg:h-80 max-sm:h-64 cursor-grab active:cursor-grabbing'
          spaceBetween={10}
          slidesPerView={5}
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
                <div className='transition duration-200 ease-in-out hover:-translate-y-2.5'>
                  <div className='rounded-lg overflow-hidden relative aspect-[3/4] shadow-blue-900 animate-slideUp transition duration-200 ease-in-out shadow-[2px_2px_10px] text-left'>
                    <div className='whfull group'>
                      <img
                        src={i.poster}
                        alt=''
                        className='whfull animation1 group-hover:brightness-60'
                      />
                      <TbPlayerPlayFilled
                        className='absolute inset-0 top-1/2 left-1/2 z-10 text-3xl text-blue-300 opacity-0 transition-opacity duration-300 ease-in -translate-x-1/2 -translate-y-1/2 group-hover:opacity-100'
                        title={'Play ' + (i.title || i.japanese_title)}
                      />
                    </div>
                  </div>
                </div>
                <div className='pt-1 pl-2'>
                  <h5
                    className='text-sm text-blue-800 font-bold transition duration-300 ease-in-out text-long group-hover/title:text-blue-500'
                    title={'Title: ' + (i.title || i.japanese_title)}
                  >
                    {i.title || i.japanese_title}
                  </h5>
                </div>
                <div>
                  <div></div>
                  <div className='flex justify-evenly'>
                    {i.tvInfo?.showType && (
                      <p className='px-1 text-xs bg-gray-200 text-blue-800 rounded-sm'>
                        {i.tvInfo?.showType}
                      </p>
                    )}
                    {/* {anime.releaseDate && (
                              <p className='px-1 text-xs bg-gray-200 text-blue-800 rounded-sm'>
                                {anime.releaseDate}
                              </p>
                            )}
                            {anime.rating && (
                              <p className='flex items-center px-1 text-xs bg-gray-200 text-blue-800 rounded-sm'>
                                {anime.rating >= 75 ? <TbStarFilled /> : <TbStarHalfFilled />}
                                {anime.rating}
                              </p>
                            )} */}
                  </div>
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
