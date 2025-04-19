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
          className='max-w-full h-full cursor-grab active:cursor-grabbing'
          spaceBetween={15}
          slidesPerView={1}
          loop={true}
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
              <SwiperSlide key={id} title={title.english || title.romaji}>
                <div>
                  <img
                    src={cover}
                    alt={title.english || title.romaji + ' Banner Image '}
                  />
                  <div>
                    <div>
                      <h2>{title.english}</h2>
                      <div>
                        {type && <p className='flex gap-1'>{type}</p>}
                        {totalEpisodes && (
                          <p className='flex gap-1'>
                            <TbCards />
                            {totalEpisodes}
                          </p>
                        )}
                        {rating && (
                          <p className='flex gap-1'>
                            <FaStar />
                            {rating}
                          </p>
                        )}
                        {duration && (
                          <p className='flex gap-1'>
                            <FaClock />
                            {duration}
                          </p>
                        )}
                      </div>
                      <p dangerouslySetInnerHTML={{ __html: description }} />
                    </div>
                    <div>
                      <button
                        onClick={() => handlePlayButtonCllick(id)}
                        title={'Watch ' + (title.english || title.romaji)}
                      >
                        <FaPlay />
                        <span>WATCH NOW</span>
                      </button>
                    </div>
                  </div>
                  <div></div>
                </div>
              </SwiperSlide>
            ),
          )}
        </Swiper>
      </div>
    </>
  );
};
