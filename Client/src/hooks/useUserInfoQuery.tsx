import { useQuery } from 'react-query';
import { getUserInfo } from '../api/user';

export default function useUserInfoQuery() {
  return useQuery(['userInfo'], getUserInfo, {
    staleTime: 1000 * 60,
    retry: 1,
  });
}
