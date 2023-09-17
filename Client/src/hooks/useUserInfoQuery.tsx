import { useQuery } from '@tanstack/react-query';
import { getUserInfo } from '../api/user';

export default function useUserInfoQuery() {
  return useQuery(['userInfo'], getUserInfo, {
    staleTime: 1000 * 60,
    retry: 1,
    refetchOnWindowFocus: false,
    meta: {
      errorMessage: 'Failed to get user info.',
    },
  });
}
