import { FC, useEffect, useCallback } from 'react';
// import { Anime } from '../../hooks/animeInterface';
// import { CardItem } from './CardItem';
import { HomeAnimeInfo } from '../../pages/Home';
import { CardItem } from '../shared/CardItem';
export interface CardGridProps {
  data: HomeAnimeInfo[];
  hasNextPage: boolean;
  onLoadMore: () => void;
  isLoading: boolean;
}

export const CardGrid: FC<CardGridProps> = ({
  data,
  hasNextPage,
  onLoadMore,
  isLoading,
}) => {
  const handleLoadMore = useCallback(() => {
    if (hasNextPage) {
      onLoadMore();
    }
  }, [hasNextPage, onLoadMore]);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.offsetHeight;
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      let threshold = 1;

      if (window.innerWidth <= 450) {
        threshold = 2;
      }

      if (windowHeight + scrollTop >= documentHeight - threshold) {
        handleLoadMore();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleLoadMore, hasNextPage]);

  return (
    <>
      {isLoading ? (
        <div className='card-grid-layout'>
          {Array.from({ length: 30 }).map((_, index) => (
            <div
              key={index}
              className='bg-gray-300 animate-pulse rounded-lg aspect-[3/4]'
            ></div>
          ))}
        </div>
      ) : (
        <div className='relative transition card-grid-layout duration-0'>
          {data.map((data) => (
            <CardItem data={data} key={data.id} />
          ))}
        </div>
      )}
    </>
  );
};
