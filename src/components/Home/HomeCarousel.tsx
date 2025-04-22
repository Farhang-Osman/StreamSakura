import { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Anime } from '../../index';
import { TbCards } from 'react-icons/tb';
import { FaPlay, FaStar } from 'react-icons/fa';
import { FaClock } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

interface HomeCarouselProps {
  data: Anime[];
  loading: boolean;
  error: string | null;
}

export const HomeCarousel: FC<HomeCarouselProps> = ({
  data = [],
  // loading,
  // error,
}) => {
  const navigate = useNavigate();

  const handlePlayButtonCllick = (id: string) => {
    return navigate(`/watch/${id}`);
  };

  const filteredData = data.filter(
    (item) =>
      item.title &&
      item.description &&
      item.cover !== item.image &&
      !item.genres.includes('Ecchi') &&
      !item.genres.includes('Hentai') &&
      !item.genres.includes('Romance') &&
      !item.genres.includes('Fantasy'),
  );

  return (
    <>
      <div>
        <Swiper
          className='relative max-w-full h-96 rounded-lg max-lg:h-80 max-sm:h-64 cursor-grab active:cursor-grabbing'
          spaceBetween={15}
          slidesPerView={1}
          // loop={false}
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
          {filteredData.map(
            ({
              id,
              title,
              cover,
              image,
              description,
              status,
              rating,
              genres,
              totalEpisodes,
              duration,
              type,
            }) => (
              <SwiperSlide
                className='flex relative justify-start items-center'
                key={id}
                title={title.english || title.romaji}
              >
                <div className='relative w-full h-full'>
                  <img
                    className='object-cover absolute w-full h-full'
                    src={cover}
                    alt={title.english || title.romaji + ' Banner Image '}
                  />
                  <div className='flex flex-col justify-between h-full'>
                    <div className='absolute bottom-6 left-8 max-lg:left-4 max-lg:bottom-6 z-5 max-w-1/2'>
                      <h2 className='overflow-hidden m-auto max-w-full font-bold text-white overflow-ellipsis text-clamp-title min-sm:whitespace-nowrap min-phone:whitespace-nowrap'>
                        {title.english}
                      </h2>
                      <div className='flex overflow-hidden gap-3 m-auto mt-0 text-sm text-white overflow-ellipsis  max-lg:gap-2 max-lg:text-sm max-sm:gap-1.5'>
                        {type && <p className='flex font-bold gap-1'>{type}</p>}
                        {totalEpisodes && (
                          <p className='flex items-center gap-1'>
                            <TbCards />
                            {totalEpisodes}
                          </p>
                        )}
                        {rating && (
                          <p className='flex items-center gap-1'>
                            <FaStar />
                            {rating}
                          </p>
                        )}
                        {duration && (
                          <p className='flex items-center gap-1'>
                            <FaClock />
                            {duration}mins
                          </p>
                        )}
                      </div>
                      <p
                        className='overflow-hidden overflow-y-auto max-h-16 text-xs text-gray-300 max-w-2/3'
                        dangerouslySetInnerHTML={{ __html: description }}
                      />
                    </div>
                    <div className='absolute bottom-6 right-8 z-5 max-lg:right-6'>
                      <button
                        className='flex p-6 bg-gray-900 rounded-full border-none transition-all duration-200 ease-in-out cursor-pointer max-sm:p-4 hover:bg-blue-800 active:bg-blue-800 focus:bg-blue-800 hover:scale-115 active:scale-115 focus:scale-115'
                        onClick={() => handlePlayButtonCllick(id)}
                        title={'Watch ' + (title.english || title.romaji)}
                      >
                        <FaPlay className='text-2xl text-white' />
                      </button>
                    </div>
                  </div>
                  <div
                    className='absolute inset-0 rounded-lg z-1'
                    style={{
                      background:
                        'linear-gradient(45deg, rgba(8, 8, 8, 1) 0%, transparent 60%)',
                    }}
                  ></div>
                </div>
              </SwiperSlide>
            ),
          )}
          <div className='swiper-pagination'></div>
        </Swiper>
      </div>
    </>
  );
};
