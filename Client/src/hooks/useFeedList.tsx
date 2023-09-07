import { useQuery } from 'react-query';
import { getFeedList } from '../api/feed';
import { CategoryCode } from '../api/category';

function useFeedList(categoryCode: CategoryCode) {
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

  return { feedListQuery };
}

export default useFeedList;
