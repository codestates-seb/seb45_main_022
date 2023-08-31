import Backdrop from '../common/Backdrop';
import Button from '../common/Button';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Status {
  statName: string;
  statLevel: number;
  statExp: number;
  requiredExp: number;
}

interface UserInfo {
  id: number;
  email: string;
  nickName: string;
  profileImage: string;
  attendance: boolean;
  statuses: Status[];
}

interface Props {
  onClick?: () => void;
}

const ProfileScreen = ({ onClick }: Props) => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const { data }: { data: UserInfo } = await axios.get('user/test.json');
        setUserInfo(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <Backdrop>
      <div className="relative w-full h-full flex flex-col justify-center items-center gap-[2rem]">
        <div className="w-[500px] h-[600px] p-[2rem] bg-[url('/src/assets/common/modal-frame-paper.png')] bg-center bg-cover bg-no-repeat flex flex-col">
          <div className="flex flex-row">
            {/* 프로필 사진 액자 */}
            <div className="w-[150px] h-[150px] bg-[url('/src/assets/common/profile-frame.png')] bg-center bg-cover bg-no-repeat flex justify-center items-center">
              <img
                className="w-[120px] h-[120px]"
                src={userInfo?.profileImage}
                alt="profile"
              />
            </div>
            {/* 닉네임 */}
            <div className="w-[300px] flex flex-col justify-center items-center gap-2">
              <h1 className="text-[1rem] text-center">
                NAME
                <br />
                <span className="font-[ui-sans-serif] text-[2.5rem] font-extrabold">
                  {userInfo?.nickName}
                </span>
              </h1>
            </div>
          </div>
        </div>
        <Button onClick={onClick}>Close</Button>
      </div>
    </Backdrop>
  );
};

export default ProfileScreen;
