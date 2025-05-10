import { FC, useEffect, useCallback } from 'react';
import { CardItem, Anime } from '../../index';

interface CardGridProps {
  animeData: Anime[];
  hasNextPage: boolean;
  onLoadMore: () => void;
}

export const CardGrid: FC<CardGridProps> = ({
  animeData,
  hasNextPage,
  onLoadMore,
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
    <div className='relative transition card-grid-layout duration-0'>
      {animeData.map((anime: Anime) => (
        <CardItem key={anime.id} anime={anime} />
      ))}
    </div>
  );
};
