import { useInfiniteQuery } from '@tanstack/react-query';
import { getMyPosts } from '../api/userFeed';

const useUserFeedListQuery = () => {
  return useInfiniteQuery(
    ['userFeedList'],
    ({ pageParam = 1 }) => getMyPosts({ page: pageParam }),
    {
      getNextPageParam: (lastPage) => {
        return lastPage.pageInfo.page + 1 <= lastPage.pageInfo.totalPages
          ? lastPage.pageInfo.page + 1
          : undefined;
      },
      refetchOnWindowFocus: false,
    },
  );
};
export default useUserFeedListQuery;
