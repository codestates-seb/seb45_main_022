import { useQueryClient, useMutation } from '@tanstack/react-query';
import { CategoryCode } from '../api/category';
import { AxiosError } from 'axios';
import { ERROR_MSG, ErrorType } from '../api/error';
import { patchFeed } from '../api/feed';

interface Params {
  categoryCode: CategoryCode;
  feedId: number;
  onPatchFeedSuccess: () => void;
}

function usePatchFeedMutation({
  categoryCode,
  feedId,
  onPatchFeedSuccess,
}: Params) {
  const queryClient = useQueryClient();
  return useMutation(
    (patchFeedData: { body: string; data: string }) =>
      patchFeed({ ...patchFeedData, feedId }),
    {
      onSuccess: () => {
        alert('게시글이 수정되었습니다.');
        queryClient.invalidateQueries(['feedList', categoryCode, 'latest']);
        queryClient.invalidateQueries(['feedList', categoryCode, 'weekly']);
        queryClient.invalidateQueries(['feedDetail', feedId]);
        onPatchFeedSuccess();
      },
      onError: (err: AxiosError<ErrorType>) => {
        if (err.response) {
          const { errorCode } = err.response.data;
          alert(ERROR_MSG[errorCode]);
          return;
        }
        alert('Failed to edit feed');
      },
    },
  );
}

export default usePatchFeedMutation;
