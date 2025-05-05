import { FC } from 'react';
import { Anime } from '../../hooks/animeInterface';
import { Link } from 'react-router-dom';

export const HomeSideBar: FC<{ animeData: Anime[] }> = ({ animeData }) => {
  return (
    <div>
      <div>
        {animeData.map((anime: Anime) => (
          <Link to={`/watch/${anime.id}`} key={anime.id}>
            <img src={anime.image} alt='' />
            <div></div>
          </Link>
        ))}
      </div>
    </div>
  );
};
