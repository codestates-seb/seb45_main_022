import { CategoryCode } from '../../api/category';
import { CATEGORY_STATUS_MAP } from '../../utility/category';
import { STATUS_ICON } from '../../utility/status';
import { editCommentData, deleteCommentData } from '../../api/comment';
import { getUserInfo } from '../../api/user';
import { useState } from 'react';
import useUserInfoQuery from '../../hooks/useUserInfoQuery';

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
  // console.log('comment nickname....', comment.nickname);
  const [isNicknameMatched, setIsNicknameMatched] = useState(false);
  const [commentText, setCommentText] = useState(comment.body);
  const [isEditing, setIsEditing] = useState(false);

  const getUserData = async () => {
    const userInfo = await getUserInfo();
    const userNickname = userInfo.nickname;

    if (userNickname === comment.nickname) {
      // console.log('같은 닉네임');
      setIsNicknameMatched(true);
    } else {
      // console.log('다른 닉네임');
      setIsNicknameMatched(false);
    }
  };
  getUserData();

  const handleDeleteComment = async (commentId: number) => {
    try {
      await deleteCommentData({ commentId });
      alert('댓글 삭제완료');
    } catch (error) {
      alert(error);
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
    } catch (error) {
      console.error('수정 실패', error);
    }
  };

  return (
    <div
      key={comment.commentId}
      className="  p-2  my-2 flex flex-col rounded-lg bg-white shadow-md "
    >
      {/* profile pic + text */}
      {/* <div className="flex flex-col items-center justify-center w-20"> */}
      <div className="flex  items-center justify-between  ">
        <div className="flex flex-col items-center w-[7.5rem]  ">
          <img src={comment.profileImage} alt="profile image" width={45} />

          <span className="font-[Pretendard] font-semibold">
            {comment.nickname}
          </span>
        </div>
        {/* <div className="flex mt-1 items-center justify-around w-[100%]"> */}
        <div className="flex text-sm   w-full p-4">
          {/* <span className="font-[Pretendard] font-normal">{comment.body}</span> */}
          {isEditing ? (
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className='font-[Pretendard] font-normal"'
            />
          ) : (
            <span className="font-[Pretendard] font-normal">{commentText}</span>
          )}
        </div>
      </div>
      {/* 유조 정보 */}
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
            {/* {comment.createDate} */}
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
