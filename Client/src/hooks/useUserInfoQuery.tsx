import { useQuery } from 'react-query';
import { getUserInfo } from '../api/user';
import { AxiosError } from 'axios';
import { ERROR_MSG, ErrorType } from '../api/error';

export default function useUserInfoQuery() {
  return useQuery(['userInfo'], getUserInfo, {
    staleTime: 1000 * 60,
    retry: 1,
    refetchOnWindowFocus: false,

    onError: (err: AxiosError<ErrorType>) => {
      if (err.response) {
        const { errorCode } = err.response.data;
        console.log(ERROR_MSG[errorCode]);
        return;
      }
      console.log('Failed to load user info');
    },
  });
}
