interface CommentProps {
  nickname: string;
  label: string;
  text: string;
  timeCreated: string;
}

const Comments = ({ nickname, label, text, timeCreated }: CommentProps) => {
  return (
    <div className="border border-solid border-black py-2 flex flex-col items-center justify-center w-[200px]">
      <span className="font-[Pretendard]">{nickname}</span>
      <span className="font-[Pretendard]">{label}</span>
      <span className="font-[Pretendard] font-normal">{text}</span>
      <span className="font-[Pretendard] text-sm text-gray-500">
        {timeCreated}
      </span>
    </div>
  );
};

export default Comments;
