import { useMutation } from 'react-query';
import { loginAuth } from '../api/auth';
import { AxiosError, AxiosResponse } from 'axios';

export default function useLogin(
  onSuccess: (data: AxiosResponse) => void,
  onError: (err: AxiosError) => void,
) {
  const loginMutation = useMutation(loginAuth, {
    onSuccess: onSuccess,
    onError: onError,
  });
  return { loginMutation };
}
