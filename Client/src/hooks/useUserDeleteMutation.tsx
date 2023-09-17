// import { useNavigate } from 'react-router';

import { deleteAccount } from '../api/user';
import { useMutation } from '@tanstack/react-query';

export default function useUserDeleteMutation() {
  return useMutation(deleteAccount, {
    meta: {
      errorMessage: 'Failed to delete account.',
    },
  });
}
