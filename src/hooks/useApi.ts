import axios from 'axios';
import { getCurrentSeason, getNextSeason } from '../hooks/useTime';

const log: boolean = false;

function endUrlWithSlash(url: string) {
  return url.endsWith('/') ? url : `${url}/`;
}

const BASE_URL = endUrlWithSlash(import.meta.env.VITE_BACKEND_URL as string);

// Axios instance
const axiosInstance = axios.create({
  baseURL: undefined,
  timeout: 10000,
  headers: {
    'X-API-Key': '', // Assuming your API expects the key in this header
  },
});

interface FetchOptions {
  type?: string;
  season?: string;
  format?: string;
  sort?: string[];
  genres?: string[];
  id?: string;
  year?: string;
  status?: string;
}

async function fetchFromProxy(url: string) {
  try {
    // Proceed with the network request
    const response = await axiosInstance.get(url, {});

    // After obtaining the response, verify it for errors or empty data
    if (
      response.status !== 200 ||
      (response.data.statusCode && response.data.statusCode >= 400)
    ) {
      const errorMessage = response.data.message || 'Unknown server error';
      throw new Error(
        `Server error: ${
          response.data.statusCode || response.status
        } ${errorMessage}`,
      );
    }

    if (log) {
      console.log(url);
      console.log('response.data', response.data);
      console.log('response.data.currentPage', response.data.currentPage);
      console.log('response.data.hasNextPage', response.data.hasNextPage);
    }

    return response.data.results; // Return the newly fetched data
  } catch (error) {
    console.log(error);
    throw error; // Rethrow the error for the caller to handle
  }
}

async function fetchList(
  type: string,
  page: number = 1,
  perPage: number = 16,
  options: FetchOptions = {},
) {
  // let cacheKey: string;
  let url: string;
  const params = new URLSearchParams({
    page: page.toString(),
    perPage: perPage.toString(),
  });

  if (
    ['TopRated', 'Trending', 'Popular', 'TopAiring', 'Upcoming'].includes(type)
  ) {
    url = `${BASE_URL}meta/anilist/${type.toLowerCase()}`;

    if (type === 'TopRated') {
      options = {
        type: 'ANIME',
        sort: ['["SCORE_DESC"]'],
      };
      url = `${BASE_URL}meta/anilist/advanced-search?type=${options.type}&sort=${options.sort}&`;
    } else if (type === 'Popular') {
      options = {
        type: 'ANIME',
        sort: ['["POPULARITY_DESC"]'],
      };
      url = `${BASE_URL}meta/anilist/advanced-search?type=${options.type}&sort=${options.sort}&`;
    } else if (type === 'TopAiring') {
      const year = new Date().getFullYear();

      options = {
        type: 'ANIME',
        season: getCurrentSeason(),
        year: year.toString(),
        status: 'RELEASING',
        sort: ['["POPULARITY_DESC"]'],
      };
      url = `${BASE_URL}meta/anilist/advanced-search?type=${options.type}&status=${options.status}&sort=${options.sort}&season=${options.season}&year=${options.year}&`;
    } else if (type === 'Upcoming') {
      const year = new Date().getFullYear();

      options = {
        type: 'ANIME',
        season: getNextSeason(),
        year: year.toString(),
        status: 'NOT_YET_RELEASED',
        sort: ['["POPULARITY_DESC"]'],
      };
      url = `${BASE_URL}meta/anilist/advanced-search?type=${options.type}&status=${options.status}&sort=${options.sort}&season=${options.season}&year=${options.year}&`;
    }
  } else {
    url = `${BASE_URL}meta/anilist/${type.toLowerCase()}`;
    // params already defined above
  }

  return fetchFromProxy(`${url}?${params.toString()}`);
}

export const fetchTrendingAnime = (page: number, perPage: number) =>
  fetchList('Trending', page, perPage);
export const fetchPopularAnime = (page: number, perPage: number) =>
  fetchList('Popular', page, perPage);
export const fetchTopAnime = (page: number, perPage: number) =>
  fetchList('TopRated', page, perPage);
export const fetchTopAiringAnime = (page: number, perPage: number) =>
  fetchList('TopAiring', page, perPage);
export const fetchUpcomingSeason = (page: number, perPage: number) =>
  fetchList('Upcoming', page, perPage);
