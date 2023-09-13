import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { createPost } from '../api/post';
import { CategoryCode } from '../api/category';
import { AxiosError } from 'axios';
import { ERROR_MSG, ErrorType } from '../api/error';

export interface UsePostProps {
  body: string;
  data: string;
  tags: string[];
  categoryCode: CategoryCode;
}

function usePostFeedMutation(categoryCode: CategoryCode) {
  const nav = useNavigate();
  const queryClient = useQueryClient();

  return useMutation((postData: UsePostProps) => createPost(postData), {
    onSuccess: () => {
      alert('게시글이 등록되었습니다.');
      console.log(categoryCode);
      queryClient.invalidateQueries(['feedList', categoryCode]);
      queryClient.invalidateQueries(['weeklyBest', categoryCode]);
      nav(`/feed/${categoryCode}`);
    },
    onError: (err: AxiosError<ErrorType>) => {
      if (err.response) {
        const { errorCode } = err.response.data;
        alert(ERROR_MSG[errorCode]);
        return;
      }
      alert('Failed to post feed');
    },
  });
}

export default usePostFeedMutation;
