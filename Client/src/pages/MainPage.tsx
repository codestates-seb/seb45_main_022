import { useQueryClient } from 'react-query';
import { Outlet, Link } from 'react-router-dom';

const MainPage = () => {
  const queryClient = useQueryClient();
  const handleLogout = () => {
    localStorage.removeItem('token');
    queryClient.removeQueries();
    alert('로그아웃 되었습니다.');
  };
  return (
    <div className="w-full h-screen flex justify-center items-center bg-[#3c0033] z-10">
      <div
        className="relative bg-title w-[1200px] h-[720px] bg-cover
  bg-no-repeat bg-center"
      >
        {/* 책 - 스테이터스 */}
        <Link to="/main/status">
          <div className="absolute left-[410px] top-[360px] flex flex-col justify-between items-center gap-[16px]">
            <p className="text-[.8rem] text-white drop-shadow-[0_0_2px_#000]">
              My Status
            </p>
            <div className="w-[60px] h-[60px] bg-[url('/src/assets/objects/note.png')] bg-cover bg-no-repeat bg-cneter animate-[scale_1s_linear_alternate_infinite] duration-[.3s] hover:animate-none hover:brightness-125 hover:scale-105 cursor-pointer"></div>
          </div>
        </Link>
        {/* 종이 - 프로필 */}
        <Link to="/main/profile">
          <div className="absolute left-[755px] top-[240px] flex flex-col justify-between items-center gap-[16px]">
            <p className="text-[.8rem] text-white drop-shadow-[0_0_2px_#000]">
              My Profile
            </p>
            <div className="w-[50px] h-[60px] bg-[url('/src/assets/objects/paper.png')] bg-cover bg-no-repeat bg-cneter animate-[scale_1s_linear_alternate_infinite] duration-[.3s] hover:animate-none hover:brightness-125 hover:scale-105 cursor-pointer"></div>
          </div>
        </Link>
        {/* 문 - 로그아웃 */}
        <Link to="/title" onClick={handleLogout}>
          <div className="absolute left-[562px] top-[540px] flex flex-col justify-between items-center gap-[16px]">
            <p className="text-[.8rem] text-white drop-shadow-[0_0_2px_#000]">
              Logout
            </p>
            <div className="w-[63px] h-[99px] bg-[url('/src/assets/objects/door.png')] bg-cover bg-no-repeat bg-cneter animate-[scale_1s_linear_alternate_infinite] duration-[.3s] hover:animate-none hover:brightness-125 hover:scale-105 cursor-pointer"></div>
          </div>
        </Link>
        <Outlet />
      </div>
    </div>
  );
};

export default MainPage;
