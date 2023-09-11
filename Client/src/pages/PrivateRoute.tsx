import { Navigate, Outlet } from 'react-router';
import Backdrop from '../components/common/Backdrop';
import LoadingBar from '../components/common/LoadingBar';
import useUserInfo from '../hooks/useUserInfo';

const PrivateRoute = () => {
  const { userInfoQuery } = useUserInfo();
  const { data, isLoading } = userInfoQuery;

  if (isLoading) {
    return (
      <Backdrop>
        <LoadingBar />
      </Backdrop>
    );
  }

  if (!data) {
    return <Navigate to="/auth/login" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
