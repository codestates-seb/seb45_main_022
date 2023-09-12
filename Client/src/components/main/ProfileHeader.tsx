import { useQueryClient } from 'react-query';
import { UserInfo, postNickname, postProfileImage } from '../../api/user';
import { FormEvent, useRef, useState } from 'react';
import Button from '../common/Button';
import ImageUploadModal from '../common/ImageUploadModal';
import { validateNickname } from '../../utility/validation';
import { ERROR_MSG, ErrorType } from '../../api/error';
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
    } catch (err) {
      if (axios.isAxiosError<ErrorType>(err) && err.response) {
        const { errorCode } = err.response.data;
        alert(ERROR_MSG[errorCode]);
      }
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
      alert('Nickname must be 2-6 characters, Korean or English');
      return;
    }
    try {
      await postNickname(nicknameInputRef.current.value);
      queryClient.invalidateQueries('userInfo');
    } catch (err) {
      if (axios.isAxiosError<ErrorType>(err) && err.response) {
        const { errorCode } = err.response.data;
        alert(ERROR_MSG[errorCode]);
      }
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
