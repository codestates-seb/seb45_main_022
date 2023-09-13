import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addCommentData } from '../api/comment';

interface Params {
  feedId: number;
}

function usePostCommentMutation({ feedId }: Params) {
  const queryClient = useQueryClient();
  return useMutation((body: string) => addCommentData({ feedId, body }), {
    onSuccess: (data) => {
      queryClient.invalidateQueries(['userFeed', feedId]);
      console.log(data);
    },
    onError: (error) => {
      console.error('댓글 생성 오류:', error);
    },
  });
}

export default usePostCommentMutation;
