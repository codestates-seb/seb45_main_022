import { CategoryCode } from '../../api/category';
import { CATEGORY_STATUS_MAP } from '../../utility/category';
import { STATUS_ICON } from '../../utility/status';

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
  return (
    <div
      key={comment.commentId}
      className="  p-2  my-2 flex flex-col rounded-lg bg-white shadow-md "
    >
      {/* profile pic + text */}
      {/* <div className="flex flex-col items-center justify-center w-20"> */}
      <div className="flex  items-center justify-between  ">
        <div className="flex flex-col items-center w-[3.25rem] ">
          <img src={comment.profileImage} alt="profile image" width={45} />

          <span className="font-[Pretendard] font-semibold">
            {comment.nickname}
          </span>
        </div>
        {/* <div className="flex mt-1 items-center justify-around w-[100%]"> */}
        <div className="flex text-sm   w-full p-4">
          <span className="font-[Pretendard] font-normal">{comment.body}</span>
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
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Comments;
