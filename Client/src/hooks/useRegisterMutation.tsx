import { useMutation } from 'react-query';
import { RegisterError, registerAuth } from '../api/auth';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router';

interface Params {
  onError: (err: AxiosError<RegisterError>) => void;
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
