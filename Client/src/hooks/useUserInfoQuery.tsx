import { useQuery } from '@tanstack/react-query';
import { getUserInfo } from '../api/user';

interface Params {
  hideToast?: boolean;
}

export default function useUserInfoQuery({ hideToast = false }: Params = {}) {
  return useQuery(['userInfo'], getUserInfo, {
    staleTime: 1000 * 60,
    retry: 1,
    refetchOnWindowFocus: false,
    meta: {
      hideToast,
      errorMessage: 'Failed to get user info.',
    },
  });
}
