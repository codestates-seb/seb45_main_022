import { useMutation } from '@tanstack/react-query';
import { loginAuth } from '../api/auth';

export default function useLoginMutation() {
  return useMutation(loginAuth, {
    meta: {
      successMessage: 'Successfully logged in',
      errorMessage: 'Failed to login',
    },
  });
}
