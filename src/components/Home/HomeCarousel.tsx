import { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
// import { Anime } from '../../hooks/animeInterface';
import { TbCards } from 'react-icons/tb';
import { FaPlay, FaStar } from 'react-icons/fa';
import { FaClock } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

interface HomeCarouselProps {
  id: string;
  title?: string;
  japanese_title?: string;
  cover: string;
  description?: string;
  rating?: string;
  totalEpisodes?: string;
  duration?: string;
  type?: string;
  loading?: boolean;
  error?: string | null;
}

export const HomeCarousel: FC<HomeCarouselProps> = ({
  id,
  title,
  japanese_title,
  cover,
  description,
  rating,
  totalEpisodes,
  duration,
  type,
  // loading,
  // error,
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
      <div>
        <Swiper
          className='relative max-w-full h-96 rounded-lg max-lg:h-80 max-sm:h-64 cursor-grab active:cursor-grabbing'
          spaceBetween={15}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          // breakpoints={{
          //   1024: {
          //     slidesPerView: 2,
          //     spaceBetween: 20,
          //   },
          // }}
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
          centeredSlides={true}
        >
          <SwiperSlide
            className='flex relative justify-start items-center'
            key={id}
            title={title || japanese_title}
          >
            <div className='relative w-full h-full'>
              <img
                className='object-cover absolute w-full h-full'
                src={cover}
                alt={title || japanese_title + ' Banner Image '}
              />
              <div className='flex flex-col justify-between h-full'>
                <div className='absolute bottom-6 left-8 max-lg:left-4 max-lg:bottom-6 z-5 max-w-1/2'>
                  <h2 className='overflow-hidden m-auto max-w-full font-bold overflow-ellipsis animate-rainbow text-clamp-title min-sm:whitespace-nowrap'>
                    {title || japanese_title}
                  </h2>
                  <div className='flex overflow-hidden gap-4 m-auto mt-0 text-sm text-white overflow-ellipsis max-lg:text-sm max-sm:gap-1.5'>
                    {type && (
                      <p className='flex px-1 text-xs font-bold text-blue-800 bg-gray-200 rounded-sm'>
                        {type}
                      </p>
                    )}
                    {totalEpisodes && (
                      <p className='flex gap-1 items-center px-1 text-xs text-blue-800 bg-gray-200 rounded-sm'>
                        <TbCards />
                        {totalEpisodes}
                      </p>
                    )}
                    {rating && (
                      <p className='flex gap-1 items-center px-1 text-xs text-blue-800 bg-gray-200 rounded-sm'>
                        <FaStar />
                        {rating}
                      </p>
                    )}
                    {duration && (
                      <p className='flex gap-1 items-center px-1 text-xs text-blue-800 bg-gray-200 rounded-sm'>
                        <FaClock />
                        {duration}mins
                      </p>
                    )}
                  </div>
                  <p
                    className='overflow-hidden overflow-y-auto max-h-16 text-xs text-blue-600 max-w-2/3'
                    dangerouslySetInnerHTML={{ __html: description as string }}
                  />
                </div>
                <div className='absolute bottom-6 right-8 z-5 max-lg:right-6'>
                  <button
                    className='flex p-6 bg-gray-200 rounded-full border-none transition-all duration-200 ease-in-out cursor-pointer max-sm:p-4 hover:bg-blue-200 active:bg-blue-200 focus:bg-blue-200 hover:scale-115 active:scale-115 focus:scale-115'
                    onClick={() => handlePlayButtonCllick(id)}
                    title={'Watch ' + (title || japanese_title)}
                  >
                    <FaPlay className='text-2xl text-blue-500' />
                  </button>
                </div>
              </div>
              <div className='absolute inset-0 bg-gradient-to-b from-transparent to-white  from-50% rounded-lg z-1'></div>
              <div className='absolute inset-0 bg-gradient-to-bl from-transparent to-white from-50% z-1'></div>
            </div>
          </SwiperSlide>

          <div className='swiper-pagination'></div>
        </Swiper>
      </div>
    </>
  );
};
