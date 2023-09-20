import { FaCommentDots } from 'react-icons/fa';
import { CategoryCode } from '../../api/category';
import CommentItem from './CommentItem';
import { FormEventHandler, useRef } from 'react';
import useCommentPostMutation from '../../hooks/useCommentPostMutation';
import useCommentListQuery from '../../hooks/useCommentListQuery';
import LoadingBar from '../common/LoadingBar';
import useInfinteScroll from '../../hooks/useInfiniteScroll';
import { useQueryClient } from '@tanstack/react-query';

interface Props {
  categoryCode: CategoryCode;
  feedId: number;
}

const CommentSection = ({ categoryCode, feedId }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const queryClient = useQueryClient();

  const {
    mutate: postComment,
    isSuccess,
    reset,
  } = useCommentPostMutation({ feedId });
  const { data, isFetching, isLoading, hasNextPage, fetchNextPage } =
    useCommentListQuery({ feedId });

  useInfinteScroll({
    targetEl: triggerRef.current,
    hasMore: hasNextPage || false,
    onIntersect: fetchNextPage,
  });

  const comments = data?.pages.flatMap((page) => page.data) ?? [];

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    const comment = inputRef.current?.value;
    if (!comment) return;
    postComment(comment);
  };

  if (isSuccess) {
    console.log('success');
    inputRef.current!.value = '';
    queryClient.invalidateQueries(['commentList', feedId]);
    queryClient.invalidateQueries(['feedList', categoryCode, 'latest']);
    queryClient.invalidateQueries(['feedList', categoryCode, 'weekly']);
    reset();
  }

  return (
    <div className="bg-[#ffedd5] flex flex-col w-[500px] h-[600px]">
      <div className="w-full h-[530px] overflow-y-auto p-[20px]">
        {comments.length === 0 && (
          <span className="text-gray-500 font-semibold">No Comment</span>
        )}
        {comments.map((comment) => (
          <CommentItem
            key={comment.commentId}
            comment={comment}
            categoryCode={categoryCode}
            feedId={feedId}
          />
        ))}
        {(isLoading || isFetching) && <LoadingBar />}
        <div ref={triggerRef}></div>
      </div>
      <div className="h-[70px] flex flex-row justify-between items-center p-[20px]">
        <div className="flex flex-row justify-center items-center gap-[5px]">
          <FaCommentDots size={24} />
          <span className="ml-2 text-gray-500 font-semibold">
            {comments.length}
          </span>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex items-center justify-center gap-[5px]"
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="댓글"
            className="border border-solid border-gray-400 rounded-xl p-2 font-[Pretendard] w-[350px]"
          />
          <button
            type="submit"
            className="hover:brightness-110 duration-300 cursor-pointer border border-solid bg-sky-500 text-white h-[2.5rem] w-[2.5rem] text-sm font-semibold rounded-[12px]"
          >
            +
          </button>
        </form>
      </div>
    </div>
  );
};

export default CommentSection;
