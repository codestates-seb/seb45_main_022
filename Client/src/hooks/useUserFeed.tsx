import { useQuery } from '@tanstack/react-query';
import { Feed, getUserFeed } from '../api/feed';

function useUserFeed(feedId: Feed['feedId']) {
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
