import Backdrop from '../common/Backdrop';
import Button from '../common/Button';
import StatusChart from './StatusChart';
import StatusListItem from './StatusListItem';
import useUserInfoQuery from '../../hooks/useUserInfoQuery';
import LoadingBar from '../common/LoadingBar';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Steps } from 'intro.js-react';
import GuideButton from '../common/GuideButton';

const StatusScreen = () => {
  const [stepsEnabled, setStepsEnabled] = useState(false);

  const { isLoading, data } = useUserInfoQuery();
  const statusData = data?.statuses;

  const navigate = useNavigate();

  const steps = [
    {
      element: '.status-list',
      title: '성장을 향해 !',
      intro: `성장하고 싶은 스테이터스를 클릭해보세요.<br/>해당 스테이터스를 성장시킬 수 있는 카테고리들을 보여드릴게요.`,
      position: 'left',
    },
  ];

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
          <div className="w-[500px] h-[600px] px-[20px] pb-[40px] flex flex-col justify-center items-center gap-[8px] status-list">
            {statusData.map((status, i) => (
              <StatusListItem key={i} status={status} />
            ))}
          </div>
        </div>
        <Link to="..">
          <Button>Close</Button>
        </Link>
        {!stepsEnabled && (
          <GuideButton
            style={{
              position: 'absolute',
              top: '160px',
              right: '250px',
            }}
            onClick={() => setStepsEnabled(true)}
          />
        )}
        <Steps
          enabled={stepsEnabled}
          steps={steps}
          initialStep={0}
          onExit={() => setStepsEnabled(false)}
        />
      </div>
    </Backdrop>
  );
};

export default StatusScreen;
