import { useMutation } from 'react-query';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router';
import { ErrorType } from '../api/error';
import { registerAuth } from '../api/auth';

interface Params {
  onError: (err: AxiosError<ErrorType>) => void;
}

export default function useRegisterMutation({ onError }: Params) {
  const navigate = useNavigate();
  return useMutation(registerAuth, {
    onSuccess: () => {
      alert('Register success');
      navigate('/auth/login');
    },
    onError: onError,
  });
}
