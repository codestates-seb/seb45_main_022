import { useQueryClient } from 'react-query';
import { UserInfo, postNickname, postProfileImage } from '../../api/user';
import { FormEvent, useRef, useState } from 'react';
import Button from '../common/Button';
import ImageUploadModal from '../common/ImageUploadModal';
import { validateNickname } from '../../utility/validation';
import axios from 'axios';

interface Props {
  userInfo: UserInfo;
}

const ProfileHeader = ({ userInfo }: Props) => {
  const [showImageModal, setShowImageModal] = useState(false);
  const [showNicknameInput, setShowNicknameInput] = useState(false);
  const queryClient = useQueryClient();

  const nicknameInputRef = useRef<HTMLInputElement>(null);

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

  const handleNicknameFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    changeNickname();
  };

  const changeNickname = async () => {
    setShowNicknameInput(false);
    if (
      !nicknameInputRef.current ||
      !nicknameInputRef.current.value ||
      nicknameInputRef.current.value === userInfo.nickname
    ) {
      return;
    }
    if (!validateNickname(nicknameInputRef.current.value)) {
      alert('닉네임은 2~6자의 한글, 영문만 가능합니다.');
      return;
    }
    try {
      await postNickname(nicknameInputRef.current.value);
      queryClient.invalidateQueries('userInfo');
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error) && error.response?.status === 409) {
        alert('이미 사용 중인 닉네임입니다.');
        return;
      }
      alert('닉네임 변경에 실패했습니다.');
    }
  };

  return (
    <>
      <div className="flex flex-row justify-between items-start">
        {/* 프로필 사진 액자 */}
        <div className="flex flex-col gap-[8px]">
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
        <div className="w-[300px] h-[200px] flex flex-col justify-center items-center gap-[12px]">
          <h1 className="text-[1rem] text-center">
            NAME
            <br />
            {showNicknameInput ? (
              <>
                <form onSubmit={handleNicknameFormSubmit}>
                  <input
                    ref={nicknameInputRef}
                    autoFocus
                    className="w-[200px] bg-[#bf916b] font-[Pretendard] text-[2.5rem] font-extrabold rounded-[6px]"
                    onBlur={changeNickname}
                    type="text"
                    defaultValue={userInfo.nickname}
                  />
                </form>
              </>
            ) : (
              <div className="flex flex-row gap-[4px] items-center">
                <span className="font-[Pretendard] text-[2.5rem] font-extrabold">
                  {userInfo.nickname}
                </span>
                <button
                  onClick={() => {
                    setShowNicknameInput(true);
                  }}
                  className="w-[25px] h-[25px] mt-[10px] bg-[url('/src/assets/icons/btn-pencil.png')] bg-cover bg-no-repeat cursor-pointer hover:brightness-125"
                  type="button"
                ></button>
              </div>
            )}
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
