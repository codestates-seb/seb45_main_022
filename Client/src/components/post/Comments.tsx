import { CategoryCode } from '../../api/category';
import icon from '../../assets/icons/status-strength.png';
import { CATEGORY_STATUS_MAP } from '../../utility/category';
import { STATUS_ICON } from '../../utility/status';

interface CommentProps {
  comment: {
    commentId: number;
    nickname: string;
    profileImage: string;
    level: number;
    body: string;
    createdDate: string;
  };
  categoryCode: CategoryCode;
}

const Comments = ({ comment, categoryCode }: CommentProps) => {
  return (
    <div key={comment.commentId} className="  p-4  my-2 flex  ">
      {/* <div className="flex flex-col items-center justify-center w-20"> */}
      <div className="flex flex-col items-center justify-center  w-[8rem] ">
        <img src={comment.profileImage} alt="profile image" width={45} />
        <span className="font-[Pretendard] font-semibold">
          {comment.nickname}
        </span>

        {/* <div className="flex mt-1 items-center justify-around w-[100%]"> */}
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
      </div>
      <div className="flex text-sm   w-full p-4">
        <span className="font-[Pretendard] font-normal">{comment.body}</span>
      </div>
      <div className="w-10 text-center">
        <span className="font-[Pretendard] text-sm text-gray-500 ">
          {comment.createdDate}
        </span>
      </div>
    </div>
  );
};

export default Comments;
