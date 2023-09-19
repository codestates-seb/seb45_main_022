import customAxios from '../utils/axios';

interface GetUserFeeds {
  page: number;
}

export const getMyPosts = async ({ page }: GetUserFeeds) => {
  // console.log('page parameter:', page);
  const response = await customAxios.get(`/feed/my-post?page=${page}&size=10`);
  return response.data;
};
