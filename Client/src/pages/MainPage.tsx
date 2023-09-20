import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import useCheckInQuery from '../hooks/useCheckInQuery';
import { Navigate } from 'react-router';
import { Steps } from 'intro.js-react';
import 'intro.js/introjs.css';
import GuideButton from '../components/common/GuideButton';

const MainPage = () => {
  const queryClient = useQueryClient();
  const [stepsEnabled, setStepsEnabled] = useState(false);

  const steps = [
    {
      element: '.statIcon',
      title: '모험의 시작 !',
      intro: `내 스테이터스를 확인하고,<br/>스테이터스를 쌓으러 떠날 수 있어요.`,
      position: 'left',
    },
    {
      element: '.profileIcon',
      title: '정비는 언제나 환영 !',
      intro: '내 정보를 확인 및 수정하고,<br/>내가 쓴 피드를 확인할 수 있어요.',
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
    <div className="w-full h-screen flex justify-center items-center bg-[#3c0033] overflow-hidden">
      <div className="relative bg-title w-[1200px] min-w-[1200px] h-[720px] bg-cover bg-no-repeat bg-center">
        {/* 책 - 스테이터스 */}
        <div className="absolute left-[410px] top-[360px] flex flex-col justify-between items-center gap-[16px] statIcon">
          <p className="text-[.8rem] text-white drop-shadow-[0_0_2px_#000] pointer-events-none">
            My Status
          </p>
          <Link
            onClick={() => {
              setStepsEnabled(false);
            }}
            to="/main/status"
          >
            <div className="w-[60px] h-[60px] bg-[url('/src/assets/objects/note.png')] bg-cover bg-no-repeat bg-center animate-[scale_1s_linear_alternate_infinite] duration-[.3s] hover:animate-none hover:brightness-125 hover:scale-105 cursor-pointer"></div>
          </Link>
        </div>
        {/* 종이 - 프로필 */}
        <div className="absolute left-[755px] top-[240px] flex flex-col justify-between items-center gap-[16px] profileIcon">
          <p className="text-[.8rem] text-white drop-shadow-[0_0_2px_#000] pointer-events-none">
            My Profile
          </p>
          <Link
            onClick={() => {
              setStepsEnabled(false);
            }}
            to="/main/profile"
          >
            <div className="w-[50px] h-[60px] bg-[url('/src/assets/objects/paper.png')] bg-cover bg-no-repeat bg-center animate-[scale_1s_linear_alternate_infinite] duration-[.3s] hover:animate-none hover:brightness-125 hover:scale-105 cursor-pointer"></div>
          </Link>
        </div>
        {/* 문 - 로그아웃 */}
        <div className="absolute left-[562px] top-[540px] flex flex-col justify-between items-center gap-[16px]">
          <p className="text-[.8rem] text-white drop-shadow-[0_0_2px_#000] pointer-events-none">
            Logout
          </p>
          <Link onClick={handleLogout} to="/">
            <div className="w-[63px] h-[99px] bg-[url('/src/assets/objects/door.png')] bg-cover bg-no-repeat bg-center animate-[scale_1s_linear_alternate_infinite] duration-[.3s] hover:animate-none hover:brightness-125 hover:scale-105 cursor-pointer"></div>
          </Link>
        </div>
        {/* 가이드 버튼 */}
        <div className="absolute left-[823px] top-[447px] flex flex-col justify-between items-center gap-[16px]">
          <p className="text-[.8rem] text-white drop-shadow-[0_0_2px_#000] pointer-events-none">
            Guide
          </p>
          <GuideButton onClick={() => setStepsEnabled(true)} />
        </div>
        <Outlet />
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
