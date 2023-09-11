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

function usePost(categoryCode: CategoryCode) {
  const nav = useNavigate();
  const queryClient = useQueryClient();

  const postMutation = useMutation(
    (postData: UsePostProps) => createPost(postData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['feedList', categoryCode]);
        nav(`/feed/${categoryCode}`);
      },
      onError: (error) => {
        console.error('포스트 생성 오류:', error);
      },
    },
  );

  return { postMutation };
}

export default usePost;
