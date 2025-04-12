import { FC } from 'react';
import { Anime } from '../../index';

interface HomeCarousalProps {
  data: Anime[];
  loading: boolean;
  error: string | null;
}

export const HomeCarousal: FC<HomeCarousalProps> = ({
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
