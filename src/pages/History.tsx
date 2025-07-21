import { watchedEpisodes } from './Watch';

const History = () => {
  function getParsedLocalStorageValues(partialKey: string) {
    try {
      return Object.keys(localStorage)
        .filter((key) => key.includes(partialKey))
        .map((key) => {
          const value = localStorage.getItem(key);
          return value ? JSON.parse(value) : null;
        })
        .filter((value) => value !== null);
    } catch (error) {
      console.error('Error parsing localStorage values:', error);
      return [];
    }
  }

  // Usage:
  const localData: watchedEpisodes[] =
    getParsedLocalStorageValues('watchedEpisodes');

  console.log(localData);

  return (
    <div>
      {localData.map((i) => (
        <div>
          <div>{i.animeName}</div>
          <img src={i.image} alt='' />
          <div>{i.lastWatchedEpisode.episodeTitle}</div>
        </div>
      ))}
    </div>
  );
};

export default History;
