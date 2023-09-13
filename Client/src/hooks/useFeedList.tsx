import { useQuery } from '@tanstack/react-query';
import { getFeedList, getWeeklyBest } from '../api/feed';
import { CategoryCode } from '../api/category';

function useFeedList(
  categoryCode: CategoryCode,
  currentNewestPage: number,
  currentBestPage: number,
) {
  const feedListQuery = useQuery(
    ['feedList', categoryCode, currentNewestPage],
    () => getFeedList(categoryCode, currentNewestPage),
    {
      staleTime: 1000 * 60,
      cacheTime: 1000 * 60 * 10,
      enabled: !!categoryCode,
      refetchOnWindowFocus: false,
      retry: 2,
      keepPreviousData: true,
    },
  );

  const bestFeedQuery = useQuery(
    ['weeklyBest', categoryCode, currentBestPage],
    () => getWeeklyBest(categoryCode, currentBestPage),
    {
      staleTime: 1000 * 60,
      cacheTime: 1000 * 60 * 10,
      enabled: !!categoryCode,
      refetchOnWindowFocus: false,
      retry: 2,
      keepPreviousData: true,
    },
  );

  return { feedListQuery, bestFeedQuery };
}

export default useFeedList;
