import { useInfiniteQuery } from '@tanstack/react-query';
import { FeedListType, getFeedList } from '../api/feed';

interface Params {
  categoryCode: number;
  type: FeedListType;
  keyword?: string;
}

const useFeedListQuery = ({ categoryCode, type, keyword }: Params) => {
  return useInfiniteQuery(
    ['feedList', categoryCode, type, keyword],
    ({ pageParam = 1 }) =>
      getFeedList({ categoryCode, page: pageParam, type, keyword }),
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
