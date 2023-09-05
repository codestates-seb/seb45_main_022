import { useState } from 'react';
import TitleScreen from '../components/title/TitleScreen';
import StatusScreen from '../components/title/StatusScreen';
import ProfileScreen from '../components/title/ProfileScreen';
import AuthScreen from '../components/title/AuthScreen';

enum Screen {
  TITLE,
  STATUS,
  AUTH,
  PROFILE,
  DEFAULT,
}

const TitlePage = () => {
  const [screen, setScreen] = useState<Screen>(Screen.TITLE);

  const showDefault = () => {
    setScreen(Screen.DEFAULT);
  };

  const showAuth = () => {
    setScreen(Screen.AUTH);
  };

  return (
    <>
      <div className="w-full h-screen flex justify-center items-center bg-[#3c0033] z-10">
        <div
          className="relative bg-title w-[1200px] h-[720px] bg-cover
        bg-no-repeat bg-center"
        >
          {screen === Screen.TITLE && <TitleScreen showAuth={showAuth} />}
          {screen === Screen.AUTH && <AuthScreen showDefault={showDefault} />}
          {screen === Screen.STATUS && (
            <StatusScreen showDefault={showDefault} />
          )}
          {screen === Screen.PROFILE && (
            <ProfileScreen showDefault={showDefault} />
          )}
          {screen === Screen.DEFAULT && (
            <>
              {/* 책 아이콘 */}
              <div className="absolute left-[410px] top-[360px] flex flex-col justify-between items-center gap-[1rem]">
                <p className="text-[.8rem] text-white drop-shadow-[0_0_2px_#000]">
                  My Status
                </p>
                <div
                  className=" w-[60px] h-[60px] bg-[url('/src/assets/objects/note.png')] bg-cover bg-no-repeat bg-cneter animate-[scale_1s_linear_alternate_infinite] duration-[.3s] hover:animate-none hover:brightness-125 hover:scale-105 cursor-pointer"
                  onClick={() => {
                    setScreen(Screen.STATUS);
                  }}
                ></div>
              </div>
              {/* 종이 아이콘 */}
              <div className="absolute left-[755px] top-[240px] flex flex-col justify-between items-center gap-[1rem]">
                <p className="text-[.8rem] text-white drop-shadow-[0_0_2px_#000]">
                  My Profile
                </p>
                <div
                  className=" w-[50px] h-[60px] bg-[url('/src/assets/objects/paper.png')] bg-cover bg-no-repeat bg-cneter animate-[scale_1s_linear_alternate_infinite] duration-[.3s] hover:animate-none hover:brightness-125 hover:scale-105 cursor-pointer"
                  onClick={() => {
                    setScreen(Screen.PROFILE);
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
