import { Navigate, Outlet } from 'react-router';
import Backdrop from '../components/common/Backdrop';
import useUserInfoQuery from '../hooks/useUserInfoQuery';
import LoadingBar from '../components/common/LoadingBar';

const AuthPage = () => {
  const { data: userInfo, isLoading } = useUserInfoQuery({ hideToast: true });
  if (userInfo) {
    return <Navigate to="/main" />;
  }
  return (
    <>
      <div className="w-full h-screen flex justify-center items-center bg-[#3c0033] z-10">
        <div
          className="relative bg-title w-[1200px] h-[720px] bg-cover
        bg-no-repeat bg-center"
        >
          <Backdrop>
            <div className="flex justify-center items-evenly ">
              {isLoading ? <LoadingBar /> : <Outlet />}
            </div>
          </Backdrop>
        </div>
      </div>
    </>
  );
};

export default AuthPage;
