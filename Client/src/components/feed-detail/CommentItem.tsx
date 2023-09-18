import { CategoryCode } from '../../api/category';
import { CATEGORY_STATUS_MAP } from '../../utility/category';
import { STATUS_ICON } from '../../utility/status';
import { editCommentData, deleteCommentData, Comment } from '../../api/comment';
import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import useUserInfoQuery from '../../hooks/useUserInfoQuery';

interface CommentProps {
  comment: Comment;
  categoryCode: CategoryCode;
  feedId: number;
}

const CommentItem = ({ comment, categoryCode, feedId }: CommentProps) => {
  const [isNicknameMatched, setIsNicknameMatched] = useState(false);
  const [commentText, setCommentText] = useState(comment.body);
  const [isEdited, setIsEdited] = useState(false);

  const { data: userInfo } = useUserInfoQuery();

  const queryClient = useQueryClient();

  useEffect(() => {
    if (userInfo) {
      const userNickname = userInfo.nickname;
      if (userNickname === comment.nickname) {
        setIsNicknameMatched(true);
      } else {
        setIsNicknameMatched(false);
      }
    }
  }, [userInfo, comment.nickname]);

  const handleDeleteComment = async (commentId: number) => {
    try {
      await deleteCommentData({ commentId });
      console.log(feedId);
      queryClient.invalidateQueries(['commentList', feedId]);
      alert('댓글 삭제완료');
    } catch (error) {
      alert('삭제 실패');
    }
  };

  const handleEditComment = async (commentId: number) => {
    try {
      await editCommentData({
        commentId,
        body: commentText,
      });
      setCommentText(commentText);
      setIsEdited(false);
      queryClient.invalidateQueries(['commentList', feedId]);
      alert('댓글 수정완료');
    } catch {
      alert('수정 실패');
    }
  };

  return (
    <div
      key={comment.commentId}
      className="  p-2  my-2 flex flex-col rounded-lg bg-white shadow-md "
    >
      <div className="flex  items-center   ">
        <div className="flex flex-col items-center w-[7.5rem]">
          <img
            src={comment.profileImage}
            alt="profile image"
            width={45}
            className="rounded-[4px]"
          />

          <span className="font-[Pretendard] font-semibold">
            {comment.nickname}
          </span>
        </div>
        <div className=" text-sm w-[300px]">
          {isEdited ? (
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="font-[Pretendard] font-normal bg-gray-100 p-3 "
            />
          ) : (
            <p className="w-full font-[Pretendard] font-normal break-words">
              {comment.body}
            </p>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-center">
          <img
            src={STATUS_ICON[CATEGORY_STATUS_MAP[categoryCode]]}
            alt="muscle icon"
            width={16}
            className="-mt-[3px] ml-[31px]"
          />
          <span className="font-[Pretendard] text-sm ml-[6px]">
            Lv. {comment.level}
          </span>
        </div>
        {isNicknameMatched && (
          <div className="w-[80px] flex justify-between items-center">
            {isEdited ? (
              <button
                onClick={() => handleEditComment(comment.commentId)}
                className="font-[Pretendard] text-sm text-gray-500"
              >
                저장
              </button>
            ) : (
              <button
                onClick={() => setIsEdited(true)}
                className="font-[Pretendard] text-sm text-gray-500"
              >
                수정
              </button>
            )}
            <button
              onClick={() => handleDeleteComment(comment.commentId)}
              className="font-[Pretendard] text-sm text-gray-500"
            >
              삭제
            </button>
          </div>
        )}
        <div className=" text-center">
          <span className="font-[Pretendard] text-sm text-gray-500 ">
            {new Date(comment.createDate).toLocaleTimeString('ko-KR', {
              year: '2-digit',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              hour12: true,
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
