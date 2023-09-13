import { CategoryCode } from '../../api/category';
import { CATEGORY_STATUS_MAP } from '../../utility/category';
import { STATUS_ICON } from '../../utility/status';
import { editCommentData, deleteCommentData } from '../../api/comment';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

interface CommentProps {
  comment: {
    commentId: number;
    nickname: string;
    profileImage: string;
    level: number;
    body: string;
    createDate: string;
  };
  categoryCode: CategoryCode;
}

const Comments = ({ comment, categoryCode }: CommentProps) => {
  const [isNicknameMatched, setIsNicknameMatched] = useState(false);
  const [commentText, setCommentText] = useState(comment.body);
  const [isEditing, setIsEditing] = useState(false);

  const { data: userInfo } = useQuery(['userInfo']);

  useEffect(() => {
    if (userInfo) {
      const userNickname = userInfo.nickname;
      if (userNickname === comment.nickname) {
        setIsNicknameMatched(true);
      } else {
        setIsNicknameMatched(false);
      }
    }
  }, [comment.nickname]);

  const handleDeleteComment = async (commentId: number) => {
    try {
      await deleteCommentData({ commentId });
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
      setIsEditing(false);
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
      <div className="flex  items-center justify-between  ">
        <div className="flex flex-col items-center w-[7.5rem]  ">
          <img src={comment.profileImage} alt="profile image" width={45} />

          <span className="font-[Pretendard] font-semibold">
            {comment.nickname}
          </span>
        </div>
        <div className="flex text-sm   w-full p-4">
          {isEditing ? (
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className='font-[Pretendard] font-normal w-full "'
            />
          ) : (
            <span className="font-[Pretendard] font-normal">{commentText}</span>
          )}
        </div>
      </div>
      <div className="flex items-center justify-evenly">
        <div className="flex mt-1 items-center justify-between ">
          <img
            src={STATUS_ICON[CATEGORY_STATUS_MAP[categoryCode]]}
            alt="muscle icon"
            width={16}
          />
          <span className="font-[Pretendard] text-sm ml-[0.5rem]">
            Lv. {comment.level}
          </span>
        </div>
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
        {isNicknameMatched && (
          <>
            {isEditing ? (
              <button
                onClick={() => handleEditComment(comment.commentId)}
                className="font-[Pretendard] text-sm text-gray-500"
              >
                저장
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
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
          </>
        )}
      </div>
    </div>
  );
};

export default Comments;
