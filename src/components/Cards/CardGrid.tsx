import { FC, useEffect, useCallback } from 'react';
// import { Anime } from '../../hooks/animeInterface';
import { CardItem } from './CardItem';

export interface CardGridProps {
  id: string | undefined;
  title?: string | undefined;
  japanese_title?: string | undefined;
  cover: string | undefined;
  type?: string | undefined;
  hasNextPage: boolean;
  onLoadMore: () => void;
}

export const CardGrid: FC<CardGridProps> = ({
  id,
  title,
  japanese_title,
  cover,
  type,
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
      <CardItem
        key={id}
        id={id}
        title={title}
        japanese_title={japanese_title}
        cover={cover}
        type={type}
      />
    </div>
  );
};
