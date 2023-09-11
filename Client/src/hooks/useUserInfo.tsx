import { useQuery } from 'react-query';
import { getUserInfo } from '../api/user';

export default function useUserInfo() {
  const userInfoQuery = useQuery(['userInfo'], getUserInfo, {
    staleTime: 1000 * 60,
    retry: 1,
  });

  return { userInfoQuery };
}
