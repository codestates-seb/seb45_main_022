// import { useNavigate } from 'react-router';

import { AxiosResponse } from 'axios';
import { deleteAccount } from '../api/user';
import { useMutation } from '@tanstack/react-query';

interface Params {
  onSuccess: (data: AxiosResponse) => void;
  onError: () => void;
}

export default function useDeleteUserMutation({ onSuccess, onError }: Params) {
  return useMutation(deleteAccount, {
    onSuccess: onSuccess,
    onError: onError,
  });
}
