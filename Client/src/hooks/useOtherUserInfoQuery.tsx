import { useQuery } from '@tanstack/react-query';
import { getOtherUserFeedList, CategoryCodeParams } from '../api/feed';

function useOtherUserInfoQuery({ categoryCode }: CategoryCodeParams) {
  return useQuery(
    ['otherUserInfo', categoryCode],
    () => getOtherUserFeedList({ categoryCode }),
    {
      staleTime: 1000 * 60,
      retry: 1,
      refetchOnWindowFocus: false,
      meta: {
        errorMessage: 'Failed to get user info.',
      },
    },
  );
}

export default useOtherUserInfoQuery;
