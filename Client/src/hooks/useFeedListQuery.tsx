import { useInfiniteQuery } from '@tanstack/react-query';
import { getFeedList } from '../api/feed';

interface Params {
  categoryCode: number;
  type: 'latest' | 'weekly';
}

const useFeedListQuery = ({ categoryCode, type }: Params) => {
  return useInfiniteQuery(
    ['feedList', categoryCode, type],
    ({ pageParam = 1 }) => getFeedList({ categoryCode, page: pageParam, type }),
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

export default useFeedListQuery;
