import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import useCheckInQuery from '../hooks/useCheckInQuery';
import { Navigate } from 'react-router';
import { Steps } from 'intro.js-react';
import 'intro.js/introjs.css';
import guideButton from '../assets/common/guide-button.png';

const MainPage = () => {
  const queryClient = useQueryClient();
  const [stepsEnabled, setStepsEnabled] = useState(false);

  const steps = [
    {
      element: '.statIcon',
      title: '모험의 시작 !',
      intro: `책을 클릭해서 스탯을 확인하고, 스탯을 키우러 출발해볼까요~?`,
      position: 'left',
    },
    {
      element: '.profileIcon',
      title: '정비는 언제나 환영이야',
      intro: '닉네임 & 비밀번호 변경, 내가 쓴 피드를 확인할 수 있어요.',
      position: 'right',
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    queryClient.removeQueries();
    alert('로그아웃 되었습니다.');
  };

  const { data: isCheckedIn, isSuccess } = useCheckInQuery();

  if (isSuccess && isCheckedIn === false) {
    return <Navigate to="/checkin" />;
  }

  return (
    <div className="w-full min-w-[1200px] h-screen flex justify-center items-center bg-[#3c0033] z-10">
      <div className="relative bg-title w-[1200px] h-[720px] bg-cover bg-no-repeat bg-center">
        {/* 책 - 스테이터스 */}
        <Link to="/main/status">
          <div className="absolute left-[410px] top-[360px] flex flex-col justify-between items-center gap-[16px] statIcon">
            <p className="text-[.8rem] text-white drop-shadow-[0_0_2px_#000]">
              My Status
            </p>
            <div className="w-[60px] h-[60px] bg-[url('/src/assets/objects/note.png')] bg-cover bg-no-repeat bg-cneter animate-[scale_1s_linear_alternate_infinite] duration-[.3s] hover:animate-none hover:brightness-125 hover:scale-105 cursor-pointer"></div>
          </div>
        </Link>
        {/* 종이 - 프로필 */}
        <Link to="/main/profile">
          <div className="absolute left-[755px] top-[240px] flex flex-col justify-between items-center gap-[16px] profileIcon">
            <p className="text-[.8rem] text-white drop-shadow-[0_0_2px_#000]">
              My Profile
            </p>
            <div className="w-[50px] h-[60px] bg-[url('/src/assets/objects/paper.png')] bg-cover bg-no-repeat bg-cneter animate-[scale_1s_linear_alternate_infinite] duration-[.3s] hover:animate-none hover:brightness-125 hover:scale-105 cursor-pointer"></div>
          </div>
        </Link>
        {/* 문 - 로그아웃 */}
        <Link to="/" onClick={handleLogout}>
          <div className="absolute left-[562px] top-[540px] flex flex-col justify-between items-center gap-[16px]">
            <p className="text-[.8rem] text-white drop-shadow-[0_0_2px_#000]">
              Logout
            </p>
            <div className="w-[63px] h-[99px] bg-[url('/src/assets/objects/door.png')] bg-cover bg-no-repeat bg-cneter animate-[scale_1s_linear_alternate_infinite] duration-[.3s] hover:animate-none hover:brightness-125 hover:scale-105 cursor-pointer"></div>
          </div>
        </Link>
        <Outlet />
        <div className="absolute left-[823px] top-[447px] flex flex-col justify-between items-center gap-[16px]">
          <p className="text-[.8rem] text-white drop-shadow-[0_0_2px_#000]">
            Guide
          </p>
          <img
            src={guideButton}
            alt="guideButton"
            onClick={() => setStepsEnabled(true)}
            className=" w-10 cursor-pointer"
          />
        </div>
      </div>
      <Steps
        enabled={stepsEnabled}
        steps={steps}
        initialStep={0}
        onExit={() => setStepsEnabled(false)}
      />
    </div>
  );
};

export default MainPage;
