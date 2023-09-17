import { useInfiniteQuery } from '@tanstack/react-query';
import { getCommentData } from '../api/comment';

interface Params {
  feedId: number;
}

const useCommentListQuery = ({ feedId }: Params) => {
  return useInfiniteQuery(
    ['CommentList', feedId],
    ({ pageParam = 1 }) => getCommentData({ feedId, page: pageParam }),
    {
      getNextPageParam: (lastPage) => {
        return lastPage.pageInfo.page + 1 <= lastPage.pageInfo.totalPages
          ? lastPage.pageInfo.page + 1
          : undefined;
      },
      refetchOnWindowFocus: false,
      meta: {
        errorMessage: 'Failed to get comment list',
      },
    },
  );
};

export default useCommentListQuery;
