import { useQueryClient, useMutation } from 'react-query';
import { useNavigate } from 'react-router';
import { createPost } from '../api/post';
import { CategoryCode } from '../api/category';

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
    onError: () => {
      alert('게시글 등록에 실패했습니다.');
    },
  });
}

export default usePostFeedMutation;
