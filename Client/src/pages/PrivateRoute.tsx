import { Navigate, Outlet } from 'react-router';
import Backdrop from '../components/common/Backdrop';
import LoadingBar from '../components/common/LoadingBar';
import useUserInfoQuery from '../hooks/useUserInfoQuery';

const PrivateRoute = () => {
  const { data: userInfo, isLoading } = useUserInfoQuery();

  if (isLoading) {
    return (
      <Backdrop>
        <LoadingBar />
      </Backdrop>
    );
  }

  if (!userInfo) {
    return <Navigate to="/auth/login" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
