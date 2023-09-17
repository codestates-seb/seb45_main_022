import { useMutation } from '@tanstack/react-query';
import { patchFeed } from '../api/feed';

interface Params {
  feedId: number;
}

function useFeedPatchMutation({ feedId }: Params) {
  return useMutation(
    (patchFeedData: { body: string; data: string }) =>
      patchFeed({ ...patchFeedData, feedId }),
    {
      meta: {
        errorMessage: 'Failed to patch feed',
      },
    },
  );
}

export default useFeedPatchMutation;
