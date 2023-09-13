import { useQuery } from '@tanstack/react-query';
import { CategoryCode } from '../api/category';
import { getFilterdFeedList } from '../api/feed';

function useSearch(categoryCode: CategoryCode, keyword?: string) {
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
  return { searchFeedsQuery };
}

export default useSearch;
