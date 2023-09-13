import { useMutation } from 'react-query';
import { loginAuth } from '../api/auth';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router';
import { ErrorType } from '../api/error';

interface Params {
  onError: (err: AxiosError<ErrorType>) => void;
}

export default function useLoginMutation({ onError }: Params) {
  const navigate = useNavigate();
  return useMutation(loginAuth, {
    onSuccess: (data) => {
      console.log(data);
      const token = data.token;
      localStorage.setItem('token', token);
      navigate('/main');
      return;
    },
    onError: onError,
  });
}
