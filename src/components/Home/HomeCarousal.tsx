import { FC } from 'react';
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
  return (
    <>
      {data.map(
        ({
          id,
          title,
          // cover,
          // image,
          description,
          status,
          rating,
          genres,
          totalEpisodes,
          duration,
          type,
        }) => (
          <div>
            id={id}
            title={title.english}
            {/* cover= {cover},
            image= {image} */}
            description= {description}
            status= {status}
            rating= {rating}
            genres= {genres}
            totalEpisodes= {totalEpisodes}
            duration= {duration}
            type= {type}
          </div>
        ),
      )}
    </>
  );
};
