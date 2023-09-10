import { useQuery } from 'react-query';
import { getUserFeed } from '../api/feed';
import { FeedId } from '../api/feed';

function useUserFeed(feedId: FeedId) {
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

  return { getUserFeedQuery };
}

export default useUserFeed;
