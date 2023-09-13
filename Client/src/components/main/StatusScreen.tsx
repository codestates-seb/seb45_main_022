import Backdrop from '../common/Backdrop';
import Button from '../common/Button';
import StatusChart from './StatusChart';
import StatusListItem from './StatusListItem';
import useUserInfoQuery from '../../hooks/useUserInfoQuery';
import LoadingBar from '../common/LoadingBar';
import { Link, useNavigate } from 'react-router-dom';

const StatusScreen = () => {
  const { isLoading, data } = useUserInfoQuery();
  const statusData = data?.statuses;

  const navigate = useNavigate();

  if (isLoading)
    return (
      <Backdrop>
        <LoadingBar />
      </Backdrop>
    );

  if (!statusData) {
    alert('정보를 불러오는 데 실패했습니다.');
    navigate('/main');
    return;
  }

  return (
    <Backdrop>
      <div className="relative w-full h-full flex flex-col justify-center items-center gap-[32px]">
        <div className="w-[1200px] h-[600px] p-[20px] bg-[url('/src/assets/common/modal-frame-note.png')] bg-center bg-cover bg-no-repeat flex flex-row justify-between">
          <div className="w-[500px] h-[600px] p-[20px] flex flex-col gap-[16px] justify-center items-center">
            <h1 className="text-[2rem] ml-5">YOUR STATUS</h1>
            <StatusChart status={statusData} />
          </div>
          <div className="w-[500px] h-[600px] px-[20px] pb-[40px] flex flex-col justify-center items-center gap-[8px]">
            {statusData.map((status, i) => (
              <StatusListItem key={i} status={status} />
            ))}
          </div>
        </div>
        <Link to="/main">
          <Button>Close</Button>
        </Link>
      </div>
    </Backdrop>
  );
};

export default StatusScreen;
