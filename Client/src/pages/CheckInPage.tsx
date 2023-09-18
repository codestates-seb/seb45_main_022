import { Navigate } from 'react-router';
import useCheckInQuery from '../hooks/useCheckInQuery';
import CheckInScreen from '../components/main/CheckInScreen';

const MainPage = () => {
  const { data: isCheckedIn, isSuccess } = useCheckInQuery();

  if (isSuccess && isCheckedIn) {
    return <Navigate to="/main" />;
  }

  return (
    <div className="w-full h-screen flex justify-center items-center bg-[#3c0033] z-10">
      <div
        className="relative bg-title w-[1200px] h-[720px] bg-cover
  bg-no-repeat bg-center"
      >
        <CheckInScreen />
      </div>
    </div>
  );
};

export default MainPage;
