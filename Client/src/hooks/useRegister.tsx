import { useMutation } from 'react-query';
import { registerAuth } from '../api/auth';
import { AxiosError, AxiosResponse } from 'axios';

export interface ErrorResponseDataType {
  status: number;
  message: string;
}

export default function useRegister(
  onSuccess: (data: AxiosResponse) => void,
  onError: (err: AxiosError<ErrorResponseDataType>) => void,
) {
  const registerMutation = useMutation(registerAuth, {
    onSuccess: onSuccess,
    onError: onError,
  });
  return { registerMutation };
}
