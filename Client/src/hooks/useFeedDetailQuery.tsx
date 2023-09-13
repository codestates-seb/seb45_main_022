import { useQuery } from '@tanstack/react-query';
import { Feed, getFeedDetail } from '../api/feed';

function useFeedDetailQuery(feedId: Feed['feedId']) {
  return useQuery(['feedDetail', feedId], () => getFeedDetail(feedId), {
    staleTime: 1000 * 60,
    cacheTime: 1000 * 60 * 10,
    enabled: !!feedId,
    refetchOnWindowFocus: false,
    retry: 2,
  });
}

export default useFeedDetailQuery;
