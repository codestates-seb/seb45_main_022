import { useMutation } from '@tanstack/react-query';
import { postLike } from '../api/like';
import { useQueryClient } from '@tanstack/react-query';
import { CategoryCode } from '../api/category';

interface Params {
  feedId: number;
  categoryCode: CategoryCode;
}

function useLikeMutation({ feedId, categoryCode }: Params) {
  const queryClient = useQueryClient();
  return useMutation(() => postLike({ feedId }), {
    onSuccess: () => {
      queryClient.invalidateQueries(['feedList', categoryCode, 'latest']);
      queryClient.invalidateQueries(['feedList', categoryCode, 'weekly']);
      queryClient.invalidateQueries(['feedDetail', feedId]);
    },
  });
}

export default useLikeMutation;
