import { useMutation } from '@tanstack/react-query';
import { addCommentData } from '../api/comment';

function useAddComment() {
  const addCommentMutation = useMutation(
    ({ feedId, body }: { feedId: number; body: string }) =>
      addCommentData({ feedId, body }),
    {
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (error) => {
        console.error('댓글 생성 오류:', error);
      },
    },
  );

  return { addCommentMutation };
}

export default useAddComment;
