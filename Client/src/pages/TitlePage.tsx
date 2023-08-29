import { useState } from 'react';
import TitleScreen from '../components/title-page/TitleScreen';
import StatusScreen from '../components/title-page/StatusScreen';
import ProfileScreen from '../components/title-page/ProfileScreen';

const TitlePage = () => {
  const [showTitle, setShowTitle] = useState<boolean>(true);
  const [showStatus, setShowStatus] = useState<boolean>(false);
  const [showProfile, setShowProfile] = useState<boolean>(false);
  return (
    <>
      <div className="w-full h-screen flex justify-center items-center bg-[#3c0033] z-10">
        <div
          className="relative bg-title w-[1200px] h-[720px] bg-cover
        bg-no-repeat bg-center"
        >
          {showTitle && (
            <TitleScreen
              onClick={() => {
                setShowTitle(false);
              }}
            />
          )}
          {showStatus && (
            <StatusScreen
              onClick={() => {
                setShowStatus(false);
              }}
            />
          )}
          {showProfile && (
            <ProfileScreen
              onClick={() => {
                setShowProfile(false);
              }}
            />
          )}
          {!showTitle && (
            <>
              {/* 책 아이콘 */}
              <div className="absolute left-[400px] top-[360px] flex flex-col justify-between items-center gap-[1rem]">
                <p className="text-white drop-shadow-[0_0_2px_#000]">
                  My Status
                </p>
                <div
                  className=" w-[60px] h-[60px] bg-[url('/src/assets/objects/note.png')] bg-cover bg-no-repeat bg-cneter animate-[scale_1s_linear_alternate_infinite] duration-[.3s] hover:animate-none hover:brightness-150 hover:scale-105 cursor-pointer"
                  onClick={() => {
                    setShowStatus(true);
                  }}
                ></div>
              </div>
              {/* 종이 아이콘 */}
              <div className="absolute left-[745px] top-[240px] flex flex-col justify-between items-center gap-[1rem]">
                <p className="text-white drop-shadow-[0_0_2px_#000]">
                  My Profile
                </p>
                <div
                  className=" w-[50px] h-[60px] bg-[url('/src/assets/objects/paper.png')] bg-cover bg-no-repeat bg-cneter animate-[scale_1s_linear_alternate_infinite] duration-[.3s] hover:animate-none hover:brightness-150 hover:scale-105 cursor-pointer"
                  onClick={() => {
                    setShowProfile(true);
                  }}
                ></div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default TitlePage;
