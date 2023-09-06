import useUserInfo from '../../hooks/useUserInfo';
import Backdrop from '../common/Backdrop';
import Button from '../common/Button';
import { useState } from 'react';
import LoadingBar from '../common/LoadingBar';
import 'cropperjs/dist/cropper.css';
import ImageCropperModal from './ImageUploadModal';

interface Props {
  closeScreen: () => void;
}

const ProfileScreen = ({ closeScreen }: Props) => {
  const [tab, setTab] = useState<'password' | 'post'>('post');
  const [showImageModal, setShowImageModal] = useState(false);

  const { userInfoQuery } = useUserInfo();
  const { isLoading, data: userInfo } = userInfoQuery;

  if (isLoading)
    return (
      <Backdrop>
        <LoadingBar />
      </Backdrop>
    );

  if (!userInfo) {
    alert('정보를 불러오는 데 실패했습니다.');
    closeScreen();
    return null;
  }
  return (
    <Backdrop>
      <div className="relative w-full h-full flex flex-col justify-center items-center gap-[2rem]">
        <div className="relative w-[500px] h-[600px] p-[40px] bg-[url('/src/assets/common/modal-frame-paper.png')] bg-center bg-cover bg-no-repeat flex flex-col justify-between">
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
                size="medium"
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
                  {userInfo.nickName}
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
            <ImageCropperModal
              onCloseBtnClick={() => {
                setShowImageModal(false);
              }}
            />
          )}
          {/* 탭 메뉴 */}
          <div className="w-[400px] h-[310px]">
            {/* 탭 버튼 */}
            <div className="h-[50px] flex flex-row">
              <button
                style={{
                  backgroundColor: tab === 'post' ? '#bf916b' : '#ffc98f',
                }}
                className="text-[.8rem] flex-1 rounded-t-md"
                onClick={() => {
                  setTab('post');
                }}
              >
                MY POST
              </button>
              <button
                style={{
                  backgroundColor: tab === 'password' ? '#bf916b' : '#ffc98f',
                }}
                className="text-[.8rem] flex-1 rounded-t-md"
                onClick={() => {
                  setTab('password');
                }}
              >
                CHANGE PASSWORD
              </button>
            </div>
            {/* 탭 내용 */}
            <div className="w-full h-[260px] p-2 bg-[#bf916b] rounded-b-md">
              {tab === 'post' && <div className="w-full h-full">MY POST</div>}
              {tab === 'password' && (
                <div className="w-full h-full flex flex-col justify-evenly items-center">
                  <input
                    placeholder="Current Password"
                    type="password"
                    className="text-sm border-solid border-2 p-2 rounded-lg"
                  />
                  <input
                    placeholder="New Password"
                    type="password"
                    className="text-sm border-solid border-2 p-2 rounded-lg"
                  />
                  <input
                    placeholder="Confirm New Password"
                    type="password"
                    className="text-sm border-solid border-2 p-2 rounded-lg"
                  />
                  <Button size="medium">Change</Button>
                </div>
              )}
            </div>
          </div>
        </div>
        <Button onClick={closeScreen}>Close</Button>
      </div>
    </Backdrop>
  );
};

export default ProfileScreen;
