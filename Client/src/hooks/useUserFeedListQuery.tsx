import { useQuery } from '@tanstack/react-query';
import { getMyPosts } from '../api/userFeed';

export default function useUserFeedListQuery() {
  return useQuery(['userFeedList'], getMyPosts, {
    staleTime: 1000 * 60,
    retry: 1,
    refetchOnWindowFocus: false,
  });
}
