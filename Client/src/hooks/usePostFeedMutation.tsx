import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { CategoryCode } from '../api/category';
import { AxiosError } from 'axios';
import { ERROR_MSG, ErrorType } from '../api/error';
import { PostFeedData, postFeed } from '../api/feed';

function usePostFeedMutation(categoryCode: CategoryCode) {
  const nav = useNavigate();
  const queryClient = useQueryClient();

  return useMutation((postFeedData: PostFeedData) => postFeed(postFeedData), {
    onSuccess: () => {
      alert('게시글이 등록되었습니다.');
      queryClient.invalidateQueries(['feedList', categoryCode, 'latest']);
      queryClient.invalidateQueries(['feedList', categoryCode, 'weekly']);
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
