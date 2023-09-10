import { useQueryClient } from 'react-query';
import { UserInfo, postProfileImage } from '../../api/user';
import { useState } from 'react';
import Button from '../common/Button';
import ImageUploadModal from '../common/ImageUploadModal';

interface Props {
  userInfo: UserInfo;
}

const ProfileHeader = ({ userInfo }: Props) => {
  const [showImageModal, setShowImageModal] = useState(false);
  const queryClient = useQueryClient();

  const changeProfileImage = async (encodedImage: string) => {
    try {
      await postProfileImage(encodedImage);
    } catch (error) {
      alert('프로필 이미지 변경에 실패했습니다.');
      return;
    }
    queryClient.invalidateQueries('userInfo');
    setShowImageModal(false);
  };

  return (
    <>
      <div className="flex flex-row justify-between items-start">
        {/* 프로필 사진 액자 */}
        <div className="flex flex-col gap-2">
          <div className="w-[150px] h-[150px] bg-[url('/src/assets/common/profile-frame.png')] bg-center bg-cover bg-no-repeat flex justify-center items-center">
            <img
              className="w-[120px] h-[120px]"
              src={userInfo.profileImage}
              alt="profile"
            />
          </div>
          <Button
            style={{ width: '150px', height: '37.5px', fontSize: '.5rem' }}
            onClick={() => {
              setShowImageModal(true);
            }}
          >
            Change Image
          </Button>
        </div>
        {/* 닉네임 */}
        <div className="w-[300px] h-[200px] flex flex-col justify-center items-center gap-3">
          <h1 className="text-[1rem] text-center">
            NAME
            <br />
            <span className="font-[Pretendard] text-[2.5rem] font-extrabold">
              {userInfo.nickname}
            </span>
          </h1>
          <h1 className="text-[.8rem] text-center">
            EMAIL
            <br />
            <span className="text-[.5rem] font-extrabold">
              {userInfo.email}
            </span>
          </h1>
        </div>
      </div>
      {showImageModal && (
        <ImageUploadModal
          onCloseBtnClick={() => {
            setShowImageModal(false);
          }}
          onConfirmBtnClick={changeProfileImage}
        />
      )}
    </>
  );
};

export default ProfileHeader;
