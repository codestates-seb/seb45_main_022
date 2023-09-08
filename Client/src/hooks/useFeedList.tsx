import { useQuery } from 'react-query';
import { getFeedList, getUserFeed, getWeeklyBest } from '../api/feed';
import { CategoryCode } from '../api/category';
import { getFilterdFeedList } from '../api/feed';
import { FeedId } from '../api/feed';

function useFeedList(
  categoryCode: CategoryCode,
  feedId: FeedId,
  keyword?: string,
) {
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

  const bestFeedQuery = useQuery(
    ['weeklyBest', categoryCode],
    () => getWeeklyBest(categoryCode),
    {
      staleTime: 1000 * 60,
      cacheTime: 1000 * 60 * 10,
      enabled: !!feedId,
      refetchOnWindowFocus: false,
      retry: 2,
    },
  );

  const getUserFeedQuery = useQuery(
    ['userFeed', feedId],
    () => getUserFeed(feedId),

    {
      staleTime: 1000 * 60,
      cacheTime: 1000 * 60 * 10,
      enabled: !!feedId,
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

  return { feedListQuery, bestFeedQuery, getUserFeedQuery, searchFeedsQuery };
}

export default useFeedList;
