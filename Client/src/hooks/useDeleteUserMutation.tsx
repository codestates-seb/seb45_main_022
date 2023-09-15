// import { useNavigate } from 'react-router';
import { deleteAccount } from '../api/user';
import { useMutation } from '@tanstack/react-query';

export default function useDeleteUserMutation() {
  //   const navigate = useNavigate();
  return useMutation(deleteAccount, {
    onSuccess: (data) => {
      console.log(data);
      //   navigate('/login');
      return;
    },
    onError: (error) => {
      console.log(error);
    },
  });
}
