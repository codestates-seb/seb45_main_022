import icon from '../../assets/icons/status-strength.png';

interface CommentProps {
  profileImg: string;
  nickname: string;
  label: string;
  text: string;
  timeCreated: string;
}

const Comments = ({
  profileImg,
  nickname,
  label,
  text,
  timeCreated,
}: CommentProps) => {
  return (
    <div className="border-[1px] border-solid border-gray-400  py-[8px] flex p-[16px] ">
      <div className="flex flex-col items-center justify-center w-[80px]">
        <img src={profileImg} alt="profile image" width={45} />
        <span className="font-[Pretendard] font-semibold">{nickname}</span>

        <div className="flex mt-1 items-center justify-around w-[100%]">
          <img src={icon} alt="muscle icon" width={15} />
          <span className="font-[Pretendard] text-sm">{label}</span>
        </div>
      </div>
      <div className="flex text-sm   w-full p-4">
        <span className="font-[Pretendard] font-normal">{text}</span>
      </div>
      <div className="w-10 text-center">
        <span className="font-[Pretendard] text-sm text-gray-500 ">
          {timeCreated}
        </span>
      </div>
    </div>
  );
};

export default Comments;
