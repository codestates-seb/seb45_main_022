import { FaCommentDots } from 'react-icons/fa';
import { CategoryCode } from '../../api/category';
import { Comment } from '../../api/feed';
import CommentItem from './CommentItem';
import { FormEventHandler, useRef } from 'react';
import usePostCommentMutation from '../../hooks/usePostCommentMutation';

interface Props {
  comments: Comment[];
  categoryCode: CategoryCode;
  feedId: number;
}

const CommentSection = ({ comments, categoryCode, feedId }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { mutate: postComment } = usePostCommentMutation({ feedId });

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    const comment = inputRef.current?.value;
    if (!comment) return;
    postComment(comment);
  };

  return (
    <div className="bg-[#ffedd5] flex flex-col w-[500px] h-[600px]">
      <div className="w-full h-[530px] overflow-scroll p-[20px]">
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