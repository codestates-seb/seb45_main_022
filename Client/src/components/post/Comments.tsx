import icon from '../../assets/icons/status-strength.png';

const Comments = ({ comments }) => {
  console.log(comments);
  return (
    <div className="border-b border-solid border-gray-400  py-2 flex p-4 ">
      <div className="flex flex-col items-center justify-center w-20">
        <img src="" alt="profile image" width={45} />
        <span className="font-[Pretendard] font-semibold">name</span>

        <div className="flex mt-1 items-center justify-around w-[100%]">
          <img src={icon} alt="muscle icon" width={15} />
          <span className="font-[Pretendard] text-sm">str</span>
        </div>
      </div>
      <div className="flex text-sm   w-full p-4">
        <span className="font-[Pretendard] font-normal">text</span>
      </div>
      <div className="w-10 text-center">
        <span className="font-[Pretendard] text-sm text-gray-500 ">today</span>
      </div>
    </div>
  );
};

export default Comments;
