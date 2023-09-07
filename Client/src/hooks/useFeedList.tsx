import { useQuery } from 'react-query';
import { getFeedList } from '../api/feed';
import { CategoryCode } from '../api/category';
import { getFilterdFeedList } from '../api/feed';

function useFeedList(categoryCode: CategoryCode, keyword?: string) {
  const feedListQuery = useQuery(
    ['feedList', categoryCode],
    () => getFeedList(categoryCode),
    {
      staleTime: 1000 * 60,
      cacheTime: 1000 * 60 * 10,
      enabled: !!categoryCode,
      refetchOnWindowFocus: false,
      retry: 2,
    },
  );

  const searchFeedsQuery = useQuery(
    ['filteredFeedList', categoryCode, keyword],
    () => getFilterdFeedList(categoryCode, keyword || ''),
    {
      staleTime: 1000 * 60,
      cacheTime: 1000 * 60 * 10,
      enabled: !!categoryCode,
      refetchOnWindowFocus: false,
      retry: 2,
    },
  );

  return { feedListQuery, searchFeedsQuery };
}

export default useFeedList;
