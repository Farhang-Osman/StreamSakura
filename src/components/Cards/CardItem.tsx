import { FC, useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Anime } from '../../index';
import { FaPlay } from 'react-icons/fa';

export const CardItem: FC<{ anime: Anime }> = ({ anime }) => {
  return (
    <>
      <Link
        to={`/watch/${anime.id}`}
        title={anime.title.english || anime.title.romaji}
      >
        <div>
          <div>
            <div>
              <div>
                <img src={anime.image || ''} alt='' className='w-60' />
                <FaPlay
                  title={'Play ' + (anime.title.english || anime.title.romaji)}
                />
              </div>
            </div>
          </div>
          <div>
            <h5 title={'Title: ' + (anime.title.english || anime.title.romaji)}>
              {anime.title.english || anime.title.romaji}
            </h5>
          </div>
          <div>
            <div></div>
            <div></div>
          </div>
        </div>
      </Link>
    </>
  );
};
