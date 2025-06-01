import axios from 'axios';
import { UserData } from './userInfoInterface';

export const fetchUserData = async (accessToken: string): Promise<UserData> => {
  try {
    const response = await axios.post(
      'https://graphql.anilist.co',
      {
        query: `
              query {
                  Viewer {
                      id
                      name
                      avatar {
                          large
                      }
                      statistics {
                          anime {
                              count
                              episodesWatched
                              meanScore
                              minutesWatched
                          }
                      }
                  }
              }
          `,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    );
    // Ensure the structure matches UserData interface
    return response.data.data.Viewer;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw new Error('Failed to fetch user data');
  }
};
