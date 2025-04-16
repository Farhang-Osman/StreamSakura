import { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Anime } from '../../index';

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
        <Swiper className='max-w-full h-full cursor-grab active:cursor-progress'>
          {filteredData.map(
            ({
              id,
              title,
              cover,
              // image,
              // description,
              // status,
              // rating,
              // genres,
              // totalEpisodes,
              // duration,
              // type,
            }) => (
              <SwiperSlide key={id} title={title.english || title.romaji}>
                <p className='font-bold'>{title.romaji}</p>
                <img
                  src={cover}
                  alt={title.english || title.romaji + ' Banner Image '}
                />
              </SwiperSlide>
            ),
          )}
        </Swiper>
      </div>
    </>
  );
};
