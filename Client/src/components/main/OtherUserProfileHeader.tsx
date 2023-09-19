import { Feed } from '../../api/feed';

interface FeedParams {
  matchingUserInfo: Feed[];
}

const OtherUserProfileHeader = ({ matchingUserInfo }: FeedParams) => {
  const userName = matchingUserInfo.map((user) => user.nickname);
  const userProfileImage = matchingUserInfo.map((user) => user.profileImage);

  return (
    <>
      <div className="flex flex-row justify-between items-start">
        {/* 프로필 사진 액자 */}
        <div className="flex flex-col gap-[8px]">
          <div className="w-[150px] h-[150px] bg-[url('/src/assets/common/profile-frame.png')] bg-center bg-cover bg-no-repeat flex justify-center items-center">
            <img
              className="w-[120px] h-[120px]"
              src={userProfileImage[0]}
              alt="profile"
            />
          </div>
        </div>
        {/* 닉네임 */}
        <div className="w-[300px] h-[200px] flex flex-col justify-center items-center gap-[12px] -mt-[10px]">
          <h1 className="text-[1rem] text-center">
            NAME
            <br />
            <div className="flex flex-row gap-[4px] items-center">
              <span className="font-[Pretendard] text-[2.5rem] font-extrabold">
                {userName[0]}
              </span>
            </div>
          </h1>
        </div>
      </div>
    </>
  );
};

export default OtherUserProfileHeader;
