import { useMutation } from '@tanstack/react-query';
import { postLike } from '../api/like';
import { CategoryCode } from '../api/category';

interface Params {
  feedId: number;
  categoryCode: CategoryCode;
}

function useLikeMutation({ feedId }: Params) {
  return useMutation(() => postLike({ feedId }), {
    meta: {
      errorMessage: 'Failed to like feed',
    },
  });
}

export default useLikeMutation;
